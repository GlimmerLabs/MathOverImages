// WORK LAYER EVENTS
/*
- on click
- on mousedown
- on contentMousemove
- on mouseover
- on mouseout
*/

/*
There are 3 different modes:
  1. WorkTool (users can navigate the menu, drag objects onto the board from the menu, drag
      objects around in the work layer, or render thumbnails)
  2. LineTool (users can connect different nodes by clicking on one, and connecting to an outlet
      on another)
  3. DeleteTool (users can remove unwanted functions, values, or lines from the workLayer)

  The default is workTool. 

  When making a line, form a connection on click if the click was on an outlet.
  Behind the scenes:
  1. if the object clicked was the source of the line, destroy the line.
  2. If the outlet already had a connection, make that connection null and destroy it
  --otherwise, this is connected to a new outlet so increment numInputs for the group
  3. set connections within the line and its outlet, so line has a reference to the 
  outlet, and the outlet has a reference to the line
  --make the line stick to the outlet
  --set makingLine = false
  --shrink the outlet back to its original size
  --check if we have enough outlets to show the render box
  4. if we have all visible outlets filled but the function can take more inputs, add
  an outlet.
  5. otherwise keep drawing the line.
  */
  workLayer.on('click', function(evt) {
    var shape = evt.target;
    var parent = shape.getParent();
    if (workToolOn) {
      if (isImageBox(shape)) {
        if (!shape.attrs.expanded) {
          renderCanvas(parent);
          shape.attrs.expanded = true;
        }
        else {
          shape.attrs.expanded = false;
          animation = false;
          setTimeout(function() {collapseCanvas(parent)}, 50);
        }
        setTimeout(function() {workLayer.draw()}, 50);
      }
    }
    else if (lineToolOn) {
      if (makingLine) {
        if (parent == currLine.attrs.source || isCycle(currLine.attrs.source, parent)) {
          currLine.attrs.source.attrs.lineOut.splice(currLine.attrs.source.attrs.lineOut.length - 1, 1);
          currLine.destroy();
          if (isOutlet(shape)) {
            shape.scale({ x: 1, y: 1 });
          }
          makingLine = false;
        }
        else if (isOutlet(shape)) {
      //check if outlet already has an input
      var isReplacement;
      if (shape.attrs.lineIn != null) {
        //POSSIBLE NEED TO DESTROY LINE ITSELF
        var source = shape.attrs.lineIn.attrs.source;
        var index = shape.attrs.lineIn.attrs.sourceIndex
        var line = source.attrs.lineOut[index];
        insertToArray(actionToObject('replace', line, shape.attrs.lineIn));
        isReplacement = true;
        for (var i = index + 1; i < source.attrs.lineOut.length; i++) {
          source.attrs.lineOut[i].attrs.sourceIndex--;
        }
        source.attrs.lineOut.splice(index, 1);
        
        line.remove();
        shape.attrs.lineIn = null;
      } 
      else {
        parent.attrs.numInputs++;
        isReplacement = false;
      } // check if theres already a line going in to the outlet
      shape.attrs.lineIn = currLine;
      currLine.points()[2] = parent.x();
      currLine.points()[3] = parent.y() + shape.y();
      currLine.attrs.outlet = shape;
      makingLine = false;
      shape.scale({ x: 1, y: 1 });
      assertRenderable(parent);
      // if there is a currShape, update the text in funBar
      if (currShape != undefined){
       updateFunBar();
      }
      if (parent.attrs.numInputs == parent.children.length - OUTLET_OFFSET &&
        parent.attrs.numInputs < parent.attrs.maxInputs) {
        addOutlet(parent);
      if (parent.children[2].attrs.expanded) {
        renderCanvas(parent);
      }
    }
    insertToTable(currLine);
    if (!isReplacement){
      insertToArray(actionToObject('insert', currLine));
    }
    updateForward(parent);
    } // if clicked on self, else clicked on a valid outlet
  } // if makingline
  else {
    if (isImageBox(shape)) {
      if (!shape.attrs.expanded) {
        renderCanvas(parent);
        shape.attrs.expanded = true;
      } else {
        shape.attrs.expanded = false;
        animation = false;
        setTimeout(function() {collapseCanvas(parent)}, 50);
      }
      setTimeout(function() {workLayer.draw()}, 50);
    } else {
      makingLine = true;
      currLine = makeLine(parent);
      parent.attrs.lineOut[parent.attrs.lineOut.length] = currLine;
      lineLayer.add(currLine);
    }
  }
} else if (deleteToolOn) {
  insertToArray(actionToObject('delete', parent));
  // deal with lines coming in to the node being deleted
  var targetLine;
  for(var i = 3; i < parent.children.length; i++) {
    targetLine = parent.children[i].attrs.lineIn;
    if(targetLine != null) {
      targetLine.attrs.outlet = null;
      var index = targetLine.attrs.sourceIndex;
      var source = targetLine.attrs.source;
      for (var j = index + 1; j < source.attrs.lineOut.length; j++) {
        source.attrs.lineOut[j].attrs.sourceIndex--;
      }
      targetLine.attrs.source.attrs.lineOut.splice(index, 1);
      targetLine.remove();
    }
  }
  // deal with the lines leading out of the node being deleted
  var outletParent;
  for(var i = 0; i < parent.attrs.lineOut.length; i++) {
    targetLine = parent.attrs.lineOut[i];
    outletParent = targetLine.attrs.outlet.getParent();
    outletParent.attrs.numInputs--;
    targetLine.attrs.outlet.attrs.lineIn = null;
    assertRenderable(outletParent);
    updateForward(outletParent);
    targetLine.remove();
  }
  var render = parent.attrs.renderLayer
  if (render != null) {
    render.destroy();
  }
  if (currShape == parent) {
    currShape = undefined;
    funBarText.setAttr('text', '');
    funBarLayer.draw();
  }
  
  parent.remove();
}
workLayer.draw();
lineLayer.draw();
});

