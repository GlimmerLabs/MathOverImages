// TOOLBOX EVENTS
/* 
- workToolGroup on click
- lineToolGroup on click
- deleteToolGroup on click
- toolboxControl on click
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

toolboxControl.on('mousedown', function() {
  toolboxGroup.startDrag();
});