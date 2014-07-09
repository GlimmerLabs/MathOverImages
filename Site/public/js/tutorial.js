/**
 * tutorial.js
 *   Additional Javascript for tutorial pages
 */

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

/*
   1. Any canvas that we want animated on the page needs to have an
      id of the form "canvasNAME" and a class of "world" or "image".  
      There must also be a paragraph (optionally hidden) of the form 
      "codeNAME".  If the class is "world", we show the -1..1 labels.
      If the class is "image", we do not.
 */

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

/**
 * All the animators we've created.
 */
var animators = {};

/**
 * The most recent animator.
 */
var animator;

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Animate an image or world.
 */
var animate = function(canvas,coords) {
  var canvasId = canvas.id;
  var codeId = canvasId.replace("canvas","code");
  var code = document.getElementById(codeId);
  if (code) {
    animator = new MIST.ui.Animator(code.innerHTML, "", {}, canvas);
    if (coords) {
      animator.bounds(20,20,canvas.width-40,canvas.height-40);
      animator.coords();
    }
    animator.start();
    animators[canvasId] = animator;
  } // if (code)
}; // animate

// +------------------+------------------------------------------------
// | Final Page Setup |
// +------------------+

$(document).ready(function() {
  // Worlds show their coordinates
  var worlds = document.getElementsByClassName("world");
  for (var i = 0; i < worlds.length; i++) {
    animate(worlds[i], true);
  } // for

  // Images do not
  var images = document.getElementsByClassName("image");
  for (var i = 0; i < images.length; i++) {
    animate(images[i], false);
  } // for
});
