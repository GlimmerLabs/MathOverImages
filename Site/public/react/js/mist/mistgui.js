// GUI window width

var width = 900;/**
 * mistgui-globals.js
 *   Global variables for a MIST gui.  (Eventually, these should be fields
 *   within the object/prototype.)
 */
 
var height = 2 * width / 3;
var globalFont = 'Arial';
var functionFont = 'Courier New';



var currentWorkspace;

var functionStrokeWidth = width / 90;
var functionHalfStrokeWidth = functionStrokeWidth / 2;
var functionTotalSideLength = width / 20;
var functionRectSideLength = functionTotalSideLength - functionStrokeWidth;
var functionColor = '#3FAAA0';
var functionColorLight = '#C6F1ED';
var functionMultColor = '#5EC783';
var functionSingleColor = '#77C9E2';
var functionRGBcolor = '#AE88D6';

var valueSideLength = functionTotalSideLength / 1.414;
var valueMenuColor = '#F2937C';
var valueMenuColorLight = '#FDE6DD';
var valueXYColor = '#EFDC5C';
var valueTimeColor = '#FD9E54'
var valueMouseColor = '#E46868';
var valueConstantColor = '#F17C9D';

var menuFontSize = width/75; //12 when width = 900
var nodeFontSize = width / 56.25; //16 when width = 900
var globalScale = width/900; // for elements that are more difficult to scale (undo/redo)


var funNames = ['add', 'wrapsum', 'multiply', 'average', 'square', 'negate', 'sine', 'cosine', 'absolute', 'sign', 'mistif', 'rgb'];
var functions = {
  add:       {rep: 'sum',   max: 20, min: 2, prefix: 'sum', color: functionMultColor},
  multiply:  {rep: 'mult',   max: 20, min: 2, prefix: 'mult', color: functionMultColor},
  square:    {rep: 'sqr', max: 1, min: 1, prefix: 'square', color: functionSingleColor},
  negate:    {rep: 'neg',   max: 1,  min: 1, prefix: 'neg', color: functionSingleColor},
  sine:      {rep: 'sin', max: 1,  min: 1, prefix: 'sin', color: functionSingleColor},
  cosine:    {rep: 'cos', max: 1,  min: 1, prefix: 'cos', color: functionSingleColor},
  absolute:  {rep: 'abs', max: 1,  min: 1, prefix: 'abs', color: functionSingleColor},
  average:   {rep: 'avg', max: 20, min: 2, prefix: 'avg', color: functionMultColor},
  sign:      {rep: 'sign', max: 1,  min: 1, prefix: 'sign', color: functionSingleColor},
  wrapsum:   {rep: 'wsum', max: 20,  min: 2, prefix: 'wsum', color: functionMultColor},
  rgb:       {rep: 'rgb', max: 3,  min: 3, prefix: 'rgb', color: functionRGBcolor},
  mistif:    {rep: 'if', max: 3, min: 3, prefix: 'mistif', color: functionSingleColor}
}
var valNames = ['x', 'y', 'second', 'minute', 'hour', 'day', 'mouseX', 'mouseY', 'constant'];
var values = {
  x:        {rep: 'x', color: valueXYColor},
  y:        {rep: 'y', color: valueXYColor},
  second:   {rep: 't.s', color: valueTimeColor},
  minute:   {rep: 't.m', color: valueTimeColor},
  hour:     {rep: 't.h', color: valueTimeColor},
  day:      {rep: 't.d', color: valueTimeColor},
  constant: {rep: '#', color: valueConstantColor},
  mouseX:   {rep: 'm.x', color: valueMouseColor},
  mouseY:   {rep: 'm.y', color: valueMouseColor}
}

var imageBoxSideLength = width / 80;
var imageBoxColor = 'white';
var functionImageBoxOffset = width / 300;
var valueImageBoxOffset = width / 31;
var renderSideLength = width / 18;

var editableTextWidth = width / 15;
var editableTextHeight = width / 30;
var editableTextFont = width / 69;

var variableColor = {r: 197, g: 231, b: 109, a: .5};
var variableStrokeColor = '#A1C447';
var variableRadius = 1.4 * (functionTotalSideLength / 2);
var variableTextColor = '#62694F';
var variableWidth = Math.cos(Math.PI/6)*variableRadius;

var outletXOffset = width / 400;
var outletYOffset = functionRectSideLength / 3;
var outletColor =  '#C4C4C4';

var lineStrokeWidth = 2;

var dragShadowColor = 'black';
var selectedShadowColor = 'blue';

//SLIDING MENU
var menuHeight = width / 9; 
var menuCornerWidth = width / 6;
var buttonWidth = width / 10;
var valSpaceWidth = width - menuCornerWidth - (2 * buttonWidth);
var numVals = 6;//valNames.length;
var valMenuXSpacing = (valSpaceWidth - (numVals * functionTotalSideLength - 4)) / (numVals + 1);
var functSpaceWidth = width - menuCornerWidth - (2 * buttonWidth);
var numFuncts = 6; 
var functMenuXSpacing = (functSpaceWidth - (numFuncts * functionTotalSideLength)) / (numFuncts + 1);
var menuYspacing = width * 11/360;
var menuFunctsXStart = 2 * (buttonWidth - functionRectSideLength) + menuCornerWidth- functionTotalSideLength / 2;
var menuFunctsXEnd = width - buttonWidth + functionRectSideLength / 2;
var menuValuesXStart = menuCornerWidth + buttonWidth / 2;
var menuAnimDuration = 1;

//SCROLLING MENU BUTTONS
var arrowWidth = width / 50;
var arrowBoxFill = 'gray';
var arrowFill = 'black';
var triX = width / 90;
var triY = width / 60;

//CORNER BUTTONS
var menuOffset = 10;
var menuControlHeight = menuHeight / 5;
var menuControlColor = '#7FA7E7';
var menuControlSelect = '#9EBDF0'; 
var menuControlTextColor = 'black';
var menuTextOffset = menuControlHeight / 5;

//TOOLBOX
var toolboxWidth = width / 18; 
var toolboxHeight = width / 4.1; 
var toolboxShift = toolboxWidth / 5; 
var toolboxButtonSize = width / 30;
var deleteColor = '#A30F0F'; 

//FUNCTIONBAR
var funBarWidth = width;
var funBarHeight = height / 15;
var funBarBackgroundColor = menuControlColor;
var funBarOffset = funBarHeight * .17;
var funBarTextAreaWidth = funBarWidth * .75;
var funBarTextAreaHeight = funBarHeight * .66;
var funBarTextOffset = funBarOffset* 1.5;
var funBarDisplayFontSize = width / 40.9; 
var funBarFontSize = width / 75;
var funBarIconOffset = funBarWidth / 16;
var funBarIconSideLength = funBarHeight / 4;
var funBarIconTextWidth = width / 18;
var funBarIconTextY = funBarHeight - (funBarOffset * 1.3);

//SAVE SCREEN
var popRectColor = '#e8e8e8'
var popRectWidth = width * .4;
var popRectHeight = height * .85;
var popSaveGroupX = (width - popRectWidth) / 2;
var popSaveGroupY = (height - popRectHeight) / 2;

var popCanvasSide = popRectWidth * 0.9;
var popCanvasResolution = width * (3/9);
var popCanvasShiftX = popSaveGroupX + (popRectWidth - popCanvasSide) / 2;
var popCanvasShiftY = popSaveGroupY + (popRectWidth - popCanvasSide) / 2;

var popTextShiftX = (popRectWidth - popCanvasSide) / 2;
var popTextShiftY = ((popRectWidth - popCanvasSide) / 1.5) + popCanvasSide;
var popTextWidth = popCanvasSide;
var popTextFontSize = width / 56.25;
var popTextHeight = 2 * popTextFontSize;

var nameTextShift = width / 18;

var popButtonWidth = popCanvasSide / 3.4;
var popButtonHeight = popTextHeight / 1.25;
var popButtonShiftX = (popCanvasSide - (3 * popButtonWidth)) / 2;
var popButtonColor = '#A0A3A3';
var popButtonSelectedColor = '#B6BABA'

var errorColor = '#A11212';

// OPEN WS SCREEN
var popOpenWsRectWidth = width * .4;
var popOpenWsRectHeight = height * .16;
var popOpenWsGroupX = (width - popOpenWsRectWidth) / 2;
var popOpenWsGroupY = (height - popOpenWsRectHeight) / 2;

var popOpenWsButtonShiftX = popTextShiftX;//((popWsRectWidth / 2) - (2 * popWsButtonWidth)) / 3;
var popOpenWsButtonWidth = ((popOpenWsRectWidth / 2) - (3 * popOpenWsButtonShiftX)) / 2;
var popOpenWsButtonHeight = popOpenWsRectWidth * .06;


var RGBoutletColors = ['#C94949','#2D9C2D','#4272DB'];


// TOOLBOX BOOLEANS
 var lineToolOn = false;
 var workToolOn = false;
 var deleteToolOn = false;

//MENU BOOLEANS
var valueExpanded = false;
var functionExpanded = false;
var tagsOn = true;

/* variables to globally reference the most recently used object/line and current state */
var currShape;
var currLine;
var dragShape = null;
var scaledObj = null;
var openTag;
var map = [];

//OTHER BOOLEANS
var makingLine = false;
var animation = false;


// CONSTANTS

/** 
 * The offset in an operation node to the set of offsets.
 */
var OUTLET_OFFSET = 3;


/**
 * Layers of the workspace:
 * 1. The line layer holds connecting lines between nodes in the work area.
 * 2. The menu layer holds the buttons that users can click on to drag a new node into
 *    the work area.
 * 3. The menuButton layer holds the super buttons that are used to expand the menus.
 * 4. The menuArrowLayer holds the arrows for the scrolling menus. 
 * 4. The menuControlLayer contains the buttons to save/open/reset the workspace
 * 5. The toolboxLayer holds the draggable toolbox
 * 6. The work layer holds all active nodes that are either connected or available to
 *    be connected.
 * 7. The border layer stores static elements of the page such as dividing lines.
 * 8. The funBar layer contains the elements of the funBar at the bottom of the screen.
 * 9. The drag layer holds nodes while they are being moved about the workspace.
 * 10. The text layer hold the editabe text boxes for constant values and funtion text.
 * 11. The labelLayer contains informative labels that appear on mouseover
 * 12. The screenLayer contains pop-up windows for meta events
 * 13. The renderLayer contains the large rendered canvas when saving an image.
 */

 var lineLayer = new Kinetic.Layer();
 var menuLayer = new Kinetic.Layer();
 var menuButtonLayer = new Kinetic.Layer();
 var menuArrowLayer = new Kinetic.Layer();
 var menuControlLayer = new Kinetic.Layer();
 var toolboxLayer = new Kinetic.Layer();
 var workLayer = new Kinetic.Layer();
 var borderLayer = new Kinetic.Layer();
 var funBarLayer = new Kinetic.Layer();
 var dragLayer = new Kinetic.Layer();
 var textLayer = new Kinetic.Layer();
 var labelLayer = new Kinetic.Layer();
 var screenLayer = new Kinetic.Layer();
 var renderLayer = new Kinetic.Layer();
//UTILITY FUNCTIONS



 // METHODS

/**
 * addOutlet takes a function group funGroup and adds an outlet to it, expanding the node if there is not enough space for the outlet.
 */
  var addOutlet = function(funGroup) {
    if(funGroup.children.length - OUTLET_OFFSET < funGroup.attrs.maxInputs) {
      if(funGroup.children.length - OUTLET_OFFSET > 2) {
        funGroup.children[0].setAttr('height',
          funGroup.children[0].attrs.height + outletYOffset);
        funGroup.children[1].setAttr('y', funGroup.children[1].attrs.y + outletYOffset / 2);
        funGroup.children[2].setAttr('y', funGroup.children[2].attrs.y + outletYOffset);
        var lineOut = funGroup.attrs.lineOut
        for (var i = 0; i < lineOut.length; i++) {
          var line = lineOut[i];
          line.points()[1] = funGroup.y() + (funGroup.children[0].height() + functionStrokeWidth) / 2;
        } // for the lineout array
      } // if we have 3 outlets already (we need to expand the node)
      var newOutlet = makeOutlet(funGroup);
      funGroup.add(newOutlet);
      if (funGroup.name() == 'rgb') {
        newOutlet.setAttr('fill', RGBoutletColors[newOutlet.attrs.outletIndex]);
      } // if the function is an rgb
      workLayer.draw();
      if (funGroup.attrs.renderLayer != null){
        funGroup.attrs.renderLayer.draw();
      } // if there is already a renderLayer, clear it with .draw()
    } // if we arent at the maximum allowed inputs
};

/**
 * removeOutlet takes a function node (funGroup) and deletes the last outlet
    -checks if there are above the minimum number of outlets.
    -the outlet is removed
    -the function node is scaled properly
 */
var removeOutlet = function(funGroup) {
  // destroy outlet if number of remaning outlets would still be above minimum
  if (funGroup.attrs.minInputs < funGroup.children.length - OUTLET_OFFSET) {
    var outletIndex = funGroup.children.length - 1;
    var outlet = funGroup.children[outletIndex];
    if (outlet.attrs.lineIn == null) {
      outlet.destroy();
      if(funGroup.children.length - OUTLET_OFFSET > 2) {
        funGroup.children[0].setAttr('height',
                                     funGroup.children[0].attrs.height - outletYOffset);
        funGroup.children[1].setAttr('y', funGroup.children[1].attrs.y - (outletYOffset / 2));
        funGroup.children[2].setAttr('y', funGroup.children[2].attrs.y - outletYOffset);
        var lineOut = funGroup.attrs.lineOut;
        for (var i = 0; i < lineOut.length; i++) {
          var line = lineOut[i];
          line.points()[1] = funGroup.y() + (funGroup.children[0].height() + functionStrokeWidth) / 2;
        } // for the lineout array
      } // if there are still more than 2 outlets (we need to shrink the node)
      workLayer.draw();
      if (funGroup.attrs.renderLayer != null){
        funGroup.attrs.renderLayer.draw();
      } // if there is already a renderLayer, clear it with .draw()
    } // if the outlet doesnt have an input
  } // if above minumum number of outlets
};

var setOutletOpacity = function(group) {
  if (isFunction(group)) {
    for (var i = OUTLET_OFFSET; i < group.children.length; i++){
      var outlet = group.children[i];
      if (outlet.attrs.lineIn) {
        outlet.setAttr('opacity', 1);
      } // if the outlet has an input
      else {
        outlet.setAttr('opacity', .7);
      } // else the outlet is empty
    }
  }
}

/**
 * findRenderFunction takes a group and, if the group has sufficient inputs, finds the 
 * renderFunction that should be used to create an image for output.
 * NOTE: this will always recalculate the entire function
 */
 var findRenderFunction = function(group) {
  if(isValue(group)) {
    group.attrs.renderFunction = group.attrs.rep;
    return;
  } // if its a value it has its own render function
  group.attrs.renderFunction = functions[group.attrs.name].prefix + '(';
  for(var i = 3; i < group.children.length; i++) {
    if(group.children[i].attrs.lineIn != null) {
      group.attrs.renderFunction += group.children[i].attrs.lineIn.attrs.source.attrs.renderFunction;
      group.attrs.renderFunction += ',';
    }
  } // add each element to the equation
  group.attrs.renderFunction = group.attrs.renderFunction.substring(0, group.attrs.renderFunction.length - 1) + ')';
};

/**
 * updateFunBar changes the text in the funBar according to the currShape.
 */
var updateFunBar = function() {
  if (currShape && assertRenderable(currShape)) {
    currText = currShape.attrs.renderFunction;
    var currFontSize;
    if (currText.length <= 50) {
      currFontSize = funBarDisplayFontSize;
    } 
    else if (currText.length >= 110) {
      currFontSize = 10;
    }
    else {
      currFontSize = 1100 / currText.length;
    }
    funBarText.setAttrs({
      text: currText,
      fontSize: currFontSize
    });
    enableSaveImage();
  } // if the currShape exists and it is renderable
  else {
    funBarText.setAttr('text', '');
    disableSaveImage();
  } // else we dont have a renderable currShape
  funBarLayer.draw();
};

/**
 * renderCanvas takes a function or value group and renders a 50x50 image
 * with the same top left coordinate as the image box for that group.
 */
var renderCanvas = function(group) {
  var currLayer = group.attrs.renderLayer; 
  if (currLayer == null) {
    currLayer = new Kinetic.Layer();
    group.setAttr('renderLayer', currLayer);
    stage.add(currLayer);
  } // if there is no currLayer
  group.children[2].setAttrs({
    width: renderSideLength,
    height: renderSideLength
  });
  var box = group.children[2];
  currLayer.draw();
  canvas = currLayer.canvas._canvas;
  var groupScale = group.attrs.scaleX;
  var canvasX = group.x() + (groupScale * box.x());
  var canvasY = group.y() + (groupScale * box.y());
  var canvasWidth = groupScale * box.width();
  var canvasHeight = groupScale * box.height();
  var mistObj = MIST.parse(group.attrs.renderFunction);
  /*
  MIST.render(mistObj, {}, canvas, canvasWidth, canvasHeight, 
    canvasX, canvasY, 
    canvasWidth, canvasHeight);
   */
  var animator = new MIST.ui.Animator(group.attrs.renderFunction, [], {}, 
    canvas, function() { });
  animator.bounds(canvasX,canvasY,canvasWidth,canvasHeight);
  animator.setResolution(canvasWidth,canvasHeight);
  animator.frame();
  group.attrs.animator = animator;
};

/**
 * collapseCanvas takes a group and, if the group has an renderlayer, it closes the 
 * renderLayer and the imagebox
 */
var collapseCanvas = function(group){
  if (group.attrs.renderLayer) {
    group.attrs.animator.stop();
    group.attrs.animator = null;
    group.attrs.renderLayer.destroy();
    group.attrs.renderLayer = null;
    group.children[2].setAttrs({
      width: imageBoxSideLength,
      height: imageBoxSideLength,
      expanded: false
    }); 
  } // if there is a renderLayer for the group
};

/**
 * updateForward takes a group and makes sure all groups for which it is a source are
 * accurate. To be used whenever a function's inputs are changed, or when a node is
 * deleted.
 */
var updateForward = function(group) {
  for (var i = 0; i < group.attrs.lineOut.length; i++) {
    var lineOutGroup = group.attrs.lineOut[i].attrs.outlet.parent;
    assertRenderable(lineOutGroup);
    updateForward(lineOutGroup);
  }
};

 /* disableButton take a tool group from the tool box, turns off its functionality and disables its shadow. */
 var disableTool = function(toolGroup) {
  toolGroup.children[0].setAttr('shadowEnabled', false);
  var name = toolGroup.name();
  if (name == 'workTool') {
    workToolOn = false;
  } 
  else if (name == 'lineTool') {
    lineToolOn = false;
  }
  else {
    deleteToolOn = false;
  }
 };

 var enableWorkTool = function() {
  workToolGroup.children[0].setAttr('shadowEnabled', true);
  workToolOn = true;
  disableTool(lineToolGroup);
  disableTool(deleteToolGroup);
  toolboxLayer.draw();
 };



/**
 * setDragShadow takes a function or value group and activates drag shadow
 */
 var setDragShadow = function(group) {
  group.children[0].setAttrs({
    shadowColor: dragShadowColor,
    shadowEnabled: true
  });
 };

