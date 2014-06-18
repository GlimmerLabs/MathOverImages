//UTILITY FUNCTIONS

/*
isFunction determines if target is a functionGroup and returns a boolean value. 
target is an object.
*/
var isFunction = function(target) {
	return (target.attrs.maxInputs != null);
};

/*
isValue determines if target is a valueGroup and returns a boolean value. 
target is an object.
*/
var isValue = function(target) {
	return (target.attrs.maxInputs == null && target.nodeType == 'Group');
};

/*
isOutlet determines if target is an outletGroup and returns a boolean value. 
target is an object.
*/
var isOutlet = function(target) {
	return (target.name() != null && target.attrs.name.substring(0,6) == 'outlet');
};

/*
isLine determines if target is a line and returns a boolean value. 
target is an object.
*/
var isLine = function(target) {
	return (target.className == 'Line');
};

/*
isImageBox determines if target is an image box and returns a boolean value. 
target is an object.
*/
var isImageBox = function(target) {
	return (target.name() != null && target.attrs.name == 'imageBox');
}

/*
isDrawTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
var isDrawTool = function(target) {
	return (target.name() != null && target.attrs.name == 'draw');
}

/*
isDeleteTool determines if target is the drawing tool on the pallette and returns a boolean value. 
target is an object.
*/
var isDeleteTool = function(target) {
	return (target.name() != null && target.attrs.name == 'delete');
}

/*
isToolControl determines if target is the tool group controller on the pallette and returns a boolean value. 
target is an object.
*/
var isToolControl = function(target) {
	return (target.name() != null && target.attrs.name == 'toolControl');
}

/*
isRedoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
var isRedoTool = function(target) {
	return (target.name() != null && target.attrs.name == 'redo');
}

/*
isUndoTool determines if target is the redo tool on the pallette and returns a boolean value. 
target is an object.
*/
var isUndoTool = function(target) {
	return (target.name() != null && target.attrs.name == 'undo');
}

/**
 * isRenderable takes a node, and returns true if it is a value group or a
 * function group with sufficient inputs, and false if it is a function group
 * with insufficient inputs.
 */
 var isRenderable = function(group) {
 	if (isValue(group)) {
 		return true;
 	} else {
 		var validInputs = 0;
 		for(var i = 3; i < group.children.length; i++) {
 			lineIn = group.children[i].attrs.lineIn;
 			if (lineIn != null && isRenderable(lineIn.attrs.source)) {
 				validInputs++;
 			}
 		}
 		return validInputs >= group.attrs.minInputs;
 	}
 }

 var isCycle = function(sourceGroup, outletGroup) {

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
 }

 // METHODS

/*
	addOutlet takes a function group funGroup and adds an outlet to it, expanding the node if there is not enough space for the outlet.
	*/
	var addOutlet = function(funGroup) {
		if(funGroup.children.length - 3 < funGroup.attrs.maxInputs) {
			if(funGroup.children.length - 3 > 2) {
				funGroup.children[0].setAttr('height',
					funGroup.children[0].attrs.height + outletYOffset);
				funGroup.children[1].setAttr('y', funGroup.children[1].attrs.y + outletYOffset / 2);
				funGroup.children[2].setAttr('y', funGroup.children[2].attrs.y + outletYOffset);
			}
			var newOutlet = makeOutlet(funGroup);
			funGroup.add(newOutlet);
			workLayer.draw();
			if (funGroup.attrs.renderLayer != null){
				funGroup.attrs.renderLayer.draw();
			}
		}
	};


/**
 * findRenderFunction takes a group and, if the group has sufficient inputs, finds the 
 * renderFunction that should be used to create an image for output.
 * NOTE: this will always recalculate the entire function
 */
 var findRenderFunction = function(group) {
 	if(group.name() != "rgb") {
 		group.attrs.renderFunction = functions[group.attrs.name].prefix + '(';
 			for(var i = 3; i < group.children.length; i++) {
 				if(group.children[i].attrs.lineIn != null) {
 					group.attrs.renderFunction += group.children[i].attrs.lineIn.attrs.source.attrs.renderFunction;
 					group.attrs.renderFunction += functions[group.attrs.name].separator
 				}
			} // add each element to the equation
			group.attrs.renderFunction = group.attrs.renderFunction.substring(0, group.attrs.renderFunction.length - 1) + ')';
	}
	else {
	group.attrs.renderFunction = [
	group.children[3].attrs.lineIn.attrs.source.attrs.renderFunction,
	group.children[4].attrs.lineIn.attrs.source.attrs.renderFunction,
	group.children[5].attrs.lineIn.attrs.source.attrs.renderFunction
	];
	}
};

/**
 * assertRenderable takes a function group and checks if it is renderable. 
 * If true, it finds the renderFunction for the group, makes the imageBox visible 
 * and returns true. If false, it makes the imageBox invisible and returns false.
 */
 var assertRenderable = function(group) {
 	if (isRenderable(group)) {
 		findRenderFunction(group);
 		group.children[2].setAttr('visible', true);
 		return true;
 	} 
 	else {
 		group.attrs.renderFunction = null;
 		group.children[2].setAttr('visible', false);
 		if(group.attrs.renderLayer != null) {
 			animation = false;
 			collapseCanvas(group);
 		}
 		return false;
 	}
 };

