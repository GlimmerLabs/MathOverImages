/**
 * mistui-animation.js
 *   Some support for animating/rendering images in MIST.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

// try { MIST: } catch (err) { MIST = {}; }
if (!MIST.ui) { MIST.ui = {}; }

// +--------------+--------------------------------------------------
// | Constructors |
// +--------------+

/**
 * Create a new animator *without* rendering the frame.
 */
MIST.ui.Animator = function(exp, params, context, canvas, log) {
  // Remember parameters
  this.exp = exp;
  this.params = params;
  this.context = context;
  this.canvas = canvas;
  this.log = log || (function(txt) {});

  // The number of frames per second.
  this.fps = 30;
   
  // Are we animating the image?
  this.on = true;
  
  // The increments used for variables.
  this.increments = [19,23,29,31,37,41,43,47,53,59,61,67,71].map(function (val) { return val/3000; });
  
   // When was the last time we drew a frame?  (Used primarily when we
   // need to re-render a particular frame.)
  this.time = { t:0, m:0 };
 
   // Set up the render width and height
  if (exp.indexOf('t.') >= 0) {
    this.renderWidth = 200;
    this.renderHeight = 200;
  }
  else {
    this.renderWidth = canvas.width;
    this.renderHeight = canvas.height;
  }

  // Parse the expression
  try {
    this.expParsed = MIST.parse(this.exp);
  }
  catch (err) {
    this.log(err);
    throw err;
  }
} // Constructor

// +---------+-------------------------------------------------------
// | Methods |
// +---------+

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
  if (paramInfo) {
    this.log(paramInfo);
  } // if (paramInfo)

  // Make the frame
  this.time = MIST.render(this.expParsed, this.context, this.canvas, 
      this.renderWidth, this.renderHeight);
} // frame

/**
 * Run the animation.
 */
MIST.ui.Animator.prototype.run = function() {
  var runner = function(animator) { 
    return function() { return animator.run(); }
   }; 

  // Build one frame
  this.frame();

  // And schedule the next frame
  if (this.on) {
    var animator = this;
    setTimeout(runner(this), 1000/this.fps);
  }
}; // run

/**
 * Change the fps of the animation.  (Defaults to 30 if unspecified.)
 */
MIST.ui.Animator.prototype.setFps = function(fps) {
  this.fps = fps || 30;
}; // setFps

/**
 * Set the resolution for rendering.
 */
MIST.ui.Animator.prototype.setResolution = function(width,height) {
  this.renderWidth = width;
  this.renderHeight = height;
}; // setResolution

/**
 * Stop the animation from running.
 */
MIST.ui.Animator.prototype.stop = function() {
  this.on = false;
}; // stop

/**
 * Start the animation running.
 */
MIST.ui.Animator.prototype.start = function()
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
  } // if (this.params != "")

  // Get the remaining info
  this.on = this.exp.indexOf("t.") > -1;       // HACK!
  this.run();
}; // start