/**
 * setSelectedShadow takes a function or value group and activates a shadow to signify it's selected
 */
 var setSelectedShadow = function(group) {
  group.children[0].setAttrs({
    shadowColor: selectedShadowColor,
    shadowEnabled: true
  });
 };

 /*
  * removeShadow takes a function or value group and removes the shadow
  */
var removeShadow = function(group) {
  if (group){
    group.children[0].setAttr('shadowEnabled', false);
  }
};

/**
 * replaceNode takes an old node and a new node and replaces the old node with
 *  the new one, removing the old one from the layer.
 */
 var replaceNode = function(oldNode, newNode) {
  var tempOut = oldNode.attrs.lineOut;
  collapseCanvas(oldNode);
  oldNode.remove();
  if (newNode.attrs.name == 'constant' && !newNode.children[3]) {
        createEditableText(newNode);
    }
  for(var i = 0; i < tempOut.length; i++) {
    tempOut[i].attrs.source = newNode;
  }
  newNode.attrs.lineOut = tempOut;
  // Theres more to do if we are replacing a function:
  if (isFunction(newNode) && isFunction(oldNode)) {
    // check if oldNode allows more inputs than newNode
    if (newNode.attrs.maxInputs < oldNode.children.length - OUTLET_OFFSET) {
      // add appropriate outlets to newNode
      while (newNode.children.length < newNode.attrs.maxInputs + OUTLET_OFFSET) {
        addOutlet(newNode);
      }
      var outletIndex = OUTLET_OFFSET; // which outlet we are applying the next input to
      for(var i = OUTLET_OFFSET; i < newNode.attrs.maxInputs + OUTLET_OFFSET; i++) {
        if (oldNode.children[i].attrs.lineIn) {
          newNode.children[outletIndex].attrs.lineIn = oldNode.children[i].attrs.lineIn;
          newNode.attrs.numInputs++;
          newNode.children[outletIndex].attrs.lineIn.attrs.outlet = newNode.children[outletIndex];
          outletIndex++;
        }
      }
      while (i < oldNode.children.length) {
        if(oldNode.children[i].attrs.lineIn) {
          removeLine(oldNode.children[i].attrs.lineIn);
        }
        i++;
      }
    } 
    else {
      addOutlet(newNode);
      var outletIndex = OUTLET_OFFSET;
      for (var i = OUTLET_OFFSET; i < oldNode.children.length; i++) {
        if (oldNode.children[i].attrs.lineIn) { 
          newNode.children[outletIndex].attrs.lineIn = oldNode.children[i].attrs.lineIn;
          newNode.attrs.numInputs++;
          newNode.children[outletIndex].attrs.lineIn.attrs.outlet = newNode.children[outletIndex];
          addOutlet(newNode);
          outletIndex++;
        }
      } 
    }
    while (newNode.children.length - OUTLET_OFFSET < newNode.attrs.minInputs) {
      addOutlet(newNode);
    }
    resetNode(oldNode); 
  }
  else if (newNode.attrs.name == 'constant') {
    if (isRenderable(newNode)) {
      for (var i = 3; i < 5; i++) {
        newNode.children[i].setAttr('visible', false);
        workLayer.draw();
      }
    }
  }
  assertRenderable(newNode);
  updateForward(newNode);
  lineLayer.draw();
  workLayer.draw();
 };

/**
 * resetNode take a function or value group and returns it to it's original state.
 * - deletes all outlets
 * - resets height (if function)
 * - resets location of imagebox
 * - resets location of text
 * - sets numInputs to zero
 * - sets lineOut array to an empty array
 * returns nothing.
 */
 var resetNode = function(node) {
  // set lineOut array to []
  node.attrs.lineOut = [];
  if (isFunction(node)) {
    // destroy the outlets of the oldNode
    for (var i = node.children.length - 1; i > 2; i--) {
      node.children[i].destroy();
    }
    // reset height
    node.children[0].setAttr('height', functionRectSideLength);
    // reset location of text
    node.children[1].setAttr('y', functionTotalSideLength/2 - functionHalfStrokeWidth);
    // reset imagebox location
    node.children[2].setAttr('y', functionRectSideLength + functionImageBoxOffset);
    // set numInputs to zero
    node.attrs.numInputs = 0;
    //setOutletOpacity(node);
  }
 };

/**
 * wrapValueText takes a string and trucates after 4 characters and adds "..." to the end
 * used for constant values.
 */
var wrapValueText = function(text) {
  if (text.length > 4) {
    return text.substring(0,4) + "\n...";
  }
  else {
    return text;
  }
};

/**
 * applyDragBounds takes a function or value group and allows it to only be dragged 
 * in the workspace below the menu
 */
var applyDragBounds = function(group) {
  var bottomBoundOffset = functionTotalSideLength + funBarHeight;
  group.setAttr('dragBoundFunc', function(pos) {
      var newY = pos.y <= menuHeight ? menuHeight + 1 :
                 pos.y > height - bottomBoundOffset ? height - bottomBoundOffset :
                 pos.y;
      var newX = pos.x < 0 ? 0 :
                 pos.x > (width - functionTotalSideLength) ? (width - functionTotalSideLength) :
                 pos.x;
      return { x: newX, y: newY };
  });
};

var enableSaveImage = function() {
  funBarSaveImCover.setAttrs({
    stroke: 'black',
    fill: valueMenuColor
  });
  funBarSaveImText.setAttr('fill', 'black');
};

var disableSaveImage = function() {
  funBarSaveImCover.setAttrs({
    stroke: 'grey',
    fill: valueMenuColorLight
  });
  funBarSaveImText.setAttr('fill', 'grey');
};

var enableSaveFunction = function() {
  funBarSaveImCover.setAttrs({
    stroke: 'black',
    fill: functionColor
  });
  funBarSaveImText.setAttr('fill', 'black');
};

var disableSaveFunction = function() {
  funBarSaveImCover.setAttrs({
    stroke: 'grey',
    fill: functionColorLight
  });
  funBarSaveImText.setAttr('fill', 'grey');
};
/*
isFunction determines if target is a functionGroup and returns a boolean value. 
target is an object.
*/
var isFunction = function(target) {
	return (target.attrs.maxInputs != null);
};

/*
isValue determines if target is a valueGroup and returns a boolean value. 
target is an object.
*/
var isValue = function(target) {
	return (target.attrs.maxInputs == null && target.nodeType == 'Group');
};

var isVariable = function(target) {
	return (target.name() == 'variable');
}

/*
isOutlet determines if target is an outletGroup and returns a boolean value. 
target is an object.
*/
var isOutlet = function(target) {
	return (target.name() != null && target.attrs.name.substring(0,6) == 'outlet');
};

/*
isLine determines if target is a line and returns a boolean value. 
target is an object.
*/
var isLine = function(target) {
	return (target.className == 'Line');
};

/*
isImageBox determines if target is an image box and returns a boolean value. 
target is an object.
*/
var isImageBox = function(target) {
	return (target.name() != null && target.attrs.name == 'imageBox');
};

/*
isDrawTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
var isDrawTool = function(target) {
	return (target.name() != null && target.attrs.name == 'draw');
};

/*
isDeleteTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
var isDeleteTool = function(target) {
	return (target.name() != null && target.attrs.name == 'delete');
};

/*
isToolControl determines if target is the tool group controller on the pallette and returns a boolean value. 
target is an object.
*/
var isToolControl = function(target) {
	return (target.name() != null && target.attrs.name == 'toolControl');
};

/*
isRedoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
var isRedoTool = function(target) {
	return (target.name() != null && target.attrs.name == 'redo');
};

/*
isUndoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
var isUndoTool = function(target) {
	return (target.name() != null && target.attrs.name == 'undo');
};

/**
 * isRenderable takes a node, and returns true if it is a value group or a
 * function group with sufficient inputs, and false if it is a function group
 * with insufficient inputs.
 */
 var isRenderable = function(group) {
 	if (isValue(group)) {
 		if (group.attrs.rep != '#') {
 			return true;
 		}
 		else {
 			return false;
 		}
 	} else {
 		var validInputs = 0;
 		for(var i = OUTLET_OFFSET; i < group.children.length; i++) {
 			lineIn = group.children[i].attrs.lineIn;
 			if (lineIn != null && isRenderable(lineIn.attrs.source)) {
 				validInputs++;
 			}
 		}
 		return validInputs >= group.attrs.minInputs && validInputs == group.attrs.numInputs;
 	}
 };

 var isCycle = function(sourceGroup, outletGroup) {
 	var lineOut = outletGroup.attrs.lineOut;
 	if (lineOut.length === 0) {
 		return false;
 	}
 	for(var i = 0; i < lineOut.length; i++) {
 		if (sourceGroup == lineOut[i].attrs.outlet.parent) {
 			return true;
 		} else if (isCycle(sourceGroup, lineOut[i].attrs.outlet.parent) ) {
 			return true;
 		}
 	}
 	return false;
 };

 /**
 * assertRenderable takes a function group and checks if it is renderable. 
 * If true, it finds the renderFunction for the group, makes the imageBox visible 
 * and returns true. If false, it makes the imageBox invisible and returns false.
 */
 var assertRenderable = function(group) {
 	if (isRenderable(group)) {
 		findRenderFunction(group);
 		group.children[2].setAttr('visible', true);
 		if (group.attrs.animator) {
 			group.attrs.animator = null;
 			renderCanvas(group);
 		}
 		return true;
 	} 
 	else {
 		group.attrs.renderFunction = null;
 		group.children[2].setAttr('visible', false);
 		if(group.attrs.renderLayer != null) {
 			animation = false;
 			collapseCanvas(group);
 		}
 		return false;
 	}
 };

 /**
  * canMoveRight tests if either the functions or values in the menu can be moved 
  * to the right and returns a boolean.
  */
var canMoveRight = function(type) {
  return ((type == 'values' && 
    menuValues[0].x() < (menuCornerWidth + buttonWidth + valMenuXSpacing)) ||
    (type == 'functions' && 
    menuFunctions[0].x() < (menuCornerWidth + 2 * buttonWidth + functMenuXSpacing)))
};
/**
 * canMoveLeft tests if either the functions or values in the menu can be moved
 * to the left and returns a boolean.
 */
var canMoveLeft = function(type) {
	return ((type == 'values' &&
	  menuValues[menuValues.length - 1].x() > width - buttonWidth) ||
      (type == 'functions' && 
	  menuFunctions[menuFunctions.length - 1].x() > width))
};// Create functions to Move Menu Items
	/* move the valueGroups in the menu to their original location. */
	var moveValueNodesIn = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var moveValue = makeMenuTween(menuValues[i], menuValuesXStart, false);
			moveValue.play();
		}
	};
	/* move the valueGroups to their expanded location. */
	var expandValueNodes = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var moveValue = makeMenuTween(menuValues[i], menuCornerWidth + buttonWidth + valMenuXSpacing + i * (valMenuXSpacing + functionTotalSideLength), true);
			moveValue.play();
		}
	};
	/* move valueGroups to the right */
	var shiftValueNodesRight = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var target = menuValues[i];
			var moveValue = makeMenuTween(target, target.x() + valSpaceWidth - valMenuXSpacing, true);
			moveValue.play();
		}
	};
	/* move valueGroups to the left */
	var shiftValueNodesLeft = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var target = menuValues[i];
			var moveValue = makeMenuTween(target, target.x() - valSpaceWidth + valMenuXSpacing, true);
			moveValue.play();
		}
	};
	/* move the functionGroups to their original position. */
	var moveFunctionNodesIn = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuFunctsXStart, false);
			moveFunction.play();
		}
	};
	/* move the functionGroups to the right of the screen. (For when values are expanded).*/
	var moveFunctionNodesRight = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuFunctsXEnd, false);
			moveFunction.play();
		}
	};
	/* move the functionGroups to their expanded position. */
	var expandFunctionNodes = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuCornerWidth + 2 * buttonWidth + functMenuXSpacing + i * (functMenuXSpacing + functionTotalSideLength), true)
			moveFunction.play();
		}
	};
	/* move the functionsButton to the right of the screen (for when values are expanded). */
	var moveFunctionsButtonRight = function() {
		var moveButton = makeMenuTween(functionsButton, width - buttonWidth, true)
		moveButton.play();
	};
	/* move the functionsButon to it's original position. */
	var moveFunctionsButtonLeft = function() {
		var moveButton = makeMenuTween(functionsButton, menuCornerWidth + buttonWidth, true)
		moveButton.play();
	};
	/* move functionGroups to the right */
	var shiftFunctionNodesRight = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var target = menuFunctions[i];
			var moveValue = makeMenuTween(target, target.x() + functSpaceWidth - functMenuXSpacing, true);
			moveValue.play();
		}
	};
	/* move functionGroups to the left */
	var shiftFunctionNodesLeft = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var target = menuFunctions[i];
			var moveValue = makeMenuTween(target, target.x() - functSpaceWidth + functMenuXSpacing, true);
			moveValue.play();
		}
	};// CONSTRUCTORS

/*
  Function nodes and Value nodes are groups of objects. Members of groups can
  be accessed through the array 'group'.children[].
  Children are stored in the following order:
  0. Underlying Shape
  1. Text
  2. render box
  3+. Outlet nodes (only for functions)
  */


/* 
  makeFunctionGroup takes a string funName, a key in the functions object above,
  an integer x, and an integer y, and returns the corresponding function node object,
  with top right corner at the given x, y coordinate.
  */
  var makeFunctionGroup = function(funName, x, y) {
    /* create group that will contain information on the function and the shapes 
      making up the representation on screen. */
    var newGroup = new Kinetic.Group({
      name: funName,
      x: x - functionHalfStrokeWidth,
      y: y,
      numInputs: 0, 
      maxInputs: functions[funName].max, 
      minInputs: functions[funName].min, 
      lineOut: [], 
      rep: functions[funName].rep,
      prefix: functions[funName].prefix, 
      separator: functions[funName].separator,
      renderFunction: null,
      visible: false,
      renderLayer: null,
      scaleX: 1,
      scaleY: 1
    });
    /* create rectangle shape */
    var newRect = new Kinetic.Rect({
      name: funName,
      x: functionHalfStrokeWidth,
      y: functionHalfStrokeWidth,
      width: functionRectSideLength,
      height: functionRectSideLength,
      fill: functions[funName].color,
      lineJoin: 'round',
      stroke: functions[funName].color,
      strokeWidth: functionStrokeWidth
    });
    newGroup.add(newRect);
    /* create text to be displayed on top of rectangle */
    var newText = new Kinetic.Text({
      text: functions[funName].rep,
      fontFamily: globalFont,
      fill: 'black',
      fontSize: nodeFontSize,
      x: 0,
      y: functionTotalSideLength/2 - functionHalfStrokeWidth,
      width: functionTotalSideLength,
      align: 'center'
    });
    newGroup.add(newText);
    /* create small box in the bottom right corner. Initially, it is not visible.*/
    var newBox = new Kinetic.Rect({
      name: 'imageBox',
      x: functionRectSideLength + functionImageBoxOffset,
      y: functionRectSideLength + functionImageBoxOffset,
      width: imageBoxSideLength,
      height: imageBoxSideLength,
      fill: imageBoxColor,
      stroke: 'black',
      strokeWidth: .5,
      visible: false,
      expanded: false
    });
    newGroup.add(newBox);

    return newGroup;
  };


/*
  makeValueGroup takes a string valName, the name of a key in the values object above,
  an integer x, and an integer y, and returns the corresponding function node object,
  centered at (x + width / 40, y + width / 40).
  */
  var makeValueGroup = function(valName, x, y) {
    /* create group that contains information on the value and shapes to be displayed. */
    var newGroup = new Kinetic.Group({
      name: valName,
      x: x,
      y: y,
      lineOut: [],
      visible: false,
      renderFunction: values[valName].rep,
      rep: values[valName].rep,
      renderLayer: null,
      scaleX: 1,
      scaleY: 1
    });
    /* create diamond shape. */
    var newRect = new Kinetic.Rect({
      x: functionRectSideLength/2,
      y: 0,
      width: valueSideLength,
      height: valueSideLength,
      fill: values[valName].color,
      rotation: 45,
      name: valName
    });
    newGroup.add(newRect);
    /* create text to be displayed on diamond. */
    var newText = new Kinetic.Text({
      text: values[valName].rep,
      fontFamily: globalFont,
      fill: 'black',
      fontSize: nodeFontSize,
      x: 0,
      y: valueSideLength/2,
      width: functionRectSideLength,
      align: 'center'
    });
    newGroup.add(newText);
    /* create small box in bottom right corner. Originally not visible. */
    var newBox = new Kinetic.Rect({
      name: 'imageBox',
      x: valueImageBoxOffset,
      y: valueImageBoxOffset,
      width: imageBoxSideLength,
      height: imageBoxSideLength,
      fill: imageBoxColor,
      stroke: 'black',
      strokeWidth: .5,
      visible: false,
      expanded: false
    });
    newGroup.add(newBox);

    return newGroup;
  };

/* 
  makeVariableGroup an integer x, and an integer y, and returns a variable node
  that can be used as a temporary input, and exported as an empty outlet for a function

  var hex = makeVariableGroup(500, 500);
  hex.setAttr('visible', true);
  workLayer.add(hex);
  workLayer.add(hex);
  */
  var makeVariableGroup = function(x, y) {
    /* initialize group for the variable */
    var newGroup = new Kinetic.Group({
      name: 'variable',
      x: x,
      y: y,
      lineOut: [],
      visible: false,
    });
    /* create circle shape. */
    var newHex = new Kinetic.RegularPolygon({
      sides: 6,
      x: variableWidth,
      y: variableRadius,
      radius: variableRadius,
      fillRed: variableColor['r'],
      fillGreen: variableColor['g'],
      fillBlue: variableColor['b'],
      fillAlpha: variableColor['a'],
      stroke: variableStrokeColor,
      strokeWidth: 2,
      name: 'variableHex'
    });
    newGroup.add(newHex);
    /* create text to be displayed below hex. */
    var newText = new Kinetic.Text({
      text: "",
      fontFamily: globalFont,
      fill: variableTextColor,
      fontSize: 16,
      x: 0,
      y: (-.5 * variableRadius),
      width: 2 * variableWidth,
      align: 'center'
    });
    newGroup.add(newText);

    return newGroup;
  };

/*
  makeOutlet takes a function node object, functGroup, and returns an outlet node object 
  to be added to that group.
  It DOES NOT add the outlet to the group.
  */
  var makeOutlet = function(functGroup) {
    var bezPoint = width / 50;
    var outlet = new Kinetic.Shape({
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(0, 0);
        context.bezierCurveTo(-bezPoint, -bezPoint, -bezPoint, bezPoint, 0, 0);
        context.closePath();
        context.fillStrokeShape(this);
      },
      name: 'outlet' + (functGroup.children.length - OUTLET_OFFSET),
      x:functGroup.children[0].x() + outletXOffset,
      y:functGroup.children[0].y() + (functGroup.children.length - OUTLET_OFFSET) * 
        outletYOffset + functionHalfStrokeWidth,
      fill: outletColor,
      opacity: 1,
      stroke: 'black',
      strokeWidth: 1,
      lineIn: null,
      outletIndex: functGroup.children.length - OUTLET_OFFSET
    });
    return outlet;
  };
