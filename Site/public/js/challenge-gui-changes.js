/** remove save text and buttons from the funbar **/
funBarComment.destroy();
funBarSaveFunGroup.destroy();
funBarSaveImGroup.destroy();

/**
 * submitChallenge sends an ajax request to the api to check if the currShape
 * satisfies the challenge.
 * This function assumes that the url ends with the form .../view/[challengeid]
 */
var submitChallenge = function() {
  // Parse url to get the challenge ID
  var url = document.URL;
  console.log(url);
  var i = url.length;
  while (i > 0 && url[--i] != '/');
  var name = url.substring(i+1);
  console.log(name);
  var request = new XMLHttpRequest();
  var data = "action=submitchallenge&code=" + currText + "&name=" + name;
  request.open("POST", "/api", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(data);
  return eval(request.responseText);
}


/** add button for submitting challenges **/

//challenge text
var submitChallText = new Kinetic.Text ({
  x: funBarOffset,
  y: funBarOffset,
  text: 'submit solution',
  fontSize: funBarFontSize,
  fontFamily: globalFont,
  fill: 'black'
});

var textWidth = submitChallText.width();
var submitButtonWidth = textWidth + (2*funBarOffset);
var buttonSpace = width - funBarOffset - funBarTextAreaWidth;
var submitXoffset = (buttonSpace - submitButtonWidth) / 2;
var submitButtonX = funBarOffset + funBarTextAreaWidth + submitXoffset;
var submitButtonY = (funBarHeight - funBarTextAreaHeight) / 2;

var submitChallGroup = new Kinetic.Group ({
  x: submitButtonX,
  y: submitButtonY
});

var submitChallRect = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: submitButtonWidth,
  height: funBarTextAreaHeight,
  fill: valueMenuColor,
  stroke: 'black',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowEnabled: false,
});

submitChallGroup.add(submitChallRect, submitChallText);
funBar.add(submitChallGroup);

/** on events for submit challenge button **/

submitChallGroup.on('mouseover', function() {
  submitChallRect.setAttr('fill', valueMenuColorLight);
  funBarLayer.draw();
});

submitChallGroup.on('mouseout', function() {
  submitChallRect.setAttrs({
    fill: valueMenuColor,
    shadowEnabled: false
  });
  funBarLayer.draw();
});

submitChallGroup.on('mousedown', function() {
  submitChallRect.setAttr('shadowEnabled', true);
  funBarLayer.draw();
});

submitChallGroup.on('mouseup', function() {
  submitChallRect.setAttr('shadowEnabled', false);
  var submissionCode = submitChallenge();
  if (submissionCode)
  {
    alert("Correct! You've completed the challenge!");
    window.location.href = '../';
    //credit to http://stackoverflow.com/questions/19825283/redirect-to-a-page-url-after-alert-button-is-pressed
  }
/*  var challengeCode = document.getElementById("code");
  var context = {};
  var d = new Date();
  var t = {
    s: d.getMilliseconds()/500 - 1,
    m: (d.getSeconds()*1000 + d.getMilliseconds())/30000 - 1,
    h: (d.getMinutes()*60 + d.getSeconds())/1800 - 1,
    d: (d.getHours()*60 + d.getMinutes())/720 - 1
  };
  var m = {
    x: MIST.mouseX,
    y: MIST.mouseY,
    X: MIST.clickX,
    Y: MIST.clickY
  };
  console.log(challengeCode);
  console.log(submissionCode);
  var fun1 = MIST.expToRGB("untitled image", challengeCode, context);
  var fun2 = MIST.expToRGB("untitled image", submissionCode, context);
  var similarity=0;
  for (var x=0; x<200; x+=4) //y
  {
    for (var y=0; y<200; y+=4) //x
    {
      var rgb1 = fun1(x,y,t,m);
      var rgb2 = fun2(x,y,t,m);
      var diffR=abs(rgb2[0]-rgb1[0]);
      var diffG=abs(rgb2[1]-rgb1[1]);
      var diffB=abs(rgb2[2]-rgb1[2]);
      if (diffR < .01 && diffG < .01 && diffB < .01)
      {
        similarity++;
      }
    }
  }
  if (similarity >= 9000) {
    alert("Correct! You've completed the challenge!");
  } // if correct
  else {
    alert("That's not quite right. Make sure the selected image matches the one on the left.")
  } // else incorrect
}*/
else
{
  alert("That's not quite right. Make sure the selected image matches the one on the left.")
}
  funBarLayer.draw();
});
