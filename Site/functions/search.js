/**
 * search.js
 * Functions related to the search page.
 */
module.exports.buildPage = (function(req, res, database) {
  database.omnisearch(req.query.searchQuery, function(results){
    res.render("search", {
      user: req.session.user,
      results: results
    });
  });
});
