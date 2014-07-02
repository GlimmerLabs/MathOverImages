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
    openTag.destroy();
    labelLayer.draw();
    toolboxLayer.draw();
  }
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
    openTag.destroy();
    labelLayer.draw();
    toolboxLayer.draw();
  }
});


toolboxControl.on('mousedown', function() {
  toolboxGroup.startDrag();
});

toolboxLayer.on('mouseover', function(evt) {
  var group = evt.target.getParent();
  var name = group.name();
  if (name == 'undo' || name == 'redo') {
    var valid = (name == 'undo' && currIndex > 0) || (name == 'redo' && totalIndex > currIndex);
    if (valid) {
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
      }, 1000);
    } 
  }
  else if (name && tagsOn) {

    openTag = makeToolLabel(group);
    labelLayer.add(openTag);
    labelLayer.draw();
  }
});

toolboxLayer.on('mouseout', function(evt) {
  var group = evt.target.getParent();
  var name = group.name();
  if (name == 'undo' || name == 'redo') {
    group.children[0].setAttr('shadowEnabled', false);
    toolboxLayer.draw();
  }
  if (openTag) {
    openTag.destroy();
    labelLayer.draw();
  }
});
