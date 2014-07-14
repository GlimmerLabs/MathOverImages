/**
 * gallery.js
 *   Utilities for galleries and albums.
 */

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

/*
   1. We assume that each image has a canvas named "canvas#" and
      an accompanying field (possibly hidden) named "code#".  We
      also assume that the numbers start at 0 (although I don't
      think that matters right now).
 */

// +-------+-----------------------------------------------------------
// | Setup |
// +-------+

/**
 * Get the user's context.
 */
// var context = getContext();
var context = {};

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

/**
 * The animators for all of the images.
 */
images = {};

// +-----------+-------------------------------------------------------
// | Functions |
// +-----------+

/**
 * Set up the ith canvas.  (No longer used, but included for posterity.)
 */
function setup(i) {
  setupCanvas(document.getElementById('canvas' + i));
} // setup(i)

/**
 * Set up an individual canvas.
 */
function setupCanvas(canvas) {
  if (!canvas) return;
  var canvasId = canvas.id;
  var i = parseInt(canvasId.replace("canvas",""));
  if (isNaN(i)) {
    return;
  }
  var codeId = "code" + i;
  var code = document.getElementById(codeId);

  // Make sure the element exists
  if (!code || !(code.value)) {
    return;
  } // if

  // Show the image
  images[canvasId] = new MIST.ui.Animator(code.value, [], context, canvas);
  images[canvasId].frame();    // Or .start() if you want all of the images animated

  // Add event handlers to the element for animating and stopping animation
  canvas.onmouseover = function(evt) {
    images[canvasId].start();
  } // canvas.mouseenter

  canvas.onmouseout = function(evt) {
    images[canvasId].stop();
  } // canvas.mouseleave

  // Add event handlers for the x and y coordinate
  // Forthcoming
} // setupCanvas

// +------------------+------------------------------------------------
// | Final Page Setup |
// +------------------+

$(document).ready(function() {
  var canvases = document.getElementsByTagName("canvas");
  for (var i = 0; i < canvases.length; i++) {
    setupCanvas(canvases[i]);
  }
});
