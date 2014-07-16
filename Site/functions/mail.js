/**
* mail.js
* Send email and other mail related services
*/

var validate = require('validator');
var database = require('./database');
var fs = require('fs');

/**
* enterUserInfo replaces templating in HTML files with actual values.
*/
var enterUserInfo = (function(user, template) {
  return (template.replace(/(?:{{ FORENAME }})/g, user.forename)
          .replace(/(?:{{ SURNAME }})/g, user.surname)
          .replace(/(?:{{ EMAIL }})/g, user.email)
          .replace(/(?:{{ USERNAME }})/g, user.username))
});

// Thanks http://www.davidpirek.com/blog/run-shell-from-nodejs-function for the runShell command
var runShell = function(command){

  var sys = require('sys'),
      exec = require('child_process').exec;

  function puts(error, stdout, stderr) {
    sys.puts(stdout);
  }

  exec(command, puts);
}

/**
* sendMail executes the actual send command. As it uses mailx, the "from" header will be based on its configuration
*/
var sendMail = (function(to, subject, message){
  message = message.replace(/\"/g, '\\"').replace(/!/g, "&#33;");
  console.log('echo "' + message + '" | mailx -a "Content-type: text/html;" -s "' + subject + '" ' + to);
  runShell('echo "' + message + '" | mailx -a "Content-type: text/html;" -s "' + subject + '" ' + to);
});

/**
* validateEmail sends an email to a user about how they may verify their email address.
*/
var validateEmail = (function(user){
  fs.readFile("public/emails/validateEmail.html", function (error, data){
    if (error){
      console.log(error);
    }
    else {
      var link = "http://glimmer.grinnell.edu/verify?id=" + user.userid +"&token=" + "dog";
      var email = data.toString();
      email = (enterUserInfo(user, email)
               .replace(/(?:{{ LINK }})/g, link));
      sendMail(user.email, user.forename + ", validate your email address for MIST", email);
    }
  });
});



module.exports.validateEmail = validateEmail;
