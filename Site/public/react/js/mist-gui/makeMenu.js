import {functionStyle, menuStyle, valueStyle} from './styles.js';

/* create and add menu border */
const borderLine = new Kinetic.Line({
  points: [0, menuStyle.height, size.width, menuStyle.height],
  stroke: 'black',
  strokeWidth: 2
});

/* create and add menu buttons */
const valuesButton = new Kinetic.Group({
  x: menuStyle.cornerWidth
});

const valuesButtonBox = new Kinetic.Rect({
  x:0,
  y:0,
  width: menuStyle.buttonWidth,
  height: menuStyle.height,
  fill: valueStyle.menuColorLight,
  stroke: 'black',
  strokeWidth: 2
});
valuesButton.add(valuesButtonBox);

const valuesButtonRect = new Kinetic.Rect({
  x: menuStyle.buttonWidth / 2,
  y: menuStyle.height / 4,
  width: valueStyle.sideLength,
  height: valueStyle.sideLength,
  fill: valueStyle.menuColor,
  rotation: 45,
});
valuesButton.add(valuesButtonRect);

const valuesButtonText = new Kinetic.Text({
  text: 'add a value',
  x: 0,
  y: menuStyle.height / 2 + menuStyle.height / 4,
  width: menuStyle.buttonWidth,
  height: menuStyle.height / 4,
  fill: 'black',
  align: 'center',
  fontFamily: fonts.default,
  fontSize: fonts.menuSize
});
valuesButton.add(valuesButtonText);

const functionsButton = new Kinetic.Group({
  x: menuStyle.cornerWidth + menuStyle.buttonWidth
});

const functionsButtonBox = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: menuStyle.buttonWidth,
  height: menuStyle.height,
  fill: functionStyle.colorLight,
  stroke: 'black',
  strokeWidth: 2
});
functionsButton.add(functionsButtonBox);

const functionsButtonRect = new Kinetic.Rect({
  x: menuStyle.buttonWidth / 2 - functionStyle.rectSideLength / 2,
  y: menuStyle.height / 4,
  width: functionStyle.rectSideLength,
  height: functionStyle.rectSideLength,
  fill: functionStyle.color,
  lineJoin: 'round',
  stroke: functionStyle.color,
  strokeWidth: functionStyle.strokeWidth
});
functionsButton.add(functionsButtonRect);

const functionsButtonText = new Kinetic.Text({
  text: 'add a function',
  x: 0,
  y: menuStyle.height / 2 + menuStyle.height / 4,
  width: menuStyle.buttonWidth,
  height: menuStyle.height / 4,
  fill: 'black',
  align: 'center',
  fontFamily: fonts.default,
  fontSize: fonts.menuSize
});
functionsButton.add(functionsButtonText);

/**
 * toggle labels text
 */
const toggleTag = new Kinetic.Group ({
  x: (size.width / 90),
  y: menuStyle.height + (size.width / 90)
});

toggleTag.add(new Kinetic.Text({
  x:0,
  y:0,
  text: 'Turn Labels Off',
  fontFamily: fonts.default,
  fontSize: fonts.menuSize,
  fill: '#787878'
}));

/* add functions to menu */
const menuFunctions = [];
const funNames = Object.keys(functions);
for (var i = 0; i < funNames.length; i++) {
  menuFunctions[i] = makeFunctionGroup(funNames[i], menuStyle.functsXStart, menuStyle.ySpacing);
}

/* add values to menu */
const menuValues = [];
const valNames = Object.keys(values);
for (var i = 0; i < valNames.length; i++) {
  menuValues[i] = makeValueGroup(valNames[i], menuStyle.valuesXStart, menuStyle.ySpacing);
  layers.menu.add(menuValues[i]);
}


/**
 * addScrollArrows creates and returns an array of two groups 
 * (left arrow and right arrow)
 * takes "type" (either functions or values)
 */
