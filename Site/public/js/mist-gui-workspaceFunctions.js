/* workspace functions */

/**
 * workspaceToArray takes all the nodes in the workLayer and all the lines in the 
 * lineLayer and puts them into an array.
 */
 var workspaceToArray = function() {
 	var wArray = [];
 	var workChildren = workLayer.getChildren();
 	var lineChildren = lineLayer.getChildren();
 	var i = 0;
 	for (i; i < workChildren.length; i++) {
 		wArray[i] = workChildren[i]; 
 	}
 	for (var j = 0; j < lineChildren.length; j++, i++) {
 		wArray[i] = lineChildren[j];
 	}
 	return wArray;
 };

/**
 * arrayToWorkspace takes an array of objects and inserts them to a workspace
 */
 var arrayToWorkspace = function(array) {
 	for (var i = 0; i < array.length; i++) {
 		var object = array[i];
 		if (isLine(object)) {
 			object.moveTo(lineLayer);
 		}
 		else {
 			object.moveTo(workLayer);
 			object.setAttr('visible', true);
 		}
 	}
 	workLayer.draw();
 	lineLayer.draw();
 };

/**
 * resetWorkspace removes all elements from the active workspace,
 * and all records of elements created in session and actions performed
 */
var resetWorkspace = function() {
	// destroy workLayer children and renderLayers
	workLayer.destroyChildren();
	//destroy lineLayer children
	lineLayer.destroyChildren();
	// empty elementTable
	elementTable = {};
	// empty actionArray
	actionArray = [];
	// reset indexes and variables
	currIndex = 0;
	totalIndex = 0;
	currShape = null;
	dragShape = null;
	updateFunBar();
	shadeUndoRedo();
	stage.draw();
};

/**
 * saveWorkspace saves the active workspace to the server.
 */
var saveWorkspace = function() {
	// STUB
}

/**
 * loadWorkspace loads a given workspace from the server onto the screen.
 */
var loadWorkspace = function(workspace) {
	// STUB
}

