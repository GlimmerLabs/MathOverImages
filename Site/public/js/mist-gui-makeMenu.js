 /* create and add menu border */
var borderLine = new Kinetic.Line({
  points: [0, menuHeight, width, menuHeight],
  stroke: 'black',
  strokeWidth: 2
});

 borderLayer.add(borderLine);
 borderLayer.draw();

 /* create and add menu buttons */
 var valuesButton = new Kinetic.Group({
  x: menuCornerWidth
 });
 menuButtonLayer.add(valuesButton);

 var valuesButtonBox = new Kinetic.Rect({
  x:0,
  y:0,
  width: buttonWidth,
  height: menuHeight,
  fill: valueMenuColorLight,
  stroke: 'black',
  strokeWidth: 2
 });
 valuesButton.add(valuesButtonBox);

 var valuesButtonRect = new Kinetic.Rect({
  x: buttonWidth / 2,
  y: menuHeight / 4,
  width: valueSideLength,
  height: valueSideLength,
  fill: valueMenuColor,
  rotation: 45,
 });
 valuesButton.add(valuesButtonRect);

 var valuesButtonText = new Kinetic.Text({
  text: 'add a value',
  x: 0,
  y: menuHeight / 2 + menuHeight / 4,
  width: buttonWidth,
  height: menuHeight / 4,
  fill: 'black',
  align: 'center'
 });
 valuesButton.add(valuesButtonText);

 var functionsButton = new Kinetic.Group({
  x: menuCornerWidth + buttonWidth
 });
 menuButtonLayer.add(functionsButton);

 var functionsButtonBox = new Kinetic.Rect({
  x:0,
  y:0,
  width: buttonWidth,
  height: menuHeight,
  fill: functionColorLight,
  stroke: 'black',
  strokeWidth: 2
 });
 functionsButton.add(functionsButtonBox);

 var functionsButtonRect = new Kinetic.Rect({
  x: buttonWidth / 2 - functionRectSideLength / 2,
  y: menuHeight / 4,
  width: functionRectSideLength,
  height: functionRectSideLength,
  fill: functionColor,
  lineJoin: 'round',
  stroke: functionColor,
  strokeWidth: functionStrokeWidth
 });
 functionsButton.add(functionsButtonRect);

 var functionsButtonText = new Kinetic.Text({
  text: 'add a function',
  x: 0,
  y: menuHeight / 2 + menuHeight / 4,
  width: buttonWidth,
  height: menuHeight / 4,
  fill: 'black',
  align: 'center'
 });
 functionsButton.add(functionsButtonText);
 menuButtonLayer.draw();

 /* add functions to menu */
 var menuFunctions = [];
 for (var i = 0; i < funNames.length; i++) {
  menuFunctions[i] = makeFunctionGroup(funNames[i], menuFunctsXStart, menuYspacing);
  menuLayer.add(menuFunctions[i]);
 }

 /* add values to menu */
 var menuValues = [];
 for (var i = 0; i < valNames.length; i++) {
  menuValues[i] = makeValueGroup(valNames[i], menuValuesXStart, menuYspacing);
  menuLayer.add(menuValues[i]);
 }

//LEFT CORNER BUTTONS
 var makeMenuButton = function(text, x, y) {
  var newGroup = new Kinetic.Group({
    x: x,
    y: y
  });
  var newRect = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: menuCornerWidth - (2 * menuOffset),
    height: menuControlHeight,
    fill: menuControlColor,
    stroke: 'black',
    strokeWidth: .5,
    shadowColor: 'black',
    shadowEnabled: false
  });
  newGroup.add(newRect);
  var newText = new Kinetic.Text({
    x: 0,
    y: menuTextOffset,
    width: menuCornerWidth - (2 * menuOffset),
    height: menuControlHeight - menuTextOffset,
    text: text,
    align: 'center',
    fill: menuControlTextColor
  });
  newGroup.add(newText);
return newGroup;
};
var resetButton = makeMenuButton('Reset Workspace', menuOffset, menuOffset);
var openButton = makeMenuButton('Open Workspace', menuOffset, (2*menuOffset) + menuControlHeight);
var saveButton = makeMenuButton('Save Workspace', menuOffset, (3*menuOffset) + 
  (2*menuControlHeight));

menuControlLayer.add(resetButton);
menuControlLayer.add(openButton);
menuControlLayer.add(saveButton);