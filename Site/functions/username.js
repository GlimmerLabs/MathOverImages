/**
 * User's Profile page
 */
var login = require('./login.js');

module.exports.buildPage = function(req, res, database) {
	database.getIDforUsername(req.params.username, function(userid, error){
	    if (error)
		res.end (error); // Error Landing page
	    else
		database.getUser(userid, function(userObject, error){
		    res.render('../public/views/profile.jade',{
			loggedIn: req.session.loggedIn,
			user: req.session.user,
			viewing: userObject,
			viewingSelf: (req.session.user.username === 
				     req.params.username)
			});
		});
	});
};

module.exports.goToMyProfile = function(req, res, database) {
    if (req.session.loggedIn) {
	database.getIDforUsername(req.session.user.username,
				  function(userid, error){
		if (error)
		    res.end (error);
		else
		    database.getUser(userid, function(userObject, error) {
			res.render('../public/views/profile.jade', {
			    loggedIn: req.session.loggedIn,
			    user: req.session.user,
			    viewing: userObject,
			    viewingSelf: true
			    });
			});
				  });
    } else {
	res.redirect("login");
    }
};
			    
