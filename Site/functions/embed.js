/**
 * Standalone images.
 */
module.exports.buildPage = function(req, res, database) {
  database.imageInfo(req.params.imageid, function(image, error){
  if(error)
    res.end(error)
  else
    res.render('../public/views/embed.jade', {
      imageid: req.params.imageid,
      image: image
    });
  });
}; // buildPage
