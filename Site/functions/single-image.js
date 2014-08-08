/**
 * Functions related to the images.
 */

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

var utils = require('./utils.js');

// +-----------+-------------------------------------------------------
// | Functions |
// +-----------+

// setFlags sets the flagged property of every comment in a given array
var setFlags = function(commentArray, userID, database, callback) {
  if(commentArray.length == 0)
    callback([]);
  else {
    var errorsArray = [];
    var commentArrayClone = commentArray.slice(0, commentArray.length);
    var flags = {counter: 0, flags: []};
    for(var i = 0; i < commentArrayClone.length; i++) {
      (function(currentIndex){
        database.hasFlaggedComment(userID, commentArrayClone[currentIndex].commentId, function(flagged, error) {
          flags.flags[currentIndex] = flagged;
          flags.counter++;
          if(flags.counter == commentArray.length) {
            for(var j=0;j<flags.flags.length;j++) {
              commentArrayClone[j].flagged = flags.flags[j];
            }
            callback(commentArrayClone, errorsArray);
          }
          errorsArray.push(error);
        });
      })(i);
    }
  }
}
module.exports.buildPage =  function(req, res, database) {
  database.imageInfo(req.params.imageid, function(image, error){
    if(error)
      res.end (JSON.stringify(error));
    else
      database.hasLiked((req.session.user) ? req.session.user.userid : null, image.imageid, function(liked, error) {
        if (error)
          res.end (JSON.stringify(error));
        else {
          database.commentInfo(image.imageid, function(comment, error){
            if (error)
              res.end (JSON.stringify(error));
            else if (req.session.user != null){
              database.albumsInfo(req.session.user.userid, function(albums, error){
                if(error)
                  res.end (JSON.stringify(error));
                else {
                  var userid = (req.session.user) ? req.session.user.userid : null;
                  setFlags(comment, userid, database, function(comments) {
                    res.render('single-image', {
                      comments: comments,
                      user: req.session.user,
                      image: image,
                      liked: liked,
                      albums: albums
                    }); // if user logged in, can comment
                  });
                } //
              });  // database.albumsInfo
            } // if there is a user
            else {
              var userid = (req.session.user) ? req.session.user.userid : null;
              setFlags(comment, userid, database, function(comments) {
                res.render('single-image', {
                  comments: comments,
                  user: req.session.user,
                  image: image,
                  liked: liked
                });
              });
            }
          });
        }
      });
  });
};

module.exports.addtoAlbum = function(req, res, database) {
  database.addtoAlbum(req.body.add, req.params.imageid, function(success, error) {
    if (!success) {
      utils.error(req,res,"Could not add to album",error.toString());
    } // if we failed
    else {
      res.redirect('back');
    } // if we succeeded
  });
} // addToAlbum

module.exports.saveComment= function(req, res, database) {
  database.saveComment(req.session.user.userid, req.params.imageid, req.body.newComment, function(success, error) {
    if(!success){
      console.log(error);
      res.end (JSON.stringify(error));
    }
    else
      res.redirect('back');
  });
}

module.exports.deleteImage= function(req, res, database) {
  database.deleteImage(req.session.user.userid, req.params.imageid, function(success, error) {
    if(!success)
      res.end (JSON.stringify(error));
      else
        res.redirect('/');
  });
}

module.exports.setProfilePicture= function(req, res, database) {
  database.setProfilePicture(req.session.user.userid, req.params.imageid, function(success, error) {
    if (!success)
      res.end (JSON.stringify(error));
      else
        res.redirect('/user/'+ req.session.user.username + '/');
  })
};
