/**
 * Functions related to the gallery.
 */

/**
 * Set which images a user has liked on the current page
 */
/*
  Procedure:
  gallary.setLikes(imageArray, userID, callback)
  Purpose:
  find which images in imageArray are liked by the user with userID
  Parameters:
  imageArray, a set of images to look for in database
  userID, the current user or nil if not logged in
  callback, a function describing what to do with the results
  Produces:
  imageArrayClone, a clone of imageArray, with the "liked" field 
    for each image changed according to the current user
  errorsArray, a possible error from database for each image quaried
  Pre-conditions:
  None
  Post-conditions:
  None
*/
var setLikes = function(imageArray, userID, callback) {
  if(imageArray.length == 0)
    callback([]);
  else {
    var imageArrayClone = imageArray.slice(0, imageArray.length);
    var errorsArray = [];
    var likes = {counter: 0, likes: []};
    // for each image, check database to see if user has liked image
    // save true or false for each image in likes array
    // when all images checked, copy likes to the liked filed of each image
    // execute callback with modified imageArrayClone
    for(var image = 0; image < imageArrayClone.length; image++) {
      // use the image counter as var currentIndex
      (function(currentIndex){
        filedatabase.hasLiked(userID, imageArrayClone[currentIndex].imageid, function(liked, error) {
          likes.likes[currentIndex] = liked;
          likes.counter++;
          if(likes.counter == imageArray.length) {
            for(var i=0;i<likes.likes.length;i++) {
              imageArrayClone[i].liked = likes.likes[i];
            }
            callback(imageArrayClone, errorsArray);
          }
          errorsArray.push(error);
        });
      })(image);
    }
  }
}

var filedatabase;
module.exports.buildFeaturedPage = (function(req, res, database) {
  filedatabase=database;
  // there are 9 images on a page
  // might want to pull this out to a global variable
  module.exports.getFeaturedImages (9, function(images, error){
    if(error) {
      res.redirect("/404");
    }
    else {
      // userid is either logged in user or nil
      // add user like info to each image, then render page
      var userid = (req.session.user) ? req.session.user.userid : null;
      setLikes(images, userid, function(imageArray, nextPage, errorArray){
        res.render('gallery',{
            user: req.session.user,
            images: imageArray,
            nextPage:false,         // featured is one page long
            currentPage: 1,
            type: "featured"
          }
        );
      });
    }
  });
});

module.exports.buildRandomPage = (function(req, res, database) {
  filedatabase=database;
  module.exports.getRandomImages (9, function(images, error){
    if(error) {
      res.redirect("/404");
    }
    else {
      // userid is either logged in user or nil
      // add user like info to each image, then render page
      var userid = (req.session.user) ? req.session.user.userid : null;
      setLikes(images, userid, function(imageArray, errorArray){
        res.render('gallery',{
            user: req.session.user,
            images: imageArray,
            currentPage: req.params.pageNumber,  // multiple pages long
            type: "random"
          }
        );
      });
    }
  });
});

module.exports.buildRecentsPage = function(req, res, database) {
  filedatabase=database;
  module.exports.getRecentImages(9, req.params.pageNumber, function(images, nextPage,  error) {
    if(error) {
      res.redirect("/404");
    }
    else {
      // userid is either logged in user or nil
      // add user like info to each image, then render page
      var userid = (req.session.user) ? req.session.user.userid : null;
      setLikes(images, userid, function(imageArray, errorArray){
        res.render('gallery',{
            user: req.session.user,
            images: imageArray,
            nextPage: nextPage,
            currentPage: req.params.pageNumber,  // mulitple pages long
            type: "recent"
          }
        );
      });
    }
  });
};

/**
 * Access featured images in the gallery.
 */
/*
  Procedure:
  gallery.getFeaturedImages(count, callback));
  Purpose:
  Grabs random featured images from the image table and returns the information
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

/**
 * Access recent images in the gallery.
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
  images, an array of image objects
  error, if there is one.
  Pre-conditions:
  None
  Post-conditions:
  None
*/
module.exports.getRecentImages= (function(count, page, callback) {

  var start = (page-1)*count;
  filedatabase.query("SELECT images.*, users.username FROM images NATURAL JOIN users ORDER BY modifiedAt DESC LIMIT " + start +","+ (count+1) + ";", function(rows, error){
    if(rows == null) {
      callback(null, null, true);
    }
    else if(rows.length <= count){
      callback(rows.slice(0, count), false, error)
    }
    else{
      callback(rows.slice(0, count),true,  error);
    }
  });
});

module.exports.buildTopRatedPage = function(req, res, database) {
    filedatabase=database;
    module.exports.getTopRated(9, req.params.pageNumber, function(images, nextPage, error) {
        if(error) {
          res.redirect("/404");
        }
        else {
          var userid = (req.session.user) ? req.session.user.userid : null;
          setLikes(images, userid, function(imageArray, errorArray){
              res.render('gallery',{
                user: req.session.user,
                images: imageArray,
                currentPage: req.params.pageNumber,
                nextPage: nextPage,
                type: "toprated"
              });
          });
        }
    });
};

module.exports.getTopRated= (function(count, page, callback) {

    var start = (page-1)*count;
    filedatabase.query("SELECT images.*, users.username FROM images NATURAL JOIN users ORDER BY rating DESC LIMIT " + start +","+ (count+1) + ";", function(rows, error){
    if(rows == null) {
      callback(null, null, true);
    }
    else if(rows.length <= count){
      callback(rows.slice(0, count), false, error)
    }
    else{
      callback(rows.slice(0, count),true,  error);
    }
  });
});
