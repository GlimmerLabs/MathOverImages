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
var https = require('https');
var httpsOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
}

var http = require('http');
var app = express();
var http_port = 8081;
var https_port = 8082;
var mysql = require('mysql');
var passport = require('passport');
var flash = require('connect-flash');

var auth = require('./functions/auth.js');
var ports = require('./functions/ports.js');

//==================== configuration ====================

// Database

var database = require('./functions/database.js');



// require(./functions/passport')(passport); // pass passport for configuration
app.use(compress());
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

http.createServer(app).listen(ports.http);
https.createServer(httpsOptions, app).listen(ports.https);
console.log('HTTP operating on port ' + ports.http);
console.log('HTTPS operating on port ' + ports.https);
