/**
 * Functions related to the index's gallery.
 */
var filedatabase;
module.exports.buildPage = (function(req, res, database) {
  filedatabase=database;
  module.exports.getRandomImages (1, function(images, error){
    database.hasLiked((req.session.user) ? req.session.user.userid : null, images.imageid, function(liked, error) {
      if(error)
        res.redirect("/");
      else {
        res.render('404',{
          loggedIn: req.session.loggedIn,
          user: req.session.user,
          image: images[0],
          liked: liked
        });
      }
    });
  });
});
/*
  Procedure:
  index.getRandomImages(count, callback));
  Purpose:
  Grabs random images from the image table and returns the information
  Parameters:
  count, how many images to return
  callback, a function describing what to do with the results
  Produces:
  images, an array of image objects
  error, if there is one.
  Pre-conditions:
  None
  Post-conditions:
  None
*/
module.exports.getRandomImages= (function(count, callback) {
  filedatabase.query("SELECT images.*, users.username FROM images NATURAL JOIN users ORDER BY RAND() LIMIT " + count + ";", function(rows, error){
    callback(rows, error);
  });
});
