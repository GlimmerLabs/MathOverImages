// app/routes.js
var framework = require("../functions/framework");
module.exports = function(app,passport,database) {
  /* ======================  HOME PAGE =======================*/
  app.get('/', function(req, res) {
      res.end(framework.anonymousHeader("Glimmer","index"));
  });

  /* ================= signup page ===============*/
  app.post('/signup', function(req,res){
    database.addUser (req.body.forename, req.body.surname, req.body.password, req.body.email, null, req.body.username, null, function(success, error) {
      if (success)
        res.redirect('/login');
      else {
        console.log(error);
        res.end (error);
      }

    });
  });


  app.get('/signup', function(req,res){
    res.sendfile('./views/signup.html');
  });

  /* ================= verify page ===============*/
  app.get('/verify', function(req,res){
    // TODO: VERIFY user
    res.redirect('/login');
  });





  /* ================= login page =============================*/

  app.post('/login', function(req,res){
    database.verifyPassword(req.body.username, req.body.password, function(loggedIn){
      if(loggedIn)
      {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        res.setHeader('Content-type', 'text/plain');
        res.end("Your username is " + req.session.username);
      }
      else
      {
        res.redirect('/login');
      }
    });
  });

  app.get('/login', function(req, res){
    if(req.session.loggedIn)
      res.redirect('/');
    else{
      res.setHeader('Content-type', 'text/HTML');
      res.sendfile('./public/login.html');
    }
  });

  /* ============== user's profile page =================== */
  app.get('/user/:username', function(req, res){
    res.setHeader('Content-type', 'text/HTML');
    res.end("You would have found " + req.params.username + "'s profile here.");
  });



  /* ============== log out =================== */
  app.get('/logout', function(req,res){
    req.session.loggedIn = false;
    req.session.username = null;
    res.redirect('/');
  });


  /* ============== save image script =================== */
  app.post('/saveImage/:filename', function(req,res){
    res.setHeader('Content-type', 'image/jpeg');
    res.setHeader('Content-disposition', 'attachment;filename="'+ req.params.filename + '.jpg"');
    res.end(Buffer(req.body.data,'base64'));
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



