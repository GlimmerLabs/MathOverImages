/**
 * Functions related to the signup
 */
module.exports.buildPage = (function(req, res, database) {
  var error = "";
  if (!req.body.thirteenplus)
    error += "You must confirm you are above the age of thirteen.\n";
  if (req.body.password !== req.body.repassword)
    error += "Your passwords do not match.\n";

  if(!error)
    database.addUser (req.body.forename, req.body.surname, req.body.password, req.body.email, req.body.username, function(success, error) {
      if (success)
        res.redirect('/login');
      else
        res.render ("../public/views/signup.jade", {
          error: error,
          prior: req.body
        });
    });
  else
    res.render ("../public/views/signup.jade", {
      error: error,
      prior: req.body
    });
});
