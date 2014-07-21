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
  // Add feature and unfeature capability
  try {
    $("#featureImage").click(function() {
      var imageid = this.getAttribute("data-imageid");
      var changeTo = this.getAttribute("data-featureStatus");
      var newFeatureStatus = (changeTo == 'false') ? true : false;
      var newText = (changeTo == 'false') ? "+ feature image" : "- unfeature image";
      var clicked = this;
      var url = "/api?action=setFeatured&imageid="+imageid+"&state="+changeTo;
      $.get(url, function(res) {
        if(res=="Success") {
          clicked.textContent = newText;
          clicked.setAttribute("data-featureStatus", newFeatureStatus);
        }
      })
    })
  }
  catch(err) {}
  // Support full size canvases
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
  } // if we are fullscreen

  // Add the handler for the start/stop button
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
  catch(err) {
  }

  // Add the handler for the "make jpeg" button
  var jpeg=document.getElementById('jpeg');
  try {
      jpeg.addEventListener('click', function(event) {
          animator.jpg();
      })
  }
  catch(err) {
  }

  // Add the handler for the "code" button
  var btn=document.getElementById("showcode");
  if (btn) {
    btn.onclick = function(event) {
      var code = document.getElementById("code");
      if (code.style.display == "none") {
        code.style.display = "block";
      }
      else {
        code.style.display = "none";
      }
    } // btn.onclick
  } // if (code)


  // Add the event listener for the slider
  var toggle=document.getElementById("toggle");
  if(toggle) {
  toggle.onclick = function (event) {
     var slider=document.getElementById('reso');
     if (slider.style.display == "none") {
	   slider.style.display = "block";
           slider.addEventListener('change', function(event) {
           var sliderVal=document.getElementById('pixels').value;
	   animator.setResolution(sliderVal, sliderVal);
 	   animator.frame();
          })
        }
    else {
        slider.style.display = "none";
      }
    } // toggle.onclick
  } // if (code)

  var flags = document.getElementsByClassName("flagComment");
  var deletes = document.getElementsByClassName("deleteComment");
  for (var i=0; i<flags.length; i++) {
    flags[i].onclick = function() {
      var id = this.parentNode.id.replace("comment", "");
      (function(clickedFlag) {
        flagComment(id, function(res) {
          if (res.indexOf("flagged") != -1) {
            clickedFlag.className = 'flagComment flagged';
          }
        });
      })(this)
    } // flags[i].onclick
  } // for
  for(var i=0; i<deletes.length; i++) {
    deletes[i].onclick = function() {
      if (confirm("Are you sure you want to delete this comment?")) {
        var id = this.parentNode.id.replace("comment", "");
        (function(comment) {
          deleteComment(id, function(res) {
            if(res.indexOf("deleted") != -1) {
              comment.parentNode.removeChild(comment);
            }
          });
        })(this.parentNode)
      } // if confirmed
    } // delete[i].onclick
  } // for
  animator = new MIST.ui.Animator(document.getElementById('code').innerHTML,
    "", {}, canvas);
  animator.start();
  canvas.onkeypress=function(evt) {
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

// +----------------------+--------------------------------------------
// | Additional Functions |
// +----------------------+

/**
 * Given a number of units and a type of unit, generate
 * a string that describes the units.
 */
var describeUnits = function(amt,unit) {
  if (amt == 1) {
    return "1 " + unit + " ago";
  }
  else {
    return amt + " " + unit + "s ago";
  }
} // describeUnits

/**
 * Describe a date.  Given a date, return a string that summarizes
 * the date (e.g., "2 weeks ago").
 */
var describeDate = function(date) {
  var tmp = new Date(date);
  var timePosted = Date.UTC(tmp.getFullYear(), tmp.getMonth(), 
      tmp.getDate(), tmp.getHours(), tmp.getMinutes(), 
      tmp.getSeconds())/1000;
  var now = new Date();
  var rightNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 
      now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), 
      now.getUTCSeconds())/1000;
  var dateSentence;
  var secs = rightNow-timePosted;
  var secsPerHour = 60 * 60;
  var secsPerDay = secsPerHour * 24;;
  var secsPerWeek = secsPerDay * 7;
  var secsPerMonth = secsPerDay * 31;
  var secsPerYear = secsPerDay * 365;
  if ((secs/secsPerYear) >= 1) {
    dateSentence = describeUnits(Math.floor(secs/secsPerYear), "year");
  }     
  else if ((secs/secsPerMonth) >= 1) {
    dateSentence = describeUnits(Math.floor(secs/secsPerMonth), "month");
  }
  else if ((secs/secsPerWeek) >= 0.8) {
    dateSentence = describeUnits(Math.round(secs/secsPerWeek), "week");
  }
  else if ((secs/secsPerDay) >= 1) {
    dateSentence = describeUnits(Math.floor(secs/secsPerDay), "day");
  }
  else if ((secs/secsPerHour) >= 1) {
    dateSentence = describeUnits(Math.floor(secs/secsPerHour), "hour");
  }
  else if ((secs/60) >= 1) {
    dateSentence = describeUnits(Math.floor(secs/60), "minute");
  }
  else {
    dateSentence = 'a few seconds ago';
  }
  console.log("DateSentence",dateSentence,"secs",secs);
  return dateSentence;
} // describeDate

/**
 * Flag a comment for deletion.
 */
var flagComment = (function(commentId, callback){
  var data = {
    action: "flagComment",
    commentId: commentId
  };
  $.post("/api", data, function(response){
    callback(response);
  });
}); // flagComment

/**
 * Delete a comment.
 */
var deleteComment = (function(commentId, callback){
  var data = {
    action: "deleteComment",
    commentId: commentId
  };
  $.post("/api", data, function(response){
    callback(response);
  });
}); // deleteComment

