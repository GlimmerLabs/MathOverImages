/**
* utils.js
*   Miscellaneous utility functions
*/

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

// +--------------------+--------------------------------------------
// | Exported Functions |
// +--------------------+

/**
 * Generate an error page.  error gives a short name, errortext the detailed info
 */
module.exports.error = function(req, res, error, errortext) {
  res.render('error.ejs', {
    user: req.session.user,
    error: error,
    errortext: errortext
  });
}; // error
