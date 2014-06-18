/**
 * Functions related to the gallery.
 */
module.exports.buildPage = function(req, res, database) {
  res.render('../public/views/gallery.jade',{
    loggedIn: req.session.loggedIn,
    user: req.session.user,
    generateNarrative: (function() { return "Look.  Pretty pictures." })
  });
};

/**
 * Access random images in the gallery.
 */
/*
  Procedure: 
  gallery.getRandomImages(count, callback));
  Purpose: 
  Grabs random images from the image table and returns the information
  Parameters: 
  count, how many images to return
  callback, a function describing what to do with the results
  Produces: 
  rows
  Pre-conditions: 
  None
  Post-conditions: 
  None
*/
module.exports.getRandomImages= (function(count, callback) {

    database.query("SELECT images.*,users.username FROM images, users ORDER BY RAND() LIMIT " + count, function(rows, error){
	callback(rows, error);
    });

});

/**
 * Access random images in the gallery.
 */
/*
  Procedure: 
  gallery.getRecentImages(count, callback));
  Purpose: 
  Grabs the most recent images from the image table and returns the information
  Parameters: 
  count, how many images to return
  callback, a function describing what to do with the results
  Produces: 
  rows
  Pre-conditions: 
  None
  Post-conditions: 
  None
*/
module.exports.getRecentImages= (function(count, callback) {

    database.query("SELECT images.*, users.username FROM images, users ORDER BY modifiedAt DESC LIMIT " + count, function(rows, error){
	callback(rows, error);
    });

});
