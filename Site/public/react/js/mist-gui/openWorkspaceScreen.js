import {openWsStyle, saveStyle} from './styles.js';

const openWsGroup = new Kinetic.Group({
	x: saveStyle.groupX,
	y: saveStyle.groupY,
	visible: false
});

const openWsRect = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: openWsStyle.rectWidth,
	height: openWsStyle.rectHeight,
	fill: saveStyle.rectColor,
	stroke: 'black',
	strokeWidth: 1
});
openWsGroup.add(openWsRect);

const nameOpenWsText = new Kinetic.Text({
	text: "Name:",
	x: saveStyle.textShiftX,
	y: saveStyle.textShiftX,
	fill: 'black',
	fontSize: 16,
	fontFamily: fonts.default,
});
openWsGroup.add(nameOpenWsText);

const nameOpenWsRect = new Kinetic.Rect ({
	x: saveStyle.textShiftX + saveStyle.nameTextShift,
	y: saveStyle.textShiftX * .85,
	width: saveStyle.canvasSide - saveStyle.nameTextShift,
	height: saveStyle.textHeight / 1.5,
	fill: 'white',
	stroke: 'black',
	strokeWidth: 1
});
openWsGroup.add(nameOpenWsRect);

const nameOpenWsEditText = new Kinetic.Text({
	x: saveStyle.textShiftX + (saveStyle.nameTextShift * 1.1),
	y: saveStyle.textShiftX,
	text: 'Enter a Name',
	fontSize: 14,
	width: saveStyle.canvasSide - saveStyle.nameTextShift,
	height: saveStyle.textHeight / 1.5,
	fontFamily: fonts.default,
	fill: 'black'
});
openWsGroup.add(nameOpenWsEditText);
nameOpenWsEditText.setEditable(true);
nameOpenWsEditText.matchingCharacters = /[a-zA-Z0-9\-]/;
nameOpenWsEditText.defaultText = 'Enter a Name';

const popOpenWsCancelButtonGroup = new Kinetic.Group({
	x: (openWsStyle.rectWidth / 2) + openWsStyle.buttonShiftX,
	y: openWsStyle.rectHeight - (saveStyle.textHeight * 1.25),
	name: 'cancel'
});
openWsGroup.add(popOpenWsCancelButtonGroup);

const popOpenWsCancelButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: openWsStyle.buttonWidth,
	height: openWsStyle.buttonHeight,
	fill: saveStyle.buttonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
});
popOpenWsCancelButtonGroup.add(popOpenWsCancelButton);

const popOpenWsCancelButtonText = new Kinetic.Text({
	text: "Cancel",
	x: 0,
	y: (openWsStyle.buttonHeight - 16) / 2,
	width: openWsStyle.buttonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: fonts.default,
	align: 'center'
});
popOpenWsCancelButtonGroup.add(popOpenWsCancelButtonText);

const popOpenWsButtonGroup = new Kinetic.Group({
	x: (openWsStyle.rectWidth / 2) + (2 * openWsStyle.buttonShiftX) + openWsStyle.buttonWidth,
	y: openWsStyle.rectHeight - (saveStyle.textHeight * 1.25),
	name: 'save'
});
openWsGroup.add(popOpenWsButtonGroup);

const popOpenWsButton = new Kinetic.Rect ({
	x: 0,
	y: 0,
	width: openWsStyle.buttonWidth,
	height: openWsStyle.buttonHeight,
	fill: saveStyle.buttonColor,
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowEnabled: false
});
popOpenWsButtonGroup.add(popOpenWsButton);

const popOpenWsButtonText = new Kinetic.Text({
	text: "Open",
	x: 0,
	y: (openWsStyle.buttonHeight - 16) / 2,
	width: openWsStyle.buttonWidth,
	fill: 'black',
	fontSize: 16,
	fontFamily: fonts.default,
	align: 'center'
});
popOpenWsButtonGroup.add(popOpenWsButtonText);

function create_listeners(cover, hideThumbnails, screenLayer, showThumbnails, state) {
  popOpenWsCancelButtonGroup.on('mouseup', function(){
    cover.setAttr('visible', false);
    openWsGroup.setAttr('visible', false);
    showThumbnails();
    layers.screen.draw();
  });

  popOpenWsButtonGroup.on('mouseup', function(){
    var openText = nameOpenWsEditText.attrs.text;
    loadWorkspace(openText);
    state.currentWorkspace = openText;
    cover.setAttr('visible', false);
    openWsGroup.setAttr('visible', false);
    showThumbnails();
    layers.screen.draw();
  });

  // TODO: it doesn't appear that this is used anywhere
  function openOpenWsPopUp() {
    hideThumbnails();
    cover.setAttr('visible', true);
    openWsGroup.setAttr('visible', true);
    layers.screen.draw();
  };
}

export {
  create_listeners as createOpenWsListeners,
  nameOpenWsEditText,
  nameOpenWsRect,
  nameOpenWsText,
  openWsGroup,
  openWsRect,
  popOpenWsButton,
  popOpenWsButtonGroup,
  popOpenWsButtonText,
  popOpenWsCancelButton,
  popOpenWsCancelButtonGroup,
  popOpenWsCancelButtonText
}
