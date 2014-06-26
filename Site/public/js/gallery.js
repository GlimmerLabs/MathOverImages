/**
 * gallery.js
 *   Utilities for galleries and albums.
 */

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

/*
   1. We assume that each image has a canvas named "canvas#" and an
      accompanying hidden field named "code#".  We also assume that
      the numbers start at 0 (although I don't think that matters
      right now).
 */

// +-----------+-------------------------------------------------------
// | Constants |
// +-----------+

/**
 * The maximum number of images on a page.
 */
var MAX_IMAGES = 16;

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
images = [];

// +-----------+-------------------------------------------------------
// | Functions |
// +-----------+

/**
 * Set up the ith canvas.
 */
function setup(i) {
  var canvas = document.getElementById('canvas' + i);
  var code = document.getElementById('code' + i);

  // Make sure the element exists
  if (!canvas || !code ||!(code.value)) {
    return;
  } // if

  // Show the image
  images[i] = new MIST.ui.Animator(code.value, [], context, canvas);
  images[i].start();    // Maybe .frame()

  // Add event handlers to the element for animating and stopping animation
  canvas.onmouseover = function(evt) {
    images[i].start();
  } // canvas.mouseenter

  canvas.onmouseout = function(evt) {
    images[i].stop();
  } // canvas.mouseleave

  // Add event handlers for the x and y coordinate
  // Forthcoming
} // setup

// +------------------+------------------------------------------------
// | Final Page Setup |
// +------------------+

$(document).ready(function() {
  // Do the initial rendering
  for (var i = 0; i < MAX_IMAGES; i++) {
    setup(i);
  } // for
});
