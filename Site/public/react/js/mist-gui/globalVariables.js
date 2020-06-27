/**
 * mistgui-globals.js
 *   Global variables for a MIST gui.  (Eventually, these should be fields
 *   within the object/prototype.)
 */
const size = {};
size.width = 900;
size.height = 2 * size.width / 3;
size.scale = size.width / 900;

const fonts = {
  default: 'Arial',
  function: 'Courier New',
  menuSize: size.width / 75,
  nodeSize: size.width / 56.25
};

const functionStyle = {
  strokeWidth: size.width / 90,
  totalSideLength: size.width / 20,
  color: '#3FAAA0',
  colorLight: '#C6F1ED',
  multColor: '#5EC783',
  singleColor: '#77C9E2',
  RGBcolor: '#AE88D6',
  imageBoxOffset: size.width / 300,
};
functionStyle.halfStrokeWidth = functionStyle.strokeWidth / 2;
functionStyle.rectSideLength = functionStyle.totalSideLength - functionStyle.strokeWidth;

const valueStyle = {
  sideLength: functionStyle.totalSideLength / 1.414,
  menuColor: '#F2937C',
  menuColorLight: '#FDE6DD',
  XYColor: '#EFDC5C',
  timeColor: '#FD9E54',
  mouseColor: '#E46868',
  constantColor: '#F17C9D',
};

const functions = {
  add:       {rep: 'sum',   max: 20, min: 2, prefix: 'sum', color: functionStyle.multColor},
  multiply:  {rep: 'mult',   max: 20, min: 2, prefix: 'mult', color: functionStyle.multColor},
  square:    {rep: 'sqr', max: 1, min: 1, prefix: 'square', color: functionStyle.singleColor},
  negate:    {rep: 'neg',   max: 1,  min: 1, prefix: 'neg', color: functionStyle.singleColor},
  sine:      {rep: 'sin', max: 1,  min: 1, prefix: 'sin', color: functionStyle.singleColor},
  cosine:    {rep: 'cos', max: 1,  min: 1, prefix: 'cos', color: functionStyle.singleColor},
  absolute:  {rep: 'abs', max: 1,  min: 1, prefix: 'abs', color: functionStyle.singleColor},
  average:   {rep: 'avg', max: 20, min: 2, prefix: 'avg', color: functionStyle.multColor},
  sign:      {rep: 'sign', max: 1,  min: 1, prefix: 'sign', color: functionStyle.singleColor},
  wrapsum:   {rep: 'wsum', max: 20,  min: 2, prefix: 'wsum', color: functionStyle.multColor},
  rgb:       {rep: 'rgb', max: 3,  min: 3, prefix: 'rgb', color: functionStyle.RGBcolor},
  mistif:    {rep: 'if', max: 3, min: 3, prefix: 'mistif', color: functionStyle.singleColor}
}

const values = {
  x:        {rep: 'x', color: valueStyle.XYColor},
  y:        {rep: 'y', color: valueStyle.XYColor},
  second:   {rep: 't.s', color: valueStyle.timeColor},
  minute:   {rep: 't.m', color: valueStyle.timeColor},
  hour:     {rep: 't.h', color: valueStyle.timeColor},
  day:      {rep: 't.d', color: valueStyle.timeColor},
  constant: {rep: '#', color: valueStyle.constantColor},
  mouseX:   {rep: 'm.x', color: valueStyle.mouseColor},
  mouseY:   {rep: 'm.y', color: valueStyle.mouseColor}
}

var imageBoxSideLength = size.width / 80;
var imageBoxColor = 'white';
var valueImageBoxOffset = size.width / 31;
var renderSideLength = size.width / 18;

const editableTextStyle = {
  width: size.width / 15,
  height: size.width / 30,
  font: size.width / 69,
}

const variableStyle = {
  color: {r: 197, g: 231, b: 109, a: .5},
  strokeColor: '#A1C447',
  radius: 1.4 * (functionStyle.totalSideLength / 2),
  textColor: '#62694F',
};
variableStyle.width = Math.cos(Math.PI/6) * variableStyle.radius;