/*
  makeLine takes either a functionGroup object or valueGroup object as input
  (source) and creates a line that begins at the left edge of source. 
  */
  var makeLine = function(source) {
    var yOffset;
    if (isFunction(source)) {
      yOffset = (source.children[0].height() + functionStrokeWidth) / 2;
    }
    else {
      yOffset = functionTotalSideLength / 2;
    }
    //console.log(yOffset);
    var newLine = new Kinetic.Line({
      points: [
      source.x() + functionRectSideLength - 3,
      source.y() + yOffset,
      source.x() + functionTotalSideLength,
      source.y() + yOffset,
      ],
      stroke: 'black',
      strokeWidth: lineStrokeWidth,
      source: source,
      sourceIndex: source.attrs.lineOut.length,
      outlet: null,

    });
    return newLine;
  }
/*
makeMenuTween takes a node (target), an integer (xEnd), and a boolean (visibility).
It returns a kinetic tween that will move target to xEnd, without changing y value,
and with the visibility to the specified boolean values.
*/
var makeMenuTween = function(target, xEnd, visibility) {
  return new Kinetic.Tween({
    node: target,
    duration: menuAnimDuration,
    x: xEnd,
    visible: visibility,
    easing: Kinetic.Easings.StrongEaseOut
  });
};

/**
 * addLine adds a line between source and sink, connecting to sink via the outletIndex-th outlet
 * @pre
 *   sink.children[outletIndex + 3] is an unused outlet
 */
var addLine = function(source, sink, outletIndex) {
  if (outletIndex == undefined) {
    throw "addLine requires an outlet index";
  }
  var line = makeLine(source);
  while (!sink.children[outletIndex + OUTLET_OFFSET]) {
    addOutlet(sink);
  } // If there aren't enough outlets add a new one
  var outlet = sink.children[outletIndex + OUTLET_OFFSET];
  source.attrs.lineOut[source.attrs.lineOut.length] = line;
  outlet.attrs.lineIn = line;
  line.attrs.outlet = outlet;
  line.points()[2] = sink.x();
  line.points()[3] = sink.y() + sink.children[outletIndex + OUTLET_OFFSET].y();
  assertRenderable(sink);
  sink.attrs.numInputs++;
  if (sink.attrs.numInputs == sink.children.length - OUTLET_OFFSET &&
       sink.attrs.numInputs < sink.attrs.maxInputs) {
    addOutlet(sink);
  } // if it's an appropriate number
  updateForward(sink);
  line.setAttr("visible",true);
  lineLayer.add(line);
  insertToTable(line);
  workLayer.draw();
  lineLayer.draw();
  dragLayer.draw();
};

/**
 * addOp adds a function object to the workLayer at x, y, with the corresponding attributes given 
 * by the funName key.
 */
var addOp = function(funName, x, y) {
  var op = makeFunctionGroup(funName, x + functionHalfStrokeWidth, y);
  op.setAttr("visible",true);
  addOutlet(op);
  addOutlet(op);
  if (funName == "rgb") {
    addOutlet(op);
  }
  applyDragBounds(op);
  workLayer.add(op);
  insertToTable(op);
  workLayer.draw();
  return op;
};
/**
 * addVal adds a value object to the workLayer at x, y, with the corresponding attributes given 
 * by the valName key.
 */
var addVal = function(valName, x, y) {
  if (valName.substring(0, 8) == 'constant') {
    var constant = valName.substring(8);
    var val = makeValueGroup('constant', x, y);
    if (constant) {
      val.setAttr('rep', constant);

      val.children[1].setAttrs({text: wrapValueText(constant), fontSize: 13});
    } // if valName is concatenated with a value
  } // if valName is a constant
  else {
    var val = makeValueGroup(valName, x, y);
  }
  assertRenderable(val);
  val.setAttr("visible",true);
  applyDragBounds(val);
  workLayer.add(val);
  insertToTable(val);
  workLayer.draw();
  return val;
};

var createEditableText = function (group) { 
  var backgroundBox = new Kinetic.Rect({
    x: -((editableTextWidth - functionTotalSideLength) / 2) - 4,
    y: functionTotalSideLength + 5,
    width: editableTextWidth,
    height: editableTextHeight,
    fill: 'white',
    stroke: 'black',
    strokeWidth: .5
  });
  var editableTextBox = new Kinetic.Text({
    x: -((editableTextWidth - functionTotalSideLength) / 2) -4,
    y: functionTotalSideLength + 5,
    text: 'Enter a Value',
    fontSize: editableTextFont,
    width: editableTextWidth,
    height: editableTextHeight,
    align: "center",
    fontFamily: functionFont,
    fill: 'black'
  });
  group.add(backgroundBox);
  group.add(editableTextBox);
  editableTextBox.setEditable(true);
  editableTextBox.aligned = "center";
  editableTextBox.matchingCharacters = /^-?[0-9]*\.?[0-9]*$/;
  editableTextBox.defaultText = 'Enter a Value';
  editableTextBox.drawMethod = function(){
    workLayer.draw()
  };
};

/**
 * EditableText.js
 *   A library to support editable text in Kinetic.js.
 */

// +-------+---------------------------------------------------------
// | Notes |
// +-------+

/*
   1. To use this library,
      a. Create your stage.
      b. Add the line `readEditing(stage)` to prepare the stage
         for editing
      c. For any text field that you want editable, call
         `field.setEditable(true)`.  
      d. For any text field that you want editable, set up an
         appropriate `draw` method.  A good default is the enclosing
         layer.  For example,
         `text.drawMethod = function(){text.parent.draw()};`

 */

// +----------------------------+------------------------------------
// | Extensions to Kinetic.Text |
// +----------------------------+

Kinetic.Text.prototype.isEditable = false;
Kinetic.Text.prototype.isActive = false;
Kinetic.Text.prototype.setEditable = function(state){this.isEditable = state;}
Kinetic.Text.prototype.defaultText = null;
Kinetic.Text.prototype.drawMethod = function(){};
Kinetic.Text.prototype.capitalized = false;
Kinetic.Text.prototype.aligned = "left";
Kinetic.Text.prototype.matchingCharacters = /[0-9.]/;
Kinetic.Text.prototype.parentLayer = function(){return this.getLayer()};
Kinetic.Text.prototype.measureText = function(family, size, text){
  this.parentLayer().canvas.context._context.font = size + "px" + " "  + family;
  return this.parentLayer().canvas.context._context.measureText(text);
}
Kinetic.Text.prototype.removeFocus = function(){
  if(this.cursor != null){
    clearInterval(this.cursor.interval);
    this.cursor.remove();
    this.cursor = null;
  }
  this.capitalized = false;
  this.isActive = false;
  if(this.text() == ""){
    this.text(this.defaultText);
  }
  this.drawMethod();
  activeText = null;
}
Kinetic.Text.prototype.addCursor = function(moveToClosest, mouse){
  var x = this.x();
  var fontSize = this.fontSize();
  var align = this.align();
  var fontFamily = this.fontFamily();
  var text = this.text()
  var textLength = text.length;
  var cursor = new Kinetic.Line({
        stroke: 'black',
        strokeWidth: Math.max(fontSize / 10, 1)
      });
  cursor.activeText = this;
  cursor.position = textLength;
  cursor.shouldChange = true;
  cursor.timeout = null;
  cursor.validatePosition = function(){
    var textLength = activeText.text().length;
    cursor.position = Math.min(Math.max(cursor.position, 0), textLength);
  }
  cursor.getLine = function(cursorPosition){
    var currentLength = 0;
    var previousLength = 0;
    var desiredLength = cursorPosition;
    var text = activeText.textArr;
    for(var textElement = 0; textElement < text.length; textElement++){
      previousLength = currentLength;
      currentLength += text[textElement].text.length;
      if(desiredLength >= previousLength && desiredLength <= currentLength){
        return textElement;
      }
    }
  }
  cursor.getPosition = function(line){
    var textArray = activeText.textArr;
    var position = 0;
    for(var textArrayIndex = 0; textArrayIndex < line; textArrayIndex++){
      position += textArray[textArrayIndex].text.length;
    }
    return position;
  }
  cursor.getDistanceUpTo = function(position){
    var currentLength = 0;
    var previousLength = 0;
    var textArray = activeText.textArr;
    for(var textArrayIndex = 0; textArrayIndex < textArray.length; textArrayIndex++){
      previousLength = currentLength;
      currentLength += textArray[textArrayIndex].text.length;
      if(position >= previousLength && position <= currentLength){
        return previousLength;
      }
    }
  }
  cursor.moveLinePosition = function(x, lineChange){
    var height = activeText.textHeight;
    var y = activeText.y() + lineChange;
    this.points([x, y, x, y + height]);
    activeText.drawMethod();
  }
  cursor.updatePosition = function(){
    var family = activeText.fontFamily();
    var size = activeText.fontSize();
    var x = activeText.x();
    var line = this.getLine(this.position);
    var lineText = activeText.textArr[line].text;
    var beginning = this.getDistanceUpTo(this.position);
    var textBeforeCursor = activeText.text().slice(beginning, this.position);
    var xOffset = activeText.measureText(family, size, textBeforeCursor).width;;
    if (activeText.aligned == "center") {
      xOffset += this.offsetCentered(family, size, lineText);
    }
    var lineOffset = line * activeText.textHeight;
    cursor.moveLinePosition(x + xOffset, lineOffset);
  }
  cursor.offsetCentered = function(family, size, text){
    var lineTextWidth = activeText.measureText(family, size, text).width;
    return (activeText.width() - lineTextWidth) / 2;
  }
  cursor.moveToClosestPosition = function(x, y){
    clearTimeout(activeText.cursor.timeout);
    activeText.cursor.shouldChange = false;
    activeText.cursor.opacity(1);
    activeText.cursor.timeout = setTimeout(function(){
      if(activeText != null){
        activeText.cursor.shouldChange = true;
      }
    }, 100);
    var line = Math.round(y / activeText.textHeight); // Get which line the mouse clicked on
    line = Math.max(1, Math.min(line, activeText.textArr.length)); // Assures that line is an actual line
    line -= 1; // convert line to an array index
    var text = activeText.textArr[line].text;
    var family = activeText.fontFamily();
    var size = activeText.fontSize();
    if (activeText.aligned == "center") {
      x -= this.offsetCentered(family, size, text);
    }
    var closestDistance = Infinity;
    var closestIndex = -1;
    for(var ch = text.length; ch >= 0; ch--){
      var chunk = text.slice(0, ch);
      var distance = activeText.measureText(family, size, chunk).width;
      distance -= x;
      distance = Math.abs(distance);
      if(distance < closestDistance){
        closestIndex = ch;
        closestDistance = distance;
      }
    }
    this.position = closestIndex + cursor.getPosition(line);
    this.updatePosition();
  }
  cursor.moveLinePosition(this.measureText(fontFamily, fontSize, text).width + this.x());
  this.parent.add(cursor);
  var active = this;
  this.cursor = cursor;
  cursor.opacity(1);
  this.drawMethod();
  cursor.interval = setInterval(function()
  {
    if(cursor.shouldChange){
      cursor.opacity((cursor.opacity() == 1) ? 0 : 1);
      active.drawMethod();
    }
  }, 750);
  if(this.text() != this.defaultText && moveToClosest){
    var mouseX = mouse.x;
    var textX = this.x();
    var mouseY = mouse.y;
    var textY = this.y();
    var mouseRelativeX = mouseX - textX + cursor.offsetX();
    var mouseRelativeY = mouseY - textY + cursor.offsetY();
    cursor.moveToClosestPosition(mouseRelativeX, mouseRelativeY);
  }
  else{
    cursor.updatePosition();
  }
}
activeText = null;
currentEvent = null;
function readyEditing(stage)
{
  stage.on("contentClick",
    function(event) {
      if(event.evt != currentEvent){
        currentEvent = null;
        if (activeText != null){
          if (isValue(activeText.parent)) {
            if (activeText.attrs.text) {
              updateValueText(activeText);
            }
          }
          activeText.removeFocus();
        }
      }
    });
  stage.on("click", 
    function(event)
    {
      if (document.activeElement.name) {
        document.activeElement.blur();
      }
      if (workToolOn) {
      // Check if target object has text method(if it does than it is a text object)
      if (event.target.text != null) {
        if (event.target.isEditable){
          if(event.target != activeText){
            if (activeText != null){
              activeText.removeFocus();
            }
            activeText = event.target;
            var moveCursorToClosest = true;
            if (activeText.text() == activeText.defaultText){

              activeText.text("");
              var moveCursorToClosest = false;
            }
            var textX = activeText.x();
            activeText.addCursor(moveCursorToClosest, stage.getPointerPosition());
            activeText.isActive = true;
          }
          else{
            var cursor = activeText.cursor;
            var mouseX = stage.getPointerPosition().x;
            var textX = activeText.x();
            var mouseY = stage.getPointerPosition().y;
            var textY = activeText.y();
            var mouseRelativeX = mouseX - textX + cursor.offsetX();
            var mouseRelativeY = mouseY - textY + cursor.offsetY();
            cursor.moveToClosestPosition(mouseRelativeX, mouseRelativeY);
          }
          currentEvent = event.evt;
        }
      }
    }
  });
  document.body.onkeyup = function(e){
    var keycode = e.which || e.keyCode;
    if(keycode == 16 && activeText != null){
      activeText.capitalized = false;
    }
    else if (!activeText) {
      map[keycode] = false;
    }
  }
  document.body.onkeydown = function(e) {
    var keycode = e.which || e.keyCode;
    var activeForm = document.activeElement.name;
    if(!activeForm && activeText != null) {
      clearTimeout(activeText.cursor.timeout);
      activeText.cursor.shouldChange = false;
      activeText.cursor.opacity(1);
      activeText.cursor.timeout = setTimeout(function(){
        if(activeText != null){
          activeText.cursor.shouldChange = true;
        }
      }, 100);
      var currentText = activeText.getText();
      var textPreCursor = currentText.slice(0, activeText.cursor.position);
      var textPostCursor = currentText.slice(activeText.cursor.position, currentText.length);
      var addedKey = false;
      var cursorPositionChange = 0;
      if(keycode >= 48 && keycode <= 57){ // keycode 48 is the key "0" and 57 is the key "9"
        var key = "0123456789"[e.which-48]; // get which number key was pressed
        addedKey = true;
      }
      if(keycode >= 96 && keycode <= 105){ // keycode 96 is the numpad key "0" and 105 is the numpad key "9"
        var key = "0123456789"[e.which-96]; // get which number key was pressed
        addedKey = true;
      }
      if(keycode >= 65 && keycode <= 90){ // keycode 65 is the key "a" and 90 is the key "z"
        var key = "abcdefghijklmnopqrstuvwxyz"[e.which-65]; // get which letter key was pressed
        addedKey = true;
      }
      if(keycode == 190 || keycode == 110){ // 190 is the "." key 110 is the numpad version
        var key = "."
        addedKey = true;
      }
      if(keycode == 16){
        activeText.capitalized = true;
      }
      if(keycode == 8 || keycode == 46){ // 8 is the backspace key; 46 is the delete key
        activeText.setText(textPreCursor.slice(0, textPreCursor.length - 1) + textPostCursor);
        activeText.cursor.position--;
        e.preventDefault(); // Prevents backspace from moving back a page
      }
      if(keycode == 37){ // 37 is the left arrow key
        activeText.cursor.position--;
      }
      if(keycode == 39){ // 39 is the right arrow key
        activeText.cursor.position++;
      }
      if(keycode == 189 || keycode == 109 || keycode == 173){ // 189 and 109 are the - keys: normal, numpad respectively
        var key = "-";
        addedKey = true;
      }
      if (keycode == 13) {
        if (isValue(activeText.parent)) {
          if (activeText.attrs.text) {
            updateValueText(activeText);
          }
        }
        activeText.removeFocus();
      }
      if (keycode == 32) {
        var key = " "
        addedKey = true;
        e.preventDefault();
      }
      if(addedKey){
        if(activeText.capitalized){
          key = key.toUpperCase();
        }
        if(activeText.matchingCharacters.test(textPreCursor + key + textPostCursor)){
          activeText.setText(textPreCursor + key + textPostCursor);
          activeText.cursor.position++;
        }
      }
      if(activeText != null){
        activeText.cursor.validatePosition();
        activeText.cursor.updatePosition();
        activeText.drawMethod();
      }
    }
    else if (!activeForm) {
      /**
       * onkeydown events that will be active when the workspace is open
       * - remove default on backspace
       * - ctrl-z for undo
       * - ctrl-y for redo
       * - c for line-tool
       * - w for work-tool
       * - d for delete-tool
       */
      map[keycode] = true;
      if (map[8]) { // 8 is the backspace key
        e.preventDefault(); // Prevents backspace from moving back a page
      }
      else if (map[17] && map[90]) { // 17 is the control key; 90 is the z key
        if (currIndex > 0) {
          undoAction(actionArray[currIndex - 1]);
          currIndex--;
          shadeUndoRedo();
          toolboxLayer.draw();
        }
      }
      else if (map[17] && map[89]) { // 17 is the control key; 89 is the y key
        if (totalIndex > currIndex) {
          console.log("got to redo");
          redoAction(actionArray[currIndex]);
          currIndex++;
          shadeUndoRedo();
          toolboxLayer.draw();
        }
      }
      else if (map[67]) { // 67 is the c key
        if (!lineToolOn) {
          lineToolGroup.children[0].setAttr('shadowEnabled', true);
          lineToolOn = true;
          disableTool(workToolGroup);
          disableTool(deleteToolGroup);
          toolboxLayer.draw();
        }
      }
      else if (map[68]) { // 68 is the d key
        if (!deleteToolOn) {
          if (makingLine) {
            removeLine(currLine);
            makingLine = false; 
            lineLayer.draw();
          } // if making a line
        deleteToolGroup.children[0].setAttr('shadowEnabled', true);
        deleteToolOn = true;
        disableTool(workToolGroup);
        disableTool(lineToolGroup);
        toolboxLayer.draw();
  } // if the delete tool is not already on
      }
      else if (map[87]) { // 87 is the w key
        if (makingLine) {
          removeLine(currLine);
          makingLine = false;
          lineLayer.draw();
        } // if making a line
        if (!workToolOn) {
          enableWorkTool();
        }
      }
    } // else not active text (shortcuts)
  }
}
/**
* updateValueText takes a string and puts that string into a value by updating:
* - visible text box
* - rep
* - renderFunction
*/
var updateValueText = function(text) {
  var validNumber = /^-?[0-9]+(\.(?=[0-9])[0-9]*)?$/
  if(validNumber.test(text.text()))
  {
    var value = text.parent;
    var newText = text.attrs.text;
    value.children[1].setAttrs({
      text: wrapValueText(newText),
      fontSize: 13
    });
    value.setAttrs({
      rep: newText,
      renderFunction: newText
    });
    for (var i = 3; i < 5; i++) {
      value.children[i].setAttr('visible', false);
    }
    updateForward(value);
    updateFunBar();
  }
  else
  {
    if(activeText != null)
    {
      activeText.removeFocus();
    }
    activeText = text;
    text.isActive = true;
    if (text.text() == text.defaultText){text.text("");}
    text.addCursor(false);
  }
};
/* workspace functions */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MISTgui; } catch (err) { MISTgui = {}; }
if (!MISTgui.OUTLET_OFFSET) { MISTgui.OUTLET_OFFSET = OUTLET_OFFSET; }

