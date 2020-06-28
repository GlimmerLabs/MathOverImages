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

const imageBoxStyle = {
  sideLength: size.width / 80,
  boxColor: 'white',
  valueOffset: size.width / 31,
  renderSideLength: size.width / 18,
};

const editableTextStyle = {
  width: size.width / 15,
  height: size.width / 30,
  font: size.width / 69,
};

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
export {
  dragShadowColor,
  editableTextStyle,
  fonts,
  funBarStyle,
  functionStyle,
  imageBoxStyle,
  lineStrokeWidth,
  menuStyle,
  openWsStyle,
  outletStyle,
  saveStyle,
  selectedShadowColor,
  size,
  toolboxStyle,
  valueStyle,
  variableStyle,
};
