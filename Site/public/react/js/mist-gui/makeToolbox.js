/* create the toolbox pallette in the workspace */
//var setupToolbox = function() {

/*var toolboxWidth = width / 18; // 50
  var toolboxHeight = width / 5; // 180
  var toolboxXShift = toolboxWidth / 5; // 10
  var toolboxButtonSize = toolboxHeight / 6; // 30*/

// add the entire group

import {size, toolboxStyle} from './styles.js';

const toolboxGroup = new Kinetic.Group({
  x: size.width * .9,
  y: size.height * .2,
  draggable: false,
  dragBoundFunc: function(pos) {
    var newY = pos.y < (menuStyle.height + toolboxStyle.shift) ? menuStyle.height + toolboxStyle.shift : 
      pos.y > size.height - funBarStyle.height - toolboxStyle.height + toolboxStyle.shift ?
      size.height - funBarStyle.height - toolboxStyle.height + toolboxStyle.shift: pos.y;
    var newX = pos.x < 0 ? 0 : pos.x > (size.width - toolboxStyle.width) ? (size.width - toolboxStyle.width) : pos.x;
    return {
      x: newX,
      y: newY
    };
  }
});

// add the box to contain the entire group
const toolboxRect = new Kinetic.Rect({
  x:0,
  y:0,
  width: toolboxStyle.width,
  height: toolboxStyle.height - toolboxStyle.shift,
  fill: 'white',
  stroke: 'black',
  strokeWidth: .5,
  //lineJoin: 'round',
  shadowColor: 'black',
  shadowBlur: 0,
  shadowOffsetX: -1,
  shadowOffsetY: 1,
  shadowOpacity: .5
});
toolboxGroup.add(toolboxRect);

// add the mini bos above the main box for dragging
const toolboxControl = new Kinetic.Rect({
  x:0,
  y:-toolboxStyle.shift,
  width: toolboxStyle.width,
  height: toolboxStyle.shift,
  name: 'toolControl',
  fill: 'grey',
  stroke: 'black',
  strokeWidth: .5,
  //lineJoin: 'round',
  shadowColor: 'black',
  shadowBlur: 0,
  shadowOffsetX: -1,
  shadowOffsetY: 1,
  shadowOpacity: .5
});
toolboxGroup.add(toolboxControl);

//add the work tool
const workToolGroup = new Kinetic.Group({
  x: toolboxStyle.shift,
  y: toolboxStyle.shift,
  name: 'workTool'
});
toolboxGroup.add(workToolGroup);

const workToolButton = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize,
  name: 'draw',
  fill: 'white',
  stroke: 'black',
  strokeWidth: .3,
  lineJoin: 'round',
  shadowColor: 'black',
  shadowOffsetX: -2,
  shadowOffsetY: 2,
  shadowOpacity: .5,
  shadowEnabled: false,
  working: false
});
workToolGroup.add(workToolButton);

const workToolSymbol = new Kinetic.Shape({
  sceneFunc: function(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(5, 12);
    context.lineTo(1, 12);
    context.lineTo(1, 18);
    context.lineTo(-1, 18);
    context.lineTo(-1, 12);
    context.lineTo(-5, 12);
    context.closePath();
    context.fillStrokeShape(this);
  },
  x: toolboxStyle.buttonSize / 3.3,
  y: toolboxStyle.buttonSize / 4.5,
  fill: 'black',
  stroke: 'black',
  scaleX: size.scale,
  scaleY: size.scale,
  strokeWidth: .5,
  lineJoin: 'round',
  rotation: -30,
});
workToolGroup.add(workToolSymbol);

/* Transparent box that covers the button to ensure its function when clicked on */
const workToolCover = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize
});
workToolGroup.add(workToolCover);

// add the draw line tool group
const lineToolGroup = new Kinetic.Group({
  x: toolboxStyle.shift,
  y: (toolboxStyle.shift * 2) + toolboxStyle.buttonSize,
  name: 'lineTool'
});
toolboxGroup.add(lineToolGroup);

// add the draw line tool button
const lineToolButton = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize,
  name: 'draw',
  fill: 'white',
  stroke: 'black',
  strokeWidth: .3,
  lineJoin: 'round',
  shadowColor: 'black',
  shadowOffsetX: -2,
  shadowOffsetY: 2,
  shadowOpacity: .5,
  shadowEnabled: false,
  working: false
});
lineToolGroup.add(lineToolButton);

// add the draw line symbol on the button
const lineToolLine = new Kinetic.Line({
  points: [(toolboxStyle.buttonSize * (7/30)), (toolboxStyle.buttonSize * (7/30)), (toolboxStyle.buttonSize * (24/30)), (toolboxStyle.buttonSize * 24/30)],
  stroke: 'black',
  strokeWidth: 2,
  lineCap: 'round'
});
lineToolGroup.add(lineToolLine);

/* Transparent box that covers the button to ensure its function when clicked on */
const lineToolCover = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize
});
lineToolGroup.add(lineToolCover);

