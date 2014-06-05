// server.js

//==================== setup ====================

var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');



var https = require('https');
var http = require('http');
var app = express();
var port = process.env.PORT || 8080;
var mysql = require('mysql');
var passport = require('passport');
var flash = require('connect-flash');

var auth = require('./config/auth.js');

//==================== configuration ====================

// Database

var database = require('./config/database.js');



// require(./config/passport')(passport); // pass passport for configuration



    app.use(morgan('dev')); //log every request to the console
    app.use(cookieParser()); // read cookie information (for auth)
    app.use(bodyParser()); // get info from html forms

    app.use(expressSession({secret: auth["session-secret"]})); // session secret
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    

//==================== routes ====================

require('./app/routes.js')(app,passport,database);

//==================== launch ====================

app.listen(port);
console.log('Operating on port '+ port);


