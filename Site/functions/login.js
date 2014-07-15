/**
 * Login post
 */
var bcrypt = require('bcrypt-nodejs'); // import bcypt for generating sessionTokens
function generateSessionToken(userid, callback) {
  callback(bcrypt(Math.random() + "" + Math.random() + "" + userid));
}
module.exports.buildPage = function (req, res, database) {
  database.logIn(req.body.username, req.body.password, function(user, error){
    if(!error) {
      req.session.loggedIn = true;
      req.session.user = user;
      console.log(user);
      res.redirect('back');
      if(req.body.stayLoggedIn == "on") {
        generateSessionToken(user.userid, function(token) {
          database.setToken(user.userid, token, function(success, error) {
            if(success) {
              var oneMonthFromNow = new Date();
              oneMonthFromNow.setMonth(oneMonthFromNow.getMonth()+1);
              res.cookie("loginToken", token, {signed: true, expires: oneMonthFromNow});
            }
          });
        });
      }
    }
    else {
      console.log(error);
      res.redirect('/login'); //return error
    }
  });
};
