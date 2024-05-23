const express=require('express');

const app=express();
const bodyparser=require('body-parser');
const TicketController = require('./controllers/ticket-controller');
const { PORT } = require('./config/serverConfig');
const jobs = require('./utils/job');
const {sendBasicEmail}=require('./services/email-service');

const setUpAndStartServer=()=>{

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
        // jobs();
    });

}

setUpAndStartServer();