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
  		if (action == 'delete') {
  			var child = 0;
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
  	} // if it's a line
  	return obj; 	
  };

  var insertToArray = function(actionObj) {
  	actionArray[currIndex] = actionObj;
  	currIndex++;
  	totalIndex = currIndex;
  };

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

  var undoAction = function(actionObj) {
  	var action = actionObj.action;
    var element = elementTable[actionObj.id];
    if (action == 'delete') {
      if (actionObj.type == 'node') {
        element.moveTo(workLayer);
        var connections = actionObj.connections;
        for (var i = 0; i < connections.length; i++) {
          undoAction(connections[i]);
        }
        currShape = element;
        currShape.children[0].setAttrs({shadowColor: 'darkblue'});
      }
      else {
        var source = actionObj.source;
        var outlet = actionObj.sink.children[actionObj.sinkIndex + 3];
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
        assertRenderable(actionObj.sink);
        element.setAttrs({
          scale: 1,
          shadowEnabled: false
        });
        currShape = actionObj.sink;
        dragLayer.draw();
        currShape = actionObj.source;
        dragLayer.draw();
      } // else element is a line
      workLayer.draw();
      
    }
  	else if (action == 'insert') {

  	}
  	else if (action == 'move') {
      var newX = actionObj.x1;
      var newY = actionObj.y1;
      element.setAttrs({
        x: newX,
        y: newY
      });
      currShape = element;
      dragLayer.draw(); 
      workLayer.draw();
      
  	}
  	else {

  	}
  };

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
          for(var i = 3; i < element.children.length; i++) {
            targetLine = element.children[i].attrs.lineIn;
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
          for(var i = 0; i < element.attrs.lineOut.length; i++) {
            targetLine = element.attrs.lineOut[i];
            outletParent = targetLine.attrs.outlet.parent;
            outletParent.attrs.numInputs--;
            targetLine.attrs.outlet.attrs.lineIn = null;
            assertRenderable(outletParent);
            updateForward(outletParent);
            targetLine.remove();
          } 
          // remove text from funBar
          if (currShape == element) {
            currShape = undefined;
            funBarText.setAttr('text', '');
            funBarLayer.draw();
          }
          element.remove();
        } // if node
        // else line
        else {
          var outlet = element.attrs.outlet;
          var parent = outlet.parent;
          element.attrs.source.attrs.lineOut.splice(element.attrs.sourceIndex, 1);
          outlet.attrs.lineIn = null;
          parent.attrs.numInputs--;
          element.remove();
          if (parent == currShape) {
            if (assertRenderable(parent)) {
              funBarText.setAttr('text', currShape.attrs.renderFunction);
            }
            else {
              currShape.children[0].setAttr('shadowEnabled', false);
              currShape = undefined;
              funBarText.setAttr('text', ''); 
            }
            funBarLayer.draw();
          } 
          else {
            assertRenderable(parent);
          }    
          updateForward(outlet.parent);
        }
      } // if delete
      //else if insert
      else if (action == 'insert') {

      } // if insert
      // else if move
      else if (action == 'move') {
        var newX = actionObj.x2;
        var newY = actionObj.y2;
        var group = elementTable[actionObj.id];
        group.setAttrs({
          x: newX,
          y: newY
        });
        currShape = group;
      } // if move
      // else replace
      else {

      } // else replace
      dragLayer.draw(); 
      workLayer.draw();
      lineLayer.draw();
    } // currIndex < totalIndex
  }; // function redoAction(actionObj)
