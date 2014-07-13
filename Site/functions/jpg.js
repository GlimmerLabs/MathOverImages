/**
 * jpg.js
 *   Making standalone jpg images.
 */
module.exports.buildPage = function(req, res, database, info) {
  database.imageInfo(req.params.imageid, function(image, error){
  if (error)
    res.end(error)
  else
    res.render('jpg.ejs', {
      width: info.width | 200 ,
      height: info.height | 200,
      image: image
    });
  });
}; // buildPage
