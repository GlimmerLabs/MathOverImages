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
    /* create group that will contain information on the function and the shapes 
      making up the representation on screen. */
    var newGroup = new Kinetic.Group({
      name: funName,
      x: x - functionHalfStrokeWidth,
      y: y,
      numInputs: 0, 
      maxInputs: functions[funName].max, 
      minInputs: functions[funName].min, 
      lineOut: [], 
      rep: functions[funName].rep,
      prefix: functions[funName].prefix, 
      separator: functions[funName].separator,
      renderFunction: null,
      visible: false,
      renderLayer: null,
      scaleX: 1,
      scaleY: 1
    });
    /* create rectangle shape */
    var newRect = new Kinetic.Rect({
      name: funName,
      x: functionHalfStrokeWidth,
      y: functionHalfStrokeWidth,
      width: functionRectSideLength,
      height: functionRectSideLength,
      fill: functions[funName].color,
      lineJoin: 'round',
      stroke: functions[funName].color,
      strokeWidth: functionStrokeWidth
    });
    newGroup.add(newRect);
    /* create text to be displayed on top of rectangle */
    var newText = new Kinetic.Text({
      text: functions[funName].rep,
      fontFamily: globalFont,
      fill: 'black',
      fontSize: nodeFontSize,
      x: 0,
      y: functionTotalSideLength/2 - functionHalfStrokeWidth,
      width: functionTotalSideLength,
      align: 'center'
    });
    newGroup.add(newText);
    /* create small box in the bottom right corner. Initially, it is not visible.*/
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
      rep: values[valName].rep,
      renderLayer: null,
      scaleX: 1,
      scaleY: 1
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
      fontFamily: globalFont,
      fill: 'black',
      fontSize: nodeFontSize,
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
  makeVariableGroup an integer x, and an integer y, and returns a variable node
  that can be used as a temporary input, and exported as an empty outlet for a function

  var hex = makeVariableGroup(500, 500);
  hex.setAttr('visible', true);
  workLayer.add(hex);
  workLayer.add(hex);
  */
  var makeVariableGroup = function(x, y) {
    /* initialize group for the variable */
    var newGroup = new Kinetic.Group({
      name: 'variable',
      x: x,
      y: y,
      lineOut: [],
      visible: false,
    });
    /* create circle shape. */
    var newHex = new Kinetic.RegularPolygon({
      sides: 6,
      x: variableWidth,
      y: variableRadius,
      radius: variableRadius,
      fillRed: variableColor['r'],
      fillGreen: variableColor['g'],
      fillBlue: variableColor['b'],
      fillAlpha: variableColor['a'],
      stroke: variableStrokeColor,
      strokeWidth: 2,
      name: 'variableHex'
    });
    newGroup.add(newHex);
    /* create text to be displayed below hex. */
    var newText = new Kinetic.Text({
      text: "",
      fontFamily: globalFont,
      fill: variableTextColor,
      fontSize: 16,
      x: 0,
      y: (-.5 * variableRadius),
      width: 2 * variableWidth,
      align: 'center'
    });
    newGroup.add(newText);

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
      name: 'outlet' + (functGroup.children.length - OUTLET_OFFSET),
      x:functGroup.children[0].x() + outletXOffset,
      y:functGroup.children[0].y() + (functGroup.children.length - OUTLET_OFFSET) * 
        outletYOffset + functionHalfStrokeWidth,
      fill: outletColor,
      opacity: 1,
      stroke: 'black',
      strokeWidth: 1,
      lineIn: null,
      outletIndex: functGroup.children.length - OUTLET_OFFSET
    });
    return outlet;
  };
