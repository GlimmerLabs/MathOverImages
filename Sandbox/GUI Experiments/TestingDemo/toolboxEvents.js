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
    currLine.destroy();
    makingLine = false;
    lineLayer.draw();
  }
  if (!workToolOn) {
    enableWorkTool();
  }
});


lineToolGroup.on('click', function() {
  if (lineToolOn) {
    if (makingLine) {
     currLine.destroy();
     makingLine = false; 
     lineLayer.draw();
   }
    enableWorkTool();
  } 
  else {
    lineToolGroup.children[0].setAttr('shadowEnabled', true);
    lineToolOn = true;
    disableTool(workToolGroup);
    disableTool(deleteToolGroup);
    toolboxLayer.draw();
  }
});

deleteToolGroup.on('click', function() {
  if (deleteToolOn) {
    enableWorkTool();
  } 
  else {
    if (makingLine) {
      currLine.destroy();
      makingLine = false; 
      lineLayer.draw();
    }
    deleteToolGroup.children[0].setAttr('shadowEnabled', true);
    deleteToolOn = true;
    disableTool(workToolGroup);
    disableTool(lineToolGroup);
    toolboxLayer.draw();
  }
});

undoGroup.on('mousedown', function() {
  if (currIndex > 0) {
    undoButton.setAttr('shadowEnabled', true);
    toolboxLayer.draw();
  }
});

undoGroup.on('mouseup', function() {
  if (currIndex > 0) {
    undoButton.setAttr('shadowEnabled', false);
    undoAction(actionArray[currIndex - 1]);
    currIndex--;
    shadeUndoRedo();
    toolboxLayer.draw();
  }
});

undoGroup.on('mouseout', function() {
  undoButton.setAttr('shadowEnabled', false);
  toolboxLayer.draw();
});

redoGroup.on('mousedown', function() {
  if (totalIndex > currIndex) {
    redoButton.setAttr('shadowEnabled', true);
    toolboxLayer.draw();
  }
});

redoGroup.on('mouseup', function() {
  if (totalIndex > currIndex) {
    redoButton.setAttr('shadowEnabled', false);
    redoAction(actionArray[currIndex]);
    currIndex++;
    shadeUndoRedo();
    toolboxLayer.draw();
  }
});

redoGroup.on('mouseout', function() {
  redoButton.setAttr('shadowEnabled', false);
  toolboxLayer.draw();
});

toolboxControl.on('mousedown', function() {
  toolboxGroup.startDrag();
});