// +-----------------+-----------------------------------------------
// | Local Utilities |
// +-----------------+

MISTgui.outletIndex = function(outlet) {
  if (outlet.attrs.outletIndex) {
    return outlet.attrs.outletIndex;
  }
  var outlets = outlet.parent.children;
  for (var i = MISTgui.OUTLET_OFFSET; i < outlets.length; i++) {
    if (outlet === outlets[i]) {
      return i - MISTgui.OUTLET_OFFSET;
    } // if
  } // for
} // MISTgui.getIndex

/**
 * workspaceToArray takes all the nodes in the workLayer and all the lines in the 
 * lineLayer and puts them into an array.
 */
var workspaceToArray = function() {
  var wArray = [];
  var workChildren = workLayer.getChildren();
  var lineChildren = lineLayer.getChildren();
  var i = 0;
  for (i; i < workChildren.length; i++) {
    wArray[i] = workChildren[i]; 
  }
  for (var j = 0; j < lineChildren.length; j++, i++) {
    wArray[i] = lineChildren[j];
  }
  return wArray;
};

/**
 * Convert a JSON string created by workspaceToJSON back to a workspace.
 */
var jsonToWorkspace = function(json) {
  var layout = JSON.parse(json);
  restore(layout);
  MIST.displayLayout(layout, { addVal:addVal, addOp:addOp, addEdge:addLine });
} // JSONtoWorkspace

/**
 * Convert the workspace to JSON that we can then store in a file
 * or on the server.
 */
var workspaceToJSON = function() {
  // Extract information from the workspace.
  var nodes = workLayer.getChildren();
  var edges = lineLayer.getChildren();

  // Set up information to turn to JSON
  var info = new MIST.Layout();
  var nodeInfo = {};
  var lineInfo = {};

  // Gather information on each node.
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (isValue(node)) {
      if(node.name() == 'constant') {
        nodeInfo[node._id] = 
          info.addVal(node.name() + node.attrs.renderFunction, node.x(), node.y());
      } // if its a constant store its value in the name
      else {
        nodeInfo[node._id] = 
          info.addVal(node.name(), node.x(), node.y());
      }
    } // if it's a value
    else if (isFunction(node)) { 
      nodeInfo[node._id] = 
          info.addOp(node.name(), node.x(), node.y());
    } // if it's a function
  } // for each node

  // Gather information on each edge
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    info.addEdge(nodeInfo[edge.attrs.source._id], 
        nodeInfo[edge.attrs.outlet.parent._id],
        MISTgui.outletIndex(edge.attrs.outlet));
  } // for

  // And we're done
  return JSON.stringify(info);
} // workspaceToJSON

/**
 * arrayToWorkspace takes an array of objects and inserts them to a workspace
 */
 var arrayToWorkspace = function(array) {
  for (var i = 0; i < array.length; i++) {
    var object = array[i];
    if (isLine(object)) {
      object.moveTo(lineLayer);
    }
    else {
      object.moveTo(workLayer);
      object.setAttr('visible', true);
    }
  }
  workLayer.draw();
  lineLayer.draw();
 };

/**
 * resetWorkspace removes all elements from the active workspace,
 * and all records of elements created in session and actions performed
 */
var resetWorkspace = function() {
  // destroy workLayer children and renderLayers
  workLayer.destroyChildren();
  //destroy lineLayer children
  lineLayer.destroyChildren();
  // empty elementTable
  elementTable = {};
  // empty actionArray
  actionArray = [];
  // reset indexes and variables
  currIndex = 0;
  totalIndex = 0;
  currShape = null;
  dragShape = null;
  updateFunBar();
  shadeUndoRedo();
  stage.draw();
};

/**
 * Save the workspace with a particular name.  
 */
var saveWorkspace = function(name, replace) {
  var request = new XMLHttpRequest();
  var name = encodeURIComponent(name);
  var workspace = encodeURIComponent(workspaceToJSON());
  var data = "action=savews&name="+name+"&data="+workspace + 
      ((replace) ? "&replace=true" : "");
  request.open("POST", "/api", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(data);
}

/**
 * List all of the available workspaces.  The callback should be
 * of the form "function(workspaces, error)".  If there's no error,
 * workspaces should be an array of strings and error should be
 * undefined.  If there's an error, workspaces should be undefined
 * and error should contain the error string.
 */
var listWorkspaces = function(callback,async) {
  if (async == undefined) { async = true; }
  var url = "/api?action=listws";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    // console.log(request.readyState, request);
    if (request.readyState != 4) {
      return;
    } // if it's not ready
    if (request.status >= 400) {
      callback(undefined,request.responseText);
    }
    else {
      callback(JSON.parse(request.responseText),undefined);
    }
  } // request.onreadystatechange
  request.open("GET", url, async);
  request.send();
} // listWorkspaces

/**
 * Given a workspace name, loads a given workspace from the server onto 
 * the screen.
 */
var loadWorkspace = function(wsname) {
  var url = "/api?action=getws&name=" + wsname;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.status >= 400) {
      alert("Could not load workspace");
    }
    else if (request.readyState != 4) {
      return;
    }
    else {
      var json = request.responseText.replace(/\&quot;/g, '"');
      // console.log(json);
      resetWorkspace();
      jsonToWorkspace(json);
      currentWorkspace = wsname;
    }
  }; // onReadyState
  request.open("GET",url,true);
  request.send();
} // loadWorkspace

/**
 * Saves an image to the database.
 */
