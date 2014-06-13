/**
 * Functions related to the images.
 */
module.exports.buildPage =  function(req, res, database) {
	database.imageInfo(req.params.imageid, function(image, error){
	    if(error)
		res.end(error)
	    else
		res.render('../public/views/singleimage.jade', {
		    loggedIn: req.session.loggedIn,
		    user: req.session.user,
		    image: image
		});
	});
};
