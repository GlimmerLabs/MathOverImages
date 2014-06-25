/**
 * mistui-animation.js
 *   Some support for animating/rendering images in MIST.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

// try { MIST: } catch (err) { MIST = {}; }
if (!MIST.ui) { MIST.ui = {}; }
// Declare constructor
MIST.ui.Animator = function(on, exp, params, context, canvas, log){
  // +-----------+-----------------------------------------------------
  // | Animation |
  // +-----------+
  
  /**
   * The number of frames per second.
   */
  this.fps = 30;
    
  /**
   * Are we animating our image?
   */
  this.on = on;
  
  /**
   * The increments we use when simulating parameters.
   */
  this.increments = [19,23,29,31,37,41,43,47,53,59,61,67,71].map(function (val) { return val/3000; });
  
  /**
   * When was the last time we drew a frame?  (Used primarily when we
   * need to re-render a particular frame.)
   */
  this.time = { t:0, m:0 };
 
  // Remember parameters
  this.exp = exp;
  this.params = params;
  this.context = context;
  this.canvas = canvas;
  this.log = log;
}
/**
 * Stop the animation from running.
 */
MIST.ui.Animator.prototype.stopAnimation = function() {
  this.on =false;
} // stopAnimation

/**
 * Start the animation running.
 */
MIST.ui.Animator.prototype.startAnimation = function()
{
  // Set up a hash for the parameters
  this.parameters = {};
  if (this.params != "") {
    var tmp = this.params.split(",");
    for (var i = 0; i < tmp.length; i++) {
      if (this.params[i] != "") {
        this.parameters[tmp[i]] = -1;
      } // if
    } // for
  } // if (

  // Get the remaining info
  try {
    this.expParsed = MIST.parse(this.exp);
    this.on = exp.indexOf("t.") > -1;       // HACK!
    this.context = this.context;
    this.canvas = this.canvas;
    this.log = this.log;
    this.frame();
  }
  catch (err) {
    log(err);
    throw err;
  }
} // startAnimation
// Function to change fps of animation(defaults to 30 if unspecified)
Mist.ui.Animator.prototype.setFps = function(fps){
  this.fps = fps || 30;
}
/**
 * Do one frame of the animation.
 */
MIST.ui.Animator.prototype.frame = function() {
  // Update the values of the parameters
  var paramInfo = "";
  var params = this.parameters;
  var i = 0;
  for (var p in params) {
    var newval = wrapsum(params[p], this.increments[i++]);
    params[p] = newval;
    this.context[p] = newval;
    paramInfo += p + ": " + newval + "\n";
  } // for
  var context = this.context;
  // Inform the user
  this.log(paramInfo);
  // Make the frame
  if (this.on) {
    this.time = MIST.render(this.expParsed, context,
        this.canvas, 200, 200);
  }
  else {
    this.time = MIST.render(this.expParsed, context,
        this.canvas);
  }
  // And schedule the next frame
  if (this.on) {
    setTimeout(this.frame, 1000/this.fps);
  }
} // MIST.ui.animator.frame()
