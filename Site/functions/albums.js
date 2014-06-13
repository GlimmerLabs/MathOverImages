/**
 * Functions related to the album.
 */
module.exports.buildPage =  function(req, res, database) {
	database.albumsInfo(req.params.userid, function(albums, error){
	    if(error)
		res.end(error)
	    else
		res.render('../public/views/albums.jade', {
		    loggedIn: req.session.loggedIn,
		    user: req.session.user,
		    albums: albums
		});
	});
};