// add the delete tool group
const deleteToolGroup = new Kinetic.Group({
  x: toolboxStyle.shift,
  y: (toolboxStyle.shift * 3) + (toolboxStyle.buttonSize * 2),
  name: 'deleteTool'
});
toolboxGroup.add(deleteToolGroup);

// add the delete line tool button
const deleteToolButton = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize,
  name: 'delete',
  fill: 'white',
  stroke: 'black',
  strokeWidth: .3,
  lineJoin: 'round',
  shadowColor: 'black',
  shadowOffsetX: -2,
  shadowOffsetY: 2,
  shadowOpacity: .5,
  shadowEnabled: false,
  working: false
});
deleteToolGroup.add(deleteToolButton);

// add the delete symbol on the button
const deleteToolSym1 = new Kinetic.Rect({
  x: toolboxStyle.buttonSize * (7/30),
  y: toolboxStyle.buttonSize * (7/30),
  width: 0,
  height: .8 * toolboxStyle.buttonSize,
  stroke: toolboxStyle.deleteColor,
  fill: toolboxStyle.deleteColor,
  rotation: -45, 
  strokeWidth: 3
  //lineCap: 'round'
});
deleteToolGroup.add(deleteToolSym1);

const deleteToolSym2 = new Kinetic.Rect({
  x: toolboxStyle.buttonSize * (24/30),
  y: toolboxStyle.buttonSize * (7/30),
  width: 0,
  height: .8 * toolboxStyle.buttonSize,
  strokeWidth: 3,
  stroke: toolboxStyle.deleteColor,
  fill: toolboxStyle.deleteColor,
  //scaleX: - 1,
  rotation: 45
});
deleteToolGroup.add(deleteToolSym2);

/* Transparent box that covers the button to ensure its function when clicked on */
const deleteToolCover = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize
});
deleteToolGroup.add(deleteToolCover);

const undoRedoScale = .3;

// add the undo tool button
const undoGroup = new Kinetic.Group({
  x: toolboxStyle.shift,
  y: (toolboxStyle.shift * 4) + (toolboxStyle.buttonSize * 3),
  name: 'undo'
});
toolboxGroup.add(undoGroup);

const undoButton = new Kinetic.Shape({
  sceneFunc: function(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(35, 30);
    context.lineTo(35, 12);
    context.bezierCurveTo(60, 5, 100, 15, 80, 70);
    context.bezierCurveTo(110, 10, 80, -12, 35, -12);
    context.lineTo(35, -30);            
    context.closePath();
    context.fillStrokeShape(this);
  },
  x: 0,
  y: toolboxStyle.buttonSize - toolboxStyle.shift + 5,
  name: 'undo',
  scaleX: undoRedoScale * size.scale,
  scaleY: undoRedoScale * size.scale,
  fill: '#E3E3E3',
  stroke: 'black',
  strokeWidth: 1,
  lineJoin: 'round',
  rotation: -40,
  shadowColor: 'black',
  shadowOffsetX: -2,
  shadowOffsetY: 2,
  shadowOpacity: .5,
  shadowEnabled: false
});
undoGroup.add(undoButton);

const undoCover = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize,
  //stroke: 'black'
});
undoGroup.add(undoCover);

const redoGroup = new Kinetic.Group({
  x: toolboxStyle.shift,
  y: (toolboxStyle.shift * 5) + (toolboxStyle.buttonSize * 4),
  name: 'redo'
});
toolboxGroup.add(redoGroup);

const redoButton = new Kinetic.Shape({
  sceneFunc: function(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(35, 30);
    context.lineTo(35, 12);
    context.bezierCurveTo(60, 5, 100, 15, 80, 70);
    context.bezierCurveTo(110, 10, 80, -12, 35, -12);
    context.lineTo(35, -30);            
    context.closePath();
    context.fillStrokeShape(this);
  },
  x: toolboxStyle.buttonSize,
  y: toolboxStyle.buttonSize - toolboxStyle.shift,
  name: 'redo',
  scaleX: -undoRedoScale * size.scale,
  scaleY: undoRedoScale * size.scale,
  fill: '#E3E3E3',
  stroke: 'black',
  strokeWidth: 1,
  lineJoin: 'round',
  rotation: 40,
  shadowColor: 'black',
  shadowOffsetX: -2,
  shadowOffsetY: 2,
  shadowOpacity: .5,
  shadowEnabled: false
});
redoGroup.add(redoButton);

const redoCover = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: toolboxStyle.buttonSize,
  height: toolboxStyle.buttonSize,
  //stroke: 'black'
});
redoGroup.add(redoCover);

export {
  deleteToolButton,
  deleteToolCover,
  deleteToolGroup,
  deleteToolSym1,
  deleteToolSym2,
  lineToolButton,
  lineToolCover,
  lineToolGroup,
  lineToolLine,
  redoButton,
  redoCover,
  redoGroup,
  toolboxControl,
  toolboxGroup,
  toolboxRect,
  undoButton,
  undoCover,
  undoGroup,
  undoRedoScale,
  workToolButton,
  workToolCover,
  workToolGroup,
  workToolSymbol
};
