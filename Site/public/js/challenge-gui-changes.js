/** remove save text and buttons from the funbar **/
funBarComment.destroy();
funBarSaveFunGroup.destroy();
funBarSaveImGroup.destroy();

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

//change text box width
funBarTextAreaWidth = width * .7;
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