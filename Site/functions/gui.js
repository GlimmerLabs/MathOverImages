/**
 * GUI page
 */ 

module.exports.buildPage = (function(req, res, database) {
    res.render('../public/views/gui.jade',{
	loggedIn: req.session.loggedIn,
	user: req.session.user
    });
});