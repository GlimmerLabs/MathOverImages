/**
 * Functions related to the album contents.
 */

module.exports.buildPage = function(req, res, database) {
filedatabase=database;
database.getIDforUsername(req.params.username,
	function(userid, error) {
	    if(error)
		res.end (error);
	    else
database.albumContentsInfo(userid, req.params.albumid, function(albumContents, error){
    if(error)
	res.end(error)
    else
	database.getAlbumContentsTitle(req.params.albumid, function(albumTitle, error){
	    res.render('../public/views/albumContents.jade', {
		loggedIn: req.session.loggedIn,
		user: req.session.user,
		albumContents: albumContents,
		albumTitle:albumTitle,
		albumOwner:req.params.username
	    });
	});
});
	});
};

module.exports.deleteAlbum=function(req, res, database) {
    database.deleteAlbum(req.session.user.userid, req.params.albumid, function (success, error){
	if(!success)
	    res.end(error)
	else
	    res.redirect('/user/' + req.params.username + '/albums');
    });
};

module.exports.deleteFromAlbums=function(req, res, database) {
    database.deleteFromAlbums(req.params.albumid, req.body.deleteImage, function (success, error){
	if(!success)
	    res.end(error);
	else
	    res.redirect('back');
    });
};
