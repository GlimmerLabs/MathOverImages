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
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt')
}




var http = require('http');
var app = express();
var port = 80;
var mysql = require('mysql');
var passport = require('passport');
var flash = require('connect-flash');

var auth = require('./functions/auth.js');

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

http.createServer(app).listen(port);


https.createServer(httpsOptions, app).listen(443);
console.log('Operating on port '+ port);


