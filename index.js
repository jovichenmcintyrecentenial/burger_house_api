//define imports 
const errorMiddleware = require('./controllers/errorController.js')
const {userRoutes} = require('./routes/userRoutes.js')
const apiMonitor = require('./controllers/monitorController.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
var dotenv = require('dotenv')
const cors = require('cors');
//load environmental varibles from env file
//this contains SERVER_NAME, PORT, HOST, JWT_KEY, JWT_EXPIRY and DB_CONNECTION_STRING
dotenv.config({
    path: './local.config.env'
});


//create server
var server = express();
var port = (process.env.PORT || process.env.MY_PORT)
var host = (process.env.HOST || process.env.MY_HOST)

//list to serve and display avaiblem methods
server.listen( port, process.env.HOST, function (){
    console.log('Server %s listening at %s', server.name, process.env.SERVER_NAME)
})


server.use(bodyParser.json())
server.use(cors())
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB Connection successful')
});

// server.use(apiMonitor)
server.use(userRoutes)


server.use(errorMiddleware)