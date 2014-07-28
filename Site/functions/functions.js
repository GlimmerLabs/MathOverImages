/**
 * Functions for User's Function page
 */
module.exports.buildPage = (function(req, res, database) {
    database.getIDforUsername(req.params.username, function(userid,error){
	if (error)
	    res.end (JSON.stringify(error));
	else
	    database.getUser(userid, function(userObject,error){
		res.render("../public/views/functions.jade",{
		    loggedIn: req.session.loggedIn,
		    user: req.session.user,
		    viewing: userObject
		});
	    });
    });
});
