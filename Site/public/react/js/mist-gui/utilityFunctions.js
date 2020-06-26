//UTILITY FUNCTIONS

const utility = {
  /**
   * addOutlet takes a function group funGroup and adds an outlet to it, expanding the node if there is not enough space for the outlet.
   */
  addOutlet(funGroup) {
    if(funGroup.children.length - OUTLET_OFFSET < funGroup.attrs.maxInputs) {
      if(funGroup.children.length - OUTLET_OFFSET > 2) {
        funGroup.children[0].setAttr('height',
          funGroup.children[0].attrs.height + outletStyle.yOffset);
        funGroup.children[1].setAttr('y', funGroup.children[1].attrs.y + outletStyle.yOffset / 2);
        funGroup.children[2].setAttr('y', funGroup.children[2].attrs.y + outletStyle.yOffset);
        var lineOut = funGroup.attrs.lineOut
        for (var i = 0; i < lineOut.length; i++) {
          var line = lineOut[i];
          line.points()[1] = funGroup.y() + (funGroup.children[0].height() + functionStyle.strokeWidth) / 2;
        } // for the lineout array
      } // if we have 3 outlets already (we need to expand the node)
      var newOutlet = makeOutlet(funGroup);
      funGroup.add(newOutlet);
      if (funGroup.name() == 'rgb') {
        newOutlet.setAttr('fill', outletStyle.rgbColors[newOutlet.attrs.outletIndex]);
      } // if the function is an rgb
      layers.work.draw();
      if (funGroup.attrs.renderLayer != null){
        funGroup.attrs.renderLayer.draw();
      } // if there is already a renderLayer, clear it with .draw()
    } // if we arent at the maximum allowed inputs
  },

  /**
   * removeOutlet takes a function node (funGroup) and deletes the last outlet
      -checks if there are above the minimum number of outlets.
      -the outlet is removed
      -the function node is scaled properly
   */
  removeOutlet(funGroup) {
    // destroy outlet if number of remaning outlets would still be above minimum
    if (funGroup.attrs.minInputs < funGroup.children.length - OUTLET_OFFSET) {
      var outletIndex = funGroup.children.length - 1;
      var outlet = funGroup.children[outletIndex];
      if (outlet.attrs.lineIn == null) {
        outlet.destroy();
        if(funGroup.children.length - OUTLET_OFFSET > 2) {
          funGroup.children[0].setAttr('height',
            funGroup.children[0].attrs.height - outletStyle.yOffset);
          funGroup.children[1].setAttr('y', funGroup.children[1].attrs.y - (outletStyle.yOffset / 2));
          funGroup.children[2].setAttr('y', funGroup.children[2].attrs.y - outletStyle.yOffset);
          var lineOut = funGroup.attrs.lineOut;
          for (var i = 0; i < lineOut.length; i++) {
            var line = lineOut[i];
            line.points()[1] = funGroup.y() + (funGroup.children[0].height() + functionStyle.strokeWidth) / 2;
          } // for the lineout array
        } // if there are still more than 2 outlets (we need to shrink the node)
        layers.work.draw();
        if (funGroup.attrs.renderLayer != null){
          funGroup.attrs.renderLayer.draw();
        } // if there is already a renderLayer, clear it with .draw()
      } // if the outlet doesnt have an input
    } // if above minumum number of outlets
  },

  // TODO: it doesn't look like this is ever used
  setOutletOpacity(group) {
    if (predicate.isFunction(group)) {
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
  },

  /**
   * findRenderFunction takes a group and, if the group has sufficient inputs, finds the 
   * renderFunction that should be used to create an image for output.
   * NOTE: this will always recalculate the entire function
   */
  findRenderFunction(group) {
    if(predicate.isValue(group)) {
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
  },

  /**
   * updateFunBar changes the text in the funBar according to the currShape.
   */
  updateFunBar() {
    if (currShape && predicate.assertRenderable(currShape)) {
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
      utility.enableSaveImage();
    } // if the currShape exists and it is renderable
    else {
      funBarText.setAttr('text', '');
      utility.disableSaveImage();
    } // else we dont have a renderable currShape
    layers.funBar.draw();
  },

  /**
   * renderCanvas takes a function or value group and renders a 50x50 image
   * with the same top left coordinate as the image box for that group.
   */
  renderCanvas(group) {
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
  },

  /**
   * collapseCanvas takes a group and, if the group has an renderlayer, it closes the 
   * renderLayer and the imagebox
   */
  collapseCanvas(group){
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
  },

  /**
   * updateForward takes a group and makes sure all groups for which it is a source are
   * accurate. To be used whenever a function's inputs are changed, or when a node is
   * deleted.
   */
  updateForward(group) {
    for (var i = 0; i < group.attrs.lineOut.length; i++) {
      var lineOutGroup = group.attrs.lineOut[i].attrs.outlet.parent;
      predicate.assertRenderable(lineOutGroup);
      updateForward(lineOutGroup);
    }
  },

  /* disableButton take a tool group from the tool box, turns off its functionality and disables its shadow. */
  disableTool(toolGroup) {
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
  },

  enableWorkTool() {
    workToolGroup.children[0].setAttr('shadowEnabled', true);
    workToolOn = true;
    utility.disableTool(lineToolGroup);
    utility.disableTool(deleteToolGroup);
    layers.toolbox.draw();
  },

  /**
   * setDragShadow takes a function or value group and activates drag shadow
   */
  setDragShadow(group) {
    group.children[0].setAttrs({
      shadowColor: dragShadowColor,
      shadowEnabled: true
    });
  },

  /**
   * setSelectedShadow takes a function or value group and
   * activates a shadow to signify it's selected
   */
  setSelectedShadow(group) {
    group.children[0].setAttrs({
      shadowColor: selectedShadowColor,
      shadowEnabled: true
    });
  },

  /*
   * removeShadow takes a function or value group and removes the shadow
   */
  removeShadow(group) {
    if (group){
      group.children[0].setAttr('shadowEnabled', false);
    }
  },

  /**
   * replaceNode takes an old node and a new node and replaces the old node with
   *  the new one, removing the old one from the layer.
   */
  replaceNode(oldNode, newNode) {
    var tempOut = oldNode.attrs.lineOut;
    utility.collapseCanvas(oldNode);
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
          utility.addOutlet(newNode);
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
        utility.addOutlet(newNode);
        var outletIndex = OUTLET_OFFSET;
        for (var i = OUTLET_OFFSET; i < oldNode.children.length; i++) {
          if (oldNode.children[i].attrs.lineIn) { 
            newNode.children[outletIndex].attrs.lineIn = oldNode.children[i].attrs.lineIn;
            newNode.attrs.numInputs++;
            newNode.children[outletIndex].attrs.lineIn.attrs.outlet = newNode.children[outletIndex];
            utility.addOutlet(newNode);
            outletIndex++;
          }
        } 
      }
      while (newNode.children.length - OUTLET_OFFSET < newNode.attrs.minInputs) {
        utility.addOutlet(newNode);
      }
      utility.resetNode(oldNode); 
    }
    else if (newNode.attrs.name == 'constant') {
      if (isRenderable(newNode)) {
        for (var i = 3; i < 5; i++) {
          newNode.children[i].setAttr('visible', false);
          layers.work.draw();
        }
      }
    }
    predicate.assertRenderable(newNode);
    utility.updateForward(newNode);
    layers.line.draw();
    layers.work.draw();
  },

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
  resetNode(node) {
    // set lineOut array to []
    node.attrs.lineOut = [];
    if (isFunction(node)) {
      // destroy the outlets of the oldNode
      for (var i = node.children.length - 1; i > 2; i--) {
        node.children[i].destroy();
      }
      // reset height
      node.children[0].setAttr('height', functionStyle.rectSideLength);
      // reset location of text
      node.children[1].setAttr('y', functionStyle.totalSideLength/2 - functionStyle.halfStrokeWidth);
      // reset imagebox location
      node.children[2].setAttr('y', functionStyle.rectSideLength + functionStyle.imageBoxOffset);
      // set numInputs to zero
      node.attrs.numInputs = 0;
      //setOutletOpacity(node);
    }
  },

  /**
   * wrapValueText takes a string and trucates after 4 characters and adds "..." to the end
   * used for constant values.
   */
  wrapValueText(text) {
    if (text.length > 4) {
      return text.substring(0,4) + "\n...";
    }
    else {
      return text;
    }
  },

  /**
   * applyDragBounds takes a function or value group and allows it to only be dragged 
   * in the workspace below the menu
   */
  applyDragBounds(group) {
    var bottomBoundOffset = functionStyle.totalSideLength + funBarHeight;
    group.setAttr('dragBoundFunc', function(pos) {
      var newY = pos.y <= menuHeight ? menuHeight + 1 :
        pos.y > size.height - bottomBoundOffset ? size.height - bottomBoundOffset :
        pos.y;
      var newX = pos.x < 0 ? 0 :
        pos.x > (size.width - functionStyle.totalSideLength) ? (size.width - functionStyle.totalSideLength) :
        pos.x;
      return { x: newX, y: newY };
    });
  },

  enableSaveImage() {
    funBarSaveImCover.setAttrs({
      stroke: 'black',
      fill: valueStyle.menuColor
    });
    funBarSaveImText.setAttr('fill', 'black');
  },

  disableSaveImage() {
    funBarSaveImCover.setAttrs({
      stroke: 'grey',
      fill: valueStyle.menuColorLight
    });
    funBarSaveImText.setAttr('fill', 'grey');
  },

  // TODO: doesn't appear to be used
  enableSaveFunction() {
    funBarSaveImCover.setAttrs({
      stroke: 'black',
      fill: functionStyle.color
    });
    funBarSaveImText.setAttr('fill', 'black');
  },

  // TODO: doesn't appear to be used
  disableSaveFunction() {
    funBarSaveImCover.setAttrs({
      stroke: 'grey',
      fill: functionStyle.colorLight
    });
    funBarSaveImText.setAttr('fill', 'grey');
  }
};
