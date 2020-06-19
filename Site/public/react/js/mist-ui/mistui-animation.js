/**
 * mistui-animation.js
 *   Some support for animating/rendering images in MIST.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

// try { MIST: } catch (err) { MIST = {}; }
if (!MIST.ui) { MIST.ui = {}; }
MIST.ui.animator = {};

// +-----------+-----------------------------------------------------
// | Animation |
// +-----------+

/**
 * The number of frames per second.
 */
MIST.ui.animator.fps = 30;

/**
 * Are we animating our image?
 */
MIST.ui.animator.on = true;

/**
 * The increments we use when simulating parameters.
 */
MIST.ui.animator.increments = [19,23,29,31,37,41,43,47,53,59,61,67,71].map(function (val) { return val/3000; });

/**
 * When was the last time we drew a frame?  (Used primarily when we
 * need to re-render a particular frame.)
 */
MIST.ui.animator.time = { t:0, m:0 };

/**
 * Stop the animation from running.
 */
MIST.ui.stopAnimation = function() {
  MIST.ui.animator.on =false;
} // stopAnimation

/**
 * Start the animation running.
 */
MIST.ui.startAnimation = function(exp,params,context,canvas,log)
{
  // Set up a hash for the parameters
  MIST.ui.animator.params = {};
  if (params != "") {
    var tmp = params.split(",");
    for (var i = 0; i < tmp.length; i++) {
      if (params[i] != "") {
        MIST.ui.animator.params[tmp[i]] = -1;
      } // if
    } // for
  } // if (

  MIST.parse(exp);
  // Get the remaining info
  try {
    MIST.ui.animator.exp = MIST.parse(exp);
    MIST.ui.animator.on = exp.indexOf("t.") > -1;       // HACK!
    MIST.ui.animator.context = context;
    MIST.ui.animator.canvas = canvas;
    MIST.ui.animator.log = log;
    MIST.ui.animator.frame();
  }
  catch (err) {
    log(err);
    throw err;
  }
} // startAnimation

/**
 * Do one frame of the animation.
 */
MIST.ui.animator.frame = function() {
  // Update the values of the parameters
  var paramInfo = "";
  var params = MIST.ui.animator.params;
  var i = 0;
  for (var p in params) {
    var newval = wrapsum(params[p], MIST.ui.animator.increments[i++]);
    params[p] = newval;
    MIST.ui.animator.context[p] = newval;
    paramInfo += p + ": " + newval + "\n";
  } // for
  var context = MIST.ui.animator.context;
  // Inform the user
  MIST.ui.animator.log(paramInfo);
  // Make the frame
   


  if (MIST.ui.animator.on) {
    MIST.ui.animator.time = MIST.render(MIST.ui.animator.exp, context,
        MIST.ui.animator.canvas, 200, 200);   
  }
 else {
    MIST.ui.animator.time = MIST.render(MIST.ui.animator.exp, context,
        MIST.ui.animator.canvas);
  }
  // And schedule the next frame
  if (MIST.ui.animator.on) {
    setTimeout(MIST.ui.animator.frame, 1000/MIST.ui.animator.fps);
  }
} // MIST.ui.animator.frame()
