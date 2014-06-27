/**
* The save screen is what appears when a user want to save or download an images they create.
*/
var screenLayer = new Kinetic.Layer();
stage.add(screenLayer);

var popRectColor = '#e8e8e8'
var popRectWidth = width * .45;
var popRectHeight = height * .85;
var popSaveGroupX = (width - popRectWidth) / 2;
var popSaveGroupY = (height - popRectHeight) / 2;

var popCanvasSide = popRectWidth * 0.9;
var popCanvasShiftX = popSaveGroupX + (popRectWidth - popCanvasSide) / 2;
var popCanvasShiftY = popSaveGroupY + (popRectWidth - popCanvasSide) / 2;

var popTextShiftX = (popRectWidth - popCanvasSide) / 2;
var popTextShiftY = ((popRectWidth - popCanvasSide) / 1.5) + popCanvasSide;
var popTextWidth = popCanvasSide;
var popTextFontSize = 16;
var popTextHeight = 2 * popTextFontSize;

var nameTextShift = 50;

var popButtonWidth = popCanvasSide / 3.4;
var popButtonHeight = popTextHeight / 1.25;
var popButtonShiftX = (popCanvasSide - (3 * popButtonWidth)) / 2;
var popButtonColor = '#A0A3A3';


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

var renderPopText = new Kinetic.Text({
	text: "",
	x: popTextShiftX,
	y: popTextShiftY,
	width: popTextWidth,
	height: popTextHeight,
	fill: 'black',
	fontSize: popTextFontSize,
	fontFamily: functionFont,
	align: 'center'
});
popSaveGroup.add(renderPopText);

var nameText = new Kinetic.Text({
	text: "Name:",
	x: popTextShiftX,
	y: popTextShiftY + (popTextHeight * 1.4),
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
});
popSaveGroup.add(nameText);

var nameRect = new Kinetic.Rect ({
	x: popTextShiftX + nameTextShift,
	y: popTextShiftY + (popTextHeight * 1.3),
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fill: 'white',
	stroke: 'black',
	strokeWidth: 1
});
popSaveGroup.add(nameRect);

var nameEditText = new Kinetic.Text({
	x: popTextShiftX + (nameTextShift * 1.1),
	y: popTextShiftY + (popTextHeight * 1.4),
	text: 'Enter a Name',
	fontSize: 14,
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fontFamily: globalFont,
	fill: 'black'
});
popSaveGroup.add(nameEditText);
nameEditText.setEditable(true);
nameEditText.matchingCharacters = /[a-zA-Z0-9]/;
nameEditText.defaultText = 'Enter a Name';
nameEditText.drawMethod = function(){
	screenLayer.draw()
};


var popSaveButtonGroup = new Kinetic.Group({
	x: popTextShiftX,
	y: popRectHeight - (popTextHeight * 1.25)
});
popSaveGroup.add(popSaveButtonGroup);

var popSaveButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popButtonWidth,
	height: popButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1
});
popSaveButtonGroup.add(popSaveButton);

var popSaveButtonText = new Kinetic.Text({
	text: "Save",
	x: 0,
	y: (popButtonHeight - 16) / 2,
	width: popButtonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popSaveButtonGroup.add(popSaveButtonText);

var popDownloadButtonGroup = new Kinetic.Group({
	x: popTextShiftX + popButtonShiftX + popButtonWidth,
	y: popRectHeight - (popTextHeight * 1.25),
});
popSaveGroup.add(popDownloadButtonGroup);

var popDownloadButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popButtonWidth,
	height: popButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1
});
popDownloadButtonGroup.add(popDownloadButton);

var popDownloadButtonText = new Kinetic.Text({
	text: "Download",
	x: 0,
	y: (popButtonHeight - 16) / 2,
	width: popButtonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popDownloadButtonGroup.add(popDownloadButtonText);

var popCancelButtonGroup = new Kinetic.Group({
	x: popTextShiftX + (2 * popButtonShiftX) + (2 * popButtonWidth),
	y: popRectHeight - (popTextHeight * 1.25),
});
popSaveGroup.add(popCancelButtonGroup);

var popCancelButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popButtonWidth,
	height: popButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1
});
popCancelButtonGroup.add(popCancelButton);

var popCancelButtonText = new Kinetic.Text({
	text: "Cancel",
	x: 0,
	y: (popButtonHeight - 16) / 2,
	width: popButtonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popCancelButtonGroup.add(popCancelButtonText);

var renderLayer = new Kinetic.Layer();
stage.add(renderLayer);
var renderCanvas = renderLayer.canvas._canvas;


var renderPopCanvas = function (renderFunction) {
	var mistObj = MIST.parse(renderFunction);
	MIST.render(mistObj, {}, renderCanvas, 200, 200, 
		popCanvasShiftX, popCanvasShiftY, 
		popCanvasSide, popCanvasSide);	
};

var updatePopText = function(renderFunction) {
	if (renderFunction.length > 74) {
		text = renderFunction.substring(0, 71) + "...";
	}
	else {
		text = renderFunction
	}
	renderPopText.setAttr('text', text);
};
updatePopText("rgb(sum(x,y), x, y)");


screenLayer.draw();

