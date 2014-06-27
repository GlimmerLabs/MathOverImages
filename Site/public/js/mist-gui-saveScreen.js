/**
* The save screen is what appears when a user want to save or download an images they create.
*/
var screenLayer = new Kinetic.Layer();
stage.add(screenLayer);

var popRectColor = '#E8E8E8'
var popRectWidth = width * .45;
var popRectHeight = height * .85;
var popSaveGroupX = (width - popRectWidth) / 2;
var popSaveGroupY = (height - popRectHeight) / 2;

var popCanvasSide = Math.round(popRectWidth * 0.9);
var popCanvasShiftX = popSaveGroupX + (popRectWidth - popCanvasSide) / 2;
var popCanvasShiftY = popSaveGroupY + (popRectWidth - popCanvasSide) / 2;


var cover = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: width,
	height: height,
	fill: 'black',
	opacity: .6,
	visible: true
});
screenLayer.add(cover);

var popSaveGroup = new Kinetic.Group({
	x: popSaveGroupX, 
	y: popSaveGroupY,
	visible: true
});
screenLayer.add(popSaveGroup);

var popSaveRect = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popRectWidth,
	height: popRectHeight,
	fill: popRectColor,
	stroke: 'black',
	strokeWidth: 1
});
popSaveGroup.add(popSaveRect);

var renderPopCanvas = function (renderFunction) {
	var currLayer = new Kinetic.Layer();
	stage.add(currLayer);
	currLayer.draw();
	canvas = currLayer.canvas._canvas;
	var mistObj = MIST.parse(renderFunction);
	MIST.render(mistObj, {}, canvas, popCanvasSide, popCanvasSide, 
		popCanvasShiftX, popCanvasShiftY, 
		popCanvasSide, popCanvasSide);	
};



screenLayer.draw();