const outletStyle = {
  xOffset: size.width / 400,
  yOffset: functionStyle.rectSideLength / 3,
  color:  '#C4C4C4',
  rgbColors: ['#C94949','#2D9C2D','#4272DB'],
};

const lineStrokeWidth = 2;

const dragShadowColor = 'black';
const selectedShadowColor = 'blue';

//SLIDING MENU
const menuStyle = {
  height: size.width / 9,
  cornerWidth: size.width / 6,
  buttonWidth: size.width / 10,
  numVals: 6, // Number of values that fit on a screen
  numFuncts: 6, // Number of functions that fit on a screen
  ySpacing: size.width * 11/360,
  animDuration: 1,

  //SCROLLING MENU BUTTONS
  arrowWidth: size.width / 50,
  arrowBoxFill: 'gray',
  arrowFill: 'black',
  triX: size.width / 90,
  triY: size.width / 60,
  
  //CORNER BUTTONS
  offset: 10,
  controlColor: '#7FA7E7',
  controlSelect: '#9EBDF0',
  controlTextColor: 'black',
}

menuStyle.valSpaceWidth = size.width - menuStyle.cornerWidth - (2 * menuStyle.buttonWidth);
menuStyle.valXSpacing = (menuStyle.valSpaceWidth - (menuStyle.numVals * functionStyle.totalSideLength - 4)) / (menuStyle.numVals + 1);

menuStyle.functSpaceWidth = size.width - menuStyle.cornerWidth - (2 * menuStyle.buttonWidth);
menuStyle.functXSpacing = (menuStyle.functSpaceWidth - (menuStyle.numFuncts * functionStyle.totalSideLength)) / (menuStyle.numFuncts + 1);

menuStyle.functsXStart = 2 * (menuStyle.buttonWidth - functionStyle.rectSideLength) + menuStyle.cornerWidth- functionStyle.totalSideLength / 2;
menuStyle.functsXEnd = size.width - menuStyle.buttonWidth + functionStyle.rectSideLength / 2;
menuStyle.valuesXStart = menuStyle.cornerWidth + menuStyle.buttonWidth / 2;

//CORNER BUTTONS
menuStyle.controlHeight = menuStyle.height / 5;
menuStyle.textOffset = menuStyle.controlHeight / 5;

//TOOLBOX
const toolboxStyle = {
  width: size.width / 18,
  height: size.width / 4.1,
  buttonSize: size.width / 30,
  deleteColor: '#A30F0F',
};
toolboxStyle.shift = toolboxStyle.width / 5; 

//FUNCTIONBAR
const funBarStyle = {
  width: size.width,
  height: size.height / 15,
  backgroundColor: menuStyle.controlColor,
  displayFontSize: size.width / 40.9,
  fontSize: size.width / 75,
  iconTextWidth: size.width / 18,
}
funBarStyle.offset = funBarStyle.height * .17;
funBarStyle.textAreaWidth = funBarStyle.width * .75;
funBarStyle.textAreaHeight = funBarStyle.height * .66;
funBarStyle.textOffset = funBarStyle.offset* 1.5;
funBarStyle.iconOffset = funBarStyle.width / 16;
funBarStyle.iconSideLength = funBarStyle.height / 4;
funBarStyle.iconTextY = funBarStyle.height - (funBarStyle.offset * 1.3);

//SAVE SCREEN
const saveStyle = {
  rectColor: '#e8e8e8',
  rectWidth: size.width * .4,
  rectHeight: size.height * .85,
}

saveStyle.saveGroupX = (size.width - saveStyle.rectWidth) / 2;
saveStyle.saveGroupY = (size.height - saveStyle.rectHeight) / 2;

