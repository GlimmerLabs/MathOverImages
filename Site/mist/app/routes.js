// app/routes.js
module.exports = function(app,passport) {

    // HOME PAGE

    app.get('/', function(req, res) {
	res.end("Home");
    });

    // LOGIN PAGE

    app.get('/login', function(req,res){
	
	res.end("Login");

    });

    app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
    });


    
};

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated())
	return next();

    res.redirect('/');

}
