/**
 * imagepage.js
 *   Additional Javascript for the single image page.
 */

// +------------------+----------------------------------------------
// | Final Page Setup |
// +------------------+

$(document).ready(function() {
  MIST.ui.startAnimation(document.getElementById('code').innerHTML,
     "", {}, document.getElementById("canvas"), function(txt) { });
});
