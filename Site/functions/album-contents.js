/**
 * albumContents.js
 *   Functions related to the album contents.
 */

// +---------------------+---------------------------------------------
// | Required Javascript |
// +---------------------+

var utils = require('./utils.js');

// +-----------+-------------------------------------------------------
// | Functions |
// +-----------+

var setLikes = function(imageArray, userID, callback) {
  if(imageArray.length == 0)
    callback([]);
  else {
    var imageArrayClone = imageArray.slice(0, imageArray.length);
    var errorsArray = [];
    var likes = {counter: 1, likes: []};
    for(var image = 0; image < imageArrayClone.length; image++) {
      (function(currentIndex){
        filedatabase.hasLiked(userID, imageArrayClone[currentIndex].imageid, function(liked, error) {
          likes.likes[currentIndex] = liked;
          if(likes.counter >= imageArray.length) {
            for(var i=0;i<likes.likes.length;i++) {
              imageArrayClone[i].liked = likes.likes[i];
            }
            callback(imageArrayClone, errorsArray);
          }
          likes.counter++;
          errorsArray.push(error);
        });
      })(image);
    }
  }
}
module.exports.buildPage = function(req, res, database) {
  filedatabase=database;
  database.getIDforUsername(req.params.username,
    function(userid, error) {
      if (error) {
        res.end("Error:" + error);
        return;
      }
      database.albumContentsInfo(userid, req.params.albumid,
           function(albumContents, error) {
        if (error) {
          res.end(error)
          return;
        }
        setLikes(albumContents, (req.session.user) ? req.session.user.userid : null, function(images) {
          database.getAlbumInfo(req.params.albumid, function(albumInfo, error) {
            if (error) {
              utils.error(req,res,"Could not load album",error.toString());
              return;
            }
            res.render('album-contents', {
                user: req.session.user,
                album: {
                  contents: images,
                  title: albumInfo.name,
                  owner: req.params.username
                }
            });
          }); // database.getAlbumContentsTitle
        }); // setLikes
      }); // database.albumContentsInfo
  });
};

module.exports.deleteAlbum=function(req, res, database) {
    database.deleteAlbum(req.session.user.userid, req.params.albumid, function (success, error){
	if(!success)
	    res.end (JSON.stringify(error));
	else
	    res.redirect('/user/' + req.params.username + '/albums');
    });
};

module.exports.deleteFromAlbums=function(req, res, database) {
    database.deleteFromAlbums(req.params.albumid, req.body.deleteImage, function (success, error){
	if(!success)
	    res.end (JSON.stringify(error));
	else
	    res.redirect('back');
    });
};
