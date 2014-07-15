// TOOLBOX EVENTS
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
