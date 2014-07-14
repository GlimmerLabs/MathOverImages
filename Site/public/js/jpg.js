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
  var canvas = document.getElementById("canvas");
  if (canvas.className == "fullscreen") {
    canvas.width = $(window).width() + 1;
    canvas.height = $(window).height() + 1;
    window.onresize = function(evt) {
      console.log("resizing");
      canvas.width = $(window).width();
      canvas.height = $(window).height();
      animator.width = canvas.width;
      animator.height = canvas.height;
    };
  }
  animator = new MIST.ui.Animator(document.getElementById('code').innerHTML,
    "", {}, canvas);
  animator.setResolution(canvas.width, canvas.height);
  animator.frame();
  animator.jpgBody();
});
