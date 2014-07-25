/**
 * User's Profile page
 */
var login = require('./login.js');

module.exports.buildPage = function(req, res, database) {
    database.getIDforUsername(req.params.username, function(userid, error){
	if (error)
	    res.end (JSON.stringify(error)); // Error Landing page
	else
	    database.getUser(userid, function(userObject, error){
		if (userObject.featuredImage !== 0){
		    database.imageInfo(userObject.featuredImage, function(featuredImage, error){
			res.render('../public/views/profile.jade',{
			    loggedIn: req.session.loggedIn,
			    user: req.session.user,
			    viewing: userObject,
			    image: featuredImage,
			    viewingSelf: (req.session.user != null) && (req.session.user.username === req.params.username)
			});
		    });
		}
		else
		    res.render('../public/views/profile.jade', {
			loggedIn: req.session.loggedIn,
			user: req.session.user,
			viewing: userObject,
			viewingSelf: (req.session.user != null) && (req.session.user.username === req.params.username)

		    });
	    });
    });
};

module.exports.goToMyProfile = function(req, res, database) {
    if (req.session.loggedIn) {
	database.getIDforUsername(req.session.user.username,function(userid, error){
	    if (error)
		res.end (JSON.stringify(error));
	    else
		database.getUser(userid, function(userObject, error) {
		    if (userObject.featuredImage !== 0){
			database.imageInfo(userObject.featuredImage, function(featuredImage, error){
			    res.render('../public/views/profile.jade', {
				loggedIn: req.session.loggedIn,
				user: req.session.user,
				viewing: userObject,
				image: featuredImage,
				viewingSelf: true
			    });
			});
		    }
		    else
			res.render('../public/views/profile.jade', {
			    loggedIn: req.session.loggedIn,
			    user: req.session.user,
			    viewing: userObject,
			    viewingSelf: true
			});
		});
	});
    }
    else {
	res.redirect("login");
    }
};

module.exports.changeAboutSection = function(req, res, database) {
    database.getIDforUsername(req.session.user.username, function(userid, error) {
	if(error)
	    res.end (JSON.stringify(error));
	else
	    database.changeAboutSection(req.session.user.userid, req.body.aboutSection, function(success, error) {
		if(!success)
		    res.end (JSON.stringify(error));
		else
		    res.redirect('/me');
	    });
    });
}
