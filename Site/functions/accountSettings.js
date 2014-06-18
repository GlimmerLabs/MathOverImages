/**
 * User's Settings page
 */
module.exports.buildPage = (function(req, res, database) {
    res.render('../public/views/accountSettings.jade',{
	loggedIn: req.session.loggedIn,
	user: req.session.user
    });
});

module.exports.changeEmail= (function(req, res, database){
    if(req.body.newEmail == req.body.newEmail2)
	database.changeEmail(req.session.user.userid, req.body.newEmail, req.body.password1, function(success,error){
	    if (error)
	    {
		console.log(error);
		res.end ("error"); // Error Landing page
	    }
	    else
	    {

	    }
	});
    else
	res.end ("new emails don't match, please try again"); // Make error landing page
});

module.exports.changeUsername= (function(req, res, database){
    if(req.body.newUsername == req.body.newUsername2)
	database.changeUsername(req.session.user.userid, req.body.newUsername, req.body.password1, function(success,error) {
	    if (error)
	    {
		console.log(error);
		res.end ("error"); // Error Landing page
	    }
	    else
	    {
		req.session.user.username = req.body.newUsername;
		console.log(req.session.user.username);
	    }
	});
    else
	res.end ("new usernames don't match, please try again"); // Make error landing page
});

module.exports.changePassword= (function(req, res, database){
    console.log(req.body.newPassword);
    if(req.body.newPassword == req.body.newPassword2)
	database.changePassword(req.session.user.userid, req.body.password1, req.body.newPassword , function(success, error){
	    if (error)
	    {
		console.log(error);
		res.end ("error"); // Error Landing page
	    }
	    else
	    {

	    }
	});
    else
	res.end ("new passwords don't match, please try again"); // Make error landing page
});

module.exports.changeInfo = (function(req, res, database) {
    var changed = false;
    if(req.body.newUsername != '') {
	changed = true;
	module.exports.changeUsername(req, res, database);
    }
    if (req.body.newEmail != '') {
	changed = true;
	module.exports.changeEmail(req, res, database);
    }
    if (req.body.newPassword != '') {
	changed = true;
	module.exports.changePassword(req, res, database);
    }
    if(changed) {
	res.redirect("/me");
    }
});
