/**
* The save screen is what appears when a user want to save or download an images they create.
*/

var popRectColor = '#e8e8e8'
var popRectWidth = width * .4;
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

var nameTextShift = width / 18;

var popButtonWidth = popCanvasSide / 3.4;
var popButtonHeight = popTextHeight / 1.25;
var popButtonShiftX = (popCanvasSide - (3 * popButtonWidth)) / 2;
var popButtonColor = '#A0A3A3';
var popButtonSelectedColor = '#B6BABA'

var errorColor = '#A11212';


var cover = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: width,
	height: height,
	fill: 'black',
	opacity: .6,
	visible: false
});
screenLayer.add(cover);

var popSaveGroup = new Kinetic.Group({
	x: popSaveGroupX, 
	y: popSaveGroupY,
	visible: false
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
nameEditText.matchingCharacters = /[a-zA-Z0-9 \-]/;
nameEditText.defaultText = 'Enter a Name';
nameEditText.drawMethod = function(){
	screenLayer.draw()
};

var popErrorText = new Kinetic.Text({
	x: popTextShiftX,
	y: popTextShiftY + (popTextHeight * 2.5),
	text: '',
	width: popRectWidth - (2*popTextShiftX),
	fontFamily: globalFont,
	fontSize: 14,
	fill: errorColor,
});
popSaveGroup.add(popErrorText);

var popSaveButtonGroup = new Kinetic.Group({
	x: popTextShiftX,
	y: popRectHeight - (popTextHeight * 1.25),
	name: 'save'
});
popSaveGroup.add(popSaveButtonGroup);

var popSaveButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popButtonWidth,
	height: popButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
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
	name: 'download'
});
popSaveGroup.add(popDownloadButtonGroup);

var popDownloadButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popButtonWidth,
	height: popButtonHeight,
	fill: popButtonColor,
	stroke: 'grey', //'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
});
popDownloadButtonGroup.add(popDownloadButton);

var popDownloadButtonText = new Kinetic.Text({
	text: "Download",
	x: 0,
	y: (popButtonHeight - 16) / 2,
	width: popButtonWidth,
	fill: 'grey',//'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popDownloadButtonGroup.add(popDownloadButtonText);

var popCancelButtonGroup = new Kinetic.Group({
	x: popTextShiftX + (2 * popButtonShiftX) + (2 * popButtonWidth),
	y: popRectHeight - (popTextHeight * 1.25),
	name: 'cancel'
});
popSaveGroup.add(popCancelButtonGroup);

var popCancelButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popButtonWidth,
	height: popButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
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

var rCanvas = renderLayer.canvas._canvas;


var renderPopCanvas = function (renderFunction) {
	var mistObj = MIST.parse(renderFunction);
	MIST.render(mistObj, {}, rCanvas, 200, 200, 
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

screenLayer.on('mouseover', function(evt) {
	var group = evt.target.parent;
	if (group.attrs.name && group.attrs.name != 'download') {
		group.children[0].setAttr('fill', popButtonSelectedColor);
		screenLayer.draw();
	}
});

screenLayer.on('mouseout', function(evt) {
var group = evt.target.parent;
if (group.attrs.name) {
	group.children[0].setAttrs({
		fill: popButtonColor,
		shadowEnabled: false
	});
  	screenLayer.draw();
}
});

screenLayer.on('mousedown', function(evt) {
var group = evt.target.parent;
if (group.attrs.name && group.attrs.name != 'download') {
	group.children[0].setAttr('shadowEnabled', true);
  	screenLayer.draw();
}
});

screenLayer.on('mouseup', function(evt) {
	var group = evt.target.parent;
	var name = group.attrs.name
	if (name) {
		group.children[0].setAttr('shadowEnabled', false);
		screenLayer.draw();
	}
});

popCancelButtonGroup.on('mouseup', function(){
	cover.setAttr('visible', false);
	popSaveGroup.setAttr('visible', false);
	animation = false;
	showThumbnails();
	setTimeout(function(){
		renderLayer.draw();
	}, 50);
	screenLayer.draw();
});

popSaveButtonGroup.on('mouseup', function(){
	var newName = nameEditText.attrs.text;
	newName = removeOuterWhiteSpace(newName);
	if (newName == '' || newName == 'Enter a Name') {
		popErrorText.setAttr('text', 'Please enter a name for your image.');
	}
	else {
		var renderFunction = currShape.attrs.renderFunction;
		saveImage(newName, renderFunction, true, true, true);
		cover.setAttr('visible', false);
		popSaveGroup.setAttr('visible', false);
		showThumbnails();
		animation = false;
		setTimeout(function(){
			renderLayer.draw();
		}, 50);
	}
	screenLayer.draw();
});

/**
 * openSavePopUp sets the cover and popSaveGroup to visible and begin animation.
 */
var openSavePopUp = function() {
	hideThumbnails();
	cover.setAttr('visible', true);
	popSaveGroup.setAttr('visible', true);
	var renderFunction = currShape.attrs.renderFunction;
	updatePopText(renderFunction);
	animation = true;
	screenLayer.draw();
	var frame = function() {
		renderPopCanvas(renderFunction);
		if (animation) {
			setTimeout(frame, 50);
		}
	}
	frame();
};

// go through all the nodes on the workLayer and draw their renderLayer
var hideThumbnails = function() {
	var nodes = workLayer.children;
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if (node.children[2].attrs.expanded) {
			node.attrs.renderLayer.draw();
		}
	}
};

// go through all the nodes on the workLayer and, if they're expanded, render their canvas
var showThumbnails = function() {
	var nodes = workLayer.children;
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if (node.children[2].attrs.expanded) {
			renderCanvas(node);
		}
	}
};

/**
 * removeOuterWhiteSpace takes a string and removes white space at the beginning and end
 * of the string, but not the white space in the middle of the string.
 * returns a string
 */
 var removeOuterWhiteSpace = function (string) {
 	var start = 0;
	var end = string.length - 1;
	while (start < string.length && string[start] == ' ') {
		start++;
	}
	while (string[end] == ' ' && end >= start) {
		end--;
	}
	return string.substring(start, end+1);
 };


