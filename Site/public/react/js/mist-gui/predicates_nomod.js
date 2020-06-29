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
 			state.animation = false;
 			utility.collapseCanvas(group);
 		}
 		return false;
 	}
 };
