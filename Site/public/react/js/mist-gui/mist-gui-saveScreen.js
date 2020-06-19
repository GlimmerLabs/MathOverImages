/**
* The save screen is what appears when a user want to save or download an images they create.
*/

/**
 * the cover is an opaque black rectangle that covers the whole stage to prevent action 
 * from taking place while a pop-up window is open
 */
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

// ERROR TEXT
var popErrorText = new Kinetic.Text({
  x: popTextShiftX,
  y: popTextShiftY + (popTextHeight * 2.2),
  text: '',
  width: popRectWidth - (2*popTextShiftX),
  fontFamily: globalFont,
  fontSize: 14,
  fill: errorColor,
});
popSaveGroup.add(popErrorText);

//CANCEL BUTTON GROUP
var popCancelButtonGroup = new Kinetic.Group({
  x: popTextShiftX,
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

//DOWLOAD BUTTON GROUP
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
  stroke: 'grey', 
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
  fill: 'grey',
  fontSize: 16,
  fontFamily: globalFont,
  align: 'center'
});
popDownloadButtonGroup.add(popDownloadButtonText);


//SAVE BUTTON GROUP
var popSaveButtonGroup = new Kinetic.Group({
  x: popTextShiftX + (2 * popButtonShiftX) + (2 * popButtonWidth),
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

// rCanvas is the canvas used to render the image on the saveScreen
var rCanvas = renderLayer.canvas._canvas;
var rAnimator;

/**
 * renderPopCanvas takes a renderFunction and renders that image on the save screen
 * at a resolution of (width * (2 / 9))
 */
var renderPopCanvas = function(renderFunction) {
  rAnimator = new MIST.ui.Animator(renderFunction, [], {}, 
    rCanvas, function() { });
  rAnimator.bounds(popCanvasShiftX, popCanvasShiftY, 
                   popCanvasSide, popCanvasSide);
  rAnimator.setResolution(popCanvasResolution, popCanvasResolution);
  rAnimator.frame();
  /*
  var mistObj = MIST.parse(renderFunction);
  MIST.render(mistObj, {}, rCanvas, 
    popCanvasResolution, popCanvasResolution, 
    popCanvasShiftX, popCanvasShiftY, 
    popCanvasSide, popCanvasSide);	
*/
}; // renderPopCanvas(renderFunction)

/**
 * updatePoptext takes a renderFunction and displays up to 74 characters of the 
 * renderFunction below the image. If the length of the renderFunction is larger than
 * 74, '...' is added to the end of the string before it's displayed.
 */
var updatePopText = function(renderFunction) {
  if (renderFunction.length > 74) {
    text = renderFunction.substring(0, 71) + "...";
  } // if 
  else {
    text = renderFunction
  } // else
  renderPopText.setAttr('text', text);
}; // updatePopText(renderFunction);

/**
 * screenLayer.on('mouseover' ...) checks if it's mousing over a button.
 * If it is, it changes the color to the selected color
 */
screenLayer.on('mouseover', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name && group.attrs.name != 'download') {
    group.children[0].setAttr('fill', popButtonSelectedColor);
    screenLayer.draw();
  } // if name (not download)
});

/**
 * screenLayer.on('mouseout' ...) checks if it's mousing out of a button.
 * If it is, it disables the shadow and changes color to original color
 */
screenLayer.on('mouseout', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name) {
    group.children[0].setAttrs({
      fill: popButtonColor,
      shadowEnabled: false
    });
    screenLayer.draw();
  } // if name
});

/**
 * screenLayer.on('mousedowm' ...) checks if it's mousing down on a button.
 * If it is, it enables the shadow around the box of the button
 */
screenLayer.on('mousedown', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name && group.attrs.name != 'download') {
    group.children[0].setAttr('shadowEnabled', true);
    screenLayer.draw();
  } // if button (not download)
});

/**
 * screenLayer.on('mouseup' ...) checks if it's mousing up on a button.
 * If it is, it removes the shadow from the box
 */
