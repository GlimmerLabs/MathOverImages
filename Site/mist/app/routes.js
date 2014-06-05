// app/routes.js
module.exports = function(app,passport,database) {

    // HOME PAGE

    app.get('/', function(req, res) {
	database.addUser("Halley","Freger", "Dawg", "hf@google.com", null, "halley", "1994",function(response){
	console.log(response)
	});
	res.end("done");
    });

    // LOGIN PAGE

    app.get('/login', function(req,res){
	
	res.end("Login");

    });

    app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
    });
    
    app.get('/saveImage', function(req,res){
	res.setHeader('Content-type', 'text/plain');
	res.setHeader('Content-disposition', 'attachment;filename="filename.txt"');
	res.end('This is my file.\nIs it not cool?');
    });

    
};

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated())
	return next();

    res.redirect('/');

}
