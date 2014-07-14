/**
 * png.js
 *   Making standalone png images.
 */

var MIST = require('../public/js/mist.js');

module.exports.build = function(req, res, database, info) {
  var color = function(r,g,b) {
    return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
  }
  var Canvas = require("canvas");
  if (info.width) {
    var width = eval(info.width);
  }
  else {
    var width = 200;
  }
  if (info.height) {
    var height = eval(info.height);
  }
  else {
    var height = 200;
  }
  var canvas = new Canvas(width, height);
  console.log(canvas.width, canvas.height);
  var ctx = canvas.getContext("2d");
  // Get information on the image
  database.imageInfo(req.params.imageid, function(image, error) {
    // Make sure we succeeded
    if (error) {
      res.end(error)
      return;
    }

    // Convert the code to a function
    var exp = MIST.parse(image.code, "MIST.");
    // var exp = MIST.parse("rgb(x,0,y)", "MIST.");
    var fun = MIST.expToRGB("untitled image", exp, {});

    // Figure out the increments
    var deltaX = 2.0/canvas.width;
    var deltaY = 2.0/canvas.height;

    // Set up our parameters
    var x = -1;
    var y = -1;
    var d = new Date();
    var t = {
      s: d.getMilliseconds()/500 - 1,
      m: (d.getSeconds()*1000 + d.getMilliseconds())/30000 - 1,
      h: (d.getMinutes()*60 + d.getSeconds())/1800 - 1,
      d: (d.getHours()*60 + d.getMinutes())/720 - 1
    };
    var m = {
      x: 0,
      y: 0,
      X: 0,
      Y: 0
    };

    // Fill in the image
    for (var row = 0; row < canvas.height; row++) {
      x = -1;
      for (var col = 0; col < canvas.width; col++) {
        var data = [col,col,col];
        var data = fun(x,y,t,m);
        ctx.fillStyle = color(data[0], data[1], data[2]);
        // if (row == 0) { console.log(row,col,data,ctx.fillStyle); }
        ctx.fillRect(col, row, 1, 1);
        x += deltaX;
      } // for col
      y += deltaY;
    } // for row

    // Convert the canvas to a png
    var stream = canvas.pngStream();
    res.set('Content-Type','image/png');
    var buf = new Buffer(0);
    stream.on('data', function(chunk) {
      buf = Buffer.concat([buf, chunk]);
    });
    stream.on('end', function() {
      res.send(buf);
    });
  });
}; // build
