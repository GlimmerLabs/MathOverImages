var openWsGroup = new Kinetic.Group({
	x: popSaveWsGroupX,
	y: popSaveWsGroupY,
	visible: false
});
screenLayer.add(openWsGroup);

var openWsRect = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: popOpenWsRectWidth,
	height: popOpenWsRectHeight,
	fill: popRectColor,
	stroke: 'black',
	strokeWidth: 1
});
openWsGroup.add(openWsRect);

var nameOpenWsText = new Kinetic.Text({
	text: "Name:",
	x: popTextShiftX,
	y: popTextShiftX,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
});
openWsGroup.add(nameOpenWsText);

var nameOpenWsRect = new Kinetic.Rect ({
	x: popTextShiftX + nameTextShift,
	y: popTextShiftX * .85,
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fill: 'white',
	stroke: 'black',
	strokeWidth: 1
});
openWsGroup.add(nameOpenWsRect);

var nameOpenWsEditText = new Kinetic.Text({
	x: popTextShiftX + (nameTextShift * 1.1),
	y: popTextShiftX,
	text: 'Enter a Name',
	fontSize: 14,
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fontFamily: globalFont,
	fill: 'black'
});
openWsGroup.add(nameOpenWsEditText);
nameOpenWsEditText.setEditable(true);
nameOpenWsEditText.matchingCharacters = /[a-zA-Z0-9\-]/;
nameOpenWsEditText.defaultText = 'Enter a Name';
nameOpenWsEditText.drawMethod = function(){
	screenLayer.draw()
};

var popOpenWsCancelButtonGroup = new Kinetic.Group({
	x: (popOpenWsRectWidth / 2) + popOpenWsButtonShiftX,
	y: popOpenWsRectHeight - (popTextHeight * 1.25),
	name: 'cancel'
});
openWsGroup.add(popOpenWsCancelButtonGroup);

var popOpenWsCancelButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popOpenWsButtonWidth,
	height: popOpenWsButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
});
popOpenWsCancelButtonGroup.add(popOpenWsCancelButton);

var popOpenWsCancelButtonText = new Kinetic.Text({
	text: "Cancel",
	x: 0,
	y: (popOpenWsButtonHeight - 16) / 2,
	width: popOpenWsButtonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popOpenWsCancelButtonGroup.add(popOpenWsCancelButtonText);

var popOpenWsButtonGroup = new Kinetic.Group({
	x: (popOpenWsRectWidth / 2) + (2 * popOpenWsButtonShiftX) + popOpenWsButtonWidth,
	y: popOpenWsRectHeight - (popTextHeight * 1.25),
	name: 'save'
});
openWsGroup.add(popOpenWsButtonGroup);

var popOpenWsButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: popOpenWsButtonWidth,
	height: popOpenWsButtonHeight,
	fill: popButtonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
});
popOpenWsButtonGroup.add(popOpenWsButton);

var popOpenWsButtonText = new Kinetic.Text({
	text: "Open",
	x: 0,
	y: (popOpenWsButtonHeight - 16) / 2,
	width: popOpenWsButtonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
	align: 'center'
});
popOpenWsButtonGroup.add(popOpenWsButtonText);

popOpenWsCancelButtonGroup.on('mouseup', function(){
	cover.setAttr('visible', false);
	openWsGroup.setAttr('visible', false);
	showThumbnails();
	screenLayer.draw();
});

popOpenWsButtonGroup.on('mouseup', function(){
	var openText = nameOpenWsEditText.attrs.text;
	loadWorkspace(openText);
	currentWorkspace = openText;
	cover.setAttr('visible', false);
	openWsGroup.setAttr('visible', false);
	showThumbnails();
	screenLayer.draw();
});

var openOpenWsPopUp = function() {
	hideThumbnails();
	cover.setAttr('visible', true);
	openWsGroup.setAttr('visible', true);
	screenLayer.draw();
};