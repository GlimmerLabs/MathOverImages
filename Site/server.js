// server.js

//==================== setup ====================

var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var jade = require('jade');
var compress = require('compression');
var fs = require('fs');

/* set up HTTPS */
/*var https = require('https');
var httpsOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
}*/

var http = require('http');
var app = express();

var mysql = require('mysql');
var auth = require('./functions/auth.js');
var ports = require('./functions/ports.js');

//==================== configuration ====================

// Database

var database = require('./functions/database.js');

app.use(compress());
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser(auth["session-secret"])); // read cookie information (for auth)
app.use(bodyParser.urlencoded({
  extended: true
})); // get info from html forms
app.use(expressSession({secret: auth["session-secret"],
                 saveUninitialized: true,
                 resave: true}));

// Use EJS as the default render engine
app.set('view engine', 'ejs');

//==================== routes ====================

require('./app/routes.js')(app, express, database);

//==================== launch ====================

http.createServer(app).listen(ports.http);
// https.createServer(httpsOptions, app).listen(ports.https);
console.log('HTTP operating on port ' + ports.http);
// console.log('HTTPS operating on port ' + ports.https);