/*
  When you click down on an object in the workLayer and arent in the process of making
  a line, move that object to the dragLayer and allow it to be dragged.
  */
  workLayer.on('mousedown', function(evt) {
    if (workToolOn) {
      if (!isImageBox(evt.target)) {
        var group = evt.target.getParent();
        group.moveTo(dragLayer);
        setDragShadow(group);
        if (currShape != undefined) {
         currShape.children[0].setAttr('shadowEnabled', false);
       }
       currShape = group
       updateFunBar();
       insertToArray(actionToObject('move', group));
       group.startDrag();
       workLayer.draw();
       dragLayer.draw();

       if (group.attrs.renderLayer != null) {
        group.attrs.renderLayer.draw();
      }
    }
  } 
});

  /*
  while you are drawing a line, make it move with the cursor.
    */
  stage.addEventListener('contentMousemove', function(){
    if (makingLine) {
      currLine.points()[2] = stage.getPointerPosition().x;
      currLine.points()[3] = stage.getPointerPosition().y;
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
        /*
          group.children[2].setAttrs({
            scaleX: .8,
            scaleY: .8
          });
          */
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

  /*
  while making a line, make outlets grow when they are moused over to signify that they
  are valid connections
*/
workLayer.on('mouseover', function(evt) {
  var shape = evt.target;
  var parent = shape.parent;
  if (workToolOn || lineToolOn) {
    if (isImageBox(shape) && shape.attrs.expanded) {
      animation = true;
      var frame = function() {
        renderCanvas(shape.getParent());
        if (animation) {
          setTimeout(frame, 50);
        }
      }
      frame();
    }
    if (makingLine) {
      if (isOutlet(shape)) {
        shape.scale({
          x: 1.5,
          y: 1.5
        });
        workLayer.draw();
        } // if outlet
      } 
    } 
    else if (deleteToolOn) {
      if (isFunction(parent) || isValue(parent)) {
        parent.children[0].setAttrs({
          shadowColor: deleteColor,
          shadowOpacity: 1,
          shadowEnabled: true
        });
      }
      workLayer.draw();
    }
  });

/*
  when the cursor is moved out of an outlet while drawing a line, return it to its
  original size
  */
  workLayer.on('mouseout', function(evt) {
    var shape = evt.target;
    var parent = shape.getParent();
    if (workToolOn || lineToolOn) {
      if (isImageBox(shape) && shape.attrs.expanded) {
        animation = false;
      }
      if (makingLine) {
        if (isOutlet(shape)) {
          shape.scale({
            x: 1,
            y: 1
          });
          workLayer.draw();
          } //if outlet
        } //if makingLine
      } 
      else if (deleteToolOn) {
        if (isFunction(parent) || isValue(parent)) {
          if (parent == currShape){
            parent.children[0].setAttr('shadowColor', 'darkblue');
          } 
          else {
            parent.children[0].setAttrs({
              shadowEnabled: false
            });
          }
        }
        workLayer.draw();
      }
    });