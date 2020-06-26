 /* create and add menu border */
var borderLine = new Kinetic.Line({
  points: [0, menuHeight, size.width, menuHeight],
  stroke: 'black',
  strokeWidth: 2
});

 layers.border.add(borderLine);
 layers.border.draw();

 /* create and add menu buttons */
 var valuesButton = new Kinetic.Group({
  x: menuCornerWidth
 });
 layers.menuButton.add(valuesButton);

 var valuesButtonBox = new Kinetic.Rect({
  x:0,
  y:0,
  width: buttonWidth,
  height: menuHeight,
  fill: valueStyle.menuColorLight,
  stroke: 'black',
  strokeWidth: 2
 });
 valuesButton.add(valuesButtonBox);

 var valuesButtonRect = new Kinetic.Rect({
  x: buttonWidth / 2,
  y: menuHeight / 4,
  width: valueStyle.sideLength,
  height: valueStyle.sideLength,
  fill: valueStyle.menuColor,
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
  align: 'center',
  fontFamily: fonts.default,
  fontSize: fonts.menuSize
 });
 valuesButton.add(valuesButtonText);

 var functionsButton = new Kinetic.Group({
  x: menuCornerWidth + buttonWidth
 });
 layers.menuButton.add(functionsButton);

 var functionsButtonBox = new Kinetic.Rect({
  x:0,
  y:0,
  width: buttonWidth,
  height: menuHeight,
  fill: functionStyle.colorLight,
  stroke: 'black',
  strokeWidth: 2
 });
 functionsButton.add(functionsButtonBox);

 var functionsButtonRect = new Kinetic.Rect({
  x: buttonWidth / 2 - functionStyle.rectSideLength / 2,
  y: menuHeight / 4,
  width: functionStyle.rectSideLength,
  height: functionStyle.rectSideLength,
  fill: functionStyle.color,
  lineJoin: 'round',
  stroke: functionStyle.color,
  strokeWidth: functionStyle.strokeWidth
 });
 functionsButton.add(functionsButtonRect);

 var functionsButtonText = new Kinetic.Text({
  text: 'add a function',
  x: 0,
  y: menuHeight / 2 + menuHeight / 4,
  width: buttonWidth,
  height: menuHeight / 4,
  fill: 'black',
  align: 'center',
  fontFamily: fonts.default,
  fontSize: fonts.menuSize
 });
 functionsButton.add(functionsButtonText);
 layers.menuButton.draw();

 /**
  * toggle labels text
  */
  var toggleTag = new Kinetic.Group ({
    x: (size.width / 90),
    y: menuHeight + (size.width / 90)
  });
  layers.border.add(toggleTag);

  toggleTag.add(new Kinetic.Text({
    x:0,
    y:0,
    text: 'Turn Labels Off',
    fontFamily: fonts.default,
    fontSize: fonts.menuSize,
    fill: '#787878'
  }));

 /* add functions to menu */
 var menuFunctions = [];
 const funNames = Object.keys(functions);
 for (var i = 0; i < funNames.length; i++) {
  menuFunctions[i] = makeFunctionGroup(funNames[i], menuFunctsXStart, menuYspacing);
  layers.menu.add(menuFunctions[i]);
 }

 /* add values to menu */
 var menuValues = [];
 for (var i = 0; i < valNames.length; i++) {
  menuValues[i] = makeValueGroup(valNames[i], menuValuesXStart, menuYspacing);
  layers.menu.add(menuValues[i]);
 }


/**
 * addScrollArrows creates and returns an array of two groups 
 * (left arrow and right arrow)
 * takes "type" (either functions or values)
 */
var addScrollArrows = function(type) {
  var leftX = (type=='values') ? valuesButton.x() + buttonWidth : 
    functionsButton.x() + buttonWidth;
  var rightX = (type=='values') ? size.width - buttonWidth - arrowWidth : 
    size.width - arrowWidth
  /* make left arrow group */  
  var leftArrow = new Kinetic.Group({
    x: leftX,
    y: 0,
    direction: 'left',
    type: type,
    visible: false
  });
  var leftArrowBox = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: arrowWidth,
    height: menuHeight,
    fill: arrowBoxFill,
    opacity: .1
  });
  leftArrow.add(leftArrowBox);
  var leftArrowTri = new Kinetic.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(triX, -triY);
      context.lineTo(triX, triY);
      context.closePath();
      context.fillStrokeShape(this);
    },
    x: size.width/250,
    y: menuHeight / 2,
    fill: arrowFill,
    opacity: .2
  });
  leftArrow.add(leftArrowTri);

  /* make right arrow group */
  var rightArrow = new Kinetic.Group({
    x: rightX,
    y: 0,
    direction: 'right',
    type: type,
    functional: false,
    visible: false
  });
  var rightArrowBox = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: arrowWidth,
    height: menuHeight,
    fill: arrowBoxFill,
    opacity: .1
  });
  rightArrow.add(rightArrowBox);

  var rightArrowTri = new Kinetic.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(-triX, -triY);
      context.lineTo(-triX, triY);
      context.closePath();
      context.fillStrokeShape(this);
    },
    x: size.width / 65,
    y: menuHeight / 2,
    fill: arrowFill,
    opacity: .2
  });
  rightArrow.add(rightArrowTri);

  return {left: leftArrow, right: rightArrow};
};
/* create arrow bars */
var valuesArrows = addScrollArrows('values');
var functionsArrows = addScrollArrows('functions');
/* add arrows to menuArrowLayer */
layers.menuArrow.add(valuesArrows['left'], valuesArrows['right']);
layers.menuArrow.add(functionsArrows['left'], functionsArrows['right']);

