var nodemailer = require('nodemailer');
var auth = require('./auth');

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: auth["mail-service"],
    auth: {
	user: auth["mail-user"],
	pass: auth["mail-password"]
    }
});

module.exports.sendMail = (function (to, from, replyTo, subject, html){
    var mailOptions = {
	from: from,
	to: to,
	subject: subject,
	html: html,
	generateTextFromHTML: true
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
	if(error)
	    console.log(error);
	else
	    console.log("Sent: " + response.message);

    });


});
