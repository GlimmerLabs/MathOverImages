/**
 * render.js
 *   SamR's experiments with rendering MOI functions in Javascript.
 */

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

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

/**
 * Restrict a value to a particular range.
 */
function cap(val)
{
  return Math.max(-1, Math.min(1, val));
} // cap

/**
 * Wrap around
 */
function wrap(val)
{
  if (val < -1)
    return wrap (val + 2);
  else if (val > 1)
    return wrap (val - 2);
  else
    return val;
} // wrap

// +-------------------+-----------------------------------------------
// | Mouse Information |
// +-------------------+

/*
  Note: Rather than having mouse listeners here, we expect the GUI
  to keep us updated on where the mouse is and where it was last
  clicked.
 */

var mouseX = 0;
var mouseY = 0;
var clickX = 0;
var clickY = 0;

function setMouse(x, y)
{
  mouseX = x;
  mouseY = y;
} // setMouse

function setClick(x, y)
{
  clickX = x;
  clickY = y;
} // setClick

// +---------+---------------------------------------------------------
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


// +-----------------------+-------------------------------------------
// | Interpreting MOI Code |
// +-----------------------+

/**
 * MOIbody2fun
 *   Given the body of something that uses "raw" MOI, return the
 *   corresponding function.  (Note that we will generally not
 *   use "raw" MOI, but it's helpful for testing.)
 */
function MOIbody2fun(body)
{
  return eval("(function (x,y,t,m) { return " + body + "})");
} // MOIbody2fun

// +---------------+---------------------------------------------------
// | MOI Functions |
// +---------------+

var MOI = new Object();

MOI.abs = Math.abs;

MOI.ave = 
  function()
    {
      return MOI.sum.apply(this, arguments)/arguments.length;
    };
   
MOI.cos =
  function(a)
    {
      return Math.cos(Math.PI * a);
    };

MOI.product = 
  function()
    {
      var product = 1;
      for (var i = 0; i < arguments.length; i++)
        {
          product *= arguments[i];
        } // for
      return product;
    };

MOI.shift = 
  function()
    {
      return wrap(MOI.sum.apply(this, arguments));
    };

MOI.sign = 
  function(range)
    {
      if (range < 0) 
        return -1;
      else if (range > 0)
        return 1;
      else
        return range;
    }; 

MOI.square =
  function(a)
    {
      return a*a;
    };

MOI.sin =
  function(a)
    {
      return Math.sin(Math.PI * a);
    };

MOI.sum = 
  function()
    {
      var sum = 0;
      for (var i = 0; i < arguments.length; i++)
        {
          sum += arguments[i];
        } // for
      return sum;
    };

// +---------------------+---------------------------------------------
// | Simulated Renderers |
// +---------------------+

/**
 * Render the function x on the canvas, given the specified bounds.
 * Intended mostly as an experiment to get started.
 */
function renderX(canvas, rleft, rtop, rwidth, rheight)
{
  var deltaX = 2.0/rwidth;
  var deltaY = 2.0/rheight;
  var context = canvas.getContext("2d");
  var region = context.createImageData(rwidth,rheight);
  var x = -1;
  var y = -1 - deltaY;
  for (var i = 0; i < region.data.length; i+= 4)
    {
      // When we reach the end of the row, move on to the next row
      if ((i % (4*rwidth)) == 0)
        { 
          x = -1;
          y += deltaY;
        } // if (i % (4*rwidth)) == 0
      var component = r2c(x);
      region.data[i+0] = component;
      region.data[i+1] = component;
      region.data[i+2] = component;
      region.data[i+3] = 255;
      x += deltaX;
    } // for
  console.log("left is " + rleft + ", top is " + rtop);
  context.putImageData(region, rleft, rtop);
} // renderX

/**
 * Render three (x,y)->range functions as RGB, given the specified 
 * bounds. Intended mostly as an experiment to get started.
 */
function renderRGB(rfun, gfun, bfun, canvas, rleft, rtop, rwidth, rheight)
{
  var deltaX = 2.0/rwidth;
  var deltaY = 2.0/rheight;
  var context = canvas.getContext("2d");
  var region = context.createImageData(rwidth,rheight);
  var d = new Date();
  var sec = d.getMilliseconds()/500 - 1;
  var min = (d.getSeconds()*1000 + d.getMilliseconds())/30000 - 1;
  var time = new Time(sec,min);
  var mouse = new Mouse((mouseX-rleft)*deltaX - 1, 
                        (mouseY-rtop)*deltaY - 1, 
                        (clickX-rleft)*deltaX - 1, 
                        (clickY-rtop)*deltaY - 1);
  var x = -1;
  var y = -1 - deltaY;
  for (var i = 0; i < region.data.length; i+= 4)
    {
      // When we reach the end of the row, move on to the next row
      if ((i % (4*rwidth)) == 0)
        { 
          x = -1;
          y += deltaY;
        } // if (i % (4*rwidth)) == 0
      region.data[i+0] = r2c(cap(rfun(x,y,time,mouse)));
      region.data[i+1] = r2c(cap(gfun(x,y,time,mouse)));
      region.data[i+2] = r2c(cap(bfun(x,y,time,mouse)));
      region.data[i+3] = 255;
          
      x += deltaX;
    } // for
  context.putImageData(region, rleft, rtop);
} // renderRGB

/**
 * Render an (x,y)->range function on the canvas, given the specified 
 * bounds. Intended mostly as an experiment to get started.
 */
function renderFun(fun, canvas, rleft, rtop, rwidth, rheight)
{
  var deltaX = 2.0/rwidth;
  var deltaY = 2.0/rheight;
  var context = canvas.getContext("2d");
  var region = context.createImageData(rwidth,rheight);
  var d = new Date();
  var sec = d.getMilliseconds()/500 - 1;
  var min = (d.getSeconds()*1000 + d.getMilliseconds())/30000 - 1;
  // console.log("sec: " + sec + ", min: " + min);
  var time = new Time(sec,min);
  var mouse = new Mouse((mouseX-rleft)*deltaX - 1, 
                        (mouseY-rtop)*deltaY - 1, 
                        (clickX-rleft)*deltaX - 1, 
                        (clickY-rtop)*deltaY - 1);
  var x = -1;
  var y = -1 - deltaY;
  for (var i = 0; i < region.data.length; i+= 4)
    {
      // When we reach the end of the row, move on to the next row
      if ((i % (4*rwidth)) == 0)
        { 
          x = -1;
          y += deltaY;
        } // if (i % (4*rwidth)) == 0
      var component = r2c(cap(fun(x,y,time,mouse)));
      region.data[i+0] = component;
      region.data[i+1] = component;
      region.data[i+2] = component;
      region.data[i+3] = 255;
          
      x += deltaX;
    } // for
  context.putImageData(region, rleft, rtop);
} // renderFun

/**
 * Render the function y on the canvas, given the specified bounds.
 * Intended mostly as an experiment with renderFun.
 */
function renderY(canvas, left, top, width, height)
{
  renderFun(function(x,y) { return y }, canvas, left, top, width, height);
} // renderY

function renderMin(canvas, left, top, width, height)
{
  renderFun(function(x,y,s,m) { return m }, canvas, left, top, width, height);
} // renderMin
