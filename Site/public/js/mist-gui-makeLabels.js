/**
 * getInfoText takes a string (key), looks up the information for that key in 
 * MIST.builtins.functions and returns a string to be used in the label for that key.
 */
var getInfoText = function(key) {
	var info = MIST.builtins.functions.get(key);
	return key + '(' + info.params + ')\n\n' + info.about;
};

var menuFunctionDescriptions = {}

var funKeys = MIST.builtins.functions.keys();
for(var i = 0; i < funKeys.length; i++) {
	var key = funKeys[i];
	menuFunctionDescriptions[key] = getInfoText(key);
}

var menuValuesDescriptions = {
	x:        'ranges -1 to 1 based on the x-value',
	y:        'ranges -1 to 1 based on the y-value',
	second:   'goes through values -1 to 1 every second',
	minute:   'goes through values -1 to 1 every minute',
	hour:     'goes through values -1 to 1 every hour',
	day:      'goes through values -1 to 1 every day',
	constant: 'enter your own number',
	mouseX:   'takes the x-value of the position of the mouse on the image',
	mouseY:   'takes the y-value of the position of the mouse on the image'
}

var toolboxDescriptions = {
	workTool: 'select and move objects (w)',
	lineTool: 'create connections from values and functions to functions (c)',
	deleteTool: 'delete lines, values, and functions from workspace (d)',
	undo: 'undo',
	redo: 'redo'
};

var tagColor = 'white';
var pointerWidth = width / 90;
var pointerHeight = width / 104;
var triRadius = width / 156;


var makeLabel = function(group) {
	var xOffset = 0;
	var rep = group.attrs.rep;
	var text = menuFunctionDescriptions[rep];
	if (rep == 'rgb') {
		var label = new Kinetic.Group({
			x: group.x(),
			y: group.y()
		});

		var rgbText = new Kinetic.Text({
			text: text,
			x: -110,
			y: pointerHeight + (1.1 * functionTotalSideLength),
			padding: 5,
			width: 160,
			fill: 'black'
		});

		label.add(new Kinetic.Rect({
			x: rgbText.x(),
			y: rgbText.y(),
			width: rgbText.width(),
			height: rgbText.height(),
			fill: tagColor,
			lineJoin: 'round',
			shadowColor: 'black',
			shadowOffset: [5, 5],
		}));

		/*
		label.add(new Kinetic.RegularPolygon({
			x: (functionTotalSideLength / 2),
			y: (1.2 * functionTotalSideLength),
			sides: 3,
			radius: 7,
			fill: tagColor,
			stroke: 'black',
			strokeWidth: .3,
			lineJoin: 'round',
		}));
*/

		label.add(rgbText);
	}
	else {
		if (isValue(group)){
			xOffset = -4;
			text = menuValuesDescriptions[group.name()];
		}
		var label = new Kinetic.Label ({
			x: group.x() + (functionTotalSideLength / 2) + xOffset,
			y: group.y() + (1.1 * functionTotalSideLength),
		});

		label.add(new Kinetic.Tag({
			fill: tagColor,
			pointerDirection: 'up',
			pointerWidth: pointerWidth,
			pointerHeight: pointerHeight,
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
		if (label.children[1].width() > 160) {
			label.children[1].destroy();
			label.add(new Kinetic.Text({
				text: text,
				width: 160,
				fontFamily: globalFont,
				fontSize: 13,
				padding: 5,
				fill: 'black'
			}));
		}
	}
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
		pointerWidth: pointerWidth,
		pointerHeight: pointerHeight,
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
		var newText = 'redo ' + action + ' (ctrl-y)'; 
		label.children[1].setAttr('text', newText)
	}
	else if (name == 'undo') {
		var actionObj = actionArray[currIndex - 1];
		var action = actionObj.action;
		var newText = 'undo ' + action + ' (ctrl-z)';
		label.children[1].setAttr('text', newText)
	}

	return label;
};