saveStyle.canvasSide = saveStyle.rectWidth * 0.9;
saveStyle.canvasResolution = size.width * (3/9);
saveStyle.canvasShiftX = saveStyle.saveGroupX + (saveStyle.rectWidth - saveStyle.canvasSide) / 2;
saveStyle.canvasShiftY = saveStyle.saveGroupY + (saveStyle.rectWidth - saveStyle.canvasSide) / 2;

saveStyle.textShiftX = (saveStyle.rectWidth - saveStyle.canvasSide) / 2;
saveStyle.textShiftY = ((saveStyle.rectWidth - saveStyle.canvasSide) / 1.5) + saveStyle.canvasSide;
saveStyle.textWidth = saveStyle.canvasSide;
saveStyle.textFontSize = size.width / 56.25;
saveStyle.textHeight = 2 * saveStyle.textFontSize;

saveStyle.nameTextShift = size.width / 18;

saveStyle.buttonWidth = saveStyle.canvasSide / 3.4;
saveStyle.buttonHeight = saveStyle.textHeight / 1.25;
saveStyle.buttonShiftX = (saveStyle.canvasSide - (3 * saveStyle.buttonWidth)) / 2;
saveStyle.buttonColor = '#A0A3A3';
saveStyle.buttonSelectedColor = '#B6BABA'

saveStyle.errorColor = '#A11212';

// OPEN WS SCREEN
const openWsStyle = {
  rectWidth: size.width * .4,
  rectHeight: size.height * .16,
};
// TODO: These two variables don't appear to be used anywhere
openWsStyle.groupX = (size.width - openWsStyle.rectWidth) / 2;
openWsStyle.groupY = (size.height - openWsStyle.rectHeight) / 2;

openWsStyle.buttonShiftX = saveStyle.textShiftX;//((popWsRectWidth / 2) - (2 * popWsButtonWidth)) / 3;
openWsStyle.buttonWidth = ((openWsStyle.rectWidth / 2) - (3 * openWsStyle.buttonShiftX)) / 2;
openWsStyle.buttonHeight = openWsStyle.rectWidth * .06;

const state = {
  currentWorkspace: null,
  // TOOLBOX BOOLEANS
  lineToolOn: false,
  workToolOn: false,
  deleteToolOn: false,
  //MENU BOOLEANS
  menu: {
    valueExpanded: false,
    functionExpanded: false,
    tagsOn: true,
  },
  /* variables to globally reference the most recently used object/line and current state */
  currShape: null,
  currLine: null,
  dragShape: null,
  scaledObj: null,
  openTag: null,
  map: [],
  //OTHER BOOLEANS
  makingLine: false,
  animation: false,
};

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
 * 4. The menuArrowLayer holds the arrows for the scrolling menus. 
 * 4. The menuControlLayer contains the buttons to save/open/reset the workspace
 * 5. The toolboxLayer holds the draggable toolbox
 * 6. The work layer holds all active nodes that are either connected or available to
 *    be connected.
 * 7. The border layer stores static elements of the page such as dividing lines.
 * 8. The funBar layer contains the elements of the funBar at the bottom of the screen.
 * 9. The drag layer holds nodes while they are being moved about the workspace.
 * 10. The text layer hold the editabe text boxes for constant values and funtion text.
 * 11. The labelLayer contains informative labels that appear on mouseover
 * 12. The screenLayer contains pop-up windows for meta events
 * 13. The renderLayer contains the large rendered canvas when saving an image.
 */

const layers = {
  line: new Kinetic.Layer(),
  menu: new Kinetic.Layer(),
  menuButton: new Kinetic.Layer(),
  menuArrow: new Kinetic.Layer(),
  menuControl: new Kinetic.Layer(),
  toolbox: new Kinetic.Layer(),
  work: new Kinetic.Layer(),
  border: new Kinetic.Layer(),
  funBar: new Kinetic.Layer(),
  drag: new Kinetic.Layer(),
  text: new Kinetic.Layer(),
  label: new Kinetic.Layer(),
  screen: new Kinetic.Layer(),
  render: new Kinetic.Layer(),
};
