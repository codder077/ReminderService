const express=require('express');

const app=express();
const bodyparser=require('body-parser');
const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');
const { PORT } = require('./config/serverConfig');
// const jobs = require('./utils/job');
// const {sendBasicEmail}=require('./services/email-service');

const { subscribeMessage, createChannel } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');

const setUpAndStartServer=async ()=>{

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.post('/api/v1/tickets', TicketController.create);
    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
        // jobs();
    });

}

setUpAndStartServer();