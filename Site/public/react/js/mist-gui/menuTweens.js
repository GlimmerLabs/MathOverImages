// Create functions to Move Menu Items
	/* move the valueGroups in the menu to their original location. */
	var moveValueNodesIn = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var moveValue = makeMenuTween(menuValues[i], menuStyle.valuesXStart, false);
			moveValue.play();
		}
	};
	/* move the valueGroups to their expanded location. */
	var expandValueNodes = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var moveValue = makeMenuTween(menuValues[i], menuStyle.cornerWidth + menuStyle.buttonWidth + menuStyle.valXSpacing + i * (menuStyle.valXSpacing + functionStyle.totalSideLength), true);
			moveValue.play();
		}
	};
	/* move valueGroups to the right */
	var shiftValueNodesRight = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var target = menuValues[i];
			var moveValue = makeMenuTween(target, target.x() + menuStyle.valSpaceWidth - menuStyle.valXSpacing, true);
			moveValue.play();
		}
	};
	/* move valueGroups to the left */
	var shiftValueNodesLeft = function() {
		for (var i = 0; i < menuValues.length; i++) {
			var target = menuValues[i];
			var moveValue = makeMenuTween(target, target.x() - menuStyle.valSpaceWidth + menuStyle.valXSpacing, true);
			moveValue.play();
		}
	};
	/* move the functionGroups to their original position. */
	var moveFunctionNodesIn = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuStyle.functsXStart, false);
			moveFunction.play();
		}
	};
	/* move the functionGroups to the right of the screen. (For when values are expanded).*/
	var moveFunctionNodesRight = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuStyle.functsXEnd, false);
			moveFunction.play();
		}
	};
	/* move the functionGroups to their expanded position. */
	var expandFunctionNodes = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var moveFunction = makeMenuTween(menuFunctions[i], menuStyle.cornerWidth + 2 * menuStyle.buttonWidth + menuStyle.functXSpacing + i * (menuStyle.functXSpacing + functionStyle.totalSideLength), true)
			moveFunction.play();
		}
	};
	/* move the functionsButton to the right of the screen (for when values are expanded). */
	var moveFunctionsButtonRight = function() {
		var moveButton = makeMenuTween(functionsButton, size.width - menuStyle.buttonWidth, true)
		moveButton.play();
	};
	/* move the functionsButon to it's original position. */
	var moveFunctionsButtonLeft = function() {
		var moveButton = makeMenuTween(functionsButton, menuStyle.cornerWidth + menuStyle.buttonWidth, true)
		moveButton.play();
	};
	/* move functionGroups to the right */
	var shiftFunctionNodesRight = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var target = menuFunctions[i];
			var moveValue = makeMenuTween(target, target.x() + menuStyle.functSpaceWidth - menuStyle.functXSpacing, true);
			moveValue.play();
		}
	};
	/* move functionGroups to the left */
	var shiftFunctionNodesLeft = function() {
		for (var i = 0; i < menuFunctions.length; i++) {
			var target = menuFunctions[i];
			var moveValue = makeMenuTween(target, target.x() - menuStyle.functSpaceWidth + menuStyle.functXSpacing, true);
			moveValue.play();
		}
	};
