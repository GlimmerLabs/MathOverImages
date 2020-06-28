import {menuStyle, size} from './styles.js';

/*
isFunction determines if target is a functionGroup and returns a boolean value. 
target is an object.
*/
export function isFunction(target) {
	return (target.attrs.maxInputs != null);
};

/*
isValue determines if target is a valueGroup and returns a boolean value. 
target is an object.
*/
export function isValue(target) {
	return (target.attrs.maxInputs == null && target.nodeType == 'Group');
};

export function isVariable(target) {
	return (target.name() == 'variable');
}

/*
isOutlet determines if target is an outletGroup and returns a boolean value. 
target is an object.
*/
export function isOutlet(target) {
	return (target.name() != null && target.attrs.name.substring(0,6) == 'outlet');
};

/*
isLine determines if target is a line and returns a boolean value. 
target is an object.
*/
export function isLine(target) {
	return (target.className == 'Line');
};

/*
isImageBox determines if target is an image box and returns a boolean value. 
target is an object.
*/
export function isImageBox(target) {
	return (target.name() != null && target.attrs.name == 'imageBox');
};

/*
isDrawTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
export function isDrawTool(target) {
	return (target.name() != null && target.attrs.name == 'draw');
};

/*
isDeleteTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
export function isDeleteTool(target) {
	return (target.name() != null && target.attrs.name == 'delete');
};

/*
isToolControl determines if target is the tool group controller on the pallette and returns a boolean value. 
target is an object.
*/
export function isToolControl(target) {
	return (target.name() != null && target.attrs.name == 'toolControl');
};

/*
isRedoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
export function isRedoTool(target) {
	return (target.name() != null && target.attrs.name == 'redo');
};

/*
isUndoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
export function isUndoTool(target) {
	return (target.name() != null && target.attrs.name == 'undo');
};

/**
 * isRenderable takes a node, and returns true if it is a value group or a
 * function group with sufficient inputs, and false if it is a function group
 * with insufficient inputs.
 */
// TODO: OUTLET_OFFSET needs to be imported from somewhere
function isRenderable(group) {
 	if (isValue(group)) {
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
 			if (lineIn != null && isRenderable(lineIn.attrs.source)) {
 				validInputs++;
 			}
 		}
 		return validInputs >= group.attrs.minInputs && validInputs == group.attrs.numInputs;
 	}
 };

export function isCycle(sourceGroup, outletGroup) {
 	var lineOut = outletGroup.attrs.lineOut;
 	if (lineOut.length === 0) {
 		return false;
 	}
 	for(var i = 0; i < lineOut.length; i++) {
 		if (sourceGroup == lineOut[i].attrs.outlet.parent) {
 			return true;
 		} else if (isCycle(sourceGroup, lineOut[i].attrs.outlet.parent) ) {
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
// TODO: relies on utility
function assertRenderable(group) {
 	if (isRenderable(group)) {
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
 			state.animation = false;
 			utility.collapseCanvas(group);
 		}
 		return false;
 	}
 };

 /**
  * canMoveRight tests if either the functions or values in the menu can be moved 
  * to the right and returns a boolean.
  */
export function canMoveRight(type) {
  return ((type == 'values' && 
    menuValues[0].x() < (menuStyle.cornerWidth + menuStyle.buttonWidth + menuStyle.valXSpacing)) ||
    (type == 'functions' && 
    menuFunctions[0].x() < (menuStyle.cornerWidth + 2 * menuStyle.buttonWidth + menuStyle.functXSpacing)))
};
/**
 * canMoveLeft tests if either the functions or values in the menu can be moved
 * to the left and returns a boolean.
 */
export function canMoveLeft(type) {
	return ((type == 'values' &&
	  menuValues[menuValues.length - 1].x() > size.width - menuStyle.buttonWidth) ||
      (type == 'functions' && 
	  menuFunctions[menuFunctions.length - 1].x() > size.width))
};
