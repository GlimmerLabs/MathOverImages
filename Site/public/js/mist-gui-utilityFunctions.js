//UTILITY FUNCTIONS



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
 	if(isValue(group)) {
 		group.attrs.renderFunction = group.attrs.rep;
 		return;
 	}
 	group.attrs.renderFunction = functions[group.attrs.name].prefix + '(';
 		for(var i = 3; i < group.children.length; i++) {
 			if(group.children[i].attrs.lineIn != null) {
 				group.attrs.renderFunction += group.children[i].attrs.lineIn.attrs.source.attrs.renderFunction;
 				group.attrs.renderFunction += ',';
 			}
	} // add each element to the equation
	group.attrs.renderFunction = group.attrs.renderFunction.substring(0, group.attrs.renderFunction.length - 1) + ')';
};

/**
 * updateFunBar changes the text in the funBar according to the currShape.
 */
 var updateFunBar = function() {
 	currText = currShape.attrs.renderFunction;
 	if (currShape.attrs.renderFunction instanceof Array) {
 		// NEEDS UPDATE FOR RGB OUTPUTS
 		currText = 'rgb(' + currText + ')';
 	} 
 	if (currText != null) {
 		currShape.children[0].setAttrs({
 			shadowColor: 'darkblue',
 			shadowOpacity: 1,
 			shadowEnabled: true
 		});
 		var currFontSize;
 		if (currText.length <= 50) {
 			currFontSize = funBarDisplayFontSize;
 		} 
 		else if (currText.length >= 110) {
 			currFontSize = 10;
 		}
 		else {
 			currFontSize = 1100 / currText.length;
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
		currLayer.draw();
		canvas = currLayer.canvas._canvas;
			var groupScale = group.attrs.scaleX;
			var canvasX = group.x() + (groupScale * box.x());
			var canvasY = group.y() + (groupScale * box.y());
			var canvasWidth = groupScale * box.width();
			var canvasHeight = groupScale * box.height();
			var mistObj = MIST.parse(group.attrs.renderFunction);
			MIST.render(mistObj, {}, canvas, canvasWidth, canvasHeight, canvasX, canvasY, canvasWidth, canvasHeight);
	};

	var collapseCanvas = function(group){
		if (group.attrs.renderLayer != null) {
			group.attrs.renderLayer.destroy();
			group.attrs.renderLayer = null;
			group.children[2].setAttrs({
				width: imageBoxSideLength,
				height: imageBoxSideLength,
				expanded: false
			});	
		}
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
 * setDragShadow takes a function or value group and activates drag shadow
 */
 var setDragShadow = function(group) {
 	group.children[0].setAttrs({
 		shadowColor: 'black',
 		shadowEnabled: true
 	});
 };

/**
 * replaceNode takes an old node and a new node and replaces the old node with
 *	the new one, removing the old one from the layer.
 */
 var replaceNode = function(oldNode, newNode) {
 	var tempOut = oldNode.attrs.lineOut;
 	collapseCanvas(oldNode);
 	oldNode.remove();
 	if (newNode.attrs.name == 'constant' && !newNode.children[3]) {
        createEditableText(newNode);
    }
 	for(var i = 0; i < tempOut.length; i++) {
 		tempOut[i].attrs.source = newNode;
 	}
 	newNode.attrs.lineOut = tempOut;
 	// Theres more to do if we are replacing a function:
 	if (isFunction(newNode) && isFunction(oldNode)) {
 		// check if oldNode allows more inputs than newNode
 		if (newNode.attrs.maxInputs < oldNode.children.length - OUTLET_OFFSET) {
 			// add appropriate outlets to newNode
 			while (newNode.children.length < newNode.attrs.maxInputs + 3) {
 				addOutlet(newNode);
 			}
 			var outletIndex = 3; // which outlet we are applying the next input to
 			for(var i = 0; i < newNode.attrs.maxInputs; i++) {
 				if (oldNode.children[i+3].attrs.lineIn) {
 					newNode.children[outletIndex].attrs.lineIn = oldNode.children[i+3].attrs.lineIn;
 					newNode.attrs.numInputs++;
 					newNode.children[outletIndex].attrs.lineIn.attrs.outlet = newNode.children[outletIndex];
 					outletIndex++;
 				}
 			}
 			while (i < oldNode.children.length - OUTLET_OFFSET) {
 				if(oldNode.children[i+3].attrs.lineIn) {
 					removeLine(oldNode.children[i + 3].attrs.lineIn);
 				}
 				i++;
 			}
 		} 
 		else {
 			addOutlet(newNode);
 			var outletIndex = 3;
 			for (var i = 3; i < oldNode.children.length; i++) {
 				if (oldNode.children[i].attrs.lineIn) { 
 					newNode.children[outletIndex].attrs.lineIn = oldNode.children[i].attrs.lineIn;
 					newNode.attrs.numInputs++;
 					newNode.children[outletIndex].attrs.lineIn.attrs.outlet = newNode.children[outletIndex];
 					addOutlet(newNode);
 					outletIndex++;
 				}
 			} 
 		}
 		while (newNode.children.length - 3 < newNode.attrs.minInputs) {
 			addOutlet(newNode);
 		}
 		resetNode(oldNode); 
 	}
 	else if (newNode.attrs.name == 'constant') {
 		if (isRenderable(newNode)) {
 			for (var i = 3; i < 5; i++) {
 				newNode.children[i].setAttr('visible', false);
 				workLayer.draw();
 			}
 		}
 	}
 	assertRenderable(newNode);
 	updateForward(newNode);
 	lineLayer.draw();
 	workLayer.draw();
 };

/**
 * resetNode take a function or value group and returns it to it's original state.
 * - deletes all outlets
 * - resets height (if function)
 * - resets location of imagebox
 * - resets location of text
 * - sets numInputs to zero
 * - sets lineOut array to an empty array
 * returns nothing.
 */
 var resetNode = function(node) {
 	// set lineOut array to []
 	node.attrs.lineOut = [];
 	if (isFunction(node)) {
 		// destroy the outlets of the oldNode
 		for (var i = node.children.length - 1; i > 2; i--) {
 			node.children[i].destroy();
 		}
 		// reset height
 		node.children[0].setAttr('height', functionRectSideLength);
 		// reset location of text
 		node.children[1].setAttr('y', functionTotalSideLength/2 - functionHalfStrokeWidth);
 		// reset imagebox location
 		node.children[2].setAttr('y', functionRectSideLength + functionImageBoxOffset);
 		// set numInputs to zero
 		node.attrs.numInputs = 0;
 	}
 };

/**
 * wrapValueText takes a string and trucates after 4 characters and adds "..." to the end
 * used for constant values.
 */
var wrapValueText = function(text) {
	if (text.length > 4) {
		return text.substring(0,4) + "\n...";
	}
	else {
		return text;
	}
};


