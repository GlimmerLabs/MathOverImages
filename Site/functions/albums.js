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
		    albums: albums
		});
	});
}
)}
