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
      if (state.dragShape) {
        state.dragShape.stopDrag();
        state.dragShape.startDrag();
        layers.drag.draw();
      }
    });

    layers.drag.on('mousedown', function(evt) {
      utility.removeShadow(state.currShape);
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
        utility.addOutlet(group);
        } // for
    } // if new function 
    else if (predicate.isValue(group)) {
      if (predicate.isRenderable(group)) {
        group.children[2].setAttr('visible', true);
      }
    }
    if (group.children[2].attrs.expanded) {
      utility.renderCanvas(group);
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
    if (state.scaledObj) {
      state.scaledObj.setAttr('scale', { x: 1, y: 1 });
      group.setAttr('x', state.scaledObj.attrs.x);
      group.setAttr('y', state.scaledObj.attrs.y);
      insertToTable(group);
      insertToArray(actionToObject('replace', group, state.scaledObj));
      utility.replaceNode(state.scaledObj, group);
      state.scaledObj = null;
      group.moveTo(layers.work);
    }
    else {
      if (group.attrs.y > menuStyle.height) {
        initToWorkLayer(group);
      } 
      else {
        state.currShape = null;
        group.destroy();
        group = null;
      }
    }
    if (group) {
      utility.setSelectedShadow(group);
      state.currShape = group;
      if (!group.attrs.dragBoundFunc) {
        utility.applyDragBounds(group);
      }
    }
    utility.updateFunBar();
    state.dragShape = null;
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
  if(state.currShape != null) {
    var targetLine;
    for(var i = 0; i < state.currShape.children.length - OUTLET_OFFSET; i++) {
      targetLine = state.currShape.children[i+3].attrs.lineIn;
      if(targetLine != null) {
        targetLine.points()[2] = state.currShape.x();
        targetLine.points()[3] = state.currShape.y() + state.currShape.children[i+OUTLET_OFFSET].y();
      }
    }
    if (state.currShape.attrs.lineOut) {
      var yOffset;
      if (predicate.isFunction(state.currShape)) {
        yOffset = (state.currShape.children[0].height() + functionStyle.strokeWidth) / 2;
      }
      else {
        yOffset = functionStyle.totalSideLength / 2;
      }
    }
    for(var i = 0; i < state.currShape.attrs.lineOut.length; i++) {
      targetLine = state.currShape.attrs.lineOut[i];
      targetLine.points()[0] = state.currShape.x() + functionStyle.rectSideLength - OUTLET_OFFSET;
      targetLine.points()[1] = state.currShape.y() + yOffset;
    }
    layers.line.draw();
  }
});

 layers.drag.on('dragmove', function() {
    if (state.dragShape != null) {
      var pos = stage.getPointerPosition();
      var node = layers.work.getIntersection(pos);
      if (node) {
        var group = node.getParent();
        if ((predicate.isValue(group) && predicate.isValue(state.dragShape)) ||
            (predicate.isFunction(group) && predicate.isFunction(state.dragShape))) {
          group.setAttrs({
            scaleX: 1.2,
            scaleY: 1.2
          });
          if (group.children[2].attrs.expanded) {
            utility.renderCanvas(group);
          }
          state.scaledObj = group;
        }
      }
      else if (state.scaledObj != null) {
        state.scaledObj.setAttrs({
          scaleX: 1,
          scaleY: 1
        });
        if (state.scaledObj.children[2].attrs.expanded) {
            utility.renderCanvas(state.scaledObj);
          }
        state.scaledObj = null;
      }
      layers.work.draw();
    }
  });
