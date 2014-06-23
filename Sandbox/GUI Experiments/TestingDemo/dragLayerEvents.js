//DRAG LAYER EVENTS
/*
- on mouseup
- on draw
*/
/*
  when an object being dragged is released:
  1. check that it isnt in the menu area
  --if it is a new object, add the appropriate number of outlets to it
  2. if its in the menu area destroy it and all lines attached to it
  */
  dragLayer.on('mouseup', function(evt) {
    var group = evt.target.getParent();
    if (group.attrs.y > menuHeight) {
      group.moveTo(workLayer);
      if (isFunction(group) && group.children.length < 4) {
        for (var i = 0; i < functions[group.attrs.name].min; i++) {
          addOutlet(group);
        } // for
      } // if new function 
      else if (isValue(group)) {
        group.children[2].setAttr('visible', true);
        
      }
      if (group.children[2].attrs.expanded) {
        renderCanvas(group);
      } // if 
      if (inTable(group)) {
        actionArray[currIndex - 1].x2 = group.x();
        actionArray[currIndex - 1].y2 = group.y();
      }
      else {
        if (group.attrs.name == 'constant') {
          createEditableText(group);
        }
        insertToTable(group);
        insertToArray(actionToObject('insert', group));
      }
    } 
    else {
    // deal with lines coming in to the node being deleted
    var targetLine;
    for(var i = 3; i < group.children.length; i++) {
      targetLine = group.children[i].attrs.lineIn;
      if(targetLine != null) {
        targetLine.attrs.outlet = null;
        targetLine.attrs.source.attrs.lineOut.splice(targetLine.attrs.sourceIndex, 1);
        targetLine.remove();
      }
    }
    // deal with the lines leading out of the node being deleted
    var outletParent;
    for(var i = 0; i < group.attrs.lineOut.length; i++) {
      targetLine = group.attrs.lineOut[i];
      if (targetLine.attrs.outlet != null) {
        outletParent = targetLine.attrs.outlet.getParent();
        outletParent.attrs.numInputs--;
        targetLine.attrs.outlet.attrs.lineIn = null;
        assertRenderable(outletParent);
        updateForward(outletParent);
      }
      targetLine.remove();
    }
    lineLayer.draw();
    if (inTable(group)){
      insertToArray(actionToObject('delete', group));
      group.remove();
    }
    else {
      group.destroy();
    }
  }
  menuLayer.draw();
  menuButtonLayer.draw();
  dragLayer.draw();
  workLayer.draw();
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
      for(var i = 0; i < currShape.attrs.lineOut.length; i++) {
        targetLine = currShape.attrs.lineOut[i];
        targetLine.points()[0] = currShape.x() + functionRectSideLength - OUTLET_OFFSET;
        targetLine.points()[1] = currShape.y() + functionTotalSideLength / 2;
      }
      lineLayer.draw();
    }
  });