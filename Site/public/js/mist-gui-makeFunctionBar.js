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
  x: funBarTextAreaWidth + funBarComment.width() + funBarIconOffset,
  y: 1.5*funBarOffset
});
funBar.add(funBarSaveFunGroup);

var funBarSaveFun = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: funBarIconSideLength,
  height: funBarIconSideLength,
  fill: functionColor,
  stroke: functionColor,
  strokeWidth: 10,
  lineJoin: 'round',
  opacity: .5
})
funBarSaveFunGroup.add(funBarSaveFun);

var funBarSaveFunText = new Kinetic.Text ({
  text: 'function',
  x: - ((funBarIconTextWidth / 2) - (funBarIconSideLength / 2)),
  y: 1.6 * funBarIconSideLength,
  width: funBarIconTextWidth,
  align: 'center',
  fill: 'black',
  fontSize: 10
});
funBarSaveFunGroup.add(funBarSaveFunText);

var funBarSaveImGroup = new Kinetic.Group ({
  x: funBarSaveFunGroup.x() + funBarIconSideLength + funBarIconOffset,
  y: 1.5 * funBarOffset,
});
funBar.add(funBarSaveImGroup);

var funBarSaveIm = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: funBarIconSideLength,
  height: funBarIconSideLength,
  fill: 'darkblue',
  stroke: 'darkblue',
  strokeWidth: 10,
  opacity: .3
  //lineJoin: 'round'
})
funBarSaveImGroup.add(funBarSaveIm);

var funBarSaveImText = new Kinetic.Text ({
  text: 'image',
  x: - ((funBarIconTextWidth / 2) - (funBarIconSideLength / 2)),
  y: 1.6 * funBarIconSideLength,
  width: funBarIconTextWidth,
  align: 'center',
  fill: 'black',
  fontSize: 10
});
funBarSaveImGroup.add(funBarSaveImText);