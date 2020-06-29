import {functionStyle, funBarStyle, valueStyle, size} from './styles.js';

export const funBar = new Kinetic.Group ({
  x: 0,
  y: size.height - funBarStyle.height,
});

export const funBarArea = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: funBarStyle.width,
  height: funBarStyle.height,
  fill: funBarStyle.backgroundColor,
  stroke: 'black',
  strokeWidth: 1
});
funBar.add(funBarArea);

export const funBarTextArea = new Kinetic.Rect({
  x: funBarStyle.offset,
  y: funBarStyle.offset,
  width: funBarStyle.textAreaWidth,
  height: funBarStyle.textAreaHeight,
  fill: 'white',
  stroke: 'black',
  strokeWidth: .5 
});
funBar.add(funBarTextArea);

export const funBarText = new Kinetic.Text({
  text: '',
  x: funBarStyle.textOffset,
  y: funBarStyle.textOffset,
  width: funBarStyle.textAreaWidth - (funBarStyle.textOffset),
  height: funBarStyle.textAreaHeight - (2 * funBarStyle.offset),
  fill: 'black',
  fontFamily: 'Courier New',
  fontSize: funBarStyle.displayFontSize
});
funBar.add(funBarText);

export const funBarComment = new Kinetic.Text ({
  text: 'Save as...',
  x: funBarTextArea.width() + 2 * funBarStyle.offset,
  y: funBarStyle.height / 2 - (funBarStyle.fontSize / 2),
  //width: funBarWidth * (3 / 25),
  fill: 'black',
  fontSize: funBarStyle.fontSize
});
funBar.add(funBarComment);

export const funBarSaveFunGroup = new Kinetic.Group ({
  x: funBarStyle.textAreaWidth + funBarComment.width() + (5 * funBarStyle.offset),
  y: funBarStyle.offset
});
funBar.add(funBarSaveFunGroup);

export const funBarSaveFunCover = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: funBarStyle.iconTextWidth,
  height: funBarStyle.textAreaHeight,
  fill: functionStyle.colorLight,
  stroke: 'grey',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
funBarSaveFunGroup.add(funBarSaveFunCover);

export const funBarSaveFunText = new Kinetic.Text ({
  text: 'function',
  x: 0,
  y: funBarStyle.offset,
  width: funBarStyle.iconTextWidth,
  height: funBarStyle.textAreaHeight,
  align: 'center',
  fill: 'grey',
  fontSize: funBarStyle.fontSize
});
funBarSaveFunGroup.add(funBarSaveFunText);

export const funBarSaveImGroup = new Kinetic.Group ({
  x: funBarSaveFunGroup.x() + funBarStyle.iconTextWidth + (2 * funBarStyle.offset),
  y: funBarStyle.offset,
});
funBar.add(funBarSaveImGroup);

export const funBarSaveImCover = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: funBarStyle.iconTextWidth,
  height: funBarStyle.textAreaHeight,
  fill: valueStyle.menuColorLight,
  stroke: 'grey',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
funBarSaveImGroup.add(funBarSaveImCover);

export const funBarSaveImText = new Kinetic.Text ({
  text: 'image',
  x: 0,
  y: funBarStyle.offset,
  width: funBarStyle.iconTextWidth,
  align: 'center',
  fill: 'grey',
  fontSize: funBarStyle.fontSize
});
funBarSaveImGroup.add(funBarSaveImText);
