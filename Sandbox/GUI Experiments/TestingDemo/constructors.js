// CONSTRUCTORS

/*
	Function nodes and Value nodes are groups of objects. Members of groups can
	be accessed through the array 'group'.children[].
	Children are stored in the following order:
	0. Underlying Shape
	1. Text
	2. render box
	3+. Outlet nodes (only for functions)
	*/


/* 
	makeFunctionGroup takes a string funName, a key in the functions object above,
	an integer x, and an integer y, and returns the corresponding function node object,
	with top right corner at the given x, y coordinate.
	*/
	var makeFunctionGroup = function(funName, x, y) {
		/* create group that will contain information on the function and the shapes making up the representation on screen. */
		var newGroup = new Kinetic.Group({
			name: funName,
			x: x - functionHalfStrokeWidth,
			y: y,
			numInputs: 0, 
			maxInputs: functions[funName].max, 
			minInputs: functions[funName].min, 
			lineOut: [], 
			prefix: functions[funName].prefix, 
			separator: functions[funName].separator,
			renderFunction: null,
			visible: false,
			renderLayer: null
		});
		/* create rectangle shape */
		var newRect = new Kinetic.Rect({
			name: funName,
			x: functionHalfStrokeWidth,
			y: functionHalfStrokeWidth,
			width: functionRectSideLength,
			height: functionRectSideLength,
			fill: functionColor,
			lineJoin: 'round',
			stroke: functionColor,
			strokeWidth: functionStrokeWidth
		});
		newGroup.add(newRect);
		/* create text to be displayed on top of rectangle */
		var newText = new Kinetic.Text({
			text: functions[funName].rep,
			fontFamily: globalFont,
			fill: 'black',
			fontSize: 16,
			x: 0,
			y: functionTotalSideLength/2 - functionHalfStrokeWidth,
			width: functionTotalSideLength,
			align: 'center'
		});
		newGroup.add(newText);
		/* create small box in the bottom right corner. Originally is not visible.*/
		var newBox = new Kinetic.Rect({
			name: 'imageBox',
			x: functionRectSideLength + functionImageBoxOffset,
			y: functionRectSideLength + functionImageBoxOffset,
			width: imageBoxSideLength,
			height: imageBoxSideLength,
			fill: imageBoxColor,
			stroke: 'black',
			strokeWidth: .5,
			visible: false,
			expanded: false
		});
		newGroup.add(newBox);

		return newGroup;
	};


/*
	makeValueGroup takes a string valName, the name of a key in the values object above,
	an integer x, and an integer y, and returns the corresponding function node object,
	centered at (x + width / 40, y + width / 40).
	*/
	var makeValueGroup = function(valName, x, y) {
		/* create group that contains information on the value and shapes to be displayed. */
		var newGroup = new Kinetic.Group({
			name: valName,
			x: x,
			y: y,
			lineOut: [],
			visible: false,
			renderFunction: values[valName].rep,
			renderLayer: null
		});
		/* create diamond shape. */
		var newRect = new Kinetic.Rect({
			x: functionRectSideLength/2,
			y: 0,
			width: valueSideLength,
			height: valueSideLength,
			fill: values[valName].color,
			rotation: 45,
			name: valName
		});
		newGroup.add(newRect);
		/* create text to be displayed on diamond. */
		var newText = new Kinetic.Text({
			text: values[valName].rep,
			fontFamily: 'OpenSans',
			fill: 'black',
			fontSize: 16,
			x: 0,
			y: valueSideLength/2,
			width: functionRectSideLength,
			align: 'center'
		});
		newGroup.add(newText);
		/* create small box in bottom right corner. Originally not visible. */
		var newBox = new Kinetic.Rect({
			name: 'imageBox',
			x: valueImageBoxOffset,
			y: valueImageBoxOffset,
			width: imageBoxSideLength,
			height: imageBoxSideLength,
			fill: imageBoxColor,
			stroke: 'black',
			strokeWidth: .5,
			visible: false,
			expanded: false
		});
		newGroup.add(newBox);

		return newGroup;
	};

