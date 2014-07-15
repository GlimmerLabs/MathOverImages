var validate = require('validator');

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
module.exports.sendMail = (function(to, subject, message){
  runShell("echo '" + message + "' | mailx -a 'Content-type: text/html;' -s '" + subject + "' " + to);
});


