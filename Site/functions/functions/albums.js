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
/*		var albumId=new Array(albums.length);
		var i= 0;
		for (i= 0; i< albums.length; i++){
		    albumId[i]=albums[i];
		}
module.exports.query("SELECT images.imageid, images.title, images.code, users.username, images.rating, albums.name from images, albumContents, albums, users WHERE albumContents.albumid= '" + albumid + "' and albums.albumid= '" + albumid + "' and albums.userid = users.userid and albumContents.imageid = images.imageid ORDER BY albumContents.dateAdded ASC;"
	    database.firstImageofAlbum(albumId[0], function(imageShown, error){
*/		res.render('../public/views/albums.jade', {
		    loggedIn: req.session.loggedIn,
		    user:req.session.user,
		    profileBeingViewed: req.params.username,
    albums:albums
//		    imageShown:imageShown
		});
	});
});
//});
};

