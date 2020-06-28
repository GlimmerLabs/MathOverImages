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
export default function(
  expandFunctionNodes,
  expandValueNodes,
  functionsButton,
  hideScrollArrows,
  layers,
  makeFunctionGroup,
  moveFunctionNodesIn,
  moveFunctionNodesRight,
  moveFunctionsButtonLeft,
  moveFunctionsButtonRight,
  moveValueNodesIn,
  openButton,
  openSaveWsPopUp,
  isFunction,
  isValue,
  removeLine,
  resetButton,
  saveButton,
  showLoadWorkspaceDialog,
  showScrollArrows,
  stage,
  state,
  toggleTag,
  updateArrows,
  enableWorkTool,
  removeShadow,
  setDragShadow,
  valuesButton,
) {
  valuesButton.on('click', function(){
    if (!state.menu.valueExpanded) {
      if (!state.menu.functionExpanded) {
        moveFunctionsButtonRight();
        moveFunctionNodesRight();
        expandValueNodes();
        state.menu.valueExpanded = true;
        showScrollArrows('values');
        updateArrows('values');
      } // if functions are also not expanded
      else {
        moveFunctionsButtonRight();
        moveFunctionNodesRight();
        expandValueNodes();
        state.menu.valueExpanded = true;
        showScrollArrows('values');
        updateArrows('values');
        state.menu.functionExpanded = false;
        hideScrollArrows('functions');
      } // else functions were already expanded
    } // if values are not expanded
    else {
      moveValueNodesIn();
      moveFunctionNodesIn();  
      moveFunctionsButtonLeft();
      state.menu.valueExpanded = false;
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
    if (!state.menu.functionExpanded) {
      if (!state.menu.valueExpanded) {
        expandFunctionNodes();
        state.menu.functionExpanded = true;
        showScrollArrows('functions');
        updateArrows('functions');
      } // functions and values not expanded
      else {
        moveValueNodesIn();
        moveFunctionsButtonLeft();
        expandFunctionNodes();
        state.menu.functionExpanded = true;
        showScrollArrows('functions');
        updateArrows('functions');
        state.menu.valueExpanded = false;
        hideScrollArrows('values');
      } // functions not expanded, values expanded
    }
    else {
      moveFunctionNodesIn();
      state.menu.functionExpanded = false;
      hideScrollArrows('functions');
    } // functions are expanded
  });

  /*
  If you click on a menu button when the workTool is not activated, the workTool will become activated. 
  */
  layers.menuButton.on('click', function(){
    if (!state.workToolOn) {
      enableWorkTool();
      if(state.makingLine) {
        removeLine(state.currLine);
        state.makingLine = false;
        layers.line.draw();
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
  layers.menuArrow.on('mouseover', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      box.setAttr('opacity', .7);
      arrow.setAttr('opacity', .9);
      layers.menuArrow.draw();
    }
  });

  layers.menuArrow.on('mouseout', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      box.setAttr('opacity', .3);
      arrow.setAttr('opacity', .5);
      layers.menuArrow.draw();
    }
  });

  layers.menuArrow.on('mousedown', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      box.setAttr('opacity', 1);
      arrow.setAttr('opacity', 1);
      layers.menuArrow.draw();
    }
  });
  var scrolling;
  layers.menuArrow.on('mouseup', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.functional) {
      var box = group.children[0];
      var arrow = group.children[1];
      var direction = group.attrs.direction;
      box.setAttr('opacity', .7);
      arrow.setAttr('opacity', .9);
      layers.menuArrow.draw();
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
  layers.menu.on('mousedown', function(evt) {
    if (!state.makingLine) {
      if (!state.workToolOn) {
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
      layers.drag.add(newGroup);
      setDragShadow(newGroup);
      removeShadow(state.currShape);
      newGroup.startDrag();
      layers.drag.draw();
      state.dragShape = newGroup;
      state.currShape = newGroup;
    }
    else {
      removeLine(state.currLine);
      state.makingLine = false;
      layers.line.draw();
    }
  });

  layers.menu.on('mouseover', function(evt) {
    var group = evt.target.getParent();
    if (state.menu.tagsOn) {
      if (isFunction(group) || isValue(group)) {
        setTimeout(function(){
          if (state.openTag) {
            state.openTag.destroy();
          }
          var temp = layers.menu.getIntersection(stage.getPointerPosition());
          if (temp && group == temp.getParent()) {
            state.openTag = makeLabel(group);
            layers.label.add(state.openTag)
            layers.label.draw(); 
          }
        }, 500);
      } 
    }
  });

  layers.menu.on('mouseout', function(evt) {
    var group = evt.target.getParent();
    if (state.openTag) {  
      state.openTag.destroy();
      layers.label.draw();
    }
  });

  toggleTag.on('mouseover', function() {
    toggleTag.children[0].setAttr('fill', 'black');
    layers.border.draw();
  });

  toggleTag.on('mouseout', function() {
    toggleTag.children[0].setAttr('fill', '#787878');
    layers.border.draw();
  });

  toggleTag.on('mouseup', function(){
    if (state.menu.tagsOn) {
      state.menu.tagsOn = false;
      toggleTag.children[0].setAttr('text', 'Turn Labels On');
    }
    else {
      state.menu.tagsOn = true;
      toggleTag.children[0].setAttr('text', 'Turn Labels Off');
    }
    layers.border.draw();
  });

  // CONTROL MENU EVENTS 
  layers.menuControl.on('mouseover', function(evt) {
    if (evt.target.name() != 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttr('fill', menuStyle.controlSelect);
      layers.menuControl.draw();
    }
  });

  layers.menuControl.on('mouseout', function(evt) {
    if (evt.target.name() != 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttrs({
        fill: menuStyle.controlColor,
        shadowEnabled: false
      });
      layers.menuControl.draw();
    }
  });

  layers.menuControl.on('mousedown', function(evt) {
    if (evt.target.name() != 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttr('shadowEnabled', true);
      layers.menuControl.draw();
    }
  });

  layers.menuControl.on('mouseup', function(evt) {
    if (evt.target.name()!= 'cover') {
      var parent = evt.target.getParent();
      var shape = parent.children[0];
      shape.setAttr('shadowEnabled', false);
      layers.menuControl.draw();
    }
  });

  resetButton.on('mouseup', function(){
    resetWorkspace();
    // currentWorkSpace = null; // TODO: it doesn't look like this is referenced anywhere else
  });

  saveButton.on('mouseup', function(){
    enableWorkTool();
    openSaveWsPopUp();
  });

  openButton.on('mouseup', function(){
    enableWorkTool();
    showLoadWorkspaceDialog();
  });
};
