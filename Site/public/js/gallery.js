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

  // Show the image once (by starting and stopping animation)
  startAnimation(i);
  stopAnimation(i);

  // Add event handlers to the element for animating and stopping animation
  canvas.mouseenter = function(evt) {
    startAnimation(i);
  } // canvas.mouseenter

  canvas.mouseleave = function(evt) {
    stopAnimation(i);
  } // canvas.mouseleave

  // Add event handlers for the x and y coordinate
  // Forthcoming
} // setup

/**
 * Start animation on the ith canvas.
 */
function startAnimation(i) {
  var code = document.getElementById('code' + i).value;
  var canvas = document.getElementById('canvas' + i);
  MIST.ui.startAnimation(code, [], context, canvas, function() { });
} // startAnimation

/**
 * Stop animation on the ith canvas.
 */
function stopAnimation(i) {
  MIST.ui.stopAnimation();
} // stopAnimation

// +------------------+------------------------------------------------
// | Final Page Setup |
// +------------------+

$(document).ready(function() {
  // Do the initial rendering
  for (var i = 0; i < MAX_IMAGES; i++) {
    setup(i);
  } // for
});
