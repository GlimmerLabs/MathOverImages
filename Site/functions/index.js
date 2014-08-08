/**
 * Functions related to the index's gallery.
 */
var filedatabase;
module.exports.buildFeaturedPage = (function(req, res, database) {
  filedatabase=database;
  module.exports.getFeaturedImages (6, function(images, error){
    res.render('index',{
      user: req.session.user,
      images: images
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
module.exports.getFeaturedImages= (function(count, callback) {
  filedatabase.query("SELECT images.*, users.username FROM images NATURAL JOIN users WHERE featured=1 ORDER BY RAND() LIMIT " + count + ";", function(rows, error){
    callback(rows, error);
  });
});
