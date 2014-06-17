// app/routes.js
var gallery = require("../functions/gallery.js");
var albums = require("../functions/albums.js");
var albumContents = require("../functions/albumContents.js");
var accountSettings =  require ("../functions/accountSettings.js");
var functions = require("../functions/functions.js");
var username = require("../functions/username.js");
var image = require("../functions/image.js");
var login = require("../functions/login.js");
var signup = require("../functions/signup.js");

module.exports = function(app,passport,database) {
    /* ======================  HOME PAGE =======================*/
    app.get('/', function(req, res) {
	res.render('../public/views/index.jade',{
	    loggedIn: req.session.loggedIn,
	    user: req.session.user
	});
    });

    /* create page */
    app.get('/create', function(req,res){

    });

    /* ================= signup page ===============*/
    app.get('/signup', function(req,res){
	res.render('../public/views/signup.jade');
    });

    app.post('/signup', function(req,res){
	signup.buildPage(req, res, database);
    });

    /* ================= verify page ===============*/
    app.get('/verify', function(req,res){
	// TODO: VERIFY user
	res.redirect('/login');
    });

    /* ================= login page =============================*/
    app.get('/login', function(req, res){
	if(req.session.loggedIn)
	    res.redirect('/');
	else{
	    res.render("../public/views/login.jade");
	}
    });

    app.post('/login', function(req,res){
	login.buildPage(req, res, database);
    });

    /* ============== log out =================== */
    app.get('/logout', function(req,res){
	req.session.loggedIn = false;
	req.session.username = null;
	res.redirect('/');
    });

 /* ============== user's profile page =================== */
    app.get('/user/:username', function(req, res){
	username.buildPage(req, res, database);
    });

    /* function page */
    app.get('/user/:username/functions', function(req,res){
	functions.buildPage(req, res, database);
    });

    /* gallery page */
    app.get('/gallery', function(req,res) {
      gallery.buildPage(req, res, database);
    });

    /* albums page */
    app.get('/albums/:userid', function(req,res){
	albums.buildPage(req, res, database);
    });

    /* image page */
    app.get('/image/:imageid', function(req,res){
	image.buildPage(req, res, database);
    });

 /* albumContents page */
    app.get('/albums/:albumid', function(req,res){
	albumContents.buildPage(req, res, database);
    });

    /* image distribution */
    app.get('/samples/:image', function(req,res){
	res.sendfile('./public/images/samples/' + req.params.image);
    });
    app.get('/logos/:file', function(req,res){
	res.sendfile('./public/images/logos/' + req.params.file);
    });

    app.get('/icons/:file', function(req,res){
	res.sendfile('./public/images/icons/' + req.params.file);
    });

    / *accountSettings */
    app.get('/accountSettings', function(req,res){
	accountSettings.buildPage(req, res, database);
    });
    app.post('/accountSettings', function(req,res){
	accountSettings.changeInfo(req, res, database);
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
    app.post('/api', function(req,res){
	if (req.body.funct === "checkAvailability"){
	    database.userExists(req.body.value, function(exists, error){
		res.end((!exists).toString());
	    });
	}
    });
};
