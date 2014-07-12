/**
 * app/routes.js
 *   Information on mapping various URLs to functions or files.
 */

// +-----------------------------+-------------------------------------
// | Additional Javascript Files |
// +-----------------------------+

var accountSettings =  require ("../functions/accountSettings.js");
var albumContents = require("../functions/albumContents.js");
var albums = require("../functions/albums.js");
var api = require("../functions/api.js");
var embed = require("../functions/embed.js");
var fourohfour = require("../functions/404.js");
var functions = require("../functions/functions.js");
var gallery = require("../functions/gallery.js");
var image = require("../functions/image.js");
var index = require("../functions/index.js");
var login = require("../functions/login.js");
var signup = require("../functions/signup.js");
var tutorial = require("../functions/tutorial.js");
var username = require("../functions/username.js");

// +-------+---------------------------------------------------------
// | Notes |
// +-------+

/*
  Questions from SamR upon reformatting.

  1. Why are functions in /user/NAME/functions but albums are
     in /albums?

  2. What is /samples?
     TODO: Remove all .jpg's from site and convert to live images, then delete /samples route

 */

// +-----------+-----------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Send a file with an optional suffix.
 */
function sendFileWithSuffix(res,path,suffix) {
  res.sendfile(path, function(err) {
    if (err) {
      // console.log("First response: " + err);
      res.sendfile(path + suffix, function(err) {
        // console.log("Second response: " + err);
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
  // Path: /
  //   HOME PAGE
  app.get('/', function(req, res) {
    index.buildRandomPage(req, res, database);
    //    res.render('../public/views/index.jade',{
    //      loggedIn: req.session.loggedIn,
    //      user: req.session.user
    //    });
  });

  // --------------------------------------------------
  // Path: /about
  //   About MIST
  app.get('/about', function(req,res) {
    res.render('../public/views/about.jade', {
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /accountSettings
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
  // Path: /albums
  //   Albums page
  app.get('/user/:username/albums', function(req,res) {
    albums.buildPage(req, res, database);
  });
  app.get('/user/:username/albums/:albumid', function(req,res) {
    albumContents.buildPage(req, res, database);
  });

  app.post('/user/:username/albums/:albumid', function(req,res) {
    if (req.body.deleteImage != null) {
      albumContents.deleteFromAlbums(req, res, database);
    }
    else if (req.body.deleteWholeAlbum != null) {
      albumContents.deleteAlbum(req, res, database);
    };
  });

  app.post('/user/:username/albums', function (req,res) {
    if(req.body.newAlbumSubmit != null) {
      albums.createAlbum(req, res, database);
    };
  });

  // --------------------------------------------------
  // Path: /api
  //   Dynamic content distribution - return raw data through AJAX
  app.post('/api', function(req,res) { api.run(req.body, req, res); });
  app.get('/api', function(req,res) { api.run(req.query, req, res); });

  // --------------------------------------------------
  // Path: /create
  //   Page for creating (something)
  app.get('/create', function(req,res) {
    res.render('../public/views/mist-gui.jade',{
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /css
  //   Distribute CSS files
  app.get('/css/:file', function(req,res) {
    sendFileWithSuffix(res, './public/css/' + req.params.file, '.css');
  });

  // --------------------------------------------------
  // Path: /sitemap.xml
  //   The site map
  app.get('/sitemap.xml', function(req,res) {
    res.sendfile('./sitemap.xml');
  });

  // --------------------------------------------------
  // Path: /embed
  //   embedable or standalone images
  app.get('/embed/:imageid', function(req,res) {
    embed.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path: /expert
  //   The expert UI
  app.get('/expert', function(req,res) {
    res.sendfile('./public/html/expert.html');
  });

  // --------------------------------------------------
  // Path: /gallery
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
  // Path: /help
  //   The list of available hlep pages
  app.get('/help', function(req,res) {
    res.render('../public/views/help.jade',{
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /icons
  //   Various icons
  app.get('/icons/:file', function(req,res) {
    res.sendfile('./public/images/icons/' + req.params.file);
  });

  // --------------------------------------------------
  // Path: /image
  //   Image page
  app.get('/image/:imageid', function(req,res) {
    image.buildPage(req, res, database);
  });

  app.get('/user/:username/images', function(req,res) {
    albums.allImagesinAlbum(req, res, database);
  });

  app.post('/image/:imageid', function(req,res) {
    if(req.body.commentSubmit != null) {
      image.saveComment(req, res, database);
    }
    else if(req.body.delete != null) {
      image.deleteImage(req, res, database);
    }
    else if (req.body.add != null){
      image.addtoAlbum(req, res, database);
    }
    else if (req.body.profile != null){
      image.setProfilePicture(req, res, database);
    };
  });

  // --------------------------------------------------
  // Path: /images/tutorial
  //   Tutorial Screenshots
  app.get('/images/tutorial/:file', function(req,res) {
    res.sendfile('./public/images/tutorial/' + req.params.file);
  });

  // --------------------------------------------------
  // Path: /js
  //   Distribute client-side Javascript files
  app.get('/js/:file', function(req,res) {
    sendFileWithSuffix(res, './public/js/' + req.params.file, '.js');
  });

  // --------------------------------------------------
  // Path: /login
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
  // Path: /logos
  //   Various logos
  app.get('/logos/:file', function(req,res) {
    res.sendfile('./public/images/logos/' + req.params.file);
  });

  // --------------------------------------------------
  // Path: /logout
  //   Logout page
  app.get('/logout', function(req,res) {
    req.session.loggedIn = false;
    req.session.user = null;
    res.redirect('back');
  });

  // --------------------------------------------------
  // Path: /me
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
  // Path: /tutorial
  //   Various tutorials.

  app.get('/tutorial/gui', function(req, res) {
    res.redirect('/tutorial/gui/start');
  });
  app.get('/tutorial/gui/', function(req, res) {
    res.redirect('/tutorial/gui/start');
  });
  app.get('/tutorial/gui/:page', function(req, res) {
    tutorial.gui(req, res);
  });

  app.get('/tutorial/intro', function(req, res) {
    res.redirect('/tutorial/intro/start');
  });

  app.get('/tutorial/intro/', function(req, res) {
    res.redirect('/tutorial/intro/00');
  });

  app.get('/tutorial/intro/:page', function(req, res) {
    tutorial.intro(req,res);
  });


  // --------------------------------------------------
  // Path: /user
  //   User profile pages
  app.get('/user/:username', function(req, res) {
    username.buildPage(req, res, database);
  });

  app.post('/user/:username', function(req,res) {
    if ((req.session.user != null) &&
        (req.session.user.username === req.params.username)) {
      if(req.body.aboutSubmit != null) {
        username.changeAboutSection(req, res);
      }}
  });

  // --------------------------------------------------
  // Path: /sample
  //   Sample images (?)
  app.get('/samples/:image', function(req,res) {
    res.sendfile('./public/images/samples/' + req.params.image);
  });

  // --------------------------------------------------
  // Path: /signup
  //   Signup page
  app.get('/signup', function(req,res) {
    res.render('../public/views/signup.jade', {
      prior:{}
    });
  });

  app.post('/signup', function(req,res) {
    signup.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path: /user
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
  // Path: /user/*/albums
  //    User albums page
  app.get('/user/:username/albums', function(req,res) {
    albums.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path: /user/*/functions
  //    User functions page
  app.get('/user/:username/functions', function(req,res) {
    functions.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path: /verify
  //   Page for verifying users (not implemented)
  app.get('/verify', function(req,res) {
    // TODO: VERIFY user
    res.redirect('/login');
  });

  app.get('/badges', function(req,res) {
    res.render("../public/views/soon.jade", {
      loggedIn:req.session.loggedIn,
      user: req.session.user
    });
  });

  app.get('/challenges', function(req,res) {
    res.render("../public/views/soon.jade", {
      loggedIn:req.session.loggedIn,
      user: req.session.user
    });
  });

  app.get('/challenges2', function(req,res) {
    res.render("../public/views/challenges.jade", {
      loggedIn:req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /video
  //   Page for creating (something)
  app.get('/video/:name', function(req,res) {
    res.render('../public/views/video/' + req.params.name + '.jade', {
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /welcome
  //   About MIST
  app.get('/welcome', function(req,res) {
    res.render('../public/views/welcome.jade', {
      loggedIn: req.session.loggedIn,
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Default Route
  app.use(function(req, res, next){
    fourohfour.buildPage(req,res,database);
  });
};
