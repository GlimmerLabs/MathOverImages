/*
isFunction determines if target is a functionGroup and returns a boolean value. 
target is an object.
*/
const predicate = {};

predicate.isFunction = function(target) {
	return (target.attrs.maxInputs != null);
};

/*
isValue determines if target is a valueGroup and returns a boolean value. 
target is an object.
*/
predicate.isValue = function(target) {
	return (target.attrs.maxInputs == null && target.nodeType == 'Group');
};

predicate.isVariable = function(target) {
	return (target.name() == 'variable');
}

/*
isOutlet determines if target is an outletGroup and returns a boolean value. 
target is an object.
*/
predicate.isOutlet = function(target) {
	return (target.name() != null && target.attrs.name.substring(0,6) == 'outlet');
};

/*
isLine determines if target is a line and returns a boolean value. 
target is an object.
*/
predicate.isLine = function(target) {
	return (target.className == 'Line');
};

/*
isImageBox determines if target is an image box and returns a boolean value. 
target is an object.
*/
predicate.isImageBox = function(target) {
	return (target.name() != null && target.attrs.name == 'imageBox');
};

/*
isDrawTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
predicate.isDrawTool = function(target) {
	return (target.name() != null && target.attrs.name == 'draw');
};

/*
isDeleteTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
predicate.isDeleteTool = function(target) {
	return (target.name() != null && target.attrs.name == 'delete');
};

/*
isToolControl determines if target is the tool group controller on the pallette and returns a boolean value. 
target is an object.
*/
predicate.isToolControl = function(target) {
	return (target.name() != null && target.attrs.name == 'toolControl');
};

/*
isRedoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
predicate.isRedoTool = function(target) {
	return (target.name() != null && target.attrs.name == 'redo');
};

/*
isUndoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
predicate.isUndoTool = function(target) {
	return (target.name() != null && target.attrs.name == 'undo');
};

/**
 * isRenderable takes a node, and returns true if it is a value group or a
 * function group with sufficient inputs, and false if it is a function group
 * with insufficient inputs.
 */
predicate.isRenderable = function(group) {
 	if (predicate.isValue(group)) {
 		if (group.attrs.rep != '#') {
 			return true;
 		}
 		else {
 			return false;
 		}
 	} else {
 		var validInputs = 0;
 		for(var i = OUTLET_OFFSET; i < group.children.length; i++) {
 			lineIn = group.children[i].attrs.lineIn;
 			if (lineIn != null && predicate.isRenderable(lineIn.attrs.source)) {
 				validInputs++;
 			}
 		}
 		return validInputs >= group.attrs.minInputs && validInputs == group.attrs.numInputs;
 	}
 };

predicate.isCycle = function(sourceGroup, outletGroup) {
 	var lineOut = outletGroup.attrs.lineOut;
 	if (lineOut.length === 0) {
 		return false;
 	}
 	for(var i = 0; i < lineOut.length; i++) {
 		if (sourceGroup == lineOut[i].attrs.outlet.parent) {
 			return true;
 		} else if (predicate.isCycle(sourceGroup, lineOut[i].attrs.outlet.parent) ) {
 			return true;
 		}
 	}
 	return false;
 };

 /**
 * assertRenderable takes a function group and checks if it is renderable. 
 * If true, it finds the renderFunction for the group, makes the imageBox visible 
 * and returns true. If false, it makes the imageBox invisible and returns false.
 */
predicate.assertRenderable = function(group) {
 	if (predicate.isRenderable(group)) {
 		utility.findRenderFunction(group);
 		group.children[2].setAttr('visible', true);
 		if (group.attrs.animator) {
 			group.attrs.animator = null;
 			utility.renderCanvas(group);
 		}
 		return true;
 	} 
 	else {
 		group.attrs.renderFunction = null;
 		group.children[2].setAttr('visible', false);
 		if(group.attrs.renderLayer != null) {
 			animation = false;
 			utility.collapseCanvas(group);
 		}
 		return false;
 	}
 };

 /**
  * canMoveRight tests if either the functions or values in the menu can be moved 
  * to the right and returns a boolean.
  */
predicate.canMoveRight = function(type) {
  return ((type == 'values' && 
    menuValues[0].x() < (menuCornerWidth + buttonWidth + valMenuXSpacing)) ||
    (type == 'functions' && 
    menuFunctions[0].x() < (menuCornerWidth + 2 * buttonWidth + functMenuXSpacing)))
};
/**
 * canMoveLeft tests if either the functions or values in the menu can be moved
 * to the left and returns a boolean.
 */
predicate.canMoveLeft = function(type) {
	return ((type == 'values' &&
	  menuValues[menuValues.length - 1].x() > size.width - buttonWidth) ||
      (type == 'functions' && 
	  menuFunctions[menuFunctions.length - 1].x() > size.width))
};