/**
 * updateFunBar changes the text in the funBar according to the currShape.
 */
 var updateFunBar = function() {
 	currText = currShape.attrs.renderFunction;
 	if (currShape.name() == 'rgb') {
 		currText = 'rgb(' + currText + ')';
 	} 
 	if (currText != null) {
 		currShape.children[0].setAttrs({
 			shadowColor: 'darkblue',
 			shadowOpacity: 1,
 			shadowEnabled: true
 		});
 		var currFontSize;
 		if (currText.length <= 12) {
 			currFontSize = funBarDisplayFontSize;
 		} 
 		else if (currText.length >= 26) {
 			currFontSize = 10;
 		}
 		else {
 			currFontSize = 264 / currText.length;
 		}
 		funBarText.setAttrs({
 			text: currText,
 			fontSize: currFontSize
 		});
 		funBarLayer.draw();
 	}
 };

/**
 * renderCanvas takes a function or value group and renders a 50 by 50 image starting where the image box is located.  
 */
	var renderCanvas = function(group) {
		var currLayer = group.attrs.renderLayer; 
		if (currLayer == null){
			currLayer = new Kinetic.Layer();
			group.setAttr('renderLayer', currLayer);
			stage.add(currLayer);
		} // if 
		group.children[2].setAttrs({
			width: renderSideLength,
			height: renderSideLength
		});
		var box = group.children[2];
		canvas = currLayer.canvas._canvas;
		if (group.attrs.name == "rgb") {
			rfun = MOIbody2fun(group.attrs.renderFunction[0]);
			gfun = MOIbody2fun(group.attrs.renderFunction[1]);
			bfun = MOIbody2fun(group.attrs.renderFunction[2]);
			renderRGB(rfun, gfun, bfun, canvas, group.x() + box.x(), group.y() + box.y(), renderSideLength, renderSideLength);
		} 
		else {
			renderFun(MOIbody2fun(group.attrs.renderFunction), canvas, group.x() + box.x(), group.y() + box.y(), renderSideLength, renderSideLength);
		}
	};

	var collapseCanvas = function(group){
		group.attrs.renderLayer.destroy();
		group.attrs.renderLayer = null;
		group.children[2].setAttrs({
			width: imageBoxSideLength,
			height: imageBoxSideLength,
			expanded: false
		});	
	};
/**
 * updateForward takes a group and makes sure all groups for which it is a source are
 * accurate. To be used whenever a function's inputs are changed, or when a node is
 * deleted.
 */
 var updateForward = function(group) {
 	for (var i = 0; i < group.attrs.lineOut.length; i++) {
 		var lineOutGroup = group.attrs.lineOut[i].attrs.outlet.parent;
 		assertRenderable(lineOutGroup);
 		updateForward(lineOutGroup);
 	}
 };

	// Create functions to Move Menu Items
	/* move the valueGroups in the menu to their original location. */
	var moveValueNodesIn = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var moveValue = makeMenuTween(menuValues[i], menuValuesXStart, false);
			moveValue.play();
		}
	};
	/* move the valueGroups to their expanded location. */
	var expandValueNodes = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var moveValue = makeMenuTween(menuValues[i], menuCornerWidth + buttonWidth + valMenuXSpacing + i * (valMenuXSpacing + functionTotalSideLength), true);
			moveValue.play();
		}
	};
	/* move the functionGroups to their original position. */
	var moveFunctionNodesIn = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuFunctsXStart, false);
			moveFunction.play();
		}
	};
	/* move the functionGroups to the right of the screen. (For when values are expanded).*/
	var moveFunctionNodesRight = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuFunctsXEnd, false);
			moveFunction.play();
		}
	};
	/* move the functionGroups to their expanded position. */
	var expandFunctionNodes = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuCornerWidth + 2 * buttonWidth + functMenuXSpacing + i * (functMenuXSpacing + functionTotalSideLength), true)
			moveFunction.play();
		}
	};
	/* move the functionsButton to the right of the screen (for when values are expanded). */
	var moveFunctionsButtonRight = function() {
		var moveButton = makeMenuTween(functionsButton, width - buttonWidth, true)
		moveButton.play();
	};
	/* move the functionsButon to it's original position. */
	var moveFunctionsButtonLeft = function() {
		var moveButton = makeMenuTween(functionsButton, menuCornerWidth + buttonWidth, true)
		moveButton.play();
	};

	/* disableButton take a tool group from the tool box, turns off its functionality and disables its shadow. */
	var disableTool = function(toolGroup) {
		toolGroup.children[0].setAttr('shadowEnabled', false);
		var name = toolGroup.name();
		if (name == 'workTool') {
			workToolOn = false;
		} 
		else if (name == 'lineTool') {
			lineToolOn = false;
		}
		else {
			deleteToolOn = false;
		}
	};

	var enableWorkTool = function() {
		workToolGroup.children[0].setAttr('shadowEnabled', true);
		workToolOn = true;
		disableTool(lineToolGroup);
		disableTool(deleteToolGroup);
		toolboxLayer.draw();
	};