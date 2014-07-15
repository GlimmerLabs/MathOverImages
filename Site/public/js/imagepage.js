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
  var animate = document.getElementById('animator');
  try {
    animate.addEventListener('click', function(event) {
      if (animator.on) {
        animator.stop();
        this.textContent = "start";
        }
       else {
         animator.start();
         this.textContent = "stop";
       }
   })
}
catch(err){}

var jpeg=document.getElementById('jpeg');
  try {
    var jpeg=document.getElementById('jpeg');
      jpeg.addEventListener('click', function(event) {
          animator.jpg();
      })
  }
  catch(err){}


  var canvas = document.getElementById("canvas");
  if (canvas.className == "fullscreen") {
    canvas.width = $(window).width() + 1;
    canvas.height = $(window).height() + 1;
    window.onresize = function(evt) {
      canvas.width = $(window).width();
      canvas.height = $(window).height();
      animator.width = canvas.width;
      animator.height = canvas.height;
    };
  }
  var flags = document.getElementsByClassName("flagComment");
  var deletes = document.getElementsByClassName("deleteComment");
  for(var i=0; i<flags.length; i++) {
    flags[i].onclick = function() {
      var id = this.parentNode.id.replace("comment", "");
      (function(clikedFlag) {
        flagComment(id, function(res) {
          if(res.indexOf("flagged") != -1) {
            clickedFlag.className = 'flagComment flagged';
          }
        });
      })(this)
    }
  }
  for(var i=0; i<deletes.length; i++) {
    deletes[i].onclick = function() {
      if(confirm("Are you sure you want to delete this comment?")) {
        var id = this.parentNode.id.replace("comment", "");
        (function(comment) {
          deleteComment(id, function(res) {
            if(res.indexOf("deleted") != -1) {
              comment.parentNode.removeChild(comment);
            }
          });
        })(this.parentNode)
      }
    }
  }
  animator = new MIST.ui.Animator(document.getElementById('code').innerHTML,
    "", {}, canvas);
  animator.start();
  document.body.onkeypress=function(evt) {
    var code = evt.which || evt.keyCode || evt.charCode;
    var char = String.fromCharCode(code);
    switch (char) {
      case "j":
        animator.jpg();
        break;
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
});

var flagComment = (function(commentId, callback){
  var data = {
    action: "flagComment",
    commentId: commentId
  };
  $.post("/api", data, function(response){
    callback(response);
  });
});

var deleteComment = (function(commentId, callback){
  var data = {
    action: "deleteComment",
    commentId: commentId
  };
  $.post("/api", data, function(response){
    callback(response);
  });
});

