/**
 * User's Settings page
 */
module.exports.buildPage = (function(req, res, database) {
    res.render('../public/views/accountSettings.jade',{
	loggedIn: req.session.loggedIn,
	user: req.session.user
    });
});

module.exports.changeInfo= (function(req, res, database){
    if(req.body.newPassword == req.body.repassword)
	database.changePassword(req.session.user.userid, req.body.oldpassword, req.body.newPassword , function(success, error){
	    if (error)
	    {
		console.log(error);
		res.end ("error"); // Error Landing page
	    }
	    else
	    {
		res.redirect('/login');
	    }
	});
    else
	res.end ("new passwords don't match, please try again"); // Make error landing page
});
