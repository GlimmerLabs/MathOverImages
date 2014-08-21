/**
 * Standalone images.
 */
module.exports.buildPage = function(req, res, database) {
  database.imageInfo(req.params.imageid, function(image, error){
  if(error)
    res.end (JSON.stringify(error));
  else
    res.render('embed', {
      image: image
    });
  });
}; // buildPage
