/**
 * Login post
 */
module.exports.buildPage = function (req, res, database) {
	database.logIn(req.body.username, req.body.password, function(user, error){
	    if(!error)
	    {
		req.session.loggedIn = true;
		req.session.user = user;
		res.redirect('back');
	    }
	    else
	    {
		console.log(error);
		res.redirect('/login'); //return error
	    }
	});
};
