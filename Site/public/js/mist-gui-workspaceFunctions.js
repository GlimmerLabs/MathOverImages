/* workspace functions */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MISTgui; } catch (err) { MISTgui = {}; }
if (!MISTgui.OUTLET_OFFSET) { MISTgui.OUTLET_OFFSET = OUTLET_OFFSET; }

// +-----------------+-----------------------------------------------
// | Local Utilities |
// +-----------------+

MISTgui.outletIndex = function(outlet) {
  if (outlet.attrs.outletIndex) {
    return outlet.attrs.outletIndex;
  }
  var outlets = outlet.parent.children;
  for (var i = MISTgui.OUTLET_OFFSET; i < outlets.length; i++) {
    if (outlet === outlets[i]) {
      return i - MISTgui.OUTLET_OFFSET;
    } // if
  } // for
} // MISTgui.getIndex

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
 * Convert a JSON string created by workspaceToJSON back to a workspace.
 */
var jsonToWorkspace = function(json) {
  var layout = JSON.parse(json);
  restore(layout);
  MIST.displayLayout(layout, { addVal:addVal, addOp:addOp, addEdge:addLine });
} // JSONtoWorkspace

/**
 * Convert the workspace to JSON that we can then store in a file
 * or on the server.
 */
var workspaceToJSON = function() {
  // Extract information from the workspace.
  var nodes = workLayer.getChildren();
  var edges = lineLayer.getChildren();

  // Set up information to turn to JSON
  var info = new MIST.Layout();
  var nodeInfo = {};
  var lineInfo = {};

  // Gather information on each node.
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (isValue(node)) {
      nodeInfo[node._id] = 
          info.addVal(node.attrs.name, node.x(), node.y());
    } // if it's a value
    else if (isFunction(node)) { 
      nodeInfo[node._id] = 
          info.addOp(node.attrs.name, node.x(), node.y());
    } // if it's a function
  } // for each node

  // Gather information on each edge
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    info.addEdge(nodeInfo[edge.attrs.source._id], 
        nodeInfo[edge.attrs.outlet.parent._id],
        MISTgui.outletIndex(edge.attrs.outlet));
  } // for

  // And we're done
  return JSON.stringify(info);
} // workspaceToJSON

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

