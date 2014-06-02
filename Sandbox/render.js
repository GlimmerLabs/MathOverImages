/**
 * render.js
 *   SamR's experiments with rendering MOI functions in Javascript.
 */

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Convert a value in the range [-1 .. 1] to a hue.
 */
function r2h(r)
{
    return 180 + r*180;
}

/**
 * Convert a value in the range [-1 .. 1] to a saturation or value.
 */
function r2sv(r)
{
    return .5 + r*.5;
}

/**
 * Converts hsv values to rgb values.
 */
function hsv2rgb(h, s, v)
{
    var rgb = [];
    if (s === 0)
        rgb = [v, v, v];
    else
    {
        var c = v * s;
        var h2 = h / 60;
        var x = c*( 1 - Math.abs((h2 % 2) - 1));
        if (h2 >= 5)
            rgb = [c, 0, x];
        else if (h2 >= 4)
            rgb = [x, 0, c];
        else if (h2 >= 3)
            rgb = [0, x, c];
        else if (h2 >= 2)
            rgb = [0, c, x];
        else if (h2 >= 1)
            rgb = [x, c, 0];
        else
            rgb = [c, x, 0];
    }
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

//var MOI = new Object();

var abs = function (a)
{
    return Math.abs(a);
};

var ave = function(a)
{
    return sum.apply(this, arguments)/arguments.length;
};
   
var cos = function(a)
{
    return Math.cos(Math.PI * a);
};

var product = function()
{
    var product = 1;
    for (var i = 0; i < arguments.length; i++)
    {
        product *= arguments[i];
    }
    return product;
};

var shift = function()
{
    return wrap(sum.apply(this, arguments));
};

var sign = function(range)
{
    if (range < 0) 
        return -1;
    else 
        return 1;
}; 

var signz = function(range)
{
    if (range < 0) 
        return -1;
    else if (range > 0)
        return 1;
    else
        return range;
}; 

var square = function(a)
{
    return a*a;
};

var sin = function(a)
{
    return Math.sin(Math.PI * a);
};

var sum = function()
{
    var sum = 0;
    for (var i = 0; i < arguments.length; i++)
    {
        sum += arguments[i];
    } 
    return sum;
};

// +---------------------+---------------------------------------------
// | Simulated Renderers |
// +---------------------+

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
 * Render three (x, y)->range functions as HSV, given the specified 
 * bounds. Intended mostly as an experiment to get started.
 */
function renderHSV(hfun, sfun, vfun, canvas, rleft, rtop, rwidth, rheight)
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
    { // When we reach the end of the row, move on to the next row
        if ((i % (4*rwidth)) == 0)
        { 
            x = -1;
            y += deltaY;
        } // if (i % (4*rwidth)) == 0
        h = r2h(cap(hfun(x,y,time,mouse)));
        s = r2sv(cap(sfun(x,y,time,mouse)));
        v = r2sv(cap(vfun(x,y,time,mouse)));

        var rgb = [];
        rgb = hsv2rgb(h, s, v);
        region.data[i+0] = rgb[0];
        region.data[i+1] = rgb[1];
        region.data[i+2] = rgb[2];
        region.data[i+3] = 255;
        
        x += deltaX;
    } // for
  context.putImageData(region, rleft, rtop);
} // renderHSV

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

function JSONtoImage(line_string)
{
    var line_array = JSON.parse(line);
    var type = line_array[0];
    var fun1 = line_array[1];
    var fun2 = line_array[2];
    var fun3 = line_array[3];

    //if (type === "bw")
        //return functions to be applied to a canvas in black and white
        //else if (type === "rgb")
            //return functions to be applied to a canvas in rgb
            //else if (type === "hsv")
                //return functions to be applied to a canvas in hsv
}