var saveImage = function(title, code, isPublic, codeVisible, replace) {
  var request = new XMLHttpRequest();
  var title = encodeURIComponent(title);
  var data = "action=saveimage&title="+title+"&code="+code+ 
      "&public="+isPublic+"&codeVisible="+codeVisible+
      "&license=GPL"+((replace) ? "&replace=true" : "");
  // console.log(data);
  request.open("POST", "/api", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(data);
  try {
    var id = JSON.parse(request.responseText).imageid;
    // console.log("id: " + id);
    return id;
  }
  catch (err) {
    return 0;
  }
}

/**
 * Determines if a workspace exists.  Returns "true" if the workspace exists
 * with the given name,  "logged out" if the user is not logged in, and "false" otherwise.
 */
var wsExists = function(name) {
  var request = new XMLHttpRequest();
  var url = "/api?action=wsexists&name=" + name;
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

/**
 * Determines if a image exists.  Returns "true" if an image exists
 * with the given title, "logged out" if the user is not logged in, and "false" otherwise.
 */
var imageExists = function(title) {
  var request = new XMLHttpRequest();
  var url = "/api?action=imageexists&title=" + title;
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

// +--------------+----------------------------------------------------
// | Dialog Boxes |
// +--------------+

/**
 * Add the HTML for the dialog box.
 */
var addLoadWorkspaceDialog = function() {
  // Build the element
  var dialog = document.createElement("div");
  dialog.id = "load-workspace";
  dialog.title = "Load Workspace";
  // dialog.innerHTML='<form><fieldset><label for="workspace-name">Workspace</label><select id="workspace-name"></select></fieldset></form>';
  dialog.innerHTML='<p>Select the workspace to load.</p><form><select id="workspace-name"></select></form>';
  document.body.appendChild(dialog);
  // console.log(dialog);

  // Turn it into a JQuery dialog
  $("#load-workspace").dialog({
    autoOpen: false,
    resizable: false,
    width: "50%",
    modal: true,
    buttons: {
      "Load": function() {
        $("#load-workspace").dialog("close");
        var menu = document.getElementById("workspace-name");
        var wsname = menu.options[menu.selectedIndex].value;
        loadWorkspace(wsname);
      }, // load
      "Cancel": function() {
        $("#load-workspace").dialog("close");
      } // cancel
    } // buttons
  });
} // addLoadWorkspaceDialog

/**
 * Show the dialog box for loading a workspace.
 */
var showLoadWorkspaceDialog = function() {
  // Make sure that the dialog exists
  if (!document.getElementById("load-workspace")) {
    addLoadWorkspaceDialog();
  } // if the dialog does not exist

  // Clear the list of workspaces
  var workspaces = document.getElementById("workspace-name");
  workspaces.innerHTML = "";

  // Build the list of workspaces
  listWorkspaces(function(names,error) {
    if (error) {
      alert("Whoops ... " + error);
      return;
    }
    if (names.length == 0) {
      alert("No workspaces exist");
      return;
    }
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var option = document.createElement("option");
      option.value = name;
      option.innerHTML = name;
      workspaces.appendChild(option);
    } // for
  });

  // Show the dialog
  $("#load-workspace").dialog("open");
} // showLoadWorkspaceDialog

/**
 * add a success dialog box to the html
 */
var addSuccessDialog = function() {
  // Build the element
  var dialog = document.createElement("div");
  dialog.id = "success-message";
  dialog.title = "Image Saved";
  // dialog.innerHTML='<form><fieldset><label for="workspace-name">Workspace</label><select id="workspace-name"></select></fieldset></form>';
  dialog.innerHTML='<p>Your image has been successfully saved!</p>';
  document.body.appendChild(dialog);
  // Turn it into a JQuery dialog
  $("#success-message").dialog({
    autoOpen: false,
    resizable: false,
    width: "30%",
    modal: true,
    buttons: {
      "Okay": function() {
        $("#success-message").dialog("close");
      } // okay
    } // buttons
  });
}

/**
 * show success dialog
 */
var showSuccessDialog = function(title, imageid) {
  // Make sure that the dialog exists
  if (!document.getElementById("success-message")) {
    addSuccessDialog();
  } // if the dialog does not exist
  var dialog = document.getElementById("success-message");
  dialog.innerHTML='<p>Your image \''+title+'\' has been successfully saved!'+
  '<br><br>You can view your image <a href=/image/'+imageid+' target="_blank"><u>here'+
  '</u></a> or visit to the <a href=/gallery/recent/1 target="_blank"><u>gallery'+
  '</u></a> to see what other MIST users have been creating!</p>';
  // Show the dialog
  $("#success-message").dialog("open");
} // showSuccessDialog

// +-------------------+-----------------------------------------------
// | Session Functions |
// +-------------------+

/**
 * -jquery ajax call to ensure beforeunload event works with all browsers-
 *  This event sends a POST request to the api to store the current state
 * of a user's workspace as a element of the req.session object.
 */
$(window).on('beforeunload', function() {
    var x = storeWS();
    return x;
});
function storeWS() {
  code = workspaceToJSON();
  var data = "action=storews&code="+code;
  jQuery.ajax("/api", {
    data: data,
    type: 'POST'
  });
} // storeWS

/**
 * function to load a workspace from the req.session object. This queries
 * the server for the req.session.workspaceCode field, and returns it if
 * it exists. This is called during initialize stage.
 */
var initWorkspace = function() {
  var request = new XMLHttpRequest();
  var url = "/api?action=returnws";
  request.open("GET", url, false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send();
  return request.responseText;
}
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
  align: 'center',
  fontFamily: globalFont,
  fontSize: menuFontSize
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
  align: 'center',
  fontFamily: globalFont,
  fontSize: menuFontSize
 });
 functionsButton.add(functionsButtonText);
 menuButtonLayer.draw();

 /**
  * toggle labels text
  */
  var toggleTag = new Kinetic.Group ({
    x: (width / 90),
    y: menuHeight + (width / 90)
  });
  borderLayer.add(toggleTag);

  toggleTag.add(new Kinetic.Text({
    x:0,
    y:0,
    text: 'Turn Labels Off',
    fontFamily: globalFont,
    fontSize: menuFontSize,
    fill: '#787878'
  }));

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


/**
 * addScrollArrows creates and returns an array of two groups 
 * (left arrow and right arrow)
 * takes "type" (either functions or values)
 */
var addScrollArrows = function(type) {
  var leftX = (type=='values') ? valuesButton.x() + buttonWidth : 
    functionsButton.x() + buttonWidth;
  var rightX = (type=='values') ? width - buttonWidth - arrowWidth : 
    width - arrowWidth
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
    x: width/250,
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
    x: width / 65,
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
menuArrowLayer.add(valuesArrows['left'], valuesArrows['right']);
menuArrowLayer.add(functionsArrows['left'], functionsArrows['right']);

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
    menuArrowLayer.draw();
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
  menuArrowLayer.draw();
};
/**
 * updateArrows changes the opacity of the arrows based on if they are functional.
 */
 var updateArrows = function(type) {
  setTimeout(function() {
    if (type == 'values') {
      var leftArrow = valuesArrows['left'];
      var rightArrow = valuesArrows['right'];
      if (canMoveRight('values')) {
        leftArrow.setAttr('functional', true);
        leftArrow.children[0].setAttr('opacity', .3);
        leftArrow.children[1].setAttr('opacity', .5);
      } // if left functional
      else {
        leftArrow.setAttr('functional', false);
        leftArrow.children[0].setAttr('opacity', 0);
        leftArrow.children[1].setAttr('opacity', 0);
      } // else left non-functional

      if (canMoveLeft('values')) {
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
      if (canMoveRight('functions')) {
        leftArrow.setAttr('functional', true);
        leftArrow.children[0].setAttr('opacity', .3);
        leftArrow.children[1].setAttr('opacity', .5);
      } // if left functional
      else {
        leftArrow.setAttr('functional', false);
        leftArrow.children[0].setAttr('opacity', 0);
        leftArrow.children[1].setAttr('opacity', 0);
      } // else left non-functional

      if (canMoveLeft('functions')) {
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
    menuArrowLayer.draw();
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
    fontFamily: globalFont,
    fontSize: menuFontSize
  });
  newGroup.add(newText);
return newGroup;
};
var resetButton = makeMenuButton('Reset Workspace', menuOffset, menuOffset);
var openButton = makeMenuButton('Open Workspace', menuOffset, (2*menuOffset) + menuControlHeight);
var saveButton = makeMenuButton('Save Workspace', menuOffset, (3*menuOffset) + 
  (2*menuControlHeight));

menuControlLayer.add(bottomCover);
menuControlLayer.add(resetButton);
menuControlLayer.add(openButton);
menuControlLayer.add(saveButton);/* create the toolbox pallette in the workspace */
//var setupToolbox = function() {

  /*var toolboxWidth = width / 18; // 50
  var toolboxHeight = width / 5; // 180
  var toolboxXShift = toolboxWidth / 5; // 10
  var toolboxButtonSize = toolboxHeight / 6; // 30*/

  // add the entire group
  var toolboxGroup = new Kinetic.Group({
    x: width * .9,
    y: height * .2,
    draggable: false,
    dragBoundFunc: function(pos) {
      var newY = pos.y < (menuHeight + toolboxShift) ? menuHeight + toolboxShift : 
        pos.y > height - funBarHeight - toolboxHeight + toolboxShift ?
        height - funBarHeight - toolboxHeight + toolboxShift: pos.y;
      var newX = pos.x < 0 ? 0 : pos.x > (width - toolboxWidth) ? (width - toolboxWidth) : pos.x;
      return {
        x: newX,
        y: newY
      };
    }
  });
  toolboxLayer.add(toolboxGroup);

  // add the box to contain the entire group
  var toolboxRect = new Kinetic.Rect({
    x:0,
    y:0,
    width: toolboxWidth,
    height: toolboxHeight - toolboxShift,
    fill: 'white',
    stroke: 'black',
    strokeWidth: .5,
  //lineJoin: 'round',
  shadowColor: 'black',
  shadowBlur: 0,
  shadowOffsetX: -1,
  shadowOffsetY: 1,
  shadowOpacity: .5
});
  toolboxGroup.add(toolboxRect);

  // add the mini bos above the main box for dragging
  var toolboxControl = new Kinetic.Rect({
    x:0,
    y:-toolboxShift,
    width: toolboxWidth,
    height: toolboxShift,
    name: 'toolControl',
    fill: 'grey',
    stroke: 'black',
    strokeWidth: .5,
  //lineJoin: 'round',
  shadowColor: 'black',
  shadowBlur: 0,
  shadowOffsetX: -1,
  shadowOffsetY: 1,
  shadowOpacity: .5
});
  toolboxGroup.add(toolboxControl);

  //add the work tool
  var workToolGroup = new Kinetic.Group({
    x: toolboxShift,
    y: toolboxShift,
    name: 'workTool'
  });
  toolboxGroup.add(workToolGroup);

  var workToolButton = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
    name: 'draw',
    fill: 'white',
    stroke: 'black',
    strokeWidth: .3,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowOffsetX: -2,
    shadowOffsetY: 2,
    shadowOpacity: .5,
    shadowEnabled: false,
    working: false
  });
  workToolGroup.add(workToolButton);

  var workToolSymbol = new Kinetic.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(5, 12);
      context.lineTo(1, 12);
      context.lineTo(1, 18);
      context.lineTo(-1, 18);
      context.lineTo(-1, 12);
      context.lineTo(-5, 12);
      context.closePath();
      context.fillStrokeShape(this);
    },
    x: toolboxButtonSize / 3.3,
    y: toolboxButtonSize / 4.5,
    fill: 'black',
    stroke: 'black',
    scaleX: globalScale,
    scaleY: globalScale,
    strokeWidth: .5,
    lineJoin: 'round',
    rotation: -30,
  });
  workToolGroup.add(workToolSymbol);

  /* Transparent box that covers the button to ensure its function when clicked on */
  var workToolCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize
  });
  workToolGroup.add(workToolCover);

  // add the draw line tool group
  var lineToolGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 2) + toolboxButtonSize,
    name: 'lineTool'
  });
  toolboxGroup.add(lineToolGroup);

  // add the draw line tool button
  var lineToolButton = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
    name: 'draw',
    fill: 'white',
    stroke: 'black',
    strokeWidth: .3,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowOffsetX: -2,
    shadowOffsetY: 2,
    shadowOpacity: .5,
    shadowEnabled: false,
    working: false
  });
  lineToolGroup.add(lineToolButton);

  // add the draw line symbol on the button
  var lineToolLine = new Kinetic.Line({
    points: [(toolboxButtonSize * (7/30)), (toolboxButtonSize * (7/30)), (toolboxButtonSize * (24/30)), (toolboxButtonSize * 24/30)],
    stroke: 'black',
    strokeWidth: 2,
    lineCap: 'round'
  });
  lineToolGroup.add(lineToolLine);

  /* Transparent box that covers the button to ensure its function when clicked on */
  var lineToolCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize
  });
  lineToolGroup.add(lineToolCover);

  // add the delete tool group
  var deleteToolGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 3) + (toolboxButtonSize * 2),
    name: 'deleteTool'
  });
  toolboxGroup.add(deleteToolGroup);

  // add the delete line tool button
  var deleteToolButton = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
    name: 'delete',
    fill: 'white',
    stroke: 'black',
    strokeWidth: .3,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowOffsetX: -2,
    shadowOffsetY: 2,
    shadowOpacity: .5,
    shadowEnabled: false,
    working: false
  });
  deleteToolGroup.add(deleteToolButton);

  // add the delete symbol on the button
  var deleteToolSym1 = new Kinetic.Rect({
    x: toolboxButtonSize * (7/30),
    y: toolboxButtonSize * (7/30),
    width: 0,
    height: .8 * toolboxButtonSize,
    stroke: deleteColor,
    fill: deleteColor,
    rotation: -45, 
    strokeWidth: 3
    //lineCap: 'round'
  });
  deleteToolGroup.add(deleteToolSym1);

  var deleteToolSym2 = new Kinetic.Rect({
    x: toolboxButtonSize * (24/30),
    y: toolboxButtonSize * (7/30),
    width: 0,
    height: .8 * toolboxButtonSize,
    strokeWidth: 3,
    stroke: deleteColor,
    fill: deleteColor,
    //scaleX: - 1,
    rotation: 45
  });
  deleteToolGroup.add(deleteToolSym2);

  /* Transparent box that covers the button to ensure its function when clicked on */
  var deleteToolCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize
  });
  deleteToolGroup.add(deleteToolCover);

  var undoRedoScale = .3;

  // add the undo tool button
  var undoGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 4) + (toolboxButtonSize * 3),
    name: 'undo'
  });
  toolboxGroup.add(undoGroup);

  var undoButton = new Kinetic.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(35, 30);
      context.lineTo(35, 12);
      context.bezierCurveTo(60, 5, 100, 15, 80, 70);
      context.bezierCurveTo(110, 10, 80, -12, 35, -12);
      context.lineTo(35, -30);            
      context.closePath();
      context.fillStrokeShape(this);
    },
    x: 0,
    y: toolboxButtonSize - toolboxShift + 5,
    name: 'undo',
    scaleX: undoRedoScale*globalScale,
    scaleY: undoRedoScale*globalScale,
    fill: '#E3E3E3',
    stroke: 'black',
    strokeWidth: 1,
    lineJoin: 'round',
    rotation: -40,
    shadowColor: 'black',
    shadowOffsetX: -2,
    shadowOffsetY: 2,
    shadowOpacity: .5,
    shadowEnabled: false
  });
  undoGroup.add(undoButton);

  var undoCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
    //stroke: 'black'
  });
  undoGroup.add(undoCover);

  var redoGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 5) + (toolboxButtonSize * 4),
    name: 'redo'
  });
  toolboxGroup.add(redoGroup);

  var redoButton = new Kinetic.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(35, 30);
      context.lineTo(35, 12);
      context.bezierCurveTo(60, 5, 100, 15, 80, 70);
      context.bezierCurveTo(110, 10, 80, -12, 35, -12);
      context.lineTo(35, -30);            
      context.closePath();
      context.fillStrokeShape(this);
    },
    x: toolboxButtonSize,
    y: toolboxButtonSize - toolboxShift,
    name: 'redo',
    scaleX: -undoRedoScale*globalScale,
    scaleY: undoRedoScale*globalScale,
    fill: '#E3E3E3',
    stroke: 'black',
    strokeWidth: 1,
    lineJoin: 'round',
    rotation: 40,
    shadowColor: 'black',
    shadowOffsetX: -2,
    shadowOffsetY: 2,
    shadowOpacity: .5,
    shadowEnabled: false
  });
  redoGroup.add(redoButton);

  var redoCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
    //stroke: 'black'
  });
  redoGroup.add(redoCover);

  enableWorkTool();var funBar = new Kinetic.Group ({
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



//MENU ANIMATIONS
/*
On click of value menu button:
1. Neither values or functions are expanded.
  - move functionsButton right.
  - expand values
2. Values are not expanded, functions are expanded.
  - collapse functions to the right and move functionsButon
  - expand values
3. Values are expanded, functions are not.
  - collapse values
  - move functionsButton left. 
  */
  valuesButton.on('click', function(){
    if (!valueExpanded) {
      if (!functionExpanded) {
        moveFunctionsButtonRight();
        moveFunctionNodesRight();
        expandValueNodes();
        valueExpanded = true;
        showScrollArrows('values');
        updateArrows('values');
    } // if functions are also not expanded
    else {
      moveFunctionsButtonRight();
      moveFunctionNodesRight();
      expandValueNodes();
      valueExpanded = true;
      showScrollArrows('values');
      updateArrows('values');
      functionExpanded = false;
      hideScrollArrows('functions');
      } // else functions were already expanded
  } // if values are not expanded
  else {
    moveValueNodesIn();
    moveFunctionNodesIn();  
    moveFunctionsButtonLeft();
    valueExpanded = false;
    hideScrollArrows('values');
  } // else values were already expanded
});
/*
On click of function menu button:
1. Neither functions or values are expanded.
  - expand functions
2. Functions are not expanded, values are expanded.
  - collapse values
  - move functionsButton left
  - expand functions
3. Functions are expanded, values are not.
  - collapse functions 
  */
  functionsButton.on('click', function(){
    if (!functionExpanded) {
      if (!valueExpanded) {
        expandFunctionNodes();
        functionExpanded = true;
        showScrollArrows('functions');
        updateArrows('functions');
    } // functions and values not expanded
    else {
      moveValueNodesIn();
      moveFunctionsButtonLeft();
      expandFunctionNodes();
      functionExpanded = true;
      showScrollArrows('functions');
      updateArrows('functions');
      valueExpanded = false;
      hideScrollArrows('values');
    } // functions not expanded, values expanded
  }
  else {
    moveFunctionNodesIn();
    functionExpanded = false;
    hideScrollArrows('functions');
    } // functions are expanded
  });

/*
If you click on a menu button when the workTool is not activated, the workTool will become activated. 
*/
menuButtonLayer.on('click', function(){
  if (!workToolOn) {
    enableWorkTool();
    if(makingLine) {
      removeLine(currLine);
      makingLine = false;
      lineLayer.draw();
    }
  }
});

// MENU ARROW LAYER EVENTS
/**
 * - on mouseover
 * - on mouseout
 * - on mousedown
 * - on mouseup
 */
menuArrowLayer.on('mouseover', function(evt) {
  var group = evt.target.getParent();
  if (group.attrs.functional) {
    var box = group.children[0];
    var arrow = group.children[1];
    box.setAttr('opacity', .7);
    arrow.setAttr('opacity', .9);
    menuArrowLayer.draw();
  }
});

menuArrowLayer.on('mouseout', function(evt) {
  var group = evt.target.getParent();
  if (group.attrs.functional) {
    var box = group.children[0];
    var arrow = group.children[1];
    box.setAttr('opacity', .3);
    arrow.setAttr('opacity', .5);
    menuArrowLayer.draw();
  }
});

menuArrowLayer.on('mousedown', function(evt) {
  var group = evt.target.getParent();
  if (group.attrs.functional) {
    var box = group.children[0];
    var arrow = group.children[1];
    box.setAttr('opacity', 1);
    arrow.setAttr('opacity', 1);
    menuArrowLayer.draw();
  }
});
var scrolling;
menuArrowLayer.on('mouseup', function(evt) {
  var group = evt.target.getParent();
  if (group.attrs.functional) {
    var box = group.children[0];
    var arrow = group.children[1];
    var direction = group.attrs.direction;
    box.setAttr('opacity', .7);
    arrow.setAttr('opacity', .9);
    menuArrowLayer.draw();
    if(!scrolling) {
      if (group.attrs.type =='functions') {
        if (direction == 'left') {
          shiftFunctionNodesRight();
          scrolling = true;
          setTimeout(function() {scrolling = false}, 1000)
        } // if right arrow 
        else if (direction == 'right') {
          shiftFunctionNodesLeft();
          scrolling = true;
          setTimeout(function() {scrolling = false}, 1000);
        } // else left arrow
        updateArrows('functions');
      } // if functions arrow
      else {
        if (direction == 'left') {
          shiftValueNodesRight();
          scrolling = true;
          setTimeout(function() {scrolling = false}, 1000);
        } // if right arrow
        else if (group.attrs.direction == 'right') {
          shiftValueNodesLeft();
          scrolling = true;
          setTimeout(function() {scrolling = false}, 1000);
        } // else left arrow
        updateArrows('values');
      } // else values arrow
    } // if not scrolling
  } // if functional
});
//MENU LAYER EVENTS
/*
- on mousedown
*/
/*
  On mousedown of a menu object (value or function prototype), you create a copy of that object and begin to draw it. Turns on workTool, if not already on. 
  */
  menuLayer.on('mousedown', function(evt) {
    if (!makingLine) {
      if (!workToolOn) {
        enableWorkTool();
      }
      var group = evt.target.getParent();
      if (isFunction(group)) {
        var newGroup = makeFunctionGroup(group.attrs.name, group.attrs.x, group.attrs.y);
      } 
      else {
        var newGroup = makeValueGroup(group.attrs.name, group.attrs.x, group.attrs.y);
      } // if function / else value
      newGroup.setAttr('visible', true);
      dragLayer.add(newGroup);
      setDragShadow(newGroup);
      removeShadow(currShape);
      newGroup.startDrag();
      dragLayer.draw();
      dragShape = newGroup;
      currShape = newGroup;
    }
    else {
      removeLine(currLine);
      makingLine = false;
      lineLayer.draw();
    }
  });

  menuLayer.on('mouseover', function(evt) {
    var group = evt.target.getParent();
    if (tagsOn) {
     if (isFunction(group) || isValue(group)) {
      setTimeout(function(){
        if (openTag) {
          openTag.destroy();
        }
        var temp = menuLayer.getIntersection(stage.getPointerPosition());
        if (temp && group == temp.getParent()) {
          openTag = makeLabel(group);
          labelLayer.add(openTag)
          labelLayer.draw(); 
        }
      }, 500);
    } 
  }
});

  menuLayer.on('mouseout', function(evt) {
    var group = evt.target.getParent();
    if (openTag) {  
      openTag.destroy();
      labelLayer.draw();
    }
  });

toggleTag.on('mouseover', function() {
  toggleTag.children[0].setAttr('fill', 'black');
  borderLayer.draw();
});

toggleTag.on('mouseout', function() {
  toggleTag.children[0].setAttr('fill', '#787878');
  borderLayer.draw();
});

toggleTag.on('mouseup', function(){
  if (tagsOn) {
    tagsOn = false;
    toggleTag.children[0].setAttr('text', 'Turn Labels On');
  }
  else {
    tagsOn = true;
    toggleTag.children[0].setAttr('text', 'Turn Labels Off');
  }
  borderLayer.draw();
});

// CONTROL MENU EVENTS 
menuControlLayer.on('mouseover', function(evt) {
  if (evt.target.name() != 'cover') {
    var parent = evt.target.getParent();
    var shape = parent.children[0];
    shape.setAttr('fill', menuControlSelect);
    menuControlLayer.draw();
  }
});

menuControlLayer.on('mouseout', function(evt) {
  if (evt.target.name() != 'cover') {
    var parent = evt.target.getParent();
    var shape = parent.children[0];
    shape.setAttrs({
      fill: menuControlColor,
      shadowEnabled: false
    });
    menuControlLayer.draw();
  }
});

menuControlLayer.on('mousedown', function(evt) {
  if (evt.target.name() != 'cover') {
    var parent = evt.target.getParent();
    var shape = parent.children[0];
    shape.setAttr('shadowEnabled', true);
    menuControlLayer.draw();
  }
});

menuControlLayer.on('mouseup', function(evt) {
  if (evt.target.name()!= 'cover') {
    var parent = evt.target.getParent();
    var shape = parent.children[0];
    shape.setAttr('shadowEnabled', false);
    menuControlLayer.draw();
  }
});

resetButton.on('mouseup', function(){
  resetWorkspace();
  currentWorkSpace = null;
});

saveButton.on('mouseup', function(){
  enableWorkTool();
  openSaveWsPopUp();
});

openButton.on('mouseup', function(){
  enableWorkTool();
  showLoadWorkspaceDialog();
});
//DRAG LAYER EVENTS
/*
- on mouseup
- on draw
- on dragmove
*/
/* workaround to make sure intersections work while dragging
   KineticJS's getIntersection doesn't work when using the 'mousedown' event
    to startDrag */
    dragLayer.on('dragstart mousedown', function(evt) {
      if (dragShape) {
        dragShape.stopDrag();
        dragShape.startDrag();
        dragLayer.draw();
      }
    });

    dragLayer.on('mousedown', function(evt) {
      removeShadow(currShape);
      var group = evt.target.getParent();
      group.stopDrag();
      group.startDrag();
      dragLayer.draw();
      workLayer.draw();
    });
/*
  when an object being dragged is released:
  1. check that it isnt in the menu area
  --if it is a new object, add the appropriate number of outlets to it
  2. if its in the menu area destroy it and all lines attached to it
  */
  var initToWorkLayer = function(group) {
    group.moveTo(workLayer);

    if (isFunction(group) && group.children.length < 4) {
      for (var i = 0; i < functions[group.attrs.name].min; i++) {
        addOutlet(group);
        } // for
    } // if new function 
    else if (isValue(group)) {
      if (isRenderable(group)) {
        group.children[2].setAttr('visible', true);
      }
    }
    if (group.children[2].attrs.expanded) {
      renderCanvas(group);
    } // if 
    if (inTable(group)) {
      actionArray[currIndex - 1].x2 = group.x();
      actionArray[currIndex - 1].y2 = group.y();
    }
    else {
      if (group.attrs.name == 'constant' && !group.children[3]) {
        createEditableText(group);
      }
      insertToTable(group);
      insertToArray(actionToObject('insert', group));
    }
  };

  dragLayer.on('mouseup', function(evt) {
    var group = evt.target.getParent();
    if (scaledObj) {
      scaledObj.setAttr('scale', { x: 1, y: 1 });
      group.setAttr('x', scaledObj.attrs.x);
      group.setAttr('y', scaledObj.attrs.y);
      insertToTable(group);
      insertToArray(actionToObject('replace', group, scaledObj));
      replaceNode(scaledObj, group);
      scaledObj = null;
      group.moveTo(workLayer);
    }
    else {
      if (group.attrs.y > menuHeight) {
        initToWorkLayer(group);
      } 
      else {
        currShape = null;
        group.destroy();
        group = null;
      }
    }
    if (group) {
      setSelectedShadow(group);
      currShape = group;
      if (!group.attrs.dragBoundFunc) {
        applyDragBounds(group);
      }
    }
    updateFunBar();
    dragShape = null;
    menuLayer.draw();
    menuButtonLayer.draw();
    dragLayer.draw();
    workLayer.draw();
    lineLayer.draw();
  }); 
/*
 * While an object is being dragged, move all lines connected to it with it.
 */
 dragLayer.on('draw', function() {
  if(currShape != null) {
    var targetLine;
    for(var i = 0; i < currShape.children.length - OUTLET_OFFSET; i++) {
      targetLine = currShape.children[i+3].attrs.lineIn;
      if(targetLine != null) {
        targetLine.points()[2] = currShape.x();
        targetLine.points()[3] = currShape.y() + currShape.children[i+OUTLET_OFFSET].y();
      }
    }
    if (currShape.attrs.lineOut) {
      var yOffset;
      if (isFunction(currShape)) {
        yOffset = (currShape.children[0].height() + functionStrokeWidth) / 2;
      }
      else {
        yOffset = functionTotalSideLength / 2;
      }
    }
    for(var i = 0; i < currShape.attrs.lineOut.length; i++) {
      targetLine = currShape.attrs.lineOut[i];
      targetLine.points()[0] = currShape.x() + functionRectSideLength - OUTLET_OFFSET;
      targetLine.points()[1] = currShape.y() + yOffset;
    }
    lineLayer.draw();
  }
});

 dragLayer.on('dragmove', function() {
    if (dragShape != null) {
      var pos = stage.getPointerPosition();
      var node = workLayer.getIntersection(pos);
      if (node) {
        var group = node.getParent();
        if ((isValue(group) && isValue(dragShape)) ||
            (isFunction(group) && isFunction(dragShape))) {
          group.setAttrs({
            scaleX: 1.2,
            scaleY: 1.2
          });
          if (group.children[2].attrs.expanded) {
            renderCanvas(group);
          }
          scaledObj = group;
        }
      }
      else if (scaledObj != null) {
        scaledObj.setAttrs({
          scaleX: 1,
          scaleY: 1
        });
        if (scaledObj.children[2].attrs.expanded) {
            renderCanvas(scaledObj);
          }
        scaledObj = null;
      }
      workLayer.draw();
    }
  });
// LINE LAYER EVENTS
/*
- on click
- on mouseover
- on mouseout
*/
lineLayer.on('click', function(evt) {
  if(deleteToolOn) {
    removeLine(evt.target);
    insertToArray(actionToObject('delete', evt.target));
    lineLayer.draw();
    workLayer.draw();
  }
});

lineLayer.on('mouseover', function(evt) {
  if (deleteToolOn) {
    var shape = evt.target;
    shape.setAttrs({
      strokeWidth: 3,
      shadowColor: deleteColor,
      shadowEnabled: true
    });
    lineLayer.draw();
  }
}); 

lineLayer.on('mouseout', function(evt) {
  if (deleteToolOn) {
    var shape = evt.target;
    shape.setAttrs({
      strokeWidth: lineStrokeWidth,
      shadowEnabled: false
    });
    lineLayer.draw();
  }
});// TOOLBOX EVENTS
/* 
- workToolGroup on click
- lineToolGroup on click
- deleteToolGroup on click
- undoGroup on mousedown
- undoGroup on mouseup
- undoGroup on mouseout
- redoGroup on mousedown
- redoGroup on mouseup
- redoGroup on mouseout
- toolboxControl on mousedown
*/

workToolGroup.on('click', function(){
  if (makingLine) {
    removeLine(currLine);
    makingLine = false;
    lineLayer.draw();
  } // if making a line
  if (!workToolOn) {
    enableWorkTool();
  } // if workTool is not on
});


lineToolGroup.on('click', function() {
  if (!lineToolOn) {
    lineToolGroup.children[0].setAttr('shadowEnabled', true);
    lineToolOn = true;
    disableTool(workToolGroup);
    disableTool(deleteToolGroup);
    toolboxLayer.draw();
  } // if line tool is not already on
});

deleteToolGroup.on('click', function() {
  if (!deleteToolOn) {
    if (makingLine) {
      removeLine(currLine);
      makingLine = false; 
      lineLayer.draw();
    } // if making a line
    deleteToolGroup.children[0].setAttr('shadowEnabled', true);
    deleteToolOn = true;
    disableTool(workToolGroup);
    disableTool(lineToolGroup);
    toolboxLayer.draw();
  } // if the delete tool is not already on
});

undoGroup.on('mousedown', function() {
  if (currIndex > 0) {
    undoButton.setAttr('shadowEnabled', true);
    toolboxLayer.draw();
  }
});

undoGroup.on('mouseup', function() {
  if (currIndex > 0) {
    if (makingLine) {
      removeLine(currLine);
      makingLine = false; 
      lineLayer.draw();
    } // if making a line
    undoButton.setAttr('shadowEnabled', false);
    undoAction(actionArray[currIndex - 1]);
    currIndex--;
    shadeUndoRedo();
    openTag.destroy();
    labelLayer.draw();
    toolboxLayer.draw();
  } // if there is an action to undo
});

redoGroup.on('mousedown', function() {
  if (totalIndex > currIndex) {
    redoButton.setAttr('shadowEnabled', true);
    toolboxLayer.draw();
  } // if there is an action to redo
});

redoGroup.on('mouseup', function() {
  if (totalIndex > currIndex) {
    if (makingLine) {
      removeLine(currLine);
      makingLine = false; 
      lineLayer.draw();
    } // if making a line
    redoButton.setAttr('shadowEnabled', false);
    redoAction(actionArray[currIndex]);
    currIndex++;
    shadeUndoRedo();
    openTag.destroy();
    labelLayer.draw();
    toolboxLayer.draw();
  } // if there is an action to redo
});


toolboxControl.on('mousedown', function() {
  toolboxGroup.startDrag();
});

toolboxLayer.on('mouseover', function(evt) {
  var group = evt.target.getParent();
  var name = group.name();
  if (name == 'undo' || name == 'redo') {
    if ((name == 'undo' && currIndex > 0) || (name == 'redo' && totalIndex > currIndex)) {
      setTimeout(function(){
        if (openTag) {
          openTag.destroy();
        } // if there is already a visible tag
        var temp = toolboxLayer.getIntersection(stage.getPointerPosition());
        if (temp && group == temp.getParent()) {
          openTag = makeToolLabel(group);
          labelLayer.add(openTag);
          labelLayer.draw();
        } // if the mouse is still over the original object
      }, 500);
    } // if the undo/redo button is usable
  } // if undo or redo
  else if (name && tagsOn) {
    setTimeout(function(){
      if (openTag) {
        openTag.destroy();
      }
      var temp = toolboxLayer.getIntersection(stage.getPointerPosition());
      if (temp && group == temp.getParent()) {
        openTag = makeToolLabel(group);
        labelLayer.add(openTag);
        labelLayer.draw();
      } 
    }, 500);
  } // if mouse is over a button and tags are enabled
});

toolboxLayer.on('mouseout', function(evt) {
  var group = evt.target.getParent();
  var name = group.name();
  if (name == 'undo' || name == 'redo') {
    group.children[0].setAttr('shadowEnabled', false);
    toolboxLayer.draw();
  } // if undo or redo
  if (openTag) {
    openTag.destroy();
    labelLayer.draw();
  } // if there is a visible tag
});
/**
 * elementTable is a hash table that connects an element's id to the element in the 
 * workspace.
 */
 var elementTable = {};

/**
 * actionArray is an array that contains an action-object for every action in
 * a workspace. Used to implement undo/redo feature
 */
 var actionArray = [];

/**
 * currIndex keeps track of the index in actionArray where it would be appropriate to 
 * add the next action. Initialized at 0.
 */
 var currIndex = 0;
/**
 * a count of the total usable actions in actionArray. A user can redo until 
 * (totalIndex - 1) after undoing. Once a user creates a new action after undoing,
 * the totalIndex is set to the currIndex. 
 */
 var totalIndex = 0;

/**
  * actionToObject takes an function or value group and type of action, and creates an object 
  *  within an array to signify the action.
  * types of actions include:
  * - move
  * - delete
  * - insert
  * - replace
  */
  var actionToObject = function(action, group) {
    // If it's a function or value.
    if (isFunction(group) || isValue(group)) {
      var obj = {
        type: 'node',
        id: group._id.toString(), 
        action: action,
        x1: group.x(),
        y1: group.y(),
        connections: []
      };
      var child = 0;
      if (action == 'delete') {
        // Remember all the outgoing edges we're deleting.
        for (var i = 0; i < group.attrs.lineOut.length; i++) {
                 obj['connections'][child++] = actionToObject('delete', group.attrs.lineOut[i]);
             }
        // Remember all the incoming edges we're deleting.
        if (isFunction(group)) {
          for (var i = OUTLET_OFFSET; i < group.children.length; i++) {
            var lineIn = group.children[i].attrs.lineIn;
            if (lineIn != null && lineIn != undefined) {
              obj['connections'][child++] = actionToObject('delete', lineIn);
            } // if lineIn is not null
          } // for each incoming edge
        } // if there are incoming edge
      } // if we're deleting things
        else if (action == 'replace') {
            var oldGroup = arguments[2]
            obj.oldGroup = oldGroup;
            if (isFunction(group)) {
              if (group.attrs.maxInputs < oldGroup.children.length - 3) {
                var startingIndex = OUTLET_OFFSET + group.attrs.maxInputs;
                for (var i = startingIndex; i < oldGroup.children.length; i++) {
                  var lineIn = oldGroup.children[i].attrs.lineIn;
                  if (lineIn != null && lineIn != undefined) {
                    obj['connections'][child++] = actionToObject('delete', lineIn);
                  } 
                }
              }
            }
          }   // if we're replacing things
    } // if it's a function or value
    // If it's a line
    else if (isLine(group)) {
      var obj = {
        type: 'line',
        id: group._id.toString(),
        action: action,
        source: group.attrs.source,
        sink: group.attrs.outlet.parent,
            sinkIndex: group.attrs.outlet.attrs.outletIndex
        };
        if (action == 'replace') {
            var oldLine = arguments[2];
            obj.deleteLine = actionToObject('delete', oldLine);
        }
    } // if it's a line
    return obj;   
  };

/**
 * insertToArray takes an object properly formatted for the actionArray and puts
 * it in the array, increments the currIndex, updates the totalIndex, updates the
 * redo/undo button shading and draws the toolboxLayer
 */
 var insertToArray = function(actionObj) {
     actionArray[currIndex] = actionObj;
     currIndex++;
     totalIndex = currIndex;
     shadeUndoRedo();
     toolboxLayer.draw();
 };

/**
 * insertToTable takes a group newly added to the workspace and adds it the 
 * elementTable along with the group's id number as the key.
 */
 var insertToTable = function(group) {
     var stringId = group._id.toString();
     elementTable[stringId] = group;
 };

  /**
   * inTable takes a function or value group and checks if it's already been added
   * to the workspace from the menu. Returns true if group is already in the table, 
   * and false if it has not yet been added. 
   */
   var inTable = function(group) {
     var stringId = group._id.toString();
     return (elementTable[stringId] != undefined);
 };

  /**
   * undoAction takes an action from the action array and if an undo action is
   * possible, undoes one of the action (delete, insert, move, or replace)
   * for either a node or a line. The currIndex is updated and relevant layers
   * redrawn.
   */
   var undoAction = function(actionObj) {
    // if the an undo action is valid (there are actions to be undone)
    if (currIndex > 0) {
       var action = actionObj.action;
       var element = elementTable[actionObj.id];
     // if the action in question is a deletion
     if (action == 'delete') {
      // if working with a node
      if (actionObj.type == 'node') {
        // put the object back on the worklayer
        element.moveTo(workLayer);
        var connections = actionObj.connections;
        for (var i = 0; i < connections.length; i++) {
          // re-call the function on the line in question's deletion
          undoAction(connections[i]);
        } // go through each of the old line connections
        updateForward(element);
        removeShadow(element);
        updateFunBar();        
      } // if node
      // else working with a line
      else {
        insertLine(actionObj);
        assertRenderable(actionObj.sink);
        updateForward(actionObj.sink);
      } // else element is a line
      } // if delete
      // if the action in question is an insertion
      else if (action == 'insert') {
        if (actionObj.type == 'node') {
          if (element.attrs.renderLayer != null) {
            // close an open canvas
            collapseCanvas(element);
        }
          // remove the object from its layer
          element.remove(); 
        } // if node
        // if working with a line
        else {
          // remove the line and update its indexes
          removeLine(element);
          // remove extra outlet
          removeOutlet(actionObj.sink);
        }
      } // if insert
      // if the action in question is a movement
      else if (action == 'move') {
        // get the old position
        var newX = actionObj.x1;
        var newY = actionObj.y1;
        // set the object back to its old position
        element.setAttrs({
          x: newX,
          y: newY
      });
        // re-render the canvas if previously open
        if (element.children[2].attrs.expanded) {
          element.attrs.renderLayer.draw();
          renderCanvas(element);
      }
        //collapseCanvas(element);
        currShape = element;
        updateFunBar();
      } // if move
      // if the action in question is a replacement
      else {
        if (actionObj.type == 'node') {
            var oldGroup = actionObj.oldGroup //group to be put back on the workLayer
            oldGroup.moveTo(workLayer);
            replaceNode(element, oldGroup);
            var totalNeeded = oldGroup.children.length + actionObj.connections.length;
            for (var i = 0; i < actionObj.connections.length; i++)
            {
              if (oldGroup.children.length < totalNeeded) {
                addOutlet(oldGroup);
              }
              insertLine(actionObj.connections[i]);
              assertRenderable(actionObj.connections[i].sink);
              updateForward(actionObj.connections[i].sink);
            }
            workLayer.draw();
        } // if node
        else {
            removeLine(element);
            insertLine(actionObj.deleteLine);
            assertRenderable(actionObj.sink);
            updateForward(actionObj.sink);
        } // else line
      } // if replace
    } // if undo
    workLayer.draw();
    dragLayer.draw();
    lineLayer.draw();
};


  /**
   * redoAction takes an action from the action array and if a redo action is
   * possible, redoes one of the action (delete, insert, move, or replace)
   * for either a node or a line. The currIndex is updated and relevant layers
   * redrawn.
   */
   var redoAction = function(actionObj) {
    // if the currIndex is less than the totalIndex (there are still valid actions)
    if (currIndex < totalIndex) {
      var action = actionObj.action;
      var element = elementTable[actionObj.id];
      // if you are redoing a delete
      if (action == 'delete') {
        // if you are deleting a node
        if (actionObj.type == 'node') {
          // deal with lines coming in to the node being deleted
          var targetLine;
          // go through each of the outlets of the object
          for(var i = 3; i < element.children.length; i++) {
            
            // grab each line to the outlet
            targetLine = element.children[i].attrs.lineIn;
            // if such a line exists
            if(targetLine != null) {
              removeLine(targetLine);
            } // if not null
        }
          // deal with the lines leading out of the node being deleted
          var outletParent;
          // go through each of the lineOuts
          for(var i = 0; i < element.attrs.lineOut.length; i++) {
            // grab the line of interest
            targetLine = element.attrs.lineOut[i];
            // grab its sink's parent
            outletParent = targetLine.attrs.outlet.parent;
            // decrement the sink's inputs
            outletParent.attrs.numInputs--;
            // empty out the sink's outlet
            targetLine.attrs.outlet.attrs.lineIn = null;
            // check and update the rendering of the sink
            assertRenderable(outletParent);
            updateForward(outletParent);
            // remove the line from the lineLayer
            targetLine.remove();
        } 
          // remove text from funBar
          if (currShape == element) {
            currShape = null;
            updateFunBar();
          }
          // remove the element form the workLayer
          element.remove();
        } // if node
        // else line
        else {
          // remove the line and update th esink and source's indexes
          removeLine(element);
      }
      } // if delete
      //else if insert
      else if (action == 'insert') {
        // if working with a ndoe
        if (actionObj.type == 'node') {
          // remove the element from the workLayer
          element.moveTo(workLayer);
        } // if node
        // if working with a line
        else {
          // insert the old line
          insertLine(actionObj);
          assertRenderable(actionObj.sink);
          updateForward(actionObj.sink);
          lineLayer.draw();
      }
      workLayer.draw();
      } // if insert
      // else if move
      else if (action == 'move') {
        // grab the ending position of the movement
        var newX = actionObj.x2;
        var newY = actionObj.y2;
        // grab fo the object
        var element = elementTable[actionObj.id];
        // re-move the object back to the changed position
        element.setAttrs({
          x: newX,
          y: newY
      });
        // re-render a canvas if previously open
        if (element.children[2].attrs.expanded) {
          element.attrs.renderLayer.draw();
          renderCanvas(element);
      }
        // update the currShape
        removeShadow(currShape);
        currShape = element;
        setSelectedShadow(currShape);
        updateForward(element);
        updateFunBar(); 
      } // if move
      // else replace
      else {
        if (actionObj.type == 'node') {
            var oldGroup = actionObj.oldGroup //group to be put back on the workLayer
            element.moveTo(workLayer);
            replaceNode (oldGroup, element); 
            for (var i = 0; i < actionObj.connections.length; i++)
            {
              var lineObj = actionObj.connections[i];
            
              insertLine(actionObj.connections[i]);
              assertRenderable(actionObj.connections[i].sink);
              updateForward(actionObj.connections[i].sink);
            }

        } // if node
        else {
          removeLine(elementTable[actionObj.deleteLine.id]);
          insertLine(actionObj);
          assertRenderable(actionObj.sink);
          updateForward(actionObj.sink);
        } // else line
      } // else replace
      dragLayer.draw(); 
      workLayer.draw();
      lineLayer.draw();
    } // currIndex < totalIndex
  }; // function redoAction(actionObj)


  /**
   * removeLine take a line and removes it from the workspace and 
   * removes all other associations to the line in its source and sink. 
   * updates funBar text. 
   */
   var removeLine = function(line) {
    var outlet = line.attrs.outlet;
    
    var index = line.attrs.sourceIndex;
    var source = line.attrs.source;
    for (var j = index + 1; j < source.attrs.lineOut.length; j++) {
      source.attrs.lineOut[j].attrs.sourceIndex--;
    }
    // remove the sourceIndex'th lineOut from the line's source
    source.attrs.lineOut.splice(line.attrs.sourceIndex, 1);
    if (outlet) {
      var sink = outlet.parent;
      // empty out the sink's outlet
      outlet.attrs.lineIn = null;
      // update the sink's number of outlets
      sink.attrs.numInputs--;
      // if the sink is the currShape
      if (sink == currShape) {
        // if the sink is still renderable, update the funBarText
        if (assertRenderable(sink)) {
          funBarText.setAttr('text', currShape.attrs.renderFunction);
        } // if renderable
        else {
          // update currShape's identification and the funBarText
          funBarText.setAttr('text', ''); 
        } // else un-renderable
        funBarLayer.draw();
      } // if currShape
      else {
      // if sink is not currShape, assert and update renderability of sink
      assertRenderable(sink);
      }
      // update
      updateForward(sink);
      //setOutletOpacity(sink);
    } // if outlet is not null
  // reset the strokeWidth
  line.setAttr('strokeWidth', lineStrokeWidth);
  // remove the line from the lineLayer
  line.remove();
};

  /**
   * insertLine takes an actionObj, finds the corresponding line, moves it to the 
   * lineLayer, and connects the line to its source and sink.
   */ 
   var insertLine = function(actionObj) {
    var sink = actionObj.sink;
    var source = actionObj.source;
    var outlet = sink.children[actionObj.sinkIndex + 3];
    if (outlet) {
      var element = elementTable[actionObj.id];
      // move old line to the lineLayer
      element.moveTo(lineLayer);
      // connect line to source
      element.attrs.source = source;
      // change sourceIndex in line
      element.attrs.sourceIndex = source.attrs.lineOut.length;
      // connect source to line
      source.attrs.lineOut[source.attrs.lineOut.length] = element;
      // connect line to outlet
      element.attrs.outlet = outlet;
      // connect outlet to line
      outlet.attrs.lineIn = element;
      // increment numInputs
      sink.attrs.numInputs++;
      // add outlet if nessecary
      if (sink.children[sink.children.length - 1].attrs.lineIn) {
        addOutlet(sink);
      }
      // set the line's attributes
      element.setAttrs({
        scale: 1,
        shadowEnabled: false
      });
      var temp = currShape;
      // update the currshape to be the sink and re-draw
      currShape = sink;
      dragLayer.draw();
      // update the currShape to be the source and re-draw
      currShape = actionObj.source;
      dragLayer.draw();
      currShape = temp;
    }
  };


  /**
   * shadeUndoRedo takes no parameters and instead works off of the global
   * variables currIndex and totalIndex to update the attributes of the 
   * undo/redo buttons to reflect their validity.
   */ 
   var shadeUndoRedo = function() {
    // if an undo action is possible
    if (currIndex > 0) {
      // color the undo button grey
      undoButton.setAttr('fill', 'grey');
  } 
    // if undo is invalid
    else {
      // color the undo button a lighter grey
      undoButton.setAttr('fill', '#E3E3E3');
  } 
    // is a redo action is possible
    if (currIndex < totalIndex) {
      // color the undo button grey
      redoButton.setAttr('fill', 'grey');
  }
    // if redo is invalid
    else {
      // color the undo button a lighter grey
      redoButton.setAttr('fill', '#E3E3E3');
  } 
};

/**
* The save screen is what appears when a user want to save or download an images they create.
*/

/**
 * the cover is an opaque black rectangle that covers the whole stage to prevent action 
 * from taking place while a pop-up window is open
 */
var cover = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: width,
  height: height,
  fill: 'black',
  opacity: .6,
  visible: false
});
screenLayer.add(cover);

