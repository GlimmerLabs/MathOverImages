import {fonts, saveStyle, size, wsStyle} from './styles.js';

export default function init(
  cover,
  saveWorkspace,
  screenLayer,
  state,
  wsExists
) {
  const saveWsGroup = new Kinetic.Group({
    x: saveStyle.groupX,
    y: saveStyle.groupY,
    visible: false
  });
  screenLayer.add(saveWsGroup);

  const saveWsRect = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: wsStyle.rectWidth,
    height: wsStyle.rectHeight,
    fill: saveStyle.rectColor,
    stroke: 'black',
    strokeWidth: 1
  });
  saveWsGroup.add(saveWsRect);

  const nameWsText = new Kinetic.Text({
    text: "Name:",
    x: saveStyle.textShiftX,
    y: saveStyle.textShiftX,
    fill: 'black',
    fontSize: 16,
    fontFamily: fonts.default,
  });
  saveWsGroup.add(nameWsText);

  const nameWsRect = new Kinetic.Rect ({
    x: saveStyle.textShiftX + saveStyle.nameTextShift,
    y: saveStyle.textShiftX * .85,
    width: saveStyle.canvasSide - saveStyle.nameTextShift,
    height: saveStyle.textHeight / 1.5,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1
  });
  saveWsGroup.add(nameWsRect);

  const nameWsEditText = new Kinetic.Text({
    x: saveStyle.textShiftX + (saveStyle.nameTextShift * 1.1),
    y: saveStyle.textShiftX,
    text: 'Enter a Name',
    fontSize: 14,
    width: saveStyle.canvasSide - saveStyle.nameTextShift,
    height: saveStyle.textHeight / 1.5,
    fontFamily: fonts.default,
    fill: 'black'
  });
  saveWsGroup.add(nameWsEditText);
  nameWsEditText.setEditable(true);
  nameWsEditText.matchingCharacters = /[a-zA-Z0-9\-]/;
  nameWsEditText.defaultText = 'Enter a Name';
  nameWsEditText.drawMethod = function() {
    screenLayer.draw()
  };

  const popWsErrorText = new Kinetic.Text({
    text: '',
    x: saveStyle.textShiftX,
    y: nameWsText.height() + (2 * saveStyle.textShiftX),
    width: wsStyle.rectWidth - (2 * saveStyle.textShiftX),
    fill: saveStyle.errorColor,
    fontFamily: fonts.default,
    fontSize: 14
  });
  saveWsGroup.add(popWsErrorText);

  const popWsCancelButtonGroup = new Kinetic.Group({
    x: (wsStyle.rectWidth / 2) + wsStyle.buttonShiftX,
    y: wsStyle.rectHeight - (saveStyle.textHeight * 1.25),
    name: 'cancel'
  });
  saveWsGroup.add(popWsCancelButtonGroup);

  const popWsCancelButton = new Kinetic.Rect ({
    x: 0,
    y: 0,
    width: wsStyle.buttonWidth,
    height: wsStyle.buttonHeight,
    fill: saveStyle.buttonColor,
    stroke: 'black',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowEnabled: false
  });
  popWsCancelButtonGroup.add(popWsCancelButton);

  const popWsCancelButtonText = new Kinetic.Text({
    text: "Cancel",
    x: 0,
    y: (wsStyle.buttonHeight - 16) / 2,
    width: wsStyle.buttonWidth,
    fill: 'black',
    fontSize: 16,
    fontFamily: fonts.default,
    align: 'center'
  });
  popWsCancelButtonGroup.add(popWsCancelButtonText);

  const popSaveWsButtonGroup = new Kinetic.Group({
    x: (wsStyle.rectWidth / 2) + (2 * wsStyle.buttonShiftX) + wsStyle.buttonWidth,
    y: wsStyle.rectHeight - (saveStyle.textHeight * 1.25),
    name: 'save'
  });
  saveWsGroup.add(popSaveWsButtonGroup);

  const popSaveWsButton = new Kinetic.Rect ({
    x: 0,
    y: 0,
    width: wsStyle.buttonWidth,
    height: wsStyle.buttonHeight,
    fill: saveStyle.buttonColor,
    stroke: 'black',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowEnabled: false
  });
  popSaveWsButtonGroup.add(popSaveWsButton);

  const popSaveWsButtonText = new Kinetic.Text({
    text: "Save",
    x: 0,
    y: (wsStyle.buttonHeight - 16) / 2,
    width: wsStyle.buttonWidth,
    fill: 'black',
    fontSize: 16,
    fontFamily: fonts.default,
    align: 'center'
  });
  popSaveWsButtonGroup.add(popSaveWsButtonText);

  const popWsYesButtonGroup = new Kinetic.Group ({
    x: (wsStyle.rectWidth / 2) + wsStyle.buttonShiftX,
    y: wsStyle.rectHeight - (saveStyle.textHeight * 1.25),
    name: 'yes',
    visible: false
  });
  saveWsGroup.add(popWsYesButtonGroup);

  popWsYesButtonGroup.add(new Kinetic.Rect ({
    x: 0,
    y: 0,
    width: wsStyle.buttonWidth,
    height: wsStyle.buttonHeight,
    fill: saveStyle.buttonColor,
    stroke: 'black',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowEnabled: false
  }));

  popWsYesButtonGroup.add(new Kinetic.Text({
    text: "Yes",
    x: 0,
    y: (wsStyle.buttonHeight - 16) / 2,
    width: wsStyle.buttonWidth,
    fill: 'black',
    fontSize: 16,
    fontFamily: fonts.default,
    align: 'center'
  }));

  const popWsNoButtonGroup = new Kinetic.Group ({
    x: (wsStyle.rectWidth / 2) + (2 * wsStyle.buttonShiftX) + wsStyle.buttonWidth,
    y: wsStyle.rectHeight - (saveStyle.textHeight * 1.25),
    name: 'yes',
    visible: false
  });
  saveWsGroup.add(popWsNoButtonGroup);

  popWsNoButtonGroup.add(new Kinetic.Rect ({
    x: 0,
    y: 0,
    width: wsStyle.buttonWidth,
    height: wsStyle.buttonHeight,
    fill: saveStyle.buttonColor,
    stroke: 'black',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowEnabled: false
  }));

  popWsNoButtonGroup.add(new Kinetic.Text({
    text: "No",
    x: 0,
    y: (wsStyle.buttonHeight - 16) / 2,
    width: wsStyle.buttonWidth,
    fill: 'black',
    fontSize: 16,
    fontFamily: fonts.default,
    align: 'center'
  }));

  let attempts = 0;
  popSaveWsButtonGroup.on('mouseup', function() {
    let newName = nameWsEditText.attrs.text;
    let response = wsExists(newName);
    if (response == 'true') {
      popWsErrorText.setAttr('text', '\'' + newName  + '\' is already a workspace.\n' +
        'Do you want to continue anyways?');
      popWsYesButtonGroup.setAttr('visible', true);
      popWsNoButtonGroup.setAttr('visible', true);
      popSaveWsButtonGroup.setAttr('visible', false);
      popWsCancelButtonGroup.setAttr('visible', false);
      nameWsEditText.setEditable(false);
    } // if user already has a workspace with newName
    else if (response == 'logged out') {
      popWsErrorText.setAttr('To save a workspace, please log in or sign up.');
    } // if user is not logged in
    else {
      saveWorkspace(newName, true);
      state.currentWorkspace = newName;
      cover.setAttr('visible', false);
      saveWsGroup.setAttr('visible', false);
      showThumbnails();
    } // else a valid workspace name
    screenLayer.draw();
  });

  popWsYesButtonGroup.on('mouseup', function() {
    var newName = nameWsEditText.attrs.text;
    saveWorkspace(newName, true);
    state.currentWorkspace = newName;
    popWsYesButtonGroup.setAttr('visible', false);
    popWsNoButtonGroup.setAttr('visible', false);
    popSaveWsButtonGroup.setAttr('visible', true);
    popWsCancelButtonGroup.setAttr('visible', true);
    nameWsEditText.setEditable(true);
    popWsErrorText.setAttr('text', '');
    cover.setAttr('visible', false);
    saveWsGroup.setAttr('visible', false);
    showThumbnails();
    screenLayer.draw();
  });

  popWsNoButtonGroup.on('mouseup', function() {
    popWsYesButtonGroup.setAttr('visible', false);
    popWsNoButtonGroup.setAttr('visible', false);
    popSaveWsButtonGroup.setAttr('visible', true);
    popWsCancelButtonGroup.setAttr('visible', true);
    popWsErrorText.setAttr('text', '');
    nameWsEditText.setAttr('text', 'Enter a Name');
    nameWsEditText.setEditable(true);
    screenLayer.draw();
  });

  popWsCancelButtonGroup.on('mouseup', function() {
    popWsYesButtonGroup.setAttr('visible', false);
    popSaveWsButtonGroup.setAttr('visible', true);
    popWsErrorText.setAttr('text', '');
    cover.setAttr('visible', false);
    saveWsGroup.setAttr('visible', false);
    nameWsEditText.setEditable(true);
    showThumbnails();
    screenLayer.draw();
  });

  function openSaveWsPopUp() {
    hideThumbnails();
    cover.setAttr('visible', true);
    saveWsGroup.setAttr('visible', true);
    if (state.currentWorkspace) {
      nameWsEditText.setAttr('text', state.currentWorkspace);
    } // if currentWorkspace exists
    screenLayer.draw();
  };

  return {
    nameWsEditText: nameWsEditText,
    nameWsRect: nameWsRect,
    nameWsText: nameWsText,
    openSaveWsPopUp: openSaveWsPopUp,
    popSaveWsButton: popSaveWsButton,
    popSaveWsButtonGroup: popSaveWsButtonGroup,
    popSaveWsButtonText: popSaveWsButtonText,
    popWsCancelButton: popWsCancelButton,
    popWsCancelButtonGroup: popWsCancelButtonGroup,
    popWsCancelButtonText: popWsCancelButtonText,
    popWsErrorText: popWsErrorText,
    popWsNoButtonGroup: popWsNoButtonGroup,
    popWsYesButtonGroup: popWsYesButtonGroup,
    saveWsGroup: saveWsGroup,
    saveWsRect: saveWsRect
  };
};
