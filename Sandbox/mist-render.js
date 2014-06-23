/**
 * mist-render.js
 *   A library for rendering MIST functions.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MIST; } catch (err) { MIST = {}; }

// +-----------+-----------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Convert a value in the range [-1 .. 1] to a hue.
 */
function r2h(r) {
  return 180 + r*180;
}

/**
 * Convert a value in the range [-1 .. 1] to a saturation or value.
 */
function r2sv(r) {
  return .5 + r*.5;
}

/**
 * Converts hsv values to rgb values.
 */
function hsv2rgb(h, s, v) {
  var rgb = [];
  if (s === 0)
      rgb = [v, v, v];
  else {
    var c = v * s;
    var h2 = h / 60;
    var x = c*( 1 - Math.abs((h2 % 2) - 1));
    if (h2 >= 5) {
      rgb = [c, 0, x];
    }
    else if (h2 >= 4) {
      rgb = [x, 0, c];
    }
    else if (h2 >= 3) {
      rgb = [0, x, c];
    }
    else if (h2 >= 2) {
      rgb = [0, c, x];
    }
    else if (h2 >= 1) {
      rgb = [x, c, 0];
    }
    else {
      rgb = [c, x, 0];
    }
  } // if (s != 0)

  var m = v - c;
  rgb[0] = r2c (rgb[0] + m);
  rgb[1] = r2c (rgb[1] + m);
  rgb[2] = r2c (rgb[2] + m);
  return rgb;
}

/**
 * Convert a value in the range [-1 .. 1] to a component.
 */
function r2c(r)
{
  return 127.5 + r*127.5;
} // r2c

/**
 * Convert a component to a value in the range [-1 .. 1].
 */
function c2r(c)
{
  return (c/127.5) - 1.0;
} // c2r


// +-------------------+---------------------------------------------
// | Mouse Information |
// +-------------------+

/*
  Note: Rather than having mouse listeners here, we expect the GUI
  to keep us updated on where the mouse is and where it was last
  clicked.
 */

MIST.mouseX = 0;
MIST.mouseY = 0;
MIST.clickX = 0;
MIST.clickY = 0;

function setMouse(x, y)
{
  MIST.mouseX = x;
  MIST.mouseY = y;
} // setMouse

function setClick(x, y)
{
  MIST.clickX = x;
  MIST.clickY = y;
} // setClick

// +---------+-------------------------------------------------------
// | Objects |
// +---------+

/**
 * Simple representations of time using the range model (everything
 * is in the range [-1 .. 1]).
 */
function Time(sec,min)
{
  this.s = sec;
  this.m = min;
}  // Time(sec,min)

/**
 * Information on where the mouse is/was
 */
function Mouse(x, y, cx, cy)
{
  this.x = x;
  this.y = y;
  this.X = cx;
  this.Y = cy;
} // Mouse

// +-----------------------+-----------------------------------------
// | Interpreting MIST Code |
// +-----------------------+

/**
 * MISTbody2fun
 *   Given the body of something that uses "raw" MIST, return the
 *   corresponding function.  (Note that we will generally not
 *   use "raw" MIST, but it's helpful for testing.)
 */
function MISTbody2fun(body)
{
  return eval("(function (x,y,t,m) { return " + body + "})");
} // MISTbody2fun

/** 
 * Convert a MIST expression to something that returns an RGB
 * list.
 */
MIST.expToRGB = function(exp,context) {
  var type = MIST.expType(exp, context);
  var tmp = [];
   // Contexts as objects
  for (var c in context) {
    tmp.push("var " + c + " = " + context[c].toString());
  }
  var contextCode = tmp.join(";");

  // For RGB functions
  //   function(x,y,t,m,p) {
  //      var context0 = def0;
  //      ...
  //      return (exp).map(r2c);
  //   };
  if (type == MIST.TYPE.RGB) {
    var code = "(function(x,y,t,m,p) { " + contextCode + 
        "; return (" + exp.toString() + ").map(r2c); })";
    // console.log(code);
    return eval(code);
  }
  // For B&W functions
  //    function(x,y,t,m,p) {
  //      var context0 = def0;
  //      ...
  //      var _tmp_ = r2c(-exp);
  //      return [_tmp_, _tmp_, _tmp];
  else if (type == MIST.TYPE.NUMBER) {
    var code = "(function(x,y,t,m,p) { " + contextCode +
        "; var _tmp_ = r2c(-" + exp.toString() + 
        "); return [_tmp_, _tmp_, _tmp_]; })";
    // console.log(code);
    return eval(code);
  }
  else {
    throw "Can not handle expressions of type " + type;
  }
} // MIST.expToRGB

/*
  Some HSV notes for expToRGB
        h = r2h(cap(hfun(x,y,time,mouse)));
        s = r2sv(cap(sfun(x,y,time,mouse)));
        v = r2sv(cap(vfun(x,y,time,mouse)));

        var rgb = [];
        rgb = hsv2rgb(h, s, v);
 */

// +---------------------+-------------------------------------------
// | Simulated Renderers |
// +---------------------+

/**
 * Render an expression on the specified region of the canvas.
 * (If no region is specified, uses the whole canvas.)
 */
MIST.render = function(exp, context, canvas, rleft, rtop, rwidth, rheight) {
  // Get the time.
  var d = new Date();
  var t = {
    s: d.getMilliseconds()/500 - 1,
    m: (d.getSeconds()*1000 + d.getMilliseconds())/30000 - 1
  };
  // Use the core function
  MIST.renderAt(t, exp, context, canvas, rleft, rtop, rwidth, rheight);
  // Return the time (for use elsewhere)
  return t;
} // MIST.render

/**
 * Render an expression at a particular time.
 */
MIST.renderAt = function(t, exp, context, canvas, 
    rleft, rtop, rwidth, rheight) {
  // Make sure that we have bounds.
  if (!rleft) { rleft = 0; }
  if (!rtop) { rtop = 0; }
  if (!rwidth) { rwidth = canvas.width - rleft; }
  if (!rheight) { rheight = canvas.height - rtop; }

  // Set up how much we change x and y each time.
  var deltaX = 2.0/rwidth;
  var deltaY = 2.0/rheight;

  // Get the image data
  var canvasContext = canvas.getContext("2d");
  var region = canvasContext.createImageData(rwidth,rheight);

  // Set up the mouse (we don't want it changing while rendering).
  var m = {
    x: MIST.mouseX,
    y: MIST.mouseY,
    X: MIST.clickX,
    Y: MIST.clickY
  };

  // Build the function
  var fun = MIST.expToRGB(exp, context);

  // Set up our main variables
  var x = -1;
  var y = -1 - deltaY;

  // Loop through all of the pixels
  for (var i = 0; i < region.data.length; i+= 4)
    {
      // When we reach the end of the row, move on to the next row
      if ((i % (4*rwidth)) == 0)
        { 
          x = -1;
          y += deltaY;
        } // if (i % (4*rwidth)) == 0

      // Evaluate the function
      var rgb = fun(x,y,t,m);

      // Exploration
      // if (i < 4*rwidth) { console.log("i",i, "x",x, "y",y, "rgb",rgb); }
 
      // Copy the pixels
      region.data[i+0] = rgb[0];
      region.data[i+1] = rgb[1];
      region.data[i+2] = rgb[2];
      region.data[i+3] = 255;
 
      // And advance to the next pixel
      x += deltaX;
    } // for
  canvasContext.putImageData(region, rleft, rtop);
} // MIST.renderAt

