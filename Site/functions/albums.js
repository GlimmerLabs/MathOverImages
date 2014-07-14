/**
 * Functions related to the album.
 */
var setLikes = function(imageArray, userID, database, callback) {
  var imageArrayClone = imageArray.slice(0, imageArray.length);
  var errorsArray = [];
  var likes = {counter: 0, likes: []};
  for(var image = 0; image < imageArrayClone.length; image++) {
    (function(currentIndex){
      database.hasLiked(userID, imageArrayClone[currentIndex].imageid, function(liked, error) {
        likes.likes[currentIndex] = liked;
        likes.counter++;
        if(likes.counter >= imageArray.length) {
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
module.exports.buildPage =  function(req, res, database) {
database.getIDforUsername(req.params.username,
	function(userid, error) {
	    if(error)
		res.end (error);
	    else
	database.albumsInfo(userid, function(albums, error){
	    if(error)
		res.end(error)
	    else
		res.render('../public/views/albums.jade', {
		    loggedIn: req.session.loggedIn,
		    user:req.session.user,
		    profileBeingViewed: req.params.username,
                    albums:albums
		});
	});
});
};

module.exports.allImagesinAlbum = function(req, res, database) {
  database.getIDforUsername(req.params.username,
    function(userid, error) {
      if(error)
        res.end (error);
      else
        database.getAllImagesforUser(userid, function(images, error){
          if(error)
            res.end(error)
          else
            setLikes(images, (req.session.user) ? req.session.user.userid : null, database, function(imageArray){
              res.render('../public/views/imagesCompilation.jade', {
                loggedIn: req.session.loggedIn,
                user:req.session.user,
                images:imageArray || images,
                viewing:req.params.username
              });
            });
        });
  });
};

module.exports.createAlbum= function(req, res, database) {
    database.createAlbum(req.session.user.userid, req.body.newAlbum, function (success, error){
	if(!success)
	    res.end(error);
	else
	    res.redirect('back');
    });
};