screenLayer.on('mouseup', function(evt) {
  var group = evt.target.parent;
  var name = group.attrs.name
  if (name) {
    group.children[0].setAttr('shadowEnabled', false);
    screenLayer.draw();
  } // if name
});

/**
 * popCancelButtonGroup.on('mouseup' ...) collapses the saveScreen
 */
popCancelButtonGroup.on('mouseup', function(){
  cover.setAttr('visible', false);
  popSaveGroup.setAttr('visible', false);
  popErrorText.setAttr('text', '');
  //animation = false;
  showThumbnails();
  rAnimator.stop();
  rAnimator = undefined;
  screenLayer.draw();
  setTimeout(function(){
      renderLayer.draw();
    }, 50);
});

/**
 * popSaveButtonGroup.on('mouseup' ...) gets the name entered by the user in the saveScreen,
 * removes whitespace from the beginning and end of the name, and checks if the name is valid.
 * If the name is not valid, it displays an error message.
 * If the name is valid, the image is saved to their account, and the saveScreen collapses.
 * TODO: check if the user is logged in, and if not, allow user to login without losing work.
 */
popSaveButtonGroup.on('mouseup', function(){
  var newName = nameEditText.attrs.text;
  newName = removeOuterWhiteSpace(newName);
  var response = imageExists(newName);
  if (newName == '' || newName == 'Enter a Name') {
    popErrorText.setAttr('text', 'Please enter a name for your image.');
  } // if no name is entered
  else if (response == 'true') {
  	popErrorText.setAttr('text', 'You\'ve already made an image called \'' + 
  		newName + '\'\n' + 'Please choose a different name.');
  } // if image already exists in user's account
  else if (response == 'logged out') {
  	popErrorText.setAttr('text', 'To save an image, please log in or sign up.');
  } // if user is not logged in
  else {
    var renderFunction = currShape.attrs.renderFunction;
    var imageid = saveImage(newName, renderFunction, true, true, true);
    popErrorText.setAttr('text', '');
    cover.setAttr('visible', false);
    popSaveGroup.setAttr('visible', false);
    showThumbnails();
    rAnimator.stop()
    rAnimator = undefined;
    setTimeout(function(){
      renderLayer.draw();
    }, 50);
    showSuccessDialog(newName, imageid);
  } // else valid name is enters
  screenLayer.draw();
});

/**
* openSavePopUp sets the cover and popSaveGroup to visible and begins animation.
*/
var openSavePopUp = function() {
  hideThumbnails();
  cover.setAttr('visible', true);
  popSaveGroup.setAttr('visible', true);
  var renderFunction = currShape.attrs.renderFunction;
  updatePopText(renderFunction);
  renderLayer.moveToTop();
  renderPopCanvas(renderFunction);
  rAnimator.start();
  screenLayer.draw();
  /*
  animation = true;
  screenLayer.draw();
  var frame = function() {
    renderPopCanvas(renderFunction);
    if (animation) {
      setTimeout(frame, 50);
    } // if animation
  } // frame()
  frame();
  */
}; // openSavePopUp()


/**
 * hideThumbnails goes through all the nodes on the workLayer and, if they're expanded,
 * draws their renderLayer to hide their image.
 */
var hideThumbnails = function() {
  var nodes = workLayer.children;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children[2].attrs.expanded) {
      node.attrs.renderLayer.draw();
    } // if expanded
  } // for
}; //hideThumbnails()

/**
 * showThumbnails goes through all the nodes on the workLayer and, if they're expanded,
 * renders their canvas
 */
var showThumbnails = function() {
  var nodes = workLayer.children;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children[2].attrs.expanded) {
      renderCanvas(node);
    } // if expanded
  } // for 
}; // showThumbnails()

/**
* removeOuterWhiteSpace takes a string and removes white space at the beginning and end
* of the string, but not the white space in the middle of the string.
* returns a string
*/
var removeOuterWhiteSpace = function (string) {
  var start = 0;
  var end = string.length - 1;
  string = string.replace(/^ */, "");
  string = string.replace(/ *$/, "");
  return string;
}; // removeOuterWhiteSpace


