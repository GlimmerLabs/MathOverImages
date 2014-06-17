var width = 900;
var height = 2 * width / 3;
var globalFont = 'Arial';

var functionStrokeWidth = width / 90;
var functionHalfStrokeWidth = functionStrokeWidth / 2;
var functionTotalSideLength = width / 20;
var functionRectSideLength = functionTotalSideLength - functionStrokeWidth;
var functionColor = '#508C37';

var valueSideLength = functionTotalSideLength / 1.414;
var valueXYColor = 'gray'
var valueTimeColor = 'gold'
var valueConstantColor = 'purple'

var imageBoxSideLength = width / 80;
var imageBoxColor = 'white'
var functionImageBoxOffset = width / 300;
var valueImageBoxOffset = width / 31;
var renderSideLength = width / 18;

var outletXOffset = width / 255;
var outletYOffset = functionRectSideLength / 3;
var outletColor =  '#FFC440';

var lineStrokeWidth = 2;

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
var menuControlColor = 'lightblue';
var menuControlTextColor = 'black';
var menuTextOffset = menuControlHeight / 5;

//TOOLBOX
var toolboxWidth = width / 18; 
var toolboxHeight = width / 4.1; 
var toolboxShift = toolboxWidth / 5; 
var toolboxButtonSize = width / 30;
var deleteColor = '#A30F0F'; 

//FUNCTIONBAR
var funBarWidth = width / 2.5;
var funBarHeight = height / 10;
var funBarBackgroundColor = 'lightblue';
var funBarOffset = funBarWidth / 36;
var funBarTextOffset = 2 * funBarOffset;
var funBarDisplayFontSize = 22; 
var funBarFontSize = 12;
var funBarSaveFunX = funBarWidth * .76;
var funBarSaveFunY = 1.5 * funBarOffset;
var funBarIconSideLength = funBarWidth / 15;
var funBarIconTextWidth = funBarIconSideLength + (2 * funBarOffset);
var funBarIconTextY = funBarHeight - (funBarOffset * 1.3);



var funNames = ['add', 'multiply', 'negate', 'sine', 'cosine', 'absolute', 'average', 'sign', 'rgb'];
var functions = {
	add: 			{rep: '+', 	 max: 20, min: 2, prefix: '', 		separator: '+'},
	multiply: {rep: '*', 	 max: 20, min: 2, prefix: '', 		separator: '*'},
	negate: 	{rep: '-', 	 max: 1,  min: 1, prefix: '-', 		separator: ' '},
	sine: 		{rep: 'sin', max: 1,  min: 1, prefix: 'sin', 	separator: ' '},
	cosine: 	{rep: 'cos', max: 1,  min: 1, prefix: 'cos', 	separator: ' '},
	absolute: {rep: 'abs', max: 1,  min: 1, prefix: 'abs', 	separator: ' '},
	average: 	{rep: 'ave', max: 20, min: 2, prefix: 'ave', 	separator: ','},
	sign: 		{rep: 'sign',max: 1,  min: 1, prefix: 'sign', separator: ' '},
	wrap: 		{rep: 'wrap',max: 1,  min: 1, prefix: 'wrap', separator: ' '},
	rgb: 			{rep: 'rgb', max: 3,  min: 3, prefix: 'rgb', 	separator: ','}
}
var valNames = ['x', 'y', 'second', 'minute', 'hour', 'day', 'constant'];
var values = {
	x: 				{rep: 'x', 	 max: 20, min: 2, color: valueXYColor},
	y: 				{rep: 'y', 	 max: 20, min: 2, color: valueXYColor},
	second: 	{rep: 't.s', max: 1,  min: 1, color: valueTimeColor},
	minute:		{rep: 't.m', max: 1,  min: 1, color: valueTimeColor},
	hour: 		{rep: 't.h', max: 1,  min: 1,	color: valueTimeColor},
	day: 			{rep: 't.d', max: 1,  min: 1, color: valueTimeColor},
	constant:	{rep: '', 	 max: 20, min: 2, color: valueConstantColor},
}

// TOOLBOX BOOLEANS
 var lineToolOn = false;
 var workToolOn = false;
 var deleteToolOn = false;

//MENU BOOLEANS
var valueExpanded = false;
var functionExpanded = false;

/* variables to globally reference the most recently used object/line and current state */
var currShape;
var currLine;

//OTHER BOOLEANS
var makingLine = false;
var animation = false;

// CONSTANTS

/** 
 * The offset in an operation node to the set of offsets.
 */
var OUTLET_OFFSET = 3;