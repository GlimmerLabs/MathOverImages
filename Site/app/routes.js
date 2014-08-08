/**
 * app/routes.js
 *   Information on mapping various URLs to functions or files.
 */

// +-----------------------------+-------------------------------------
// | Additional Javascript Files |
// +-----------------------------+

var account-settings =  require ("../functions/account-settings.js");
var album-contents = require("../functions/album-contents.js");
var albums = require("../functions/albums.js");
var api = require("../functions/api.js");
var challenge = require("../functions/challenge.js");
var embed = require("../functions/embed.js");
var fourohfour = require("../functions/404.js");
var functions = require("../functions/functions.js");
var gallery = require("../functions/gallery.js");
var image = require("../functions/image.js");
var index = require("../functions/index.js");
var jpg = require("../functions/jpg.js");
var login = require("../functions/login.js");
var png = require("../functions/png.js");
var search= require("../functions/search.js");
var signup = require("../functions/signup.js");
var tutorial = require("../functions/tutorial.js");
var profile = require("../functions/profile.js");

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

module.exports = function(app,database) {
  // --------------------------------------------------
  // Path: all
  //   EVERY PAGE
  app.all('*', function(req, res) {
    login.cookieLogin(req, res, database);
  });
  // --------------------------------------------------
  // Path: /
  //   HOME PAGE
  app.get('/', function(req, res) {
    index.buildFeaturedPage(req, res, database);
  });

  // --------------------------------------------------
  // Path: /about
  //   About MIST
  app.get('/about', function(req,res) {
    res.render('about', {
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /account-settings
  //   Account settings
  app.get('/accountSettings', function(req,res) {
    account-settings.buildPage(req, res, database);
  });
  app.post('/accountSettings', function(req,res) {
    if(req.body.profileSubmit != null) {
      account-settings.changeUsername(req, res, database);
    } else if (req.body.passwordSubmit != null) {
      account-settings.changePassword(req, res, database);
    } else {
      account-settings.changeEmail(req, res, database);
    }
  });

  // --------------------------------------------------
  // Path: /albums
  //   Albums page
  app.get('/user/:username/albums', function(req,res) {
    albums.buildPage(req, res, database);
  });
  app.get('/user/:username/albums/:albumid', function(req,res) {
    album-contents.buildPage(req, res, database);
  });

  app.post('/user/:username/albums/:albumid', function(req,res) {
    if (req.body.deleteImage != null) {
      album-contents.deleteFromAlbums(req, res, database);
    }
    else if (req.body.deleteWholeAlbum != null) {
      album-contents.deleteAlbum(req, res, database);
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
  // Path: /challenge
  //   Challenges (create, add, edit, view, etc.)
  app.post('/challenges/add', function(req,res) {
    console.log("Trying to add");
    challenge.add(req, res, database, req.body);
  });
  app.get('/challenges/create', function(req,res) {
    challenge.create(req, res, database);
  });
  app.get('/challenges/edit/:id', function(req,res) {
    challenge.edit(req, res, database);
  });
  app.get('/challenges/view/:id', function(req,res) {
    challenge.view(req, res, database);
  });
  app.get('/challenges', function(req,res) {
    challenge.gallery(req, res, database, req.query);
  });

  // --------------------------------------------------
  // Path: /create
  //   Page for creating (something)
  app.get('/create', function(req,res) {
    res.render('create',{
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

  app.get('/gallery/featured', function(req, res) {
    gallery.buildFeaturedPage(req, res, database);
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
  // Path: /hack
  //   Sam's hack of the day
  app.get('/hack', function(req,res) {
    var rgb = function(r,g,b) {
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    var Canvas = require("canvas");
    var canvas = new Canvas(200,200);
    var ctx = canvas.getContext("2d");
    /*
    var region = ctx.createImageData(canvas.width, canvas.height);
    for (var i = 0; i < region.data.length; i += 4) {
      region.data[i+0] = 100;
      region.data[i+1] = 100;
      region.data[i+2] = 100;
      region.data[i+3] = 0;
    } // for
    ctx.putImageData(region, 0, 0);
 */
    for (var row = 0; row < canvas.width; row++) {
      for (var col = 0; col < canvas.height; col++) {
        ctx.fillStyle = rgb(row,0,255-col);;
        ctx.fillRect(col, row, 1, 1);
      } // for col
    } // for row
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(200,200);
    ctx.stroke();

    /*
    var stream = canvas.toDataURL("image/png");
    res.send(stream);
     */
    /*
    var stream = canvas.toDataURL("image/png");
    res.set('Content-Type','image/png');
    stream = stream.replace(/[^,]*,/,'');
    var tmp = base64_decode(stream);
    console.log(tmp);
     */
    var stream = canvas.createJPEGStream();
    res.set('Content-Type','image/png');
    stream.on('data', function(chunk) {
      console.log(chunk);
      res.send(chunk);
    });
    stream.on('end', function() {
      console.log("DONE");
    });
  });

  // --------------------------------------------------
  // Path: /help
  //   The list of available help pages
  app.get('/help', function(req,res) {
    res.render('help',{
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
  // Path: /images/gui-key
  //   Tutorial Screenshots
  app.get('/images/gui-key/:file', function(req,res) {
    res.sendfile('./public/images/gui-key/' + req.params.file);
  });

  // --------------------------------------------------
  // Path: /images/tutorial
  //   Tutorial Screenshots
  app.get('/images/tutorial/:file', function(req,res) {
    res.sendfile('./public/images/tutorial/' + req.params.file);
  });

  // --------------------------------------------------
  // Path: /jpg
  //   Create a jpg
  app.get('/jpg/:imageid', function(req,res) {
    jpg.buildPage(req, res, database, req.query);
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
    if (req.session.user)
      res.redirect('/');
    else {
      res.render("login", {
        user: req.session.user,
        flashMessage: "Welcome back to MIST! Enter your username and password to begin"
      });
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
    req.session.user = null;
    res.clearCookie("loginToken");
    res.redirect('back');
  });

  // --------------------------------------------------
  // Path: /me
  //   User profile page, current user
  app.get('/me', function(req, res) {
    profile.goToMyProfile(req, res, database);
  });

  app.post('/me', function(req,res) {
    if(req.body.aboutSubmit != null) {
      profile.changeAboutSection(req, res, database);
    }
  });

  // --------------------------------------------------
  // Path: /png
  //   Create a png
  app.get('/png/:imageid', function(req,res) {
    png.build(req, res, database, req.query);
  });

  app.get('/search', function(req, res) {
    search.buildPage(req, res, database);
  }); 

  // --------------------------------------------------
  // Path: /privacypolicy
  //   Privacy Policy
  app.get('/privacypolicy', function(req,res) {
    res.render('privacy-policy', {
      user: req.session.user
    });
  });


  // --------------------------------------------------
  // Path: /tutorial
  //   Various tutorials.

  app.get('/tutorial/animation', function(req, res) {
    res.redirect('/tutorial/animation/intro-to-animation');
  });
  app.get('/tutorial/animation/', function(req, res) {
    res.redirect('/tutorial/animation/00');
  });
  app.get('/tutorial/animation/:page', function(req, res) {
    tutorial.animation(req, res);
  });


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


  app.get('/tutorial/rgb', function(req, res) {
    res.redirect('/tutorial/rgb/intro-to-rgb');
  });

  app.get('/tutorial/rgb/', function(req, res) {
    res.redirect('/tutorial/rgb/00');
  });

  app.get('/tutorial/rgb/:page', function(req, res) {
    tutorial.rgb(req,res);
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
    res.render('signup', {
      error: null,
      prior:{},
      user: req.session.user
    });
  });

  app.post('/signup', function(req,res) {
    signup.buildPage(req, res, database);
  });

  // --------------------------------------------------
  // Path: /sitemap.xml
  //   The site map
  app.get('/sitemap.xml', function(req,res) {
    res.sendfile('./sitemap.xml');
  });

  // --------------------------------------------------
  // Path: /user
  //   User profile pages
  app.get('/user/:username', function(req, res) {
    profile.buildPage(req, res, database);
  });

  app.post('/user/:username', function(req,res) {

    if ((req.session.user != null) &&
        (req.session.user.username === req.params.username)) {
      if(req.body.aboutSubmit != null) {
        profile.changeAboutSection(req, res, database);
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
  //   Page for verifying users' email address
  app.get('/verify', function(req,res) {
    login.validatePage(req, res, database);
  });
   app.post('/verify', function(req,res) {
    res.redirect("/login");
  });

  app.get('/badges', function(req,res) {
    res.render("soon", {
      user: req.session.user
    });
  });



  // --------------------------------------------------
  // Path: /video
  //   Page for creating (something)
  app.get('/video/:name', function(req,res) {
    res.render('../public/views/video/' + req.params.name + '.jade', {
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /welcome
  //   About MIST
  app.get('/welcome', function(req,res) {
    res.render('welcome', {
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Default Route
  app.use(function(req, res, next){
    fourohfour.buildPage(req,res,database);
  });
};
