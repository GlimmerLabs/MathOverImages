/* create the toolbox pallette in the workspace */
//var setupToolbox = function() {

  /*var toolboxWidth = width / 18; // 50
  var toolboxHeight = width / 5; // 180
  var toolboxXShift = toolboxWidth / 5; // 10
  var toolboxButtonSize = toolboxHeight / 6; // 30*/

  // add the entire group
  var toolboxGroup = new Kinetic.Group({
    x: width * .9,
    y: height * .2,
    draggable: false,
    dragBoundFunc: function(pos) {
      var newY = pos.y < (menuHeight + toolboxShift) ? menuHeight + toolboxShift : 
        pos.y > height - funBarHeight - toolboxHeight + toolboxShift ?
        height - funBarHeight - toolboxHeight + toolboxShift: pos.y;
      var newX = pos.x < 0 ? 0 : pos.x > (width - toolboxWidth) ? (width - toolboxWidth) : pos.x;
      return {
        x: newX,
        y: newY
      };
    }
  });
  toolboxLayer.add(toolboxGroup);

  // add the box to contain the entire group
  var toolboxRect = new Kinetic.Rect({
    x:0,
    y:0,
    width: toolboxWidth,
    height: toolboxHeight - toolboxShift,
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
  var toolboxControl = new Kinetic.Rect({
    x:0,
    y:-toolboxShift,
    width: toolboxWidth,
    height: toolboxShift,
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
  var workToolGroup = new Kinetic.Group({
    x: toolboxShift,
    y: toolboxShift,
    name: 'workTool'
  });
  toolboxGroup.add(workToolGroup);

  var workToolButton = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
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

  var workToolSymbol = new Kinetic.Shape({
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
    x: toolboxButtonSize / 3.3,
    y: toolboxButtonSize / 4.5,
    fill: 'black',
    stroke: 'black',
    scaleX: globalScale,
    scaleY: globalScale,
    strokeWidth: .5,
    lineJoin: 'round',
    rotation: -30,
  });
  workToolGroup.add(workToolSymbol);

  /* Transparent box that covers the button to ensure its function when clicked on */
  var workToolCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize
  });
  workToolGroup.add(workToolCover);

  // add the draw line tool group
  var lineToolGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 2) + toolboxButtonSize,
    name: 'lineTool'
  });
  toolboxGroup.add(lineToolGroup);

  // add the draw line tool button
  var lineToolButton = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
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
  var lineToolLine = new Kinetic.Line({
    points: [(toolboxButtonSize * (7/30)), (toolboxButtonSize * (7/30)), (toolboxButtonSize * (24/30)), (toolboxButtonSize * 24/30)],
    stroke: 'black',
    strokeWidth: 2,
    lineCap: 'round'
  });
  lineToolGroup.add(lineToolLine);

  /* Transparent box that covers the button to ensure its function when clicked on */
  var lineToolCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize
  });
  lineToolGroup.add(lineToolCover);

  // add the delete tool group
  var deleteToolGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 3) + (toolboxButtonSize * 2),
    name: 'deleteTool'
  });
  toolboxGroup.add(deleteToolGroup);

  // add the delete line tool button
  var deleteToolButton = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
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
  var deleteToolSym1 = new Kinetic.Rect({
    x: toolboxButtonSize * (7/30),
    y: toolboxButtonSize * (7/30),
    width: 0,
    height: .8 * toolboxButtonSize,
    stroke: deleteColor,
    fill: deleteColor,
    rotation: -45, 
    strokeWidth: 3
    //lineCap: 'round'
  });
  deleteToolGroup.add(deleteToolSym1);

  var deleteToolSym2 = new Kinetic.Rect({
    x: toolboxButtonSize * (24/30),
    y: toolboxButtonSize * (7/30),
    width: 0,
    height: .8 * toolboxButtonSize,
    strokeWidth: 3,
    stroke: deleteColor,
    fill: deleteColor,
    //scaleX: - 1,
    rotation: 45
  });
  deleteToolGroup.add(deleteToolSym2);

  /* Transparent box that covers the button to ensure its function when clicked on */
  var deleteToolCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize
  });
  deleteToolGroup.add(deleteToolCover);

  var undoRedoScale = .3;

  // add the undo tool button
  var undoGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 4) + (toolboxButtonSize * 3),
    name: 'undo'
  });
  toolboxGroup.add(undoGroup);

  var undoButton = new Kinetic.Shape({
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
    y: toolboxButtonSize - toolboxShift + 5,
    name: 'undo',
    scaleX: undoRedoScale*globalScale,
    scaleY: undoRedoScale*globalScale,
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

  var undoCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
    //stroke: 'black'
  });
  undoGroup.add(undoCover);

  var redoGroup = new Kinetic.Group({
    x: toolboxShift,
    y: (toolboxShift * 5) + (toolboxButtonSize * 4),
    name: 'redo'
  });
  toolboxGroup.add(redoGroup);

  var redoButton = new Kinetic.Shape({
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
    x: toolboxButtonSize,
    y: toolboxButtonSize - toolboxShift,
    name: 'redo',
    scaleX: -undoRedoScale*globalScale,
    scaleY: undoRedoScale*globalScale,
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

  var redoCover = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: toolboxButtonSize,
    height: toolboxButtonSize,
    //stroke: 'black'
  });
  redoGroup.add(redoCover);

  enableWorkTool();