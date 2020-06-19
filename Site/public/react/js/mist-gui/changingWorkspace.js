/**
 * elementTable is a hash table that connects an element's id to the element in the 
 * workspace.
 */
 var elementTable = {};

/**
 * actionArray is an array that contains an action-object for every action in
 * a workspace. Used to implement undo/redo feature
 */
 var actionArray = [];

/**
 * currIndex keeps track of the index in actionArray where it would be appropriate to 
 * add the next action. Initialized at 0.
 */
 var currIndex = 0;
/**
 * a count of the total usable actions in actionArray. A user can redo until 
 * (totalIndex - 1) after undoing. Once a user creates a new action after undoing,
 * the totalIndex is set to the currIndex. 
 */
 var totalIndex = 0;

/**
  * actionToObject takes an function or value group and type of action, and creates an object 
  *  within an array to signify the action.
  * types of actions include:
  * - move
  * - delete
  * - insert
  * - replace
  */
  var actionToObject = function(action, group) {
    // If it's a function or value.
    if (isFunction(group) || isValue(group)) {
      var obj = {
        type: 'node',
        id: group._id.toString(), 
        action: action,
        x1: group.x(),
        y1: group.y(),
        connections: []
      };
      var child = 0;
      if (action == 'delete') {
        // Remember all the outgoing edges we're deleting.
        for (var i = 0; i < group.attrs.lineOut.length; i++) {
                 obj['connections'][child++] = actionToObject('delete', group.attrs.lineOut[i]);
             }
        // Remember all the incoming edges we're deleting.
        if (isFunction(group)) {
          for (var i = OUTLET_OFFSET; i < group.children.length; i++) {
            var lineIn = group.children[i].attrs.lineIn;
            if (lineIn != null && lineIn != undefined) {
              obj['connections'][child++] = actionToObject('delete', lineIn);
            } // if lineIn is not null
          } // for each incoming edge
        } // if there are incoming edge
      } // if we're deleting things
        else if (action == 'replace') {
            var oldGroup = arguments[2]
            obj.oldGroup = oldGroup;
            if (isFunction(group)) {
              if (group.attrs.maxInputs < oldGroup.children.length - 3) {
                var startingIndex = OUTLET_OFFSET + group.attrs.maxInputs;
                for (var i = startingIndex; i < oldGroup.children.length; i++) {
                  var lineIn = oldGroup.children[i].attrs.lineIn;
                  if (lineIn != null && lineIn != undefined) {
                    obj['connections'][child++] = actionToObject('delete', lineIn);
                  } 
                }
              }
            }
          }   // if we're replacing things
    } // if it's a function or value
    // If it's a line
    else if (isLine(group)) {
      var obj = {
        type: 'line',
        id: group._id.toString(),
        action: action,
        source: group.attrs.source,
        sink: group.attrs.outlet.parent,
            sinkIndex: group.attrs.outlet.attrs.outletIndex
        };
        if (action == 'replace') {
            var oldLine = arguments[2];
            obj.deleteLine = actionToObject('delete', oldLine);
        }
    } // if it's a line
    return obj;   
  };

/**
 * insertToArray takes an object properly formatted for the actionArray and puts
 * it in the array, increments the currIndex, updates the totalIndex, updates the
 * redo/undo button shading and draws the toolboxLayer
 */
 var insertToArray = function(actionObj) {
     actionArray[currIndex] = actionObj;
     currIndex++;
     totalIndex = currIndex;
     shadeUndoRedo();
     toolboxLayer.draw();
 };

