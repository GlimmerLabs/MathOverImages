/**
 * Functions related to the album content.
 */
module.exports.buildPage = function(req, res, database) {
database.albumContentsInfo(req.params.albumid, function(albumContents, error){
	    if(error)
		res.end(error)
	    else
		res.render('../public/views/albumContents.jade', {
		    loggedIn: req.session.loggedIn,
		    user: req.session.user,
		    albumContents: albumContents
		});
	});
};
