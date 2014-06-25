/**
 * imagepage.js
 *   Additional Javascript for the single image page.
 */

// +------+----------------------------------------------------------
// | Todo |
// +------+

// Find a way to get the context.

// +------------------+----------------------------------------------
// | Final Page Setup |
// +------------------+

var animator;

$(document).ready(function() {
  animator = new MIST.ui.Animator(document.getElementById('code').innerHTML,
    "", {}, document.getElementById("canvas"));
  animator.start();
});
