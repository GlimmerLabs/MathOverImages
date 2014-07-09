/**
 * Functions related to the tutorial pages.
 */

// +--------------------+----------------------------------------------
// | Exported Functions |
// +--------------------+

/**
 * gui - Render a page in the GUI tutorial.
 */
module.exports.gui = function(req, res) {
  var pages = ['start', 'values'];
  tutorialPage(req, res, "/tutorial/gui/", req.params.page, pages);
} // gui

/**
 * intro - Render a page in the introductory tutorial.
 */
module.exports.intro =  function(req, res) {
  // The list of pages in the introduction, in order
  var pages = ['start', 'world', 'black', 'white', 'grey', 'x', 'y', 
      'xtimesy', 'next'];
  tutorialPage(req, res, "/tutorial/intro/", req.params.page, pages)
} // intro

// +-----------------+-------------------------------------------------
// | Local Utilities |
// +-----------------+

var tutorialPage = function(req, res, path, page, pages) {
  // The name of the page and its index in the array
  var page = req.params.page;
  var index = 0;
  // Compute the index and page name
  if (isNaN(page)) {
    index = pages.indexOf(page);
  }
  else {
    index = eval(page);
    page = pages[index];
  }

  // Set up the next and previous page links
  var prev = undefined;
  var next = undefined;
  if (index > 0) {
    prev = path + pages[index-1];
  }
  if (index < pages.length-1) {
    next = path + pages[index+1];
  }

  // Determine the local path to the view
  var view = '../public/views' + path + page + '.jade';
  console.log(view);

  // And render the page
  res.render(view, { next: next, prev: prev });
}; // tutorialPage

