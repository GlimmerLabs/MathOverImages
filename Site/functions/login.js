/**
 * Login post
 */
function generateSessionToken(userid, callback) {
  callback(Math.random() + "" + Math.random() + "uid:" + userid);
}
function addSessionTokenForUser(userid, res, database) {
  generateSessionToken(userid, function(token) {
    database.setToken(userid, token, function(success, error) {
      if(success) {
        var oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth()+1);
        res.cookie("loginToken", token, {signed: true, expires: oneMonthFromNow});
      }
      res.redirect('back');
    });
  });
}
module.exports.cookieLogin = function(req, res, database) {
  var loginToken = req.signedCookies.loginToken;
  if(!req.session.user) {
    if(loginToken) {
      var userid = loginToken.split("uid:")[1];
      database.checkToken(userid, loginToken, function(setToken, error) {
        if(setToken) {
          database.getUser(userid, function(user, error) {
            if(!error) {
              req.session.loggedIn = true;
              req.session.user = user;
            }
            req.next();
          });
        }
        else {
          req.next();
        }
      });
    }
    else {
      req.next();
    }
  }
  else {
    req.next();
  }
}
module.exports.buildPage = function (req, res, database) {
  database.logIn(req.body.username, req.body.password, function(user, error){
    if(!error) {
      req.session.loggedIn = true;
      req.session.user = user;
      if(req.body.stayLoggedIn == "on") {
        addSessionTokenForUser(user.userid, res, database);
      }
      else {
        res.redirect('back');
      }
    }
    else {
      console.log(error);
      res.render("../public/views/login.jade", {
        flashMessage: "Invalid Credentials. Try again."
      }); //return error
    }
  });
};

module.exports.validatePage = function (req, res, database) {
  var token = database.sanitize(req.query.token);
  var userid= database.sanitize(req.query.id);
  database.verifyEmail(userid, token, function (success, error){
    if (error){
      console.log(error);
      res.render("../public/views/login.jade", {
        flashMessage: "There was an error verifying your email."
      });
    }
    else if (success){
      res.render("../public/views/login.jade", {
        flashMessage: "Email Confirmed! Log in to begin!"
      });
    }
    else {
      res.redirect("/login");
    }
  });
};