/**
 * showScrollArrows changes visibility of the scroll arrows to true depending 
 * on the type given. type is either 'values' or 'functions'
 */
 var showScrollArrows = function(type) {
  setTimeout(function() {
    if (type == 'values') {
      valuesArrows['left'].setAttr('visible', true);
      valuesArrows['right'].setAttr('visible', true);
    }
    else {
      functionsArrows['left'].setAttr('visible', true);
      functionsArrows['right'].setAttr('visible', true);
    }
    layers.menuArrow.draw();
  }, 1000);
};

/**
 * hideScrollArrows changes visibility of the scroll arrows to false depending 
 * on the type given. type is either 'values' or 'functions'
 */
var hideScrollArrows = function(type) {
  if (type == 'values') {
    valuesArrows['left'].setAttr('visible', false);
    valuesArrows['right'].setAttr('visible', false);
  }
  else {
    functionsArrows['left'].setAttr('visible', false);
    functionsArrows['right'].setAttr('visible', false);
  }
  layers.menuArrow.draw();
};
/**
 * updateArrows changes the opacity of the arrows based on if they are functional.
 */
 var updateArrows = function(type) {
  setTimeout(function() {
    if (type == 'values') {
      var leftArrow = valuesArrows['left'];
      var rightArrow = valuesArrows['right'];
      if (predicate.canMoveRight('values')) {
        leftArrow.setAttr('functional', true);
        leftArrow.children[0].setAttr('opacity', .3);
        leftArrow.children[1].setAttr('opacity', .5);
      } // if left functional
      else {
        leftArrow.setAttr('functional', false);
        leftArrow.children[0].setAttr('opacity', 0);
        leftArrow.children[1].setAttr('opacity', 0);
      } // else left non-functional

      if (predicate.canMoveLeft('values')) {
        rightArrow.setAttr('functional', true);
        rightArrow.children[0].setAttr('opacity', .3);
        rightArrow.children[1].setAttr('opacity', .5);
      } // if right functional
      else {
        rightArrow.setAttr('functional', false);
        rightArrow.children[0].setAttr('opacity', 0);
        rightArrow.children[1].setAttr('opacity', 0);
      } // else right non-funcitonal
    } // if values
    else if (type == 'functions') {
      var leftArrow = functionsArrows['left'];
      var rightArrow = functionsArrows['right']; 
      if (predicate.canMoveRight('functions')) {
        leftArrow.setAttr('functional', true);
        leftArrow.children[0].setAttr('opacity', .3);
        leftArrow.children[1].setAttr('opacity', .5);
      } // if left functional
      else {
        leftArrow.setAttr('functional', false);
        leftArrow.children[0].setAttr('opacity', 0);
        leftArrow.children[1].setAttr('opacity', 0);
      } // else left non-functional

      if (predicate.canMoveLeft('functions')) {
        rightArrow.setAttr('functional', true);
        rightArrow.children[0].setAttr('opacity', .3);
        rightArrow.children[1].setAttr('opacity', .5);
      } // if right functional
      else {
        rightArrow.setAttr('functional', false);
        rightArrow.children[0].setAttr('opacity', 0);
        rightArrow.children[1].setAttr('opacity', 0);
      } // else right non-funcitonal
    } // else if functions
    layers.menuArrow.draw();
  }, 1050);
}; // updateArrows

//LEFT CORNER BUTTONS
var bottomCover = new Kinetic.Rect({
  x:0,
  y:0,
  width: menuCornerWidth,
  height: menuHeight,
  fill:'#F1F8FF',
  name: 'cover'
});
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
    fill: menuControlTextColor,
    fontFamily: fonts.default,
    fontSize: fonts.menuSize
  });
  newGroup.add(newText);
return newGroup;
};
var resetButton = makeMenuButton('Reset Workspace', menuOffset, menuOffset);
var openButton = makeMenuButton('Open Workspace', menuOffset, (2*menuOffset) + menuControlHeight);
var saveButton = makeMenuButton('Save Workspace', menuOffset, (3*menuOffset) + 
  (2*menuControlHeight));

layers.menuControl.add(bottomCover);
layers.menuControl.add(resetButton);
layers.menuControl.add(openButton);
layers.menuControl.add(saveButton);
