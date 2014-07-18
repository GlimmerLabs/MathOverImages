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
