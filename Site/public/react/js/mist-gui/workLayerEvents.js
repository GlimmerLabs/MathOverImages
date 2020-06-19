// WORK LAYER EVENTS
/**
 * mistgui-work-layer-events.js
 *   Set up handlers for events that happen in the work layer.  These include
 *     - on click
 *     - on mousedown
 *     - on contentMousemove
 *     - on mouseover
 *     - on mouseout
 */

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

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

// +----------+--------------------------------------------------------
// | Handlers |
// +----------+

  workLayer.on('click', function(evt) {
    var shape = evt.target;
    var parent = shape.getParent();
    if (workToolOn) {
      if (isImageBox(shape)) {
        if (!shape.attrs.expanded) {
          renderCanvas(parent);
          shape.attrs.expanded = true;
        } // if the image box is not expanded
        else {
          shape.attrs.expanded = false;
          animation = false;
          setTimeout(function() {collapseCanvas(parent)}, 50);
        } // else the image box is expanded already
        setTimeout(function() {workLayer.draw()}, 50);
      } // if clicked on an image box
    } // if the work tool is enabled
    else if (lineToolOn) {
      if (makingLine) {
        var outlet;
        if (parent == currLine.attrs.source || isCycle(currLine.attrs.source, parent)) {
          removeLine(currLine);
          makingLine = false;
        } // if the target of the connection is the source, or forming the connection would cause a cycle
        else if (isOutlet(shape)) {
          //check if outlet already has an input
          outlet = shape;
        } // if the object an outlet
        else if (isFunction(parent)) {
          // find empty outlet
          if (parent.attrs.numInputs < parent.attrs.maxInputs) {
            var i = OUTLET_OFFSET
            while (parent.children[i].attrs.lineIn) {
              i++;
            } // skip past outlets with inputs
            outlet = parent.children[i];
          } // if there are fewer than the maximum number of inputs
          else if (parent.attrs.maxInputs == 1) {
            outlet = parent.children[OUTLET_OFFSET];
          } // if the max inputs for the function group is one
        } // else if function
        if (outlet) {
          var isReplacement;
          var oldLine; 
          if (outlet.attrs.lineIn != null) {
            var source = outlet.attrs.lineIn.attrs.source;
            var index = outlet.attrs.lineIn.attrs.sourceIndex
            oldLine = source.attrs.lineOut[index];
            isReplacement = true;
            removeLine(oldLine);
          } // if outlet exists
          else {
            isReplacement = false;
          } // check if theres already a line going in to the outlet
          outlet.attrs.lineIn = currLine;
          currLine.points()[2] = parent.x();
          currLine.points()[3] = parent.y() + outlet.y();
          currLine.attrs.outlet = outlet;
          parent.attrs.numInputs++;
          makingLine = false;
          outlet.scale({ x: 1, y: 1 });
          assertRenderable(parent);
          // if there is a currShape, update the text in funBar
          updateFunBar();
          if (parent.attrs.numInputs == parent.children.length - OUTLET_OFFSET &&
            parent.attrs.numInputs < parent.attrs.maxInputs) {
            addOutlet(parent);
            if (parent.children[2].attrs.expanded) {
              renderCanvas(parent);
            } // if the value/function has an expanded imageBox
          } // if there isn't an open outlet and there should be
          insertToTable(currLine);
          if (!isReplacement) {
            insertToArray(actionToObject('insert', currLine));
          } // if added connection is not a replacement
          else {
            insertToArray(actionToObject('replace', currLine, oldLine));
          } // else its a replacement
          //setOutletOpacity(parent);
          updateForward(parent);
        } // if the outlet exists  
    } // if makingline
    else {
      if (isImageBox(shape)) {
        if (!shape.attrs.expanded) {
          renderCanvas(parent);
          shape.attrs.expanded = true;
        } // if the image box is not expanded
        else {
          shape.attrs.expanded = false;
          animation = false;
          setTimeout(function() { collapseCanvas(parent) }, 50);
        } // else the image box is expanded
        setTimeout(function() { workLayer.draw() }, 50);
      } // if the object is an image box
      else if (parent.name() != 'rgb') {
        makingLine = true;
        currLine = makeLine(parent);
        parent.attrs.lineOut[parent.attrs.lineOut.length] = currLine;
        lineLayer.add(currLine);
      } // if the object is part of an rgb 
    } // else not making line
  } // if line tool enabled 
  else if (deleteToolOn) {
    insertToArray(actionToObject('delete', parent));
    // deal with lines coming in to the node being deleted
    var targetLine;
    for (var i = OUTLET_OFFSET; i < parent.children.length; i++) {
      targetLine = parent.children[i].attrs.lineIn;
      if (targetLine) {
        removeLine(targetLine);
      } // if the lineIn exists
    } // for every outlet, delete the line going into it

    // deal with the lines leading out of the node to be deleted
    var lineOutLength = parent.attrs.lineOut.length;
    for (var i = 0; i < lineOutLength; i++) {
      targetLine = parent.attrs.lineOut[0];
      removeLine(targetLine);
    } // 
    var render = parent.attrs.renderLayer
    if (render != null) {
      render.destroy();
    } // if the renderLayer exists
    if (currShape == parent) {
      currShape = null;
      updateFunBar();
    } // if the object belongs to the global currShape
    parent.remove();
  } // if the delete tool is enabled
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
        if (isValue(group) && (evt.target == group.children[3] || evt.target == group.children[4])) {
          return;
        }
        removeShadow(currShape);
        group.moveTo(dragLayer);
        currShape = group;
        insertToArray(actionToObject('move', group));
        group.startDrag();
        setDragShadow(group);
        workLayer.draw();
        dragLayer.draw();

        if (group.attrs.renderLayer != null) {
          group.attrs.renderLayer.draw();
        }
      }
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
      /*
      animation = true;
      var frame = function() {
        renderCanvas(shape.getParent());
        if (animation) {
          setTimeout(frame, 50);
        } // if animation is still enabled
      }
      frame();
      */
      if (parent.attrs.animator) {
        parent.attrs.renderLayer.moveToTop();
        parent.attrs.animator.start();
      } // if the animator is non null
      else {
        console.log("No animator!");
      }
    } // if the mouseover object is an expanded imageBox
    if (makingLine) {
      var outlet;
      if (isOutlet(shape)) {
        outlet = shape;
      } // if the mouseover object is an outlet
      else if (isFunction(parent)) {

        // find empty outlet
        if (parent.attrs.numInputs < parent.attrs.maxInputs) {
          var i = OUTLET_OFFSET
          while (parent.children[i].attrs.lineIn) {
            i++;
          } // while the outlet at index i has a lineIn
          outlet = parent.children[i];
        } // if the number of inputs is less than the max inputs
        else if (parent.attrs.maxInputs == 1) {
          outlet = parent.children[OUTLET_OFFSET];
        } // if the function can only have 1 input
      } // if the mouseover object is part of a function
      if (outlet && outlet.parent != currLine.attrs.source && !isCycle(currLine.attrs.source, outlet.parent)) {
        outlet.scale({
          x: 1.5,
          y: 1.5
        });
        line = outlet.attrs.lineIn;
        if (line) {
          line.setAttrs({
            shadowColor: deleteColor,
            shadowEnabled: true
          });
          lineLayer.draw();
        } // if line exists
        workLayer.draw();
      } // if outlet
    } // if makingLine
  } // if the work tool or line tool is enabled
  else if (deleteToolOn) {
    if (isFunction(parent) || isValue(parent)) {
      parent.children[0].setAttrs({
        shadowColor: deleteColor,
        shadowOpacity: 1,
        shadowEnabled: true
      });

      // for all lines going out
      var lineOut = parent.attrs.lineOut;
      for (var i = 0; i < lineOut.length; i++) {
        lineOut[i].setAttrs({
          shadowColor: deleteColor,
          shadowEnabled: true
        });
      } // for lineOut array

      // for all lines coming in
      var children = parent.children;
      for (var i = OUTLET_OFFSET; i < children.length; i++) {
        line = children[i].attrs.lineIn;
        if (line) {
          line.setAttrs({
            shadowColor: deleteColor,
            shadowEnabled: true
          });
        } // if line
      } // for incoming lines
    } // if the mouseover object belongs to a value 
    workLayer.draw();
    lineLayer.draw();
  } // if the delete tool is enabled
});

/**
 * When the cursor is moved out of an outlet while drawing a line, return the outlet to its
 * original size/shadow/state
 */
workLayer.on('mouseout', function(evt) {
  var shape = evt.target;
  var parent = shape.getParent();
  if (workToolOn || lineToolOn) {
    if (isImageBox(shape) && shape.attrs.expanded) {
      /*
      animation = false;
       */
      if (parent.attrs.animator) {
        parent.attrs.animator.stop();
      }
      else {
        console.log("No animator to stop");
      } 
    } // if the mouseout object is an expanded imageBox
    if (makingLine) {
      var outlet;
      if (isOutlet(shape)) {
        outlet = shape;
      } // if the shape is an outlet
      else if (isFunction(parent)) {
        // find the first empty outlet
        if (parent.attrs.numInputs < parent.attrs.maxInputs) {
          var i = OUTLET_OFFSET
          while (parent.children[i].attrs.lineIn) {
            i++
          } // while the outlet at index i has a line in, skip forward
          outlet = parent.children[i];
        } // if the number of inputs is less than the max inputs
        else if (parent.attrs.maxInputs == 1) {
          outlet = parent.children[OUTLET_OFFSET];
        } // if the function can only have 1 input
      } // if the mouseover object belongs to a function
      if (outlet && outlet.parent != currLine.attrs.source) {
        outlet.scale({
          x: 1,
          y: 1
        });
        line = outlet.attrs.lineIn;
        if (line) {
          line.setAttr('shadowEnabled', false);
          lineLayer.draw();
        } // if line exists
        workLayer.draw();
      } // if outlet exists and does not belong to the line's source
    } // if makingLine
  } // if the work tool or line tool is enabled 
  else if (deleteToolOn) {
    if (isFunction(parent) || isValue(parent)) {

      // deal with shadows on the shape
      if (parent == currShape) {
        setSelectedShadow(parent);
      } // if mouseout shape is the global currShape
      else {
        removeShadow(parent);
      } // else its not the currShape

      // deal with lines coming out of the shape
      var lineOut = parent.attrs.lineOut;
      for (var i = 0; i < lineOut.length; i++) {
        lineOut[i].setAttr('shadowEnabled', false);
      } // for lineOut array

      // deal with lines going in to the shape
      var children = parent.children;
      for (var i = OUTLET_OFFSET; i < children.length; i++) {
        line = children[i].attrs.lineIn;
        if (line) {
          line.setAttr('shadowEnabled', false);
        } // if line in exists
      } // for incoming lines
    } // if the mouseover object belongs to a value or function
    workLayer.draw();
    lineLayer.draw();
  }
});
