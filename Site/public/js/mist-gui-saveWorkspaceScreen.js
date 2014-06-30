var popWsRectWidth = width * .4;
var popWsRectHeight = height * .2;
var popSaveWsGroupX = (width - popWsRectWidth) / 2;
var popSaveWsGroupY = (height - popWsRectHeight) / 2;



var saveWsGroup = new Kinetic.Group({
	x: popSaveWsGroupX,
	y: popSaveWsGroupY,
	visible: false
});
screenLayer.add(saveWsGroup);

var saveWsRect = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: popWsRectWidth,
	height: popWsRectHeight,
	fill: popRectColor,
	stroke: 'black',
	strokeWidth: 1
});
saveWsGroup.add(saveWsRect);

var nameWsText = new Kinetic.Text({
	text: "Name:",
	x: popTextShiftX,
	y: popTextShiftX,
	fill: 'black',
	fontSize: 16,
	fontFamily: globalFont,
});
saveWsGroup.add(nameWsText);

var nameWsRect = new Kinetic.Rect ({
	x: popTextShiftX + nameTextShift,
	y: popTextShiftX * .85,
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fill: 'white',
	stroke: 'black',
	strokeWidth: 1
});
saveWsGroup.add(nameWsRect);

var nameWsEditText = new Kinetic.Text({
	x: popTextShiftX + (nameTextShift * 1.1),
	y: popTextShiftX,
	text: 'Enter a Name',
	fontSize: 14,
	width: popCanvasSide - nameTextShift,
	height: popTextHeight / 1.5,
	fontFamily: globalFont,
	fill: 'black'
});
saveWsGroup.add(nameWsEditText);
nameWsEditText.setEditable(true);
nameWsEditText.matchingCharacters = /[a-zA-Z0-9]/;
nameWsEditText.defaultText = 'Enter a Name';
nameWsEditText.drawMethod = function(){
	screenLayer.draw()
};

var openSaveWsPopUp = function() {
	cover.setAttr('visible', true);
	saveWsGroup.setAttr('visible', true);
	screenLayer.draw();
};