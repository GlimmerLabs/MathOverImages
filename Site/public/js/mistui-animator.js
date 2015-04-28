/**
 * mistui-animator.js
 *   Some support for animating/rendering images in MIST.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

// try { MIST: } catch (err) { MIST = {}; }
if (!MIST.ui) { MIST.ui = {}; }

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

/**
 * The pattern to identify builtins (or lack thereof).  Used for the
 * simple validation strategy.
 */
var builtinsPattern = /(?:abs|avg|cos|mult|rgb|sign|neg|signz|sin|square|sum|wsum|null|mistif|t.s|t.m|t.h|t.d|m.x|m.y)|[0-9xy().,\-]/g
/**
 * Adding backwards compatibilty for request animation frame.
 */
window.requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || function(fun) {
  setTimeout(fun, 1000 / 30);
}
/**
 * The number of animators we've created.
 */
var _animatorCount_ = 0;

// +---------+---------------------------------------------------------
// | Helpers |
// +---------+

/**
 * Make the mouse handler with a particular animator.
 */
function makeMouseMoveHandler(animator) {
  return function(evt) {
    var rect = animator.canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left - animator.left;
    var y = evt.clientY - rect.top - animator.top;
    var scaledX = (x * 2.0/animator.width) - 1;
    var scaledY = (y * 2.0/animator.height) - 1;
    if ((scaledX < -1) || (scaledX > 1) || (scaledY < -1) || (scaledY > 1)) {
      return;
    }
    setMouse(scaledX,scaledY);
  }; // function
} // makeMouseMoveHandler

// +--------------+--------------------------------------------------
// | Constructors |
// +--------------+

/**
 * Create a new animator *without* rendering the frame.
 */
MIST.ui.Animator = function(exp, params, context, canvas, log) {
  // Generate an id
  this.id = ++_animatorCount_;

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
  this.time = { t:0, m:0, h:0, d:0 };

  this.simTime = new gifTime();

  // Set up the bounds (which also sets up the render width and height)
  this.bounds(0, 0, canvas.width, canvas.height);


  // Parse the expression
  try {
    this.exp = MIST.sanitize(builtinsPattern, this.exp);
    this.expParsed = MIST.parse(this.exp);
  }
  catch (err) {
    this.log(err);
    // throw err;
  }
} // Constructor

// +---------+-------------------------------------------------------
// | Methods |
// +---------+

/**
 * Set the bounds of the animator.
 */
MIST.ui.Animator.prototype.bounds = function(left,top,width,height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;

   // Set up the render width and height
  if (this.exp.indexOf('t.') >= 0) {
    this.renderWidth = 200;
    this.renderHeight = 200;
  }
  else {
    this.renderWidth = width;
    this.renderHeight = height;
  }
}; // bounds

/**
 * Show the coordinates
 */
MIST.ui.Animator.prototype.coords = function() {
  var context = this.canvas.getContext("2d");
  context.font="15px Helvetica";
  context.textAlign="end";
  context.textBaseline="middle";
  context.fillText("-1", this.left-5, this.top+(this.height/2));
  context.textAlign="start";
  context.textBaseline="middle";
  context.fillText("+1", this.left+this.width+5, this.top+(this.height/2));
  context.textAlign="center";
  context.textBaseline="bottom";
  context.fillText("-1", this.left+(this.width/2), this.top-5);
  context.textAlign="center";
  context.textBaseline="top";
  context.fillText("+1", this.left+(this.width/2), this.top+this.height+5);
}; // coords

/**
 *Increment simulated time
 */
incTime = function(t) {
t.ms += 33; 
 if (t.ms >= 1000) {
        t.ms = 0;
        t.s++;
  }
  if (t.s > 60) {
        t.s = 0;
        t.m++;
  }
  if (t.m > 60) {
        t.m = 0;
        t.h++
  }
  if (t.h > 24) {
        t.h = 0;
        t.d++;
  }
  if (t.d > 365) {
        t.d = 0;
        t.y++;
  }
 return t;
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
  if (paramInfo) {
    this.log(paramInfo);
  } // if (paramInfo)



  // Make the frame: if we are recording, we need to simulate time
  try {
    if ($("#recorder").html() == "gif") {

//      var tempTim = incTime(this.simTime);

      this.time = MIST.renderGIF(incTime(this.simTime), this.expParsed, this.context, this.canvas,
          this.renderWidth, this.renderHeight, this.left, this.top,
          this.width, this.height);

      console.log(encoder.addFrame(this.canvas.getContext('2d')));   
    }
    else {
      this.time = MIST.render(this.expParsed, this.context, this.canvas,
          this.renderWidth, this.renderHeight, this.left, this.top,
          this.width, this.height);
    }
  }  
  catch(err) {
    this.log(err);
  }   
} // frame

/**
 * Create a jpg and switch to that.
 */
MIST.ui.Animator.prototype.jpg = function() {
  var data = canvas.toDataURL("image/jpeg");
  //document.location = data;
  $("#test").html("hell goats");

 // $("#change").attr("content", "http://www.cs.grinnell.edu/~hansonse17/main/twit.png");
  //$("meta[property='og\\:image']").attr("content", "http://www.cs.grinnell.edu/~hansonse17/main/widescreenbackscodes.png");
} // MIST.ui.Animator.prototype.jpg

/**
 * Create a jpeg and put it in the body of the page.
 */
MIST.ui.Animator.prototype.jpgBody = function() {
  // Convert the canvas to an image.
  var data = canvas.toDataURL("image/jpeg");
  var img = document.createElement("img");
  img.src = data;
  // Remove the children
  while (document.body.children.length > 0) {
    document.body.removeChild(document.body.children[0]);
  } // while
  // And add the image
  document.body.appendChild(img);
}

/**
 * Run the animation.
 */
MIST.ui.Animator.prototype.run = function() {
  var runner = function(animator) {
    return function() { animator.run(); }
  };

  // Build one frame
  this.frame();

  
  // And schedule the next frame
  if (this.on) {
    var animator = this;
    // setTimeout(runner(this), 1000/this.fps);
    window.requestAnimationFrame(runner(this));
  }
}; // run

/**
 * Change the fps of the animation.  (Defaults to 30 if unspecified.)
 * DEPRECATED.  We now rely on the browser to set the animation rate.
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
  this.canvas.onmousemove = undefined;
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

  // Get the remaining info.  // Hack
  this.on = (this.exp.indexOf("t.") > -1) || (this.exp.indexOf("m.") > -1);

  // Set up a mouse listener for the canvas
  this.canvas.onmousemove = makeMouseMoveHandler(this);
  // And go
  this.run();
}; // start

