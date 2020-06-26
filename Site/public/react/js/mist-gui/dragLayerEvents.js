//DRAG LAYER EVENTS
/*
- on mouseup
- on draw
- on dragmove
*/

/* workaround to make sure intersections work while dragging
   KineticJS's getIntersection doesn't work when using the 'mousedown' event
    to startDrag */
    layers.drag.on('dragstart mousedown', function(evt) {
      if (dragShape) {
        dragShape.stopDrag();
        dragShape.startDrag();
        layers.drag.draw();
      }
    });

    layers.drag.on('mousedown', function(evt) {
      removeShadow(currShape);
      var group = evt.target.getParent();
      group.stopDrag();
      group.startDrag();
      layers.drag.draw();
      layers.work.draw();
    });
/*
  when an object being dragged is released:
  1. check that it isnt in the menu area
  --if it is a new object, add the appropriate number of outlets to it
  2. if its in the menu area destroy it and all lines attached to it
  */
  var initToWorkLayer = function(group) {
    group.moveTo(layers.work);

    if (predicate.isFunction(group) && group.children.length < 4) {
      for (var i = 0; i < functions[group.attrs.name].min; i++) {
        addOutlet(group);
        } // for
    } // if new function 
    else if (predicate.isValue(group)) {
      if (predicate.isRenderable(group)) {
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
  };

  layers.drag.on('mouseup', function(evt) {
    var group = evt.target.getParent();
    if (scaledObj) {
      scaledObj.setAttr('scale', { x: 1, y: 1 });
      group.setAttr('x', scaledObj.attrs.x);
      group.setAttr('y', scaledObj.attrs.y);
      insertToTable(group);
      insertToArray(actionToObject('replace', group, scaledObj));
      replaceNode(scaledObj, group);
      scaledObj = null;
      group.moveTo(layers.work);
    }
    else {
      if (group.attrs.y > menuHeight) {
        initToWorkLayer(group);
      } 
      else {
        currShape = null;
        group.destroy();
        group = null;
      }
    }
    if (group) {
      setSelectedShadow(group);
      currShape = group;
      if (!group.attrs.dragBoundFunc) {
        applyDragBounds(group);
      }
    }
    updateFunBar();
    dragShape = null;
    layers.menu.draw();
    layers.menuButton.draw();
    layers.drag.draw();
    layers.work.draw();
    layers.line.draw();
  }); 
/*
 * While an object is being dragged, move all lines connected to it with it.
 */
 layers.drag.on('draw', function() {
  if(currShape != null) {
    var targetLine;
    for(var i = 0; i < currShape.children.length - OUTLET_OFFSET; i++) {
      targetLine = currShape.children[i+3].attrs.lineIn;
      if(targetLine != null) {
        targetLine.points()[2] = currShape.x();
        targetLine.points()[3] = currShape.y() + currShape.children[i+OUTLET_OFFSET].y();
      }
    }
    if (currShape.attrs.lineOut) {
      var yOffset;
      if (predicate.isFunction(currShape)) {
        yOffset = (currShape.children[0].height() + functionGlobals.strokeWidth) / 2;
      }
      else {
        yOffset = functionGlobals.totalSideLength / 2;
      }
    }
    for(var i = 0; i < currShape.attrs.lineOut.length; i++) {
      targetLine = currShape.attrs.lineOut[i];
      targetLine.points()[0] = currShape.x() + functionGlobals.rectSideLength - OUTLET_OFFSET;
      targetLine.points()[1] = currShape.y() + yOffset;
    }
    layers.line.draw();
  }
});

 layers.drag.on('dragmove', function() {
    if (dragShape != null) {
      var pos = stage.getPointerPosition();
      var node = layers.work.getIntersection(pos);
      if (node) {
        var group = node.getParent();
        if ((predicate.isValue(group) && predicate.isValue(dragShape)) ||
            (predicate.isFunction(group) && predicate.isFunction(dragShape))) {
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
      layers.work.draw();
    }
  });
