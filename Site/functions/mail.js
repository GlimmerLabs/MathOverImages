var validate = require('validator');
var database = require('./database');
var fs = require('fs');

// Thanks http://www.davidpirek.com/blog/run-shell-from-nodejs-function for the runShell command
var runShell = function(command){

  var sys = require('sys'),
      exec = require('child_process').exec;

  function puts(error, stdout, stderr) {
    sys.puts(stdout);
  }

  exec(command, puts);
}



var sendMail = (function(to, subject, message){
  message = message.replace(/"/g, "\"").replace(/!/g, "&#33;");
  console.log('echo "' + message + '" | mailx -a "Content-type: text/html;" -s "' + subject + '" ' + to);
  runShell('echo "' + message + '" | mailx -a "Content-type: text/html;" -s "' + subject + '" ' + to);
});

var validateEmail = (function(user){
  fs.readFile("public/emails/validateEmail.html", function (error, data){
    if (error){
      console.log(error);
    }
    else {
      var email = data.toString();
      email = enterUserInfo(user, email).replace(/(?:{{ LINK }})/g, 'http://www.google.com');
      sendMail(user.email, user.forename + ", validate your email address for MIST", email);
    }
  });
});

var enterUserInfo = (function(user, template) {
  return (template.replace(/(?:{{ FORENAME }})/g, user.forename)
          .replace(/(?:{{ SURNAME }})/g, user.surname)
          .replace(/(?:{{ EMAIL }})/g, user.email)
          .replace(/(?:{{ USERNAME }})/g, user.username))
});

module.exports.validateEmail = validateEmail;
