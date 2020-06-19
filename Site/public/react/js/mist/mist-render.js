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

// +---------------------+-------------------------------------------
// | Simulated Renderers |
// +---------------------+

/**
 * Render an expression on the specified region of the canvas.
 * (If no region is specified, uses the whole canvas.)
 */


MIST.render = function(exp, context, canvas, renderWidth, renderHeight,
    imgLeft, imgTop, imgWidth, imgHeight) {
  // Get the time.
  var d = new Date();
 

 var t = {
    s: d.getMilliseconds()/500 - 1,
    m: (d.getSeconds()*1000 + d.getMilliseconds())/30000 - 1,
    h: (d.getMinutes()*60 + d.getSeconds())/1800 - 1,
    d: (d.getHours()*60 + d.getMinutes())/720 - 1
  }; 

  // Use the core function
  MIST.renderAt(t, exp, context, canvas, renderWidth, renderHeight,
      imgLeft, imgTop, imgWidth, imgHeight);
  // Return the time (for use elsewhere)
  return t;
} // MIST.render

MIST.renderGIF = function(d, exp, context, canvas, renderWidth, renderHeight, 
    imgLeft, imgTop, imgWidth, imgHeight) {

  var t = {
    s: d.ms / 500 - 1,
    m: ( d.s * 1000 + d.ms)/30000 - 1,
    h: ( d.m * 60 + d.s)/1800 - 1,
    d: ( d.h * 60 + d.m)/720 - 1
  };

  // Use the core function
  MIST.renderAt(t, exp, context, canvas, renderWidth, renderHeight,
      imgLeft, imgTop, imgWidth, imgHeight);
  // Return the time (for use elsewhere)
  return t;
} // MIST.renderGIF
    



/**
 * Render an expression at a particular time.
 */
MIST.renderAt = function(t, exp, context, canvas, 
    renderWidth, renderHeight, imgLeft, imgTop, imgWidth, imgHeight) {
  // Make sure that we have bounds.
  if (!imgLeft) { imgLeft = 0; }
  if (!imgTop) { imgTop = 0; }
  if (!imgWidth) { imgWidth = canvas.width - imgLeft; }
  if (!imgHeight) { imgHeight = canvas.height - imgTop; }
  if (!renderWidth) { renderWidth = imgWidth; }
  if (!renderHeight) { renderHeight = imgHeight; }
  if (renderWidth > imgWidth) { renderWidth = imgWidth; }
  if (renderHeight > imgHeight) { renderHeight = imgHeight; }

  // Make sure that the rendering width and height are whole numbers
  renderWidth = Math.round(renderWidth);
  renderHeight = Math.round(renderHeight);

  // Grab the canvas buffer.
  var buffer = document.getElementById("canvas-buffer");
  if (!buffer ) {
    buffer = document.createElement("canvas");
    buffer.id = "canvas-buffer";
    buffer.style.display = "none";
    document.body.appendChild(buffer);
  } // if (!buffer)
  buffer.width = renderWidth;
  buffer.height = renderHeight;

  // Determine scale factors
  var hscale = imgWidth/renderWidth;
  var vscale = imgHeight/renderHeight;

  // Set up how much we change x and y each time.
  var deltaX = 2.0/renderWidth;
  var deltaY = 2.0/renderHeight;

  // Get contexts for both canvases
  var canvasContext = canvas.getContext("2d");
  var bufferContext = buffer.getContext("2d");

  // Set up the image data
  var region = bufferContext.createImageData(renderWidth,renderHeight);

  // Set up the mouse (we don't want it changing while rendering).
  var m = {
    x: MIST.mouseX,
    y: MIST.mouseY,
    X: MIST.clickX,
    Y: MIST.clickY
  };

  // Build the function
  var fun = MIST.expToRGB("untitled image", exp, context);
  // Set up our main variables
  var x = -1;
  var y = -1 - deltaY;

  // Loop through all of the pixels
  for (var i = 0; i < region.data.length; i+= 4)
    {
      // When we reach the end of the row, move on to the next row
      if ((i % (4*renderWidth)) == 0)
        { 
          x = -1;
          y += deltaY;
        } // if (i % (4*imgWidth)) == 0

      // Evaluate the function
      var rgb = fun(x,y,t,m);

      // Exploration
      // if (i < 4*imgWidth) { console.log("i",i, "x",x, "y",y, "rgb",rgb); }
 
      // Copy the pixels
      region.data[i+0] = rgb[0];
      region.data[i+1] = rgb[1];
      region.data[i+2] = rgb[2];
      region.data[i+3] = 255;
 
      // And advance to the next pixel
      x += deltaX;
    } // for

  // Random computations
  var renderLeft = imgLeft*renderWidth/imgWidth;
  var renderTop = imgTop*renderHeight/imgHeight;

  // Draw and scale
  bufferContext.putImageData(region, 0, 0);
  canvasContext.drawImage(buffer, imgLeft, imgTop, imgWidth, imgHeight);

//canvasContext.fillStyle = "rgb(200, 0, 0)";
//canvasContext.fillRect (10,10,75,50);

//return t;

} // MIST.renderAt

