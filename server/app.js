const express = require('express');
var session = require("express-session");
const bodyParser = require('body-parser');
var flash = require('connect-flash');
const router = require('./routes/router');
const { static } = require('express');
const app = express();
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin','http://localhost:8080'); //When cookies are allowed, the whitelist here cannot be written in '*'.
  res.header('Access-Control-Allow-Headers','access-control-allow-credentials,access-control-allow-origin,content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //allowed request head
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //allowed request methods  
  res.header('Access-Control-Allow-Credentials',true);  //allow cookies
  next();
});
//Employ session, a key with session have be input, this middleware would be used for session
app.use(session({ secret: 'keyboard cat',
                  resave: false,
                  saveUninitialized: true,
                  cookie : {
                    maxAge : 600000, // Set the valid time of the session in milliseconds.
                  },
                  // username:'',
                  // userId:'',
                }));              
app.use(flash());
// app.use(cors()); //cors is for solving cross-origin problem
app.use(bodyParser.urlencoded({extended: false}));//Mount parameters to process middleware.(post)
app.use(bodyParser.json());//Handles the json format parameters.
app.use('/',router);
app.use(static('./public'));




module.exports = app.listen(3000,()=>{
    console.log('Start server successfully at port 3000!')
})