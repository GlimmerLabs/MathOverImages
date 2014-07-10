/**
 * Functions related to the album.
 */

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
		res.render('../public/views/imagesCompilation.jade', {
		    loggedIn: req.session.loggedIn,
		    user:req.session.user,
		    images:images,
		    viewing:req.params.username
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
