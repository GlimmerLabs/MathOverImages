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
  			x: group.x(),
  			y: group.y(),
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
  					console.log(isLine(lineIn));
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
  	if (action == 'delete') {

  	}
  	else if (action == 'insert') {

  	}
  	else if (action == 'move') {

  	}
  	else {

  	}
  };
