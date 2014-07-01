/**
 * Functions related to the album contents.
 */

module.exports.buildPage = function(req, res, database) {
filedatabase=database;
database.albumContentsInfo(req.params.albumid, function(albumContents, error){
	    if(error)
		res.end(error)
	    else
database.albumOwnerInfo(req.params.albumid, function(albumOwner, error){
		res.render('../public/views/albumContents.jade', {
		    loggedIn: req.session.loggedIn,
		    user: req.session.user,
		    viewing:req.params.userid,
		    albumContents: albumContents,
		    albumOwner:albumOwner
		});
		});
   });
};

