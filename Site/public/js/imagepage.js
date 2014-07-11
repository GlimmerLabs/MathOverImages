/**
 * imagepage.js
 *   Additional Javascript for the single image page.
 */

// +------+----------------------------------------------------------
// | Todo |
// +------+

// Find a way to get the context.

// +------------------+----------------------------------------------
// | Final Page Setup |
// +------------------+

var animator;

$(document).ready(function() {
  var canvas = document.getElementById("canvas");
  if (canvas.className == "fullscreen") {
    canvas.width = $(window).width() + 1;
    canvas.height = $(window).height() + 1;
    window.onresize = function(evt) {
      console.log("resizing");
      canvas.width = $(window).width();
      canvas.height = $(window).height();
      animator.width = canvas.width;
      animator.height = canvas.height;
    };
  }
  animator = new MIST.ui.Animator(document.getElementById('code').innerHTML,
    "", {}, canvas);
  animator.start();
  document.body.onkeypress=function(evt) {
    var code = evt.which || evt.keyCode || evt.charCode;
    var char = String.fromCharCode(code);
    console.log("Pressed '" + char + "'");
    switch (char) {
      case "s":
        if (animator.on) {
          animator.stop();
        }
        else {
          animator.start();
        }
        break;
      case "+":
        animator.renderWidth = 
            Math.min(animator.renderWidth+50, animator.width);
        animator.renderHeight = 
            Math.min(animator.renderHeight+50, animator.height);
        break;
      case "-":
        animator.renderWidth = Math.max(animator.renderWidth-50, 50);
        animator.renderHeight = Math.max(animator.renderHeight-50, 50);
        break;
    } // switch
  }; // document.body.onkeypress

  var metaImage = canvas.toDataURL();
  var meta = document.createElement('meta');
  meta.setAttribute('property', 'og:image');
  meta.setAttribute('content', metaImage);
  document.getElementsByTagName('head')[0].appendChild(meta);

});