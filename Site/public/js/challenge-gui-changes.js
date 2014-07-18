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
  var i = url.length;
  while (i > 0 && url[--i] != '/');
  var id = url.substring(i+1);
  
  var request = new XMLHttpRequest();
  var data = "action=submitchallenge&code=" + currText + "&id=" + id;
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
  text: 'submit challenge',
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
  var correct = submitChallenge();
  // WHAT DO WE WANT TO DO WITH THIS INFORMATION:
  if (correct) {
    alert("Correct! You've completed the challenge!");
  } // if correct
  else {
    alert("That's not quite right. Make sure the selected image matches the one on the left!")
  } // else incorrect
  funBarLayer.draw();
});