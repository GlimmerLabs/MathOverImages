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
