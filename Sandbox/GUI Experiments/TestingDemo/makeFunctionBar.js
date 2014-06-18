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
  width: funBarWidth / 2,
  height: funBarHeight - (2 * funBarOffset),
  fill: 'white',
  stroke: 'black',
  strokeWidth: .5 
});
funBar.add(funBarTextArea);

var funBarText = new Kinetic.Text({
  text: '',
  x: funBarTextOffset,
  y: funBarTextOffset,
  width: (funBarWidth / 2) - funBarTextOffset,
  height: funBarHeight - (2 * funBarOffset),
  fill: 'black',
  fontFamily: 'Courier New',
  fontSize: funBarDisplayFontSize
});
funBar.add(funBarText);

var funBarComment = new Kinetic.Text ({
  text: 'Save as...',
  x: funBarTextArea.width() + 2 * funBarOffset,
  y: funBarHeight / 2 - (funBarFontSize / 2),
  fill: 'black',
  fontSize: funBarFontSize
});
funBar.add(funBarComment);

var funBarSaveFun = new Kinetic.Rect({
  x: funBarSaveFunX,
  y: funBarSaveFunY,
  width: funBarIconSideLength,
  height: funBarIconSideLength,
  fill: functionColor,
  stroke: functionColor,
  strokeWidth: 10,
  lineJoin: 'round'
})
funBar.add(funBarSaveFun);

var funBarSaveFunText = new Kinetic.Text ({
  text: 'function',
  x: funBarSaveFunX - funBarOffset ,
  y: funBarIconTextY,
  width: funBarIconTextWidth,
  align: 'center',
  fill: 'black',
  fontSize: 10
});
funBar.add(funBarSaveFunText);

var funBarSaveIm = new Kinetic.Rect({
  x: funBarSaveFunX + funBarSaveFunY + (funBarWidth / 12),
  y: funBarSaveFunY,
  width: funBarIconSideLength,
  height: funBarIconSideLength,
  fill: 'darkblue',
  stroke: 'darkblue',
  strokeWidth: 10,
  //lineJoin: 'round'
})
funBar.add(funBarSaveIm);

var funBarSaveImText = new Kinetic.Text ({
  text: 'image',
  x: funBarSaveFunX + (.5 * funBarOffset) + (funBarWidth / 12),
  y: funBarIconTextY,
  width: funBarIconTextWidth,
  align: 'center',
  fill: 'black',
  fontSize: 10
});
funBar.add(funBarSaveImText);