/*
  makeLine takes either a functionGroup object or valueGroup object as input
  (source) and creates a line that begins at the left edge of source. 
  */
  var makeLine = function(source) {
    var yOffset;
    if (isFunction(source)) {
      yOffset = (source.children[0].height() + functionStrokeWidth) / 2;
    }
    else {
      yOffset = functionTotalSideLength / 2;
    }
    //console.log(yOffset);
    var newLine = new Kinetic.Line({
      points: [
      source.x() + functionRectSideLength - 3,
      source.y() + yOffset,
      source.x() + functionTotalSideLength,
      source.y() + yOffset,
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
makeMenuTween takes a node (target), an integer (xEnd), and a boolean (visibility).
It returns a kinetic tween that will move target to xEnd, without changing y value,
and with the visibility to the specified boolean values.
*/
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
  if (outletIndex == undefined) {
    throw "addLine requires an outlet index";
  }
  var line = makeLine(source);
  while (!sink.children[outletIndex + OUTLET_OFFSET]) {
    addOutlet(sink);
  } // If there aren't enough outlets add a new one
  var outlet = sink.children[outletIndex + OUTLET_OFFSET];
  source.attrs.lineOut[source.attrs.lineOut.length] = line;
  outlet.attrs.lineIn = line;
  line.attrs.outlet = outlet;
  line.points()[2] = sink.x();
  line.points()[3] = sink.y() + sink.children[outletIndex + OUTLET_OFFSET].y();
  assertRenderable(sink);
  sink.attrs.numInputs++;
  if (sink.attrs.numInputs == sink.children.length - OUTLET_OFFSET &&
       sink.attrs.numInputs < sink.attrs.maxInputs) {
    addOutlet(sink);
  } // if it's an appropriate number
  updateForward(sink);
  line.setAttr("visible",true);
  lineLayer.add(line);
  insertToTable(line);
  workLayer.draw();
  lineLayer.draw();
  dragLayer.draw();
};

/**
 * addOp adds a function object to the workLayer at x, y, with the corresponding attributes given 
 * by the funName key.
 */
var addOp = function(funName, x, y) {
  var op = makeFunctionGroup(funName, x + functionHalfStrokeWidth, y);
  op.setAttr("visible",true);
  addOutlet(op);
  addOutlet(op);
  if (funName == "rgb") {
    addOutlet(op);
  }
  applyDragBounds(op);
  workLayer.add(op);
  insertToTable(op);
  workLayer.draw();
  return op;
};
/**
 * addVal adds a value object to the workLayer at x, y, with the corresponding attributes given 
 * by the valName key.
 */
var addVal = function(valName, x, y) {
  if (valName.substring(0, 8) == 'constant') {
    var constant = valName.substring(8);
    var val = makeValueGroup('constant', x, y);
    if (constant) {
      val.setAttr('rep', constant);

      val.children[1].setAttrs({text: wrapValueText(constant), fontSize: 13});
    } // if valName is concatenated with a value
  } // if valName is a constant
  else {
    var val = makeValueGroup(valName, x, y);
  }
  assertRenderable(val);
  val.setAttr("visible",true);
  applyDragBounds(val);
  workLayer.add(val);
  insertToTable(val);
  workLayer.draw();
  return val;
};

var createEditableText = function (group) { 
  var backgroundBox = new Kinetic.Rect({
    x: -((editableTextWidth - functionTotalSideLength) / 2) - 4,
    y: functionTotalSideLength + 5,
    width: editableTextWidth,
    height: editableTextHeight,
    fill: 'white',
    stroke: 'black',
    strokeWidth: .5
  });
  var editableTextBox = new Kinetic.Text({
    x: -((editableTextWidth - functionTotalSideLength) / 2) -4,
    y: functionTotalSideLength + 5,
    text: 'Enter a Value',
    fontSize: editableTextFont,
    width: editableTextWidth,
    height: editableTextHeight,
    align: "center",
    fontFamily: functionFont,
    fill: 'black'
  });
  group.add(backgroundBox);
  group.add(editableTextBox);
  editableTextBox.setEditable(true);
  editableTextBox.aligned = "center";
  editableTextBox.matchingCharacters = /^-?[0-9]*\.?[0-9]*$/;
  editableTextBox.defaultText = 'Enter a Value';
  editableTextBox.drawMethod = function(){
    workLayer.draw()
  };
};

