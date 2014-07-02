var width = 900;
var height = 2 * width / 3;
var globalFont = 'Arial';
var functionFont = 'Courier New';

var currentWorkspace;

var functionStrokeWidth = width / 90;
var functionHalfStrokeWidth = functionStrokeWidth / 2;
var functionTotalSideLength = width / 20;
var functionRectSideLength = functionTotalSideLength - functionStrokeWidth;
var functionColor = '#3FAAA0';
var functionColorLight = '#C6F1ED';
var functionMultColor = '#5EC783';
var functionSingleColor = '#77C9E2';
var functionRGBcolor = '#AE88D6';

var valueSideLength = functionTotalSideLength / 1.414;
var valueMenuColor = '#F2937C';
var valueMenuColorLight = '#FDE6DD';
var valueXYColor = '#EFDC5C';
var valueTimeColor = '#FD9E54';
var valueConstantColor = '#F17C9D';

var imageBoxSideLength = width / 80;
var imageBoxColor = 'white';
var functionImageBoxOffset = width / 300;
var valueImageBoxOffset = width / 31;
var renderSideLength = width / 18;

var editableTextWidth = width / 15;
var editableTextHeight = width / 30;
var editableTextFont = 13;

var variableColor = 'blue';

var outletXOffset = width / 255;
var outletYOffset = functionRectSideLength / 3;
var outletColor =  '#F2F2F2';

var lineStrokeWidth = 2;

var dragShadowColor = 'black';
var selectedShadowColor = 'blue';

//SLIDING MENU
var menuHeight = width / 9; 
var menuCornerWidth = width / 6;
var valMenuXSpacing = width / 32;
var functMenuXSpacing = width / 68;
var menuYspacing = width * 11/360;
var buttonWidth = width / 10;
var menuFunctsXStart = 2 * (buttonWidth - functionRectSideLength) + menuCornerWidth- functionTotalSideLength / 2;
var menuFunctsXEnd = width - buttonWidth + functionRectSideLength / 2;
var menuValuesXStart = menuCornerWidth + buttonWidth / 2;
var menuAnimDuration = 1;

//CORNER BUTTONS
var menuOffset = 10;
var menuControlHeight = menuHeight / 5;
var menuControlColor = '#7FA7E7';
var menuControlSelect = '#9EBDF0'; 
var menuControlTextColor = 'black';
var menuTextOffset = menuControlHeight / 5;

//TOOLBOX
var toolboxWidth = width / 18; 
var toolboxHeight = width / 4.1; 
var toolboxShift = toolboxWidth / 5; 
var toolboxButtonSize = width / 30;
var deleteColor = '#A30F0F'; 

//FUNCTIONBAR
var funBarWidth = width;
var funBarHeight = height / 15;
var funBarBackgroundColor = menuControlColor;
var funBarOffset = funBarHeight * .17;
var funBarTextAreaWidth = funBarWidth * .75;
var funBarTextAreaHeight = funBarHeight * .66;
var funBarTextOffset = funBarOffset* 1.5;
var funBarDisplayFontSize = 22; 
var funBarFontSize = 12;
var funBarIconOffset = funBarWidth / 16;
var funBarIconSideLength = funBarHeight / 4;
var funBarIconTextWidth = width / 18;
var funBarIconTextY = funBarHeight - (funBarOffset * 1.3);



var funNames = ['add', 'multiply', 'average', 'negate', 'sine', 'cosine', 'absolute', 'sign', 'rgb'];
var functions = {
	add:       {rep: 'sum',   max: 20, min: 2, prefix: 'sum', color: functionMultColor},
	multiply:  {rep: 'mult',   max: 20, min: 2, prefix: 'mult', color: functionMultColor},
	negate:    {rep: 'neg',   max: 1,  min: 1, prefix: 'neg', color: functionSingleColor},
	sine:      {rep: 'sin', max: 1,  min: 1, prefix: 'sin', color: functionSingleColor},
	cosine:    {rep: 'cos', max: 1,  min: 1, prefix: 'cos', color: functionSingleColor},
	absolute:  {rep: 'abs', max: 1,  min: 1, prefix: 'abs', color: functionSingleColor},
	average:   {rep: 'avg', max: 20, min: 2, prefix: 'avg', color: functionMultColor},
	sign:      {rep: 'sign',max: 1,  min: 1, prefix: 'sign', color: functionSingleColor},
	wrapsum:   {rep: 'wrap',max: 1,  min: 1, prefix: 'wsum', color: functionSingleColor},
	rgb:       {rep: 'rgb', max: 3,  min: 3, prefix: 'rgb', color: functionRGBcolor}
}
var valNames = ['x', 'y', 'second', 'minute', 'hour', 'day', 'constant'];
var values = {
	x:        {rep: 'x',   max: 20, min: 2, color: valueXYColor},
	y:        {rep: 'y',   max: 20, min: 2, color: valueXYColor},
	second:   {rep: 't.s', max: 1,  min: 1, color: valueTimeColor},
	minute:   {rep: 't.m', max: 1,  min: 1, color: valueTimeColor},
	hour:     {rep: 't.h', max: 1,  min: 1,	color: valueTimeColor},
	day:      {rep: 't.d', max: 1,  min: 1, color: valueTimeColor},
	constant: {rep: '#',    max: 20, min: 2, color: valueConstantColor}
}

// TOOLBOX BOOLEANS
 var lineToolOn = false;
 var workToolOn = false;
 var deleteToolOn = false;

//MENU BOOLEANS
var valueExpanded = false;
var functionExpanded = false;
var tagsOn = true;

/* variables to globally reference the most recently used object/line and current state */
var currShape;
var currLine;
var dragShape = null;
var scaledObj = null;
var openTag;

//OTHER BOOLEANS
var makingLine = false;
var animation = false;


// CONSTANTS

/** 
 * The offset in an operation node to the set of offsets.
 */
var OUTLET_OFFSET = 3;


/**
 * Layers of the workspace:
 * 1. The line layer holds connecting lines between nodes in the work area.
 * 2. The menu layer holds the buttons that users can click on to drag a new node into
 *    the work area.
 * 3. The menuButton layer holds the super buttons that are used to expand the menus.
 * 4. The toolboxLayer holds the draggable toolbox
 * 5. The work layer holds all active nodes that are either connected or available to
 *    be connected.
 * 6. The border layer stores static elements of the page such as dividing lines.
 * 7. The drag layer holds nodes while they are being moved about the workspace.
 * 8. The text layer hold the editabe text boxes for constant values and funtion text.
 */

 var lineLayer = new Kinetic.Layer();
 var menuLayer = new Kinetic.Layer();
 var menuButtonLayer = new Kinetic.Layer();
 var menuControlLayer = new Kinetic.Layer();
 var workLayer = new Kinetic.Layer();
 var borderLayer = new Kinetic.Layer();
 var funBarLayer = new Kinetic.Layer();
 var toolboxLayer = new Kinetic.Layer();
 var dragLayer = new Kinetic.Layer();
 var textLayer = new Kinetic.Layer();
 var labelLayer = new Kinetic.Layer();