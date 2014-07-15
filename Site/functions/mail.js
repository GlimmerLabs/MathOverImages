var validate = require('validator');
var database = require('./database');

// Thanks http://www.davidpirek.com/blog/run-shell-from-nodejs-function for the runShell command
var runShell = function(command){

  var sys = require('sys'),
      exec = require('child_process').exec;

  function puts(error, stdout, stderr) {
    sys.puts(stdout);
  }

  exec(command, puts);
}



// Example.
var sendMail = (function(to, subject, message){
  message = message.replace("'", "\'")
  runShell("echo '" + message + "' | mailx -a 'Content-type: text/html;' -s '" + subject + "' " + to);
});

var validateEmail = (function(user){
  sendMail(user.email, user.forename + ", validate your email address for MIST", "<a href='http://glimmer.grinnell.edu'>Click Here to validate your address</a>")
});

var alertComment = (function(toUser, imageid, commentid){
  console.log("validateEmail");
  sendMail(user.email, user.forename + ", validate your email address for MIST", "<a href='http://glimmer.grinnell.edu'>Click Here to validate your address</a>")
});

module.exports.validateEmail = validateEmail;
