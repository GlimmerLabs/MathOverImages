// app/routes.js
module.exports = function(app,passport,database) {
  // HOME PAGE

  app.get('/', function(req, res) {
    database.addUser("Halley","Freger", "abc", "test", null, "halley", "1994",function(response, error){
	console.log (error ? error : response);
	
    });
    res.end("done");
  });

  // LOGIN PAGE

    app.post('/login', function(req,res){
	console.log("Username: " + req.body.username,"Password: " + req.body.password);
	database.verifyPassword(req.body.username, req.body.password, function(loggedIn)
				{
				    console.log("loggedInState: " + loggedIn);
				    if(loggedIn)
				    {
					req.session.loggedIn = true;
					req.session.username = req.body.username;
					res.setHeader('Content-type', 'text/plain');
					res.end("Your username is "+req.session.username);
				    }
				    else
				    {
					res.setHeader('Content-type', 'text/plain');
					res.end("That is not a valid login");
				    }
				});
    });
    app.get('/login', function(req, res){
	res.setHeader('Content-type', 'text/HTML');
        res.end("<form action = '' method = 'post'><label for='username'>Username/Email: </label><input type='text' name = 'username'/><label for='password'>Password: </label><input type='password' name = 'password'/><label for='crossSession'><input input='checkbox' name='crossSession'><input type='submit' value='Submit'></form>");
    });
    app.get('/username', function(req, res){
	res.setHeader('Content-type', 'text/plain');
	res.end("Your username is "+req.session.username);
    });
  app.get('/logout', function(req,res){
    req.session.loggedIn = false;
    req.session.username = null;
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

  res.redirect('/')

}