const addScrollArrows = function(type) {
  var leftX = (type=='values') ? valuesButton.x() + menuStyle.buttonWidth : 
    functionsButton.x() + menuStyle.buttonWidth;
  var rightX = (type=='values') ? size.width - menuStyle.buttonWidth - menuStyle.arrowWidth : 
    size.width - menuStyle.arrowWidth
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
    width: menuStyle.arrowWidth,
    height: menuStyle.height,
    fill: menuStyle.arrowBoxFill,
    opacity: .1
  });
  leftArrow.add(leftArrowBox);
  var leftArrowTri = new Kinetic.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(menuStyle.triX, -menuStyle.triY);
      context.lineTo(menuStyle.triX, menuStyle.triY);
      context.closePath();
      context.fillStrokeShape(this);
    },
    x: size.width/250,
    y: menuStyle.height / 2,
    fill: menuStyle.arrowFill,
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
    width: menuStyle.arrowWidth,
    height: menuStyle.height,
    fill: menuStyle.arrowBoxFill,
    opacity: .1
  });
  rightArrow.add(rightArrowBox);

  var rightArrowTri = new Kinetic.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(-menuStyle.triX, -menuStyle.triY);
      context.lineTo(-menuStyle.triX, menuStyle.triY);
      context.closePath();
      context.fillStrokeShape(this);
    },
    x: size.width / 65,
    y: menuStyle.height / 2,
    fill: menuStyle.arrowFill,
    opacity: .2
  });
  rightArrow.add(rightArrowTri);

  return {left: leftArrow, right: rightArrow};
};
/* create arrow bars */
const valuesArrows = addScrollArrows('values');
const functionsArrows = addScrollArrows('functions');

/**
 * showScrollArrows changes visibility of the scroll arrows to true depending 
 * on the type given. type is either 'values' or 'functions'
 */
const showScrollArrows = function(type) {
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
const hideScrollArrows = function(type) {
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
const updateArrows = function(type) {
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
const bottomCover = new Kinetic.Rect({
  x:0,
  y:0,
  width: menuStyle.cornerWidth,
  height: menuStyle.height,
  fill:'#F1F8FF',
  name: 'cover'
});

const makeMenuButton = function(text, x, y) {
  var newGroup = new Kinetic.Group({
    x: x,
    y: y
  });
  var newRect = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: menuStyle.cornerWidth - (2 * menuStyle.offset),
    height: menuStyle.controlHeight,
    fill: menuStyle.controlColor,
    stroke: 'black',
    strokeWidth: .5,
    shadowColor: 'black',
    shadowEnabled: false
  });
  newGroup.add(newRect);
  var newText = new Kinetic.Text({
    x: 0,
    y: menuStyle.textOffset,
    width: menuStyle.cornerWidth - (2 * menuStyle.offset),
    height: menuStyle.controlHeight - menuStyle.textOffset,
    text: text,
    align: 'center',
    fill: menuStyle.controlTextColor,
    fontFamily: fonts.default,
    fontSize: fonts.menuSize
  });
  newGroup.add(newText);
  return newGroup;
};

const resetButton = makeMenuButton('Reset Workspace', menuStyle.offset, menuStyle.offset);
const openButton = makeMenuButton('Open Workspace', menuStyle.offset, (2*menuStyle.offset) + menuStyle.controlHeight);
const saveButton = makeMenuButton('Save Workspace', menuStyle.offset, (3*menuStyle.offset) + 
  (2*menuStyle.controlHeight));

export {
  addScrollArrows,
  borderLine,
  bottomCover,
  funNames,
  functionsArrows,
  functionsButton,
  functionsButtonBox,
  functionsButtonRect,
  functionsButtonText,
  hideScrollArrows,
  makeMenuButton,
  menuFunctions,
  menuValues,
  openButton,
  resetButton,
  saveButton,
  showScrollArrows,
  toggleTag,
  updateArrows,
  valNames,
  valuesArrows,
  valuesButton,
  valuesButtonBox,
  valuesButtonRect,
  valuesButtonText
};