/*
	makeOutlet takes a function node object, functGroup, and returns an outlet node object 
	to be added to that group.
	It DOES NOT add the outlet to the group.
	*/
	var makeOutlet = function(functGroup) {
		var bezPoint = width / 50;
		var outlet = new Kinetic.Shape({
			sceneFunc: function(context) {
				context.beginPath();
				context.moveTo(0, 0);
				context.bezierCurveTo(-bezPoint, -bezPoint, -bezPoint, bezPoint, 0, 0);
				context.closePath();
				context.fillStrokeShape(this);
			},
			name: 'outlet' + (functGroup.children.length - 3),
			x:functGroup.children[0].x() + outletXOffset,
			y:functGroup.children[0].y() + (functGroup.children.length - 3) * outletYOffset + functionHalfStrokeWidth,
			fill: '#FFC440',
			stroke: 'black',
			strokeWidth: 1,
			lineIn: null,
			outletIndex: functGroup.children.length - 3
		});
		return outlet;
	};
/*
	makeLine takes either a functionGroup object or valueGroup object as input (source) and creates a line that begins at the left edge of source. 
	*/
	var makeLine = function(source) {
		var newLine = new Kinetic.Line({
			points: [
			source.x() + functionRectSideLength - 3,
			source.y() + functionTotalSideLength / 2,
			source.x() + functionTotalSideLength,
			source.y() + functionTotalSideLength / 2,
			],
			stroke: 'black',
			strokeWidth: lineStrokeWidth,
			source: source,
			sourceIndex: source.attrs.lineOut.length,
			outlet: null,

		});
		return newLine;
	}
/*
makeMenuTween takes a node (target), an integer (xEnd), and a boolean (visibility). It returns a kinetic tween that will move target to xEnd, without changing y value; and with the visibility to the specified boolean values.*/
var makeMenuTween = function(target, xEnd, visibility) {
	return new Kinetic.Tween({
		node: target,
		duration: menuAnimDuration,
		x: xEnd,
		visible: visibility,
		easing: Kinetic.Easings.StrongEaseOut
	});
};

/**
 * addLine adds a line between source and sink, connecting to sink via the outletIndex-th outlet
 * @pre
 *   sink.children[outletIndex + 3] is an unused outlet
 */
 var addLine = function(source, sink, outletIndex) {
 	var line = makeLine(source);
 	var outlet = sink.children[outletIndex + 3];
 	source.attrs.lineOut[source.attrs.lineOut.length] = line;
 	outlet.attrs.lineIn = line;
 	line.attrs.outlet = outlet;
 	assertRenderable(sink);
 	if (sink.attrs.numInputs == sink.children.length - 3 &&
 		sink.attrs.numInputs < sink.attrs.maxInputs) {
 		addOutlet(sink);
 }
 updateForward(sink);
 lineLayer.add(line);
 workLayer.draw();
 lineLayer.draw();
};
/**
 * addOp adds a function object to the workLayer at x, y, with the corresponding attributes given 
 * by the funName key.
 */
var addOp = function(funName, x, y) {
  var op = makeFunctionGroup(funName, x, y);
  workLayer.add(op);
  workLayer.draw();
};
/**
 * addVal adds a value object to the workLayer at x, y, with the corresponding attributes given 
 * by the valName key.
 */
var addVal = function(valName, x, y) {
  var val = makeValueGroup(valName, x, y);
  workLayer.add(val);
  workLayer.draw();
};

var createEditableText = function (group) {
	var backgroundBox = new Kinetic.Rect({
		x: -4,
		y: functionTotalSideLength + 5,
		width: functionTotalSideLength,
		height: 20,
		fill: 'white',
		stroke: 'black',
		strokeWidth: .5
	});
	var editableTextBox = new Kinetic.Text({
		x: -4,
		y: functionTotalSideLength + 5,
		text: 'Enter a Value',
		fontSize: 10,
		width: functionTotalSideLength,
		height: 20,
		align: "center",
		fontFamily: 'Open Sans',
		fill: 'black'
	});
	group.add(backgroundBox);
	group.add(editableTextBox);
	editableTextBox.setEditable(true);
	editableTextBox.aligned = "center";
	editableTextBox.defaultText = 'Enter a Value';
	editableTextBox.drawMethod = function(){
		workLayer.draw()
	};
};