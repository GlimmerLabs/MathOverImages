var menuDescriptions = {
	add:      'add values together\n  minumum of 2 inputs \n  maximum of 20.',
	multiply: 'multiply values together\n  minumum of 2 inputs \n  maximum of 20.',
	negate:   'negate a value\n  maximum of 1 input',
	sine:     'take the sine of a value\n  maximum of 1 input',
	cosine:   'take the cosine of a value\n  maximum of 1 input',
	absolute: 'take the absolute value of\n a value\n  maximum of 1 input',
	average:  'take the average of values\n  minumum of 2 inputs \n  maximum of 20.',
	sign:     'return -1 or 1 based on the\n sign of the value\n  maximum of 1 input',
	wrapsum:  'minumum of 2 inputs \n  maximum of 20.',
	rgb:      '3 inputs (R,G,B)\n  - R is the red value\n  - G is the green value\n  - B is the blue value',
	x:        'ranges -1 to 1 based on the x-value',
	y:        'ranges -1 to 1 based on the y-value',
	second:   'goes through values -1 to 1\n every second',
	minute:   'goes through values -1 to 1\n every minute',
	hour:     'goes through values -1 to 1\n every hour',
	day:      'goes through values -1 to 1\n every day',
	constant: 'enter your own number',
}

var toolboxDescriptions = {
	workTool: 'select and move objects',
	lineTool: 'create connections from values and functions to functions',
	deleteTool: 'delete lines, values, and functions from workspace',
	undo: 'undo',
	redo: 'redo'
};

var tagColor = 'white';
var pointerSize = width / 90;



var makeLabel = function(group) {
	var xOffset = 0;
	if (isValue(group)){
		xOffset = -4;
	}
	var name = group.name();
	var text = menuDescriptions[name];
	var label = new Kinetic.Label ({
		x: group.x() + (functionTotalSideLength / 2) + xOffset,
		y: group.y() + (1.1 * functionTotalSideLength)
	});

	label.add(new Kinetic.Tag({
		fill: tagColor,
		pointerDirection: 'up',
		pointerWidth: pointerSize,
		pointerHeight: pointerSize,
		lineJoin: 'round',
		shadowColor: 'black',
		shadowOffset: [5, 5],
	}));

	label.add(new Kinetic.Text({
		text: text,
		fontFamily: globalFont,
		fontSize: 13,
		padding: 5,
		fill: 'black'
	}));
	return label;
};

var makeToolLabel = function(group) {
	var xToolbox = toolboxGroup.x();
	var yToolbox = toolboxGroup.y();
	var name = group.name();
	var text = toolboxDescriptions[name];
	var tagX = xToolbox + group.x() + (1.1 * toolboxButtonSize);
	var direction = 'left'
	if (xToolbox > (width / 2)) {
		tagX = xToolbox + group.x() - (0.1 * toolboxButtonSize);
		direction = 'right'
	}
	var label = new Kinetic.Label ({
		x: tagX,
		y: yToolbox + group.y() + (toolboxButtonSize / 2),
	});

	label.add(new Kinetic.Tag({
		fill: tagColor,
		pointerDirection: direction,
		pointerWidth: pointerSize,
		pointerHeight: pointerSize,
		lineJoin: 'round',
		shadowColor: 'black',
		shadowOffset: [5, 5],
	}));

	label.add(new Kinetic.Text({
		text: text,
		fontFamily: globalFont,
		fontSize: 13,
		padding: 5,
		fill: 'black'
	}));
	if (name == 'redo') {
		var actionObj = actionArray[currIndex];
		var action = actionObj.action;
		var newText = 'redo ' + action; 
		label.children[1].setAttr('text', newText)
	}
	else if (name == 'undo') {
		var actionObj = actionArray[currIndex - 1];
		var action = actionObj.action;
		var newText = 'undo ' + action;
		label.children[1].setAttr('text', newText)
	}

	return label;
};
