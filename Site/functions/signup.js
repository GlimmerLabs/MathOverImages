/**
 * Functions related to the signup
 */
module.exports.buildPage = function(req, res, database) {
	if(req.body.password === req.body.repassword)
	    database.addUser (req.body.forename, req.body.surname, req.body.password, req.body.email, req.body.username, function(success, error) {
		if (success)
		    res.redirect('/login');
		else {
		    console.log(error);
		    res.end (error); //Make error landing page
		}
	    });
	else
	    res.end ("passwords don't match"); // Make error landing page
};
