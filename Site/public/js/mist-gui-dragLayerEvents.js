//DRAG LAYER EVENTS
/*
- on mouseup
- on draw
- on dragmove
*/
/* workaround to make sure intersections work while dragging
   KineticJS's getIntersection doesn't work when using the 'mousedown' event
    to startDrag */
    dragLayer.on('dragstart', function() {
      if (dragShape) {
        dragShape.stopDrag();
        dragShape.startDrag();
        dragLayer.draw();
      }
    });
/*
  when an object being dragged is released:
  1. check that it isnt in the menu area
  --if it is a new object, add the appropriate number of outlets to it
  2. if its in the menu area destroy it and all lines attached to it
  */
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
        group.moveTo(workLayer);
        group.children[0].setAttr('shadowEnabled', false);
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
    } 
    else {
      currShape = null;
      insertToArray(actionToObject('delete', group));
      // deal with lines coming in to the node being deleted
      var targetLine;
      for(var i = 3; i < group.children.length; i++) {
        targetLine = group.children[i].attrs.lineIn;
        if(targetLine != null) {
          removeLine(targetLine);          
        }
      }
      // deal with the lines leading out of the node being deleted
      for(var i = 0; i < group.attrs.lineOut.length; i++) {
        targetLine = group.attrs.lineOut[i];
        removeLine(targetLine);
      }
      lineLayer.draw();
      if (inTable(group)){
        group.remove();
      }
      else {
        group.destroy();
      }
    }
  }
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
    for(var i = 0; i < currShape.attrs.lineOut.length; i++) {
      targetLine = currShape.attrs.lineOut[i];
      targetLine.points()[0] = currShape.x() + functionRectSideLength - OUTLET_OFFSET;
      targetLine.points()[1] = currShape.y() + functionTotalSideLength / 2;
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