var popSaveGroup = new Kinetic.Group({
  x: popSaveGroupX, 
  y: popSaveGroupY,
  visible: false
});
screenLayer.add(popSaveGroup);

var popSaveRect = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popRectWidth,
  height: popRectHeight,
  fill: popRectColor,
  stroke: 'black',
  strokeWidth: 1
});
popSaveGroup.add(popSaveRect);

var renderPopText = new Kinetic.Text({
  text: "",
  x: popTextShiftX,
  y: popTextShiftY,
  width: popTextWidth,
  height: popTextHeight,
  fill: 'black',
  fontSize: popTextFontSize,
  fontFamily: functionFont,
  align: 'center'
});
popSaveGroup.add(renderPopText);

var nameText = new Kinetic.Text({
  text: "Name:",
  x: popTextShiftX,
  y: popTextShiftY + (popTextHeight * 1.4),
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
});
popSaveGroup.add(nameText);

var nameRect = new Kinetic.Rect ({
  x: popTextShiftX + nameTextShift,
  y: popTextShiftY + (popTextHeight * 1.3),
  width: popCanvasSide - nameTextShift,
  height: popTextHeight / 1.5,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 1
});
popSaveGroup.add(nameRect);

var nameEditText = new Kinetic.Text({
  x: popTextShiftX + (nameTextShift * 1.1),
  y: popTextShiftY + (popTextHeight * 1.4),
  text: 'Enter a Name',
  fontSize: 14,
  width: popCanvasSide - nameTextShift,
  height: popTextHeight / 1.5,
  fontFamily: globalFont,
  fill: 'black'
});
popSaveGroup.add(nameEditText);
nameEditText.setEditable(true);
nameEditText.matchingCharacters = /[a-zA-Z0-9 \-]/;
nameEditText.defaultText = 'Enter a Name';
nameEditText.drawMethod = function(){
screenLayer.draw()
};

// ERROR TEXT
var popErrorText = new Kinetic.Text({
  x: popTextShiftX,
  y: popTextShiftY + (popTextHeight * 2.2),
  text: '',
  width: popRectWidth - (2*popTextShiftX),
  fontFamily: globalFont,
  fontSize: 14,
  fill: errorColor,
});
popSaveGroup.add(popErrorText);

//CANCEL BUTTON GROUP
var popCancelButtonGroup = new Kinetic.Group({
  x: popTextShiftX,
  y: popRectHeight - (popTextHeight * 1.25),
  name: 'cancel'
});
popSaveGroup.add(popCancelButtonGroup);

var popCancelButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popButtonWidth,
  height: popButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popCancelButtonGroup.add(popCancelButton);

var popCancelButtonText = new Kinetic.Text({
  text: "Cancel",
  x: 0,
  y: (popButtonHeight - 16) / 2,
  width: popButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popCancelButtonGroup.add(popCancelButtonText);

//DOWLOAD BUTTON GROUP
var popDownloadButtonGroup = new Kinetic.Group({
  x: popTextShiftX + popButtonShiftX + popButtonWidth,
  y: popRectHeight - (popTextHeight * 1.25),
  name: 'download'
});
popSaveGroup.add(popDownloadButtonGroup);

var popDownloadButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popButtonWidth,
  height: popButtonHeight,
  fill: popButtonColor,
  stroke: 'grey', 
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popDownloadButtonGroup.add(popDownloadButton);

var popDownloadButtonText = new Kinetic.Text({
  text: "Download",
  x: 0,
  y: (popButtonHeight - 16) / 2,
  width: popButtonWidth,
  fill: 'grey',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popDownloadButtonGroup.add(popDownloadButtonText);


//SAVE BUTTON GROUP
var popSaveButtonGroup = new Kinetic.Group({
  x: popTextShiftX + (2 * popButtonShiftX) + (2 * popButtonWidth),
  y: popRectHeight - (popTextHeight * 1.25),
  name: 'save'
});
popSaveGroup.add(popSaveButtonGroup);

var popSaveButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popButtonWidth,
  height: popButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popSaveButtonGroup.add(popSaveButton);

var popSaveButtonText = new Kinetic.Text({
  text: "Save",
  x: 0,
  y: (popButtonHeight - 16) / 2,
  width: popButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popSaveButtonGroup.add(popSaveButtonText);

// rCanvas is the canvas used to render the image on the saveScreen
var rCanvas = renderLayer.canvas._canvas;
var rAnimator;

/**
 * renderPopCanvas takes a renderFunction and renders that image on the save screen
 * at a resolution of (width * (2 / 9))
 */
var renderPopCanvas = function(renderFunction) {
  rAnimator = new MIST.ui.Animator(renderFunction, [], {}, 
    rCanvas, function() { });
  rAnimator.bounds(popCanvasShiftX, popCanvasShiftY, 
                   popCanvasSide, popCanvasSide);
  rAnimator.setResolution(popCanvasResolution, popCanvasResolution);
  rAnimator.frame();
  /*
  var mistObj = MIST.parse(renderFunction);
  MIST.render(mistObj, {}, rCanvas, 
    popCanvasResolution, popCanvasResolution, 
    popCanvasShiftX, popCanvasShiftY, 
    popCanvasSide, popCanvasSide);	
*/
}; // renderPopCanvas(renderFunction)

/**
 * updatePoptext takes a renderFunction and displays up to 74 characters of the 
 * renderFunction below the image. If the length of the renderFunction is larger than
 * 74, '...' is added to the end of the string before it's displayed.
 */
var updatePopText = function(renderFunction) {
  if (renderFunction.length > 74) {
    text = renderFunction.substring(0, 71) + "...";
  } // if 
  else {
    text = renderFunction
  } // else
  renderPopText.setAttr('text', text);
}; // updatePopText(renderFunction);

/**
 * screenLayer.on('mouseover' ...) checks if it's mousing over a button.
 * If it is, it changes the color to the selected color
 */
screenLayer.on('mouseover', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name && group.attrs.name != 'download') {
    group.children[0].setAttr('fill', popButtonSelectedColor);
    screenLayer.draw();
  } // if name (not download)
});

/**
 * screenLayer.on('mouseout' ...) checks if it's mousing out of a button.
 * If it is, it disables the shadow and changes color to original color
 */
screenLayer.on('mouseout', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name) {
    group.children[0].setAttrs({
      fill: popButtonColor,
      shadowEnabled: false
    });
    screenLayer.draw();
  } // if name
});

/**
 * screenLayer.on('mousedowm' ...) checks if it's mousing down on a button.
 * If it is, it enables the shadow around the box of the button
 */
screenLayer.on('mousedown', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name && group.attrs.name != 'download') {
    group.children[0].setAttr('shadowEnabled', true);
    screenLayer.draw();
  } // if button (not download)
});

/**
 * screenLayer.on('mouseup' ...) checks if it's mousing up on a button.
 * If it is, it removes the shadow from the box
 */
screenLayer.on('mouseup', function(evt) {
  var group = evt.target.parent;
  var name = group.attrs.name
  if (name) {
    group.children[0].setAttr('shadowEnabled', false);
    screenLayer.draw();
  } // if name
});

/**
 * popCancelButtonGroup.on('mouseup' ...) collapses the saveScreen
 */
popCancelButtonGroup.on('mouseup', function(){
  cover.setAttr('visible', false);
  popSaveGroup.setAttr('visible', false);
  popErrorText.setAttr('text', '');
  //animation = false;
  showThumbnails();
  rAnimator.stop();
  rAnimator = undefined;
  screenLayer.draw();
  setTimeout(function(){
      renderLayer.draw();
    }, 50);
});

/**
 * popSaveButtonGroup.on('mouseup' ...) gets the name entered by the user in the saveScreen,
 * removes whitespace from the beginning and end of the name, and checks if the name is valid.
 * If the name is not valid, it displays an error message.
 * If the name is valid, the image is saved to their account, and the saveScreen collapses.
 * TODO: check if the user is logged in, and if not, allow user to login without losing work.
 */
popSaveButtonGroup.on('mouseup', function(){
  var newName = nameEditText.attrs.text;
  newName = removeOuterWhiteSpace(newName);
  var response = imageExists(newName);
  if (newName == '' || newName == 'Enter a Name') {
    popErrorText.setAttr('text', 'Please enter a name for your image.');
  } // if no name is entered
  else if (response == 'true') {
  	popErrorText.setAttr('text', 'You\'ve already made an image called \'' + 
  		newName + '\'\n' + 'Please choose a different name.');
  } // if image already exists in user's account
  else if (response == 'logged out') {
  	popErrorText.setAttr('text', 'To save an image, please log in or sign up.');
  } // if user is not logged in
  else {
    var renderFunction = currShape.attrs.renderFunction;
    var imageid = saveImage(newName, renderFunction, true, true, true);
    popErrorText.setAttr('text', '');
    cover.setAttr('visible', false);
    popSaveGroup.setAttr('visible', false);
    showThumbnails();
    rAnimator.stop()
    rAnimator = undefined;
    setTimeout(function(){
      renderLayer.draw();
    }, 50);
    showSuccessDialog(newName, imageid);
  } // else valid name is enters
  screenLayer.draw();
});

/**
* openSavePopUp sets the cover and popSaveGroup to visible and begins animation.
*/
var openSavePopUp = function() {
  hideThumbnails();
  cover.setAttr('visible', true);
  popSaveGroup.setAttr('visible', true);
  var renderFunction = currShape.attrs.renderFunction;
  updatePopText(renderFunction);
  renderLayer.moveToTop();
  renderPopCanvas(renderFunction);
  rAnimator.start();
  screenLayer.draw();
  /*
  animation = true;
  screenLayer.draw();
  var frame = function() {
    renderPopCanvas(renderFunction);
    if (animation) {
      setTimeout(frame, 50);
    } // if animation
  } // frame()
  frame();
  */
}; // openSavePopUp()


/**
 * hideThumbnails goes through all the nodes on the workLayer and, if they're expanded,
 * draws their renderLayer to hide their image.
 */
var hideThumbnails = function() {
  var nodes = workLayer.children;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children[2].attrs.expanded) {
      node.attrs.renderLayer.draw();
    } // if expanded
  } // for
}; //hideThumbnails()

/**
 * showThumbnails goes through all the nodes on the workLayer and, if they're expanded,
 * renders their canvas
 */
var showThumbnails = function() {
  var nodes = workLayer.children;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children[2].attrs.expanded) {
      renderCanvas(node);
    } // if expanded
  } // for 
}; // showThumbnails()

/**
* removeOuterWhiteSpace takes a string and removes white space at the beginning and end
* of the string, but not the white space in the middle of the string.
* returns a string
*/
var removeOuterWhiteSpace = function (string) {
  var start = 0;
  var end = string.length - 1;
  string = string.replace(/^ */, "");
  string = string.replace(/ *$/, "");
  return string;
}; // removeOuterWhiteSpace


var popWsRectWidth = width * .4;
var popWsRectHeight = height * .25;
var popSaveWsGroupX = (width - popWsRectWidth) / 2;
var popSaveWsGroupY = (height - popWsRectHeight) / 2;

var popWsButtonShiftX = popTextShiftX;//((popWsRectWidth / 2) - (2 * popWsButtonWidth)) / 3;
var popWsButtonWidth = ((popWsRectWidth / 2) - (3 * popWsButtonShiftX)) / 2;
var popWsButtonHeight = popWsRectWidth * .06;



var saveWsGroup = new Kinetic.Group({
  x: popSaveWsGroupX,
  y: popSaveWsGroupY,
  visible: false
});
screenLayer.add(saveWsGroup);

var saveWsRect = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: popWsRectWidth,
  height: popWsRectHeight,
  fill: popRectColor,
  stroke: 'black',
  strokeWidth: 1
});
saveWsGroup.add(saveWsRect);

var nameWsText = new Kinetic.Text({
  text: "Name:",
  x: popTextShiftX,
  y: popTextShiftX,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
});
saveWsGroup.add(nameWsText);

var nameWsRect = new Kinetic.Rect ({
  x: popTextShiftX + nameTextShift,
  y: popTextShiftX * .85,
  width: popCanvasSide - nameTextShift,
  height: popTextHeight / 1.5,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 1
});
saveWsGroup.add(nameWsRect);

var nameWsEditText = new Kinetic.Text({
  x: popTextShiftX + (nameTextShift * 1.1),
  y: popTextShiftX,
  text: 'Enter a Name',
  fontSize: 14,
  width: popCanvasSide - nameTextShift,
  height: popTextHeight / 1.5,
  fontFamily: globalFont,
  fill: 'black'
});
saveWsGroup.add(nameWsEditText);
nameWsEditText.setEditable(true);
nameWsEditText.matchingCharacters = /[a-zA-Z0-9\-]/;
nameWsEditText.defaultText = 'Enter a Name';
nameWsEditText.drawMethod = function(){
  screenLayer.draw()
};

var popWsErrorText = new Kinetic.Text({
  text: '',
  x: popTextShiftX,
  y: nameWsText.height() + (2 * popTextShiftX),
  width: popWsRectWidth - (2 * popTextShiftX),
  fill: errorColor,
  fontFamily: globalFont,
  fontSize: 14
});
saveWsGroup.add(popWsErrorText);

var popWsCancelButtonGroup = new Kinetic.Group({
  x: (popWsRectWidth / 2) + popWsButtonShiftX,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'cancel'
});
saveWsGroup.add(popWsCancelButtonGroup);

var popWsCancelButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popWsCancelButtonGroup.add(popWsCancelButton);

var popWsCancelButtonText = new Kinetic.Text({
  text: "Cancel",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popWsCancelButtonGroup.add(popWsCancelButtonText);

var popSaveWsButtonGroup = new Kinetic.Group({
  x: (popWsRectWidth / 2) + (2 * popWsButtonShiftX) + popWsButtonWidth,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'save'
});
saveWsGroup.add(popSaveWsButtonGroup);

var popSaveWsButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popSaveWsButtonGroup.add(popSaveWsButton);

var popSaveWsButtonText = new Kinetic.Text({
  text: "Save",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popSaveWsButtonGroup.add(popSaveWsButtonText);



var popWsYesButtonGroup = new Kinetic.Group ({
  x: (popWsRectWidth / 2) + popWsButtonShiftX,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'yes',
  visible: false
});
saveWsGroup.add(popWsYesButtonGroup);

popWsYesButtonGroup.add(new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
}));

popWsYesButtonGroup.add(new Kinetic.Text({
  text: "Yes",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
}));

var popWsNoButtonGroup = new Kinetic.Group ({
  x: (popWsRectWidth / 2) + (2 * popWsButtonShiftX) + popWsButtonWidth,
  y: popWsRectHeight - (popTextHeight * 1.25),
  name: 'yes',
  visible: false
});
saveWsGroup.add(popWsNoButtonGroup);

popWsNoButtonGroup.add(new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: popWsButtonWidth,
  height: popWsButtonHeight,
  fill: popButtonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
}));

popWsNoButtonGroup.add(new Kinetic.Text({
  text: "No",
  x: 0,
  y: (popWsButtonHeight - 16) / 2,
  width: popWsButtonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
}));

var attempts = 0;
popSaveWsButtonGroup.on('mouseup', function(){
  var newName = nameWsEditText.attrs.text;
  var response = wsExists(newName);
  if (response == 'true') {
    popWsErrorText.setAttr('text', '\'' + newName  + '\' is already a workspace.\n' +
      'Do you want to continue anyways?');
    popWsYesButtonGroup.setAttr('visible', true);
    popWsNoButtonGroup.setAttr('visible', true);
    popSaveWsButtonGroup.setAttr('visible', false);
    popWsCancelButtonGroup.setAttr('visible', false);
    nameWsEditText.setEditable(false);
  } // if user already has a workspace with newName
  else if (response == 'logged out') {
    popWsErrorText.setAttr('To save a workspace, please log in or sign up.');
  } // if user is not logged in
  else {
    saveWorkspace(newName, true);
    currentWorkspace = newName;
    cover.setAttr('visible', false);
    saveWsGroup.setAttr('visible', false);
    showThumbnails();
  } // else a valid workspace name
  screenLayer.draw();
});

popWsYesButtonGroup.on('mouseup', function(){
  var newName = nameWsEditText.attrs.text;
  saveWorkspace(newName, true);
  currentWorkspace = newName;
  popWsYesButtonGroup.setAttr('visible', false);
  popWsNoButtonGroup.setAttr('visible', false);
  popSaveWsButtonGroup.setAttr('visible', true);
  popWsCancelButtonGroup.setAttr('visible', true);
  nameWsEditText.setEditable(true);
  popWsErrorText.setAttr('text', '');
  cover.setAttr('visible', false);
  saveWsGroup.setAttr('visible', false);
  showThumbnails();
  screenLayer.draw();
});

popWsNoButtonGroup.on('mouseup', function(){
  popWsYesButtonGroup.setAttr('visible', false);
  popWsNoButtonGroup.setAttr('visible', false);
  popSaveWsButtonGroup.setAttr('visible', true);
  popWsCancelButtonGroup.setAttr('visible', true);
  popWsErrorText.setAttr('text', '');
  nameWsEditText.setAttr('text', 'Enter a Name');
  nameWsEditText.setEditable(true);
  screenLayer.draw();
});

popWsCancelButtonGroup.on('mouseup', function(){
  popWsYesButtonGroup.setAttr('visible', false);
  popSaveWsButtonGroup.setAttr('visible', true);
  popWsErrorText.setAttr('text', '');
  cover.setAttr('visible', false);
  saveWsGroup.setAttr('visible', false);
  nameWsEditText.setEditable(true);
  showThumbnails();
  screenLayer.draw();
});

var openSaveWsPopUp = function() {
  hideThumbnails();
  cover.setAttr('visible', true);
  saveWsGroup.setAttr('visible', true);
  if (currentWorkspace) {
    nameWsEditText.setAttr('text', currentWorkspace);
  } // if currentWorkspace exists
  screenLayer.draw();
};var openWsGroup = new Kinetic.Group({
	x: popSaveWsGroupX,
	y: popSaveWsGroupY,
	visible: false
});
screenLayer.add(openWsGroup);

var openWsRect = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: popOpenWsRectWidth,
	height: popOpenWsRectHeight,
	fill: popRectColor,
	stroke: 'black',
	strokeWidth: 1
});
openWsGroup.add(openWsRect);

var nameOpenWsText = new Kinetic.Text({
	text: "Name:",
	x: popTextShiftX,
	y: popTextShiftX,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
});
openWsGroup.add(nameOpenWsText);

var nameOpenWsRect = new Kinetic.Rect ({
	x: popTextShiftX + nameTextShift,
	y: popTextShiftX * .85,
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fill: 'white',
	stroke: 'black',
	strokeWidth: 1
});
openWsGroup.add(nameOpenWsRect);

var nameOpenWsEditText = new Kinetic.Text({
	x: popTextShiftX + (nameTextShift * 1.1),
	y: popTextShiftX,
	text: 'Enter a Name',
	fontSize: 14,
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fontFamily: globalFont,
	fill: 'black'
});
openWsGroup.add(nameOpenWsEditText);
nameOpenWsEditText.setEditable(true);
nameOpenWsEditText.matchingCharacters = /[a-zA-Z0-9\-]/;
nameOpenWsEditText.defaultText = 'Enter a Name';
nameOpenWsEditText.drawMethod = function(){
	screenLayer.draw()
};

var popOpenWsCancelButtonGroup = new Kinetic.Group({
	x: (popOpenWsRectWidth / 2) + popOpenWsButtonShiftX,
	y: popOpenWsRectHeight - (popTextHeight * 1.25),
	name: 'cancel'
});
openWsGroup.add(popOpenWsCancelButtonGroup);

var popOpenWsCancelButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popOpenWsButtonWidth,
	height: popOpenWsButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
});
popOpenWsCancelButtonGroup.add(popOpenWsCancelButton);

var popOpenWsCancelButtonText = new Kinetic.Text({
	text: "Cancel",
	x: 0,
	y: (popOpenWsButtonHeight - 16) / 2,
	width: popOpenWsButtonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popOpenWsCancelButtonGroup.add(popOpenWsCancelButtonText);

var popOpenWsButtonGroup = new Kinetic.Group({
	x: (popOpenWsRectWidth / 2) + (2 * popOpenWsButtonShiftX) + popOpenWsButtonWidth,
	y: popOpenWsRectHeight - (popTextHeight * 1.25),
	name: 'save'
});
openWsGroup.add(popOpenWsButtonGroup);

var popOpenWsButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popOpenWsButtonWidth,
	height: popOpenWsButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
});
popOpenWsButtonGroup.add(popOpenWsButton);

