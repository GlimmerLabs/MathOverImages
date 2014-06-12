// app/routes.js
module.exports = function(app,passport,database) {
    /* ======================  HOME PAGE =======================*/
    app.get('/', function(req, res) {
	res.render('../public/views/index.jade',{
	    loggedIn: req.session.loggedIn,
	    user: req.session.user
	});
    });

    /* ================= signup page ===============*/
    app.post('/signup', function(req,res){
	if(req.body.password === req.body.repassword)
	    database.addUser (req.body.forename, req.body.surname, req.body.password, req.body.email, req.body.username, function(success, error) {
		if (success)
		    res.redirect('/login');
		else {
		    console.log(error);
		    res.end (error);
		}

	    });
	else
	    res.end ("passwords don't match");
    });
    app.get('/signup', function(req,res){
	res.render('../public/views/signup.jade');
    });

    /* ================= verify page ===============*/
    app.get('/verify', function(req,res){
	// TODO: VERIFY user
	res.redirect('/login');
    });

    /* function page */
    app.get('/function', function(req,res){
	res.render("../public/views/functions.jade",{
	    loggedIn: req.session.loggedIn,
	    user: req.session.user
	});
    });

    /* ================= login page =============================*/

    app.post('/login', function(req,res){
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
		res.redirect('/login');
	    }
	});
    });

    app.get('/login', function(req, res){
	if(req.session.loggedIn)
	    res.redirect('/');
	else{
	    res.render("../public/views/login.jade");
	}
    });

    /* ============== user's profile page =================== */
    app.get('/user/:username', function(req, res){
	database.getIDforUsername(req.params.username, function(userid, error){
	    if (error)
		res.end (error);
	    else 
		database.getUser(userid, function(userObject, error){
		    res.render('../public/views/profile.jade',{
			loggedIn: req.session.loggedIn,
			user: "Alexthemitchell", 
			viewing: userObject
			});
		});
	});
    });

    /* images page */
    app.get('/image/:imageid', function(req,res){
	database.imageInfo(req.params.imageid, function(image, error){
	    if(error)
		res.end(error)
	    else
		res.render('../public/views/singleimage.jade', {
		    loggedIn: req.session.loggedIn,
		    user: req.session.user,
		    image: image
		});
	});
    });

    /* ============== log out =================== */
    app.get('/logout', function(req,res){
	req.session.loggedIn = false;
	req.session.username = null;
	res.redirect('/');
    });


    /* image distribution */
    app.get('/samples/:image', function(req,res){
	res.sendfile('./public/images/samples/' + req.params.image);
    });
    app.get('/logos/:file', function(req,res){
	res.sendfile('./public/images/logos/' + req.params.file);
    });

    /* ============== css distribution =================== */
    app.get('/css/:page', function(req,res){
	res.sendfile('./public/css/' + req.params.page + '.css');
    });

    /* ============== client-side javascript distribution =================== */
    app.get('/js/:file', function(req,res){
	res.sendfile('./public/js/' + req.params.file + '.js');
    });


    /* ============== dynamic content distribution =================== */
    app.get('/api', function(req,res){
	res.end("api");
    });

};



