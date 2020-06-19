var funBar = new Kinetic.Group ({
  x: 0,
  y: height - funBarHeight,
});
funBarLayer.add(funBar);
var funBarArea = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: funBarWidth,
  height: funBarHeight,
  fill: funBarBackgroundColor,
  stroke: 'black',
  strokeWidth: 1
});
funBar.add(funBarArea);

var funBarTextArea = new Kinetic.Rect({
  x: funBarOffset,
  y: funBarOffset,
  width: funBarTextAreaWidth,
  height: funBarTextAreaHeight,
  fill: 'white',
  stroke: 'black',
  strokeWidth: .5 
});
funBar.add(funBarTextArea);

var funBarText = new Kinetic.Text({
  text: '',
  x: funBarTextOffset,
  y: funBarTextOffset,
  width: funBarTextAreaWidth - (funBarTextOffset),
  height: funBarTextAreaHeight - (2 * funBarOffset),
  fill: 'black',
  fontFamily: 'Courier New',
  fontSize: funBarDisplayFontSize
});
funBar.add(funBarText);

var funBarComment = new Kinetic.Text ({
  text: 'Save as...',
  x: funBarTextArea.width() + 2 * funBarOffset,
  y: funBarHeight / 2 - (funBarFontSize / 2),
  //width: funBarWidth * (3 / 25),
  fill: 'black',
  fontSize: funBarFontSize
});
funBar.add(funBarComment);

var funBarSaveFunGroup = new Kinetic.Group ({
  x: funBarTextAreaWidth + funBarComment.width() + (5 * funBarOffset),
  y: funBarOffset
});
funBar.add(funBarSaveFunGroup);

var funBarSaveFunCover = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: funBarIconTextWidth,
  height: funBarTextAreaHeight,
  fill: functionColorLight,
  stroke: 'grey',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
funBarSaveFunGroup.add(funBarSaveFunCover);

var funBarSaveFunText = new Kinetic.Text ({
  text: 'function',
  x: 0,
  y: funBarOffset,
  width: funBarIconTextWidth,
  height: funBarTextAreaHeight,
  align: 'center',
  fill: 'grey',
  fontSize: funBarFontSize
});
funBarSaveFunGroup.add(funBarSaveFunText);

var funBarSaveImGroup = new Kinetic.Group ({
  x: funBarSaveFunGroup.x() + funBarIconTextWidth + (2 * funBarOffset),
  y: funBarOffset,
});
funBar.add(funBarSaveImGroup);

var funBarSaveImCover = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: funBarIconTextWidth,
  height: funBarTextAreaHeight,
  fill: valueMenuColorLight,
  stroke: 'grey',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
funBarSaveImGroup.add(funBarSaveImCover);

var funBarSaveImText = new Kinetic.Text ({
  text: 'image',
  x: 0,
  y: funBarOffset,
  width: funBarIconTextWidth,
  align: 'center',
  fill: 'grey',
  fontSize: funBarFontSize
});
funBarSaveImGroup.add(funBarSaveImText);