var popOpenWsButtonText = new Kinetic.Text({
	text: "Open",
	x: 0,
	y: (popOpenWsButtonHeight - 16) / 2,
	width: popOpenWsButtonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popOpenWsButtonGroup.add(popOpenWsButtonText);

popOpenWsCancelButtonGroup.on('mouseup', function(){
	cover.setAttr('visible', false);
	openWsGroup.setAttr('visible', false);
	showThumbnails();
	screenLayer.draw();
});

popOpenWsButtonGroup.on('mouseup', function(){
	var openText = nameOpenWsEditText.attrs.text;
	loadWorkspace(openText);
	currentWorkspace = openText;
	cover.setAttr('visible', false);
	openWsGroup.setAttr('visible', false);
	showThumbnails();
	screenLayer.draw();
});

var openOpenWsPopUp = function() {
	hideThumbnails();
	cover.setAttr('visible', true);
	openWsGroup.setAttr('visible', true);
	screenLayer.draw();
};funBarSaveImGroup.on('mouseup', function(){
  if (currShape && isRenderable(currShape)) {
    enableWorkTool();
    openSavePopUp();
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', false);
    funBarLayer.draw();
  }
});

funBarSaveImGroup.on('mousedown', function(){
  if (currShape && isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttr('shadowEnabled', true);
    funBarLayer.draw();
  }
});

funBarSaveImGroup.on('mouseover', function(){
  if (currShape && isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttr('fill', valueMenuColorLight);
    funBarLayer.draw();
  }
});

funBarSaveImGroup.on('mouseout', function(){
  if (currShape && isRenderable(currShape)) {
    funBarSaveImGroup.children[0].setAttrs({
      fill: valueMenuColor,
      shadowEnabled: false
    });
    funBarLayer.draw();
  }
});



/**
 * getInfoText takes a string (key), looks up the information for that key in 
 * MIST.builtins.functions and returns a string to be used in the label for that key.
 */
var getInfoText = function(key) {
	var info = MIST.builtins.functions.get(key);
	return key + '(' + info.params + ')\n\n' + info.about;
};

var menuFunctionDescriptions = {}

var funKeys = MIST.builtins.functions.keys();
for(var i = 0; i < funKeys.length; i++) {
	var key = funKeys[i];
	menuFunctionDescriptions[key] = getInfoText(key);
}

var menuValuesDescriptions = {
	x:        'ranges -1 to 1 based on the x-value',
	y:        'ranges -1 to 1 based on the y-value',
	second:   'goes through values -1 to 1 every second',
	minute:   'goes through values -1 to 1 every minute',
	hour:     'goes through values -1 to 1 every hour',
	day:      'goes through values -1 to 1 every day',
	constant: 'enter your own number',
	mouseX:   'takes the x-value of the position of the mouse on the image',
	mouseY:   'takes the y-value of the position of the mouse on the image'
}

var toolboxDescriptions = {
	workTool: 'select and move objects (w)',
	lineTool: 'create connections from values and functions to functions (c)',
	deleteTool: 'delete lines, values, and functions from workspace (d)',
	undo: 'undo',
	redo: 'redo'
};

var tagColor = 'white';
var pointerWidth = width / 90;
var pointerHeight = width / 104;
var triRadius = width / 156;


var makeLabel = function(group) {
	var xOffset = 0;
	var rep = group.attrs.rep;
	var text = menuFunctionDescriptions[rep];
	if (rep == 'rgb') {
		var label = new Kinetic.Group({
			x: group.x(),
			y: group.y()
		});

		var rgbText = new Kinetic.Text({
			text: text,
			x: -110,
			y: pointerHeight + (1.1 * functionTotalSideLength),
			padding: 5,
			width: 160,
			fill: 'black'
		});

		label.add(new Kinetic.Rect({
			x: rgbText.x(),
			y: rgbText.y(),
			width: rgbText.width(),
			height: rgbText.height(),
			fill: tagColor,
			lineJoin: 'round',
			shadowColor: 'black',
			shadowOffset: [5, 5],
		}));

		/*
		label.add(new Kinetic.RegularPolygon({
			x: (functionTotalSideLength / 2),
			y: (1.2 * functionTotalSideLength),
			sides: 3,
			radius: 7,
			fill: tagColor,
			stroke: 'black',
			strokeWidth: .3,
			lineJoin: 'round',
		}));
*/

		label.add(rgbText);
	}
	else {
		if (isValue(group)){
			xOffset = -4;
			text = menuValuesDescriptions[group.name()];
		}
		var label = new Kinetic.Label ({
			x: group.x() + (functionTotalSideLength / 2) + xOffset,
			y: group.y() + (1.1 * functionTotalSideLength),
		});

		label.add(new Kinetic.Tag({
			fill: tagColor,
			pointerDirection: 'up',
			pointerWidth: pointerWidth,
			pointerHeight: pointerHeight,
			lineJoin: 'round',
			shadowColor: 'black',
			shadowOffset: [5, 5],
		}));

		label.add(new Kinetic.Text({
			text: text,
			fontFamily: globalFont,
			fontSize: 13,
			padding: 5,
			fill: 'black'
		}));
		if (label.children[1].width() > 160) {
			label.children[1].destroy();
			label.add(new Kinetic.Text({
				text: text,
				width: 160,
				fontFamily: globalFont,
				fontSize: 13,
				padding: 5,
				fill: 'black'
			}));
		}
	}
	return label;
};

var makeToolLabel = function(group) {
	var xToolbox = toolboxGroup.x();
	var yToolbox = toolboxGroup.y();
	var name = group.name();
	var text = toolboxDescriptions[name];
	var tagX = xToolbox + group.x() + (1.1 * toolboxButtonSize);
	var direction = 'left'
	if (xToolbox > (width / 2)) {
		tagX = xToolbox + group.x() - (0.1 * toolboxButtonSize);
		direction = 'right'
	}
	var label = new Kinetic.Label ({
		x: tagX,
		y: yToolbox + group.y() + (toolboxButtonSize / 2),
	});

	label.add(new Kinetic.Tag({
		fill: tagColor,
		pointerDirection: direction,
		pointerWidth: pointerWidth,
		pointerHeight: pointerHeight,
		lineJoin: 'round',
		shadowColor: 'black',
		shadowOffset: [5, 5],
	}));

	label.add(new Kinetic.Text({
		text: text,
		fontFamily: globalFont,
		fontSize: 13,
		padding: 5,
		fill: 'black'
	}));
	if (name == 'redo') {
		var actionObj = actionArray[currIndex];
		var action = actionObj.action;
		var newText = 'redo ' + action + ' (ctrl-y)'; 
		label.children[1].setAttr('text', newText)
	}
	else if (name == 'undo') {
		var actionObj = actionArray[currIndex - 1];
		var action = actionObj.action;
		var newText = 'undo ' + action + ' (ctrl-z)';
		label.children[1].setAttr('text', newText)
	}

	return label;
};
/**
 * mistgui-initialize-stage.js
 *   Set up a stage for the MIST gui.
 */

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

/**
 * Our primary stage.
 */
var stage;

/**
 * The previous workspace.  Possibly used for caching.
 */
var prevWorkspace;

// +---------+---------------------------------------------------------
// | Methods |
// +---------+

/**
 * Initialize the stage to use a container with a particular name.
 */
function initializeStage(containerName) {
  // Create the object
  stage = new Kinetic.Stage({
    container: containerName,
    width: width,
    height: height
  });

  // Add the layers to the stage. The top layer is the one most recently added, and
  // objects within a layer follow the same logic.
  stage.add(lineLayer);
  stage.add(menuLayer);
  stage.add(menuButtonLayer);
  stage.add(menuArrowLayer);
  stage.add(menuControlLayer);
  stage.add(workLayer);
  stage.add(borderLayer);
  stage.add(funBarLayer);
  stage.add(textLayer);
  stage.add(toolboxLayer);
  stage.add(labelLayer);
  stage.add(dragLayer);
  stage.add(screenLayer);
  stage.add(renderLayer);

  // Indicate that the stage is ready for 
 readyEditing(stage);

  // Set up the previous workspace
  prevWorkspace = initWorkspace();

  if (prevWorkspace) {
    jsonToWorkspace(prevWorkspace);
  } // if there's a previous workspace

  // Set up the handler for making lines.  Note that makingLine is declared
  // somewhere (although I'm not sure where).
  stage.addEventListener('contentMousemove', function(){
    if (makingLine) {
      currLine.points()[2] = stage.getPointerPosition().x;
      currLine.points()[3] = stage.getPointerPosition().y;
      lineLayer.draw();
    } // if (makingLine)
  });
} // initializeStage
// WORK LAYER EVENTS
/**
 * mistgui-work-layer-events.js
 *   Set up handlers for events that happen in the work layer.  These include
 *     - on click
 *     - on mousedown
 *     - on contentMousemove
 *     - on mouseover
 *     - on mouseout
 */

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

/*
There are 3 different modes:
  1. WorkTool (users can navigate the menu, drag objects onto the board from the menu, drag
      objects around in the work layer, or render thumbnails)
  2. LineTool (users can connect different nodes by clicking on one, and connecting to an outlet
      on another)
  3. DeleteTool (users can remove unwanted functions, values, or lines from the workLayer)

  The default is workTool. 

  When making a line, form a connection on click if the click was on an outlet.
  Behind the scenes:
  1. if the object clicked was the source of the line, destroy the line.
  2. If the outlet already had a connection, make that connection null and destroy it
  --otherwise, this is connected to a new outlet so increment numInputs for the group
  3. set connections within the line and its outlet, so line has a reference to the 
  outlet, and the outlet has a reference to the line
  --make the line stick to the outlet
  --set makingLine = false
  --shrink the outlet back to its original size
  --check if we have enough outlets to show the render box
  4. if we have all visible outlets filled but the function can take more inputs, add
  an outlet.
  5. otherwise keep drawing the line.
  */

// +----------+--------------------------------------------------------
// | Handlers |
// +----------+

  workLayer.on('click', function(evt) {
    var shape = evt.target;
    var parent = shape.getParent();
    if (workToolOn) {
      if (isImageBox(shape)) {
        if (!shape.attrs.expanded) {
          renderCanvas(parent);
          shape.attrs.expanded = true;
        } // if the image box is not expanded
        else {
          shape.attrs.expanded = false;
          animation = false;
          setTimeout(function() {collapseCanvas(parent)}, 50);
        } // else the image box is expanded already
        setTimeout(function() {workLayer.draw()}, 50);
      } // if clicked on an image box
    } // if the work tool is enabled
    else if (lineToolOn) {
      if (makingLine) {
        var outlet;
        if (parent == currLine.attrs.source || isCycle(currLine.attrs.source, parent)) {
          removeLine(currLine);
          makingLine = false;
        } // if the target of the connection is the source, or forming the connection would cause a cycle
        else if (isOutlet(shape)) {
          //check if outlet already has an input
          outlet = shape;
        } // if the object an outlet
        else if (isFunction(parent)) {
          // find empty outlet
          if (parent.attrs.numInputs < parent.attrs.maxInputs) {
            var i = OUTLET_OFFSET
            while (parent.children[i].attrs.lineIn) {
              i++;
            } // skip past outlets with inputs
            outlet = parent.children[i];
          } // if there are fewer than the maximum number of inputs
          else if (parent.attrs.maxInputs == 1) {
            outlet = parent.children[OUTLET_OFFSET];
          } // if the max inputs for the function group is one
        } // else if function
        if (outlet) {
          var isReplacement;
          var oldLine; 
          if (outlet.attrs.lineIn != null) {
            var source = outlet.attrs.lineIn.attrs.source;
            var index = outlet.attrs.lineIn.attrs.sourceIndex
            oldLine = source.attrs.lineOut[index];
            isReplacement = true;
            removeLine(oldLine);
          } // if outlet exists
          else {
            isReplacement = false;
          } // check if theres already a line going in to the outlet
          outlet.attrs.lineIn = currLine;
          currLine.points()[2] = parent.x();
          currLine.points()[3] = parent.y() + outlet.y();
          currLine.attrs.outlet = outlet;
          parent.attrs.numInputs++;
          makingLine = false;
          outlet.scale({ x: 1, y: 1 });
          assertRenderable(parent);
          // if there is a currShape, update the text in funBar
          updateFunBar();
          if (parent.attrs.numInputs == parent.children.length - OUTLET_OFFSET &&
            parent.attrs.numInputs < parent.attrs.maxInputs) {
            addOutlet(parent);
            if (parent.children[2].attrs.expanded) {
              renderCanvas(parent);
            } // if the value/function has an expanded imageBox
          } // if there isn't an open outlet and there should be
          insertToTable(currLine);
          if (!isReplacement) {
            insertToArray(actionToObject('insert', currLine));
          } // if added connection is not a replacement
          else {
            insertToArray(actionToObject('replace', currLine, oldLine));
          } // else its a replacement
          //setOutletOpacity(parent);
          updateForward(parent);
        } // if the outlet exists  
    } // if makingline
    else {
      if (isImageBox(shape)) {
        if (!shape.attrs.expanded) {
          renderCanvas(parent);
          shape.attrs.expanded = true;
        } // if the image box is not expanded
        else {
          shape.attrs.expanded = false;
          animation = false;
          setTimeout(function() { collapseCanvas(parent) }, 50);
        } // else the image box is expanded
        setTimeout(function() { workLayer.draw() }, 50);
      } // if the object is an image box
      else if (parent.name() != 'rgb') {
        makingLine = true;
        currLine = makeLine(parent);
        parent.attrs.lineOut[parent.attrs.lineOut.length] = currLine;
        lineLayer.add(currLine);
      } // if the object is part of an rgb 
    } // else not making line
  } // if line tool enabled 
  else if (deleteToolOn) {
    insertToArray(actionToObject('delete', parent));
    // deal with lines coming in to the node being deleted
    var targetLine;
    for (var i = OUTLET_OFFSET; i < parent.children.length; i++) {
      targetLine = parent.children[i].attrs.lineIn;
      if (targetLine) {
        removeLine(targetLine);
      } // if the lineIn exists
    } // for every outlet, delete the line going into it

    // deal with the lines leading out of the node to be deleted
    var lineOutLength = parent.attrs.lineOut.length;
    for (var i = 0; i < lineOutLength; i++) {
      targetLine = parent.attrs.lineOut[0];
      removeLine(targetLine);
    } // 
    var render = parent.attrs.renderLayer
    if (render != null) {
      render.destroy();
    } // if the renderLayer exists
    if (currShape == parent) {
      currShape = null;
      updateFunBar();
    } // if the object belongs to the global currShape
    parent.remove();
  } // if the delete tool is enabled
  workLayer.draw();
  lineLayer.draw();
});

/*
  When you click down on an object in the workLayer and arent in the process of making
  a line, move that object to the dragLayer and allow it to be dragged.
  */
  workLayer.on('mousedown', function(evt) {
    if (workToolOn) {
      if (!isImageBox(evt.target)) {
        var group = evt.target.getParent();
        if (isValue(group) && (evt.target == group.children[3] || evt.target == group.children[4])) {
          return;
        }
        removeShadow(currShape);
        group.moveTo(dragLayer);
        currShape = group;
        insertToArray(actionToObject('move', group));
        group.startDrag();
        setDragShadow(group);
        workLayer.draw();
        dragLayer.draw();

        if (group.attrs.renderLayer != null) {
          group.attrs.renderLayer.draw();
        }
      }
    } 
  });

  
  /*
  while making a line, make outlets grow when they are moused over to signify that they
  are valid connections
*/
workLayer.on('mouseover', function(evt) {
  var shape = evt.target;
  var parent = shape.parent;
  if (workToolOn || lineToolOn) {
    if (isImageBox(shape) && shape.attrs.expanded) {
      /*
      animation = true;
      var frame = function() {
        renderCanvas(shape.getParent());
        if (animation) {
          setTimeout(frame, 50);
        } // if animation is still enabled
      }
      frame();
      */
      if (parent.attrs.animator) {
        parent.attrs.renderLayer.moveToTop();
        parent.attrs.animator.start();
      } // if the animator is non null
      else {
        console.log("No animator!");
      }
    } // if the mouseover object is an expanded imageBox
    if (makingLine) {
      var outlet;
      if (isOutlet(shape)) {
        outlet = shape;
      } // if the mouseover object is an outlet
      else if (isFunction(parent)) {

        // find empty outlet
        if (parent.attrs.numInputs < parent.attrs.maxInputs) {
          var i = OUTLET_OFFSET
          while (parent.children[i].attrs.lineIn) {
            i++;
          } // while the outlet at index i has a lineIn
          outlet = parent.children[i];
        } // if the number of inputs is less than the max inputs
        else if (parent.attrs.maxInputs == 1) {
          outlet = parent.children[OUTLET_OFFSET];
        } // if the function can only have 1 input
      } // if the mouseover object is part of a function
      if (outlet && outlet.parent != currLine.attrs.source && !isCycle(currLine.attrs.source, outlet.parent)) {
        outlet.scale({
          x: 1.5,
          y: 1.5
        });
        line = outlet.attrs.lineIn;
        if (line) {
          line.setAttrs({
            shadowColor: deleteColor,
            shadowEnabled: true
          });
          lineLayer.draw();
        } // if line exists
        workLayer.draw();
      } // if outlet
    } // if makingLine
  } // if the work tool or line tool is enabled
  else if (deleteToolOn) {
    if (isFunction(parent) || isValue(parent)) {
      parent.children[0].setAttrs({
        shadowColor: deleteColor,
        shadowOpacity: 1,
        shadowEnabled: true
      });

      // for all lines going out
      var lineOut = parent.attrs.lineOut;
      for (var i = 0; i < lineOut.length; i++) {
        lineOut[i].setAttrs({
          shadowColor: deleteColor,
          shadowEnabled: true
        });
      } // for lineOut array

      // for all lines coming in
      var children = parent.children;
      for (var i = OUTLET_OFFSET; i < children.length; i++) {
        line = children[i].attrs.lineIn;
        if (line) {
          line.setAttrs({
            shadowColor: deleteColor,
            shadowEnabled: true
          });
        } // if line
      } // for incoming lines
    } // if the mouseover object belongs to a value 
    workLayer.draw();
    lineLayer.draw();
  } // if the delete tool is enabled
});

/**
 * When the cursor is moved out of an outlet while drawing a line, return the outlet to its
 * original size/shadow/state
 */
workLayer.on('mouseout', function(evt) {
  var shape = evt.target;
  var parent = shape.getParent();
  if (workToolOn || lineToolOn) {
    if (isImageBox(shape) && shape.attrs.expanded) {
      /*
      animation = false;
       */
      if (parent.attrs.animator) {
        parent.attrs.animator.stop();
      }
      else {
        console.log("No animator to stop");
      } 
    } // if the mouseout object is an expanded imageBox
    if (makingLine) {
      var outlet;
      if (isOutlet(shape)) {
        outlet = shape;
      } // if the shape is an outlet
      else if (isFunction(parent)) {
        // find the first empty outlet
        if (parent.attrs.numInputs < parent.attrs.maxInputs) {
          var i = OUTLET_OFFSET
          while (parent.children[i].attrs.lineIn) {
            i++
          } // while the outlet at index i has a line in, skip forward
          outlet = parent.children[i];
        } // if the number of inputs is less than the max inputs
        else if (parent.attrs.maxInputs == 1) {
          outlet = parent.children[OUTLET_OFFSET];
        } // if the function can only have 1 input
      } // if the mouseover object belongs to a function
      if (outlet && outlet.parent != currLine.attrs.source) {
        outlet.scale({
          x: 1,
          y: 1
        });
        line = outlet.attrs.lineIn;
        if (line) {
          line.setAttr('shadowEnabled', false);
          lineLayer.draw();
        } // if line exists
        workLayer.draw();
      } // if outlet exists and does not belong to the line's source
    } // if makingLine
  } // if the work tool or line tool is enabled 
  else if (deleteToolOn) {
    if (isFunction(parent) || isValue(parent)) {

      // deal with shadows on the shape
      if (parent == currShape) {
        setSelectedShadow(parent);
      } // if mouseout shape is the global currShape
      else {
        removeShadow(parent);
      } // else its not the currShape

      // deal with lines coming out of the shape
      var lineOut = parent.attrs.lineOut;
      for (var i = 0; i < lineOut.length; i++) {
        lineOut[i].setAttr('shadowEnabled', false);
      } // for lineOut array

      // deal with lines going in to the shape
      var children = parent.children;
      for (var i = OUTLET_OFFSET; i < children.length; i++) {
        line = children[i].attrs.lineIn;
        if (line) {
          line.setAttr('shadowEnabled', false);
        } // if line in exists
      } // for incoming lines
    } // if the mouseover object belongs to a value or function
    workLayer.draw();
    lineLayer.draw();
  }
});
