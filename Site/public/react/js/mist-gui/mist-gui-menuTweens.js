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
	/* move valueGroups to the right */
	var shiftValueNodesRight = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var target = menuValues[i];
			var moveValue = makeMenuTween(target, target.x() + valSpaceWidth - valMenuXSpacing, true);
			moveValue.play();
		}
	};
	/* move valueGroups to the left */
	var shiftValueNodesLeft = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var target = menuValues[i];
			var moveValue = makeMenuTween(target, target.x() - valSpaceWidth + valMenuXSpacing, true);
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
	/* move functionGroups to the right */
	var shiftFunctionNodesRight = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var target = menuFunctions[i];
			var moveValue = makeMenuTween(target, target.x() + functSpaceWidth - functMenuXSpacing, true);
			moveValue.play();
		}
	};
	/* move functionGroups to the left */
	var shiftFunctionNodesLeft = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var target = menuFunctions[i];
			var moveValue = makeMenuTween(target, target.x() - functSpaceWidth + functMenuXSpacing, true);
			moveValue.play();
		}
	};