/**
 * insertToTable takes a group newly added to the workspace and adds it the 
 * elementTable along with the group's id number as the key.
 */
 var insertToTable = function(group) {
     var stringId = group._id.toString();
     elementTable[stringId] = group;
 };

  /**
   * inTable takes a function or value group and checks if it's already been added
   * to the workspace from the menu. Returns true if group is already in the table, 
   * and false if it has not yet been added. 
   */
   var inTable = function(group) {
     var stringId = group._id.toString();
     return (elementTable[stringId] != undefined);
 };

  /**
   * undoAction takes an action from the action array and if an undo action is
   * possible, undoes one of the action (delete, insert, move, or replace)
   * for either a node or a line. The currIndex is updated and relevant layers
   * redrawn.
   */
   var undoAction = function(actionObj) {
    // if the an undo action is valid (there are actions to be undone)
    if (currIndex > 0) {
       var action = actionObj.action;
       var element = elementTable[actionObj.id];
     // if the action in question is a deletion
     if (action == 'delete') {
      // if working with a node
      if (actionObj.type == 'node') {
        // put the object back on the worklayer
        element.moveTo(workLayer);
        var connections = actionObj.connections;
        for (var i = 0; i < connections.length; i++) {
          // re-call the function on the line in question's deletion
          undoAction(connections[i]);
        } // go through each of the old line connections
        updateForward(element);
        removeShadow(element);
        updateFunBar();        
      } // if node
      // else working with a line
      else {
        insertLine(actionObj);
        assertRenderable(actionObj.sink);
        updateForward(actionObj.sink);
      } // else element is a line
      } // if delete
      // if the action in question is an insertion
      else if (action == 'insert') {
        if (actionObj.type == 'node') {
          if (element.attrs.renderLayer != null) {
            // close an open canvas
            collapseCanvas(element);
        }
          // remove the object from its layer
          element.remove(); 
        } // if node
        // if working with a line
        else {
          // remove the line and update its indexes
          removeLine(element);
          // remove extra outlet
          removeOutlet(actionObj.sink);
        }
      } // if insert
      // if the action in question is a movement
      else if (action == 'move') {
        // get the old position
        var newX = actionObj.x1;
        var newY = actionObj.y1;
        // set the object back to its old position
        element.setAttrs({
          x: newX,
          y: newY
      });
        // re-render the canvas if previously open
        if (element.children[2].attrs.expanded) {
          element.attrs.renderLayer.draw();
          renderCanvas(element);
      }
        //collapseCanvas(element);
        currShape = element;
        updateFunBar();
      } // if move
      // if the action in question is a replacement
      else {
        if (actionObj.type == 'node') {
            var oldGroup = actionObj.oldGroup //group to be put back on the workLayer
            oldGroup.moveTo(workLayer);
            replaceNode(element, oldGroup);
            var totalNeeded = oldGroup.children.length + actionObj.connections.length;
            for (var i = 0; i < actionObj.connections.length; i++)
            {
              if (oldGroup.children.length < totalNeeded) {
                addOutlet(oldGroup);
              }
              insertLine(actionObj.connections[i]);
              assertRenderable(actionObj.connections[i].sink);
              updateForward(actionObj.connections[i].sink);
            }
            workLayer.draw();
        } // if node
        else {
            removeLine(element);
            insertLine(actionObj.deleteLine);
            assertRenderable(actionObj.sink);
            updateForward(actionObj.sink);
        } // else line
      } // if replace
    } // if undo
    workLayer.draw();
    dragLayer.draw();
    lineLayer.draw();
};


  /**
   * redoAction takes an action from the action array and if a redo action is
   * possible, redoes one of the action (delete, insert, move, or replace)
   * for either a node or a line. The currIndex is updated and relevant layers
   * redrawn.
   */
   var redoAction = function(actionObj) {
    // if the currIndex is less than the totalIndex (there are still valid actions)
    if (currIndex < totalIndex) {
      var action = actionObj.action;
      var element = elementTable[actionObj.id];
      // if you are redoing a delete
      if (action == 'delete') {
        // if you are deleting a node
        if (actionObj.type == 'node') {
          // deal with lines coming in to the node being deleted
          var targetLine;
          // go through each of the outlets of the object
          for(var i = 3; i < element.children.length; i++) {
            
            // grab each line to the outlet
            targetLine = element.children[i].attrs.lineIn;
            // if such a line exists
            if(targetLine != null) {
              removeLine(targetLine);
            } // if not null
        }
          // deal with the lines leading out of the node being deleted
          var outletParent;
          // go through each of the lineOuts
          for(var i = 0; i < element.attrs.lineOut.length; i++) {
            // grab the line of interest
            targetLine = element.attrs.lineOut[i];
            // grab its sink's parent
            outletParent = targetLine.attrs.outlet.parent;
            // decrement the sink's inputs
            outletParent.attrs.numInputs--;
            // empty out the sink's outlet
            targetLine.attrs.outlet.attrs.lineIn = null;
            // check and update the rendering of the sink
            assertRenderable(outletParent);
            updateForward(outletParent);
            // remove the line from the lineLayer
            targetLine.remove();
        } 
          // remove text from funBar
          if (currShape == element) {
            currShape = null;
            updateFunBar();
          }
          // remove the element form the workLayer
          element.remove();
        } // if node
        // else line
        else {
          // remove the line and update th esink and source's indexes
          removeLine(element);
      }
      } // if delete
      //else if insert
      else if (action == 'insert') {
        // if working with a ndoe
        if (actionObj.type == 'node') {
          // remove the element from the workLayer
          element.moveTo(workLayer);
        } // if node
        // if working with a line
        else {
          // insert the old line
          insertLine(actionObj);
          assertRenderable(actionObj.sink);
          updateForward(actionObj.sink);
          lineLayer.draw();
      }
      workLayer.draw();
      } // if insert
      // else if move
      else if (action == 'move') {
        // grab the ending position of the movement
        var newX = actionObj.x2;
        var newY = actionObj.y2;
        // grab fo the object
        var element = elementTable[actionObj.id];
        // re-move the object back to the changed position
        element.setAttrs({
          x: newX,
          y: newY
      });
        // re-render a canvas if previously open
        if (element.children[2].attrs.expanded) {
          element.attrs.renderLayer.draw();
          renderCanvas(element);
      }
        // update the currShape
        removeShadow(currShape);
        currShape = element;
        setSelectedShadow(currShape);
        updateForward(element);
        updateFunBar(); 
      } // if move
      // else replace
      else {
        if (actionObj.type == 'node') {
            var oldGroup = actionObj.oldGroup //group to be put back on the workLayer
            element.moveTo(workLayer);
            replaceNode (oldGroup, element); 
            for (var i = 0; i < actionObj.connections.length; i++)
            {
              var lineObj = actionObj.connections[i];
            
              insertLine(actionObj.connections[i]);
              assertRenderable(actionObj.connections[i].sink);
              updateForward(actionObj.connections[i].sink);
            }

        } // if node
        else {
          removeLine(elementTable[actionObj.deleteLine.id]);
          insertLine(actionObj);
          assertRenderable(actionObj.sink);
          updateForward(actionObj.sink);
        } // else line
      } // else replace
      dragLayer.draw(); 
      workLayer.draw();
      lineLayer.draw();
    } // currIndex < totalIndex
  }; // function redoAction(actionObj)


  /**
   * removeLine take a line and removes it from the workspace and 
   * removes all other associations to the line in its source and sink. 
   * updates funBar text. 
   */
   var removeLine = function(line) {
    var outlet = line.attrs.outlet;
    
    var index = line.attrs.sourceIndex;
    var source = line.attrs.source;
    for (var j = index + 1; j < source.attrs.lineOut.length; j++) {
      source.attrs.lineOut[j].attrs.sourceIndex--;
    }
    // remove the sourceIndex'th lineOut from the line's source
    source.attrs.lineOut.splice(line.attrs.sourceIndex, 1);
    if (outlet) {
      var sink = outlet.parent;
      // empty out the sink's outlet
      outlet.attrs.lineIn = null;
      // update the sink's number of outlets
      sink.attrs.numInputs--;
      // if the sink is the currShape
      if (sink == currShape) {
        // if the sink is still renderable, update the funBarText
        if (assertRenderable(sink)) {
          funBarText.setAttr('text', currShape.attrs.renderFunction);
        } // if renderable
        else {
          // update currShape's identification and the funBarText
          funBarText.setAttr('text', ''); 
        } // else un-renderable
        funBarLayer.draw();
      } // if currShape
      else {
      // if sink is not currShape, assert and update renderability of sink
      assertRenderable(sink);
      }
      // update
      updateForward(sink);
      //setOutletOpacity(sink);
    } // if outlet is not null
  // reset the strokeWidth
  line.setAttr('strokeWidth', lineStrokeWidth);
  // remove the line from the lineLayer
  line.remove();
};

  /**
   * insertLine takes an actionObj, finds the corresponding line, moves it to the 
   * lineLayer, and connects the line to its source and sink.
   */ 
   var insertLine = function(actionObj) {
    var sink = actionObj.sink;
    var source = actionObj.source;
    var outlet = sink.children[actionObj.sinkIndex + 3];
    if (outlet) {
      var element = elementTable[actionObj.id];
      // move old line to the lineLayer
      element.moveTo(lineLayer);
      // connect line to source
      element.attrs.source = source;
      // change sourceIndex in line
      element.attrs.sourceIndex = source.attrs.lineOut.length;
      // connect source to line
      source.attrs.lineOut[source.attrs.lineOut.length] = element;
      // connect line to outlet
      element.attrs.outlet = outlet;
      // connect outlet to line
      outlet.attrs.lineIn = element;
      // increment numInputs
      sink.attrs.numInputs++;
      // add outlet if nessecary
      if (sink.children[sink.children.length - 1].attrs.lineIn) {
        addOutlet(sink);
      }
      // set the line's attributes
      element.setAttrs({
        scale: 1,
        shadowEnabled: false
      });
      var temp = currShape;
      // update the currshape to be the sink and re-draw
      currShape = sink;
      dragLayer.draw();
      // update the currShape to be the source and re-draw
      currShape = actionObj.source;
      dragLayer.draw();
      currShape = temp;
    }
  };


  /**
   * shadeUndoRedo takes no parameters and instead works off of the global
   * variables currIndex and totalIndex to update the attributes of the 
   * undo/redo buttons to reflect their validity.
   */ 
   var shadeUndoRedo = function() {
    // if an undo action is possible
    if (currIndex > 0) {
      // color the undo button grey
      undoButton.setAttr('fill', 'grey');
  } 
    // if undo is invalid
    else {
      // color the undo button a lighter grey
      undoButton.setAttr('fill', '#E3E3E3');
  } 
    // is a redo action is possible
    if (currIndex < totalIndex) {
      // color the undo button grey
      redoButton.setAttr('fill', 'grey');
  }
    // if redo is invalid
    else {
      // color the undo button a lighter grey
      redoButton.setAttr('fill', '#E3E3E3');
  } 
};

