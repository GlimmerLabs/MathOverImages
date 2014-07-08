/**
 * Functions related to the tutorial
 */

console.log("Loading tutorial library");

/**
 * intro - Render a page in the introductory tutorial.
 */
module.exports.intro =  function(req, res) {
  // The list of pages in the introduction, in order
  var pages = ['start', 'end'];
  // The name of the page and its index in the array
  var page = res.params.page;
  var index = 0;
  // Compute the index and page name
  if (isNan(page)) {
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
    prev = "/tutorial/intro/" + pages[index-1];
  }
  if (index < pages.length-1) {
    next = "/tutorial/intro/" + pages[index+1];
  }

  // Determine the local path to the view
  var view = '../public/views/tutorial-intro/' + page;

  // And render the page
  res.render(view, { next: next, prev: prev });
}; // intro

introPages = {};
