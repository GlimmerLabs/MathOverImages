/**
 * app/routes.js
 *   Information on mapping various URLs to functions or files.
 */

// +-------+---------------------------------------------------------
// | Notes |
// +-------+

/*
  Questions from SamR upon reformatting.

  1. Why are functions in /user/NAME/functions but albums are
     in /albums?

  2. What is /samples?

  3. Requires touch the filesystem.  Would it make more sense to
     do the requires only in the code that uses them?
 */

// +--------------------------------+--------------------------------
// | Application-Specific Libraries |
// +--------------------------------+
var index = require("../functions/index.js");
var gallery = require("../functions/gallery.js");
var albums = require("../functions/albums.js");
var albumContents = require("../functions/albumContents.js");
var accountSettings =  require ("../functions/accountSettings.js");
var functions = require("../functions/functions.js");
var username = require("../functions/username.js");
var image = require("../functions/image.js");
var login = require("../functions/login.js");
var signup = require("../functions/signup.js");
var api = require("../functions/api.js");

// +-----------+-----------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Send a file with an optional suffix.
 */
function sendFileWithSuffix(res,path,suffix) {
  res.sendfile(path, function(err) {
    if (err) {
      console.log("First response: " + err);
      res.sendfile(path + suffix, function(err) {
        console.log("Second response: " + err);
	if (err) {
          res.send(404,'');
	}
      });
    }
  });
}

// +---------+-------------------------------------------------------
// | Exports |
// +---------+

module.exports = function(app,passport,database) {

  // --------------------------------------------------
  // Path:  /
  //   HOME PAGE
  app.get('/', function(req, res) {
    index.buildRandomPage(req, res, database);
//    res.render('../public/views/index.jade',{
//      loggedIn: req.session.loggedIn,
//      user: req.session.user
//    });
  });

  // --------------------------------------------------
  // Path:  /about
  //   About MIST
  app.get('/about', function(req,res) {
    res.render('../public/views/about.jade', {
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path:  /accountSettings
  //   Account settings
  app.get('/accountSettings', function(req,res) {
    accountSettings.buildPage(req, res, database);
  });
  app.post('/accountSettings', function(req,res) {
    if(req.body.usernameSubmit != null) {
      accountSettings.changeUsername(req, res, database);
    } else if (req.body.passwordSubmit != null) {
      accountSettings.changePassword(req, res, database);
    } else {
      accountSettings.changeEmail(req, res, database);
    }
  });

  // --------------------------------------------------
  // Path:  /albums
  //   Albums page
  app.get('/albums', function(req,res) {
  albums.buildPage(req, res, database);
//res.redirect('/user/' + req.session.user.username + '/albums');
  });
  app.get('/albums/:albumid', function(req,res) {
    albumContents.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path:  /api
  //   Dynamic content distribution - return raw data through AJAX
  app.post('/api', function(req,res) { api.run(req.body, req, res); });
  app.get('/api', function(req,res) { api.run(req.query, req, res); });

  // --------------------------------------------------
  // Path:  /create
  //   Page for creating (something)
  /* create page */
  app.get('/create', function(req,res) {
    res.render('../public/views/mist-gui.jade',{
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path:  /tutorial
  //   Page for creating (something)
  /* create page */

  app.get('/tutorial', function(req, res) {
    res.render('../public/views/tutorialHome.jade', {
    loggedIn: req.session.loggedIn,
    user: req.session.user
   });
});

  // --------------------------------------------------
  // Path:  /css
  //   Distribute CSS files
  app.get('/css/:file', function(req,res) {
    sendFileWithSuffix(res, './public/css/' + req.params.file, '.css');
  });

  // --------------------------------------------------
  // Path:  /default
  //   A default page, used when we haven't yet implemented the page
  app.get('/default', function(req, res) {
    res.render('../public/views/default.jade', {
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path:  /expert
  //   The expert UI
  app.get('/expert', function(req,res) {
    res.sendfile('./public/html/expert.html');
  });

  // --------------------------------------------------
  // Path:  /gallery
  //   Galleries, including the random gallery
  app.get('/gallery', function(req,res) {
    res.redirect('/gallery/random');
  });

  app.get('/gallery/random', function(req, res) {
    gallery.buildRandomPage(req, res, database);
  });

  app.get('/gallery/recent', function(req, res) {
    res.redirect('/gallery/recent/1');
  });

  app.get('/gallery/recent/:pageNumber', function(req, res) {
    gallery.buildRecentsPage(req, res, database);
  });

  app.get('/gallery/toprated', function(req, res) {
    res.redirect('/gallery/toprated/1');
  });

  app.get('/gallery/toprated/:pageNumber', function(req, res) {
    gallery.buildTopRatedPage(req, res, database);
  });

  // --------------------------------------------------
  // Path:  /icons
  //   Various icons
  app.get('/icons/:file', function(req,res) {
    res.sendfile('./public/images/icons/' + req.params.file);
  });

  // --------------------------------------------------
  // Path:  /image
  //   Image page
  app.get('/image/:imageid', function(req,res) {
    image.buildPage(req, res, database);
  });

  app.post('/image/:imageid', function(req,res) {
    if(req.body.commentSubmit != null) {
      image.saveComment(req, res, database);
    };
  });
  // --------------------------------------------------
  // Path:  /js
  //   Distribute client-side Javascript files
  app.get('/js/:file', function(req,res) {
    sendFileWithSuffix(res, './public/js/' + req.params.file, '.js');
  });

  // --------------------------------------------------
  // Path:  /login
  //   Login page
  app.get('/login', function(req, res) {
    if (req.session.loggedIn)
      res.redirect('/');
    else {
      res.render("../public/views/login.jade");
    }
  });

  app.post('/login', function(req,res) {
    login.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path:  /logos
  //   Various logos
  app.get('/logos/:file', function(req,res) {
    res.sendfile('./public/images/logos/' + req.params.file);
  });

  // --------------------------------------------------
  // Path:  /logout
  //   Logout page
  app.get('/logout', function(req,res) {
    req.session.loggedIn = false;
    req.session.user = null;
    res.redirect('/');
  });

  // --------------------------------------------------
  // Path:  /me
  //   User profile page, current user
  app.get('/me', function(req, res) {
    username.goToMyProfile(req, res, database);
  });

  app.post('/me', function(req,res) {
    if(req.body.aboutSubmit != null) {
      username.changeAboutSection(req, res, database);
    }
  });

  // --------------------------------------------------
  // Path:  /sample
  //   Sample images (?)
  app.get('/samples/:image', function(req,res) {
    res.sendfile('./public/images/samples/' + req.params.image);
  });

  // --------------------------------------------------
  // Path:  /signup
  //   Signup page
  app.get('/signup', function(req,res) {
    res.render('../public/views/signup.jade');
  });

  app.post('/signup', function(req,res) {
    signup.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path:  /user
  //   User profile pages
  app.get('/user/:username', function(req, res) {
    username.buildPage(req, res, database);
  });

  app.post('/user/:username', function(req,res) {
  if ((req.session.user != null) &&
    (req.session.user.username === req.params.username)) {
    if(req.body.aboutSubmit != null) {
      username.changeAboutSection(req, res, database);
    }}
  });

  // --------------------------------------------------
  // Path:  /user/*/albums
  //    User albums page
  app.get('/user/:username/albums', function(req,res) {
    albums.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path:  /user/*/functions
  //    User functions page
  app.get('/user/:username/functions', function(req,res) {
    functions.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path:  /verify
  //   Page for verifying users (not implemented)
  app.get('/verify', function(req,res) {
    // TODO: VERIFY user
    res.redirect('/login');
  });
};
