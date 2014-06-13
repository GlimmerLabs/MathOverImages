/**
 * Functions related to the gallery.
 */
module.exports.buildPage = function(req, res, database) {
  res.render('../public/views/gallery.jade',{
    loggedIn: req.session.loggedIn,
    user: req.session.user,
    generateNarrative: (function() { return "Look.  Pretty pictures." })
  });
};
