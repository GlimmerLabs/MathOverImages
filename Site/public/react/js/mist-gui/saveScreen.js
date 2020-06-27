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
  width: size.width,
  height: size.height,
  fill: 'black',
  opacity: .6,
  visible: false
});
layers.screen.add(cover);

var popSaveGroup = new Kinetic.Group({
  x: saveStyle.saveGroupX, 
  y: saveStyle.saveGroupY,
  visible: false
});
layers.screen.add(popSaveGroup);

var popSaveRect = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: saveStyle.rectWidth,
  height: saveStyle.rectHeight,
  fill: saveStyle.rectColor,
  stroke: 'black',
  strokeWidth: 1
});
popSaveGroup.add(popSaveRect);

var renderPopText = new Kinetic.Text({
  text: "",
  x: saveStyle.textShiftX,
  y: saveStyle.textShiftY,
  width: saveStyle.textWidth,
  height: saveStyle.textHeight,
  fill: 'black',
  fontSize: saveStyle.textFontSize,
  fontFamily: fonts.default,
  align: 'center'
});
popSaveGroup.add(renderPopText);

var nameText = new Kinetic.Text({
  text: "Name:",
  x: saveStyle.textShiftX,
  y: saveStyle.textShiftY + (saveStyle.textHeight * 1.4),
  fill: 'black',
  fontSize: 16,
  fontFamily: fonts.default,
});
popSaveGroup.add(nameText);

var nameRect = new Kinetic.Rect ({
  x: saveStyle.textShiftX + saveStyle.nameTextShift,
  y: saveStyle.textShiftY + (saveStyle.textHeight * 1.3),
  width: saveStyle.canvasSide - saveStyle.nameTextShift,
  height: saveStyle.textHeight / 1.5,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 1
});
popSaveGroup.add(nameRect);

var nameEditText = new Kinetic.Text({
  x: saveStyle.textShiftX + (saveStyle.nameTextShift * 1.1),
  y: saveStyle.textShiftY + (saveStyle.textHeight * 1.4),
  text: 'Enter a Name',
  fontSize: 14,
  width: saveStyle.canvasSide - saveStyle.nameTextShift,
  height: saveStyle.textHeight / 1.5,
  fontFamily: fonts.default,
  fill: 'black'
});
popSaveGroup.add(nameEditText);
nameEditText.setEditable(true);
nameEditText.matchingCharacters = /[a-zA-Z0-9 \-]/;
nameEditText.defaultText = 'Enter a Name';
nameEditText.drawMethod = function(){
layers.screen.draw()
};

// ERROR TEXT
var popErrorText = new Kinetic.Text({
  x: saveStyle.textShiftX,
  y: saveStyle.textShiftY + (saveStyle.textHeight * 2.2),
  text: '',
  width: saveStyle.rectWidth - (2*saveStyle.textShiftX),
  fontFamily: fonts.default,
  fontSize: 14,
  fill: saveStyle.errorColor,
});
popSaveGroup.add(popErrorText);

//CANCEL BUTTON GROUP
var popCancelButtonGroup = new Kinetic.Group({
  x: saveStyle.textShiftX,
  y: saveStyle.rectHeight - (saveStyle.textHeight * 1.25),
  name: 'cancel'
});
popSaveGroup.add(popCancelButtonGroup);

var popCancelButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: saveStyle.buttonWidth,
  height: saveStyle.buttonHeight,
  fill: saveStyle.buttonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popCancelButtonGroup.add(popCancelButton);

var popCancelButtonText = new Kinetic.Text({
  text: "Cancel",
  x: 0,
  y: (saveStyle.buttonHeight - 16) / 2,
  width: saveStyle.buttonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: fonts.default,
  align: 'center'
});
popCancelButtonGroup.add(popCancelButtonText);

//DOWLOAD BUTTON GROUP
var popDownloadButtonGroup = new Kinetic.Group({
  x: saveStyle.textShiftX + saveStyle.buttonShiftX + saveStyle.buttonWidth,
  y: saveStyle.rectHeight - (saveStyle.textHeight * 1.25),
  name: 'download'
});
popSaveGroup.add(popDownloadButtonGroup);

var popDownloadButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: saveStyle.buttonWidth,
  height: saveStyle.buttonHeight,
  fill: saveStyle.buttonColor,
  stroke: 'grey', 
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popDownloadButtonGroup.add(popDownloadButton);

var popDownloadButtonText = new Kinetic.Text({
  text: "Download",
  x: 0,
  y: (saveStyle.buttonHeight - 16) / 2,
  width: saveStyle.buttonWidth,
  fill: 'grey',
  fontSize: 16,
  fontFamily: fonts.default,
  align: 'center'
});
popDownloadButtonGroup.add(popDownloadButtonText);


//SAVE BUTTON GROUP
var popSaveButtonGroup = new Kinetic.Group({
  x: saveStyle.textShiftX + (2 * saveStyle.buttonShiftX) + (2 * saveStyle.buttonWidth),
  y: saveStyle.rectHeight - (saveStyle.textHeight * 1.25),
  name: 'save'
});
popSaveGroup.add(popSaveButtonGroup);

var popSaveButton = new Kinetic.Rect ({
  x: 0,
  y: 0,
  width: saveStyle.buttonWidth,
  height: saveStyle.buttonHeight,
  fill: saveStyle.buttonColor,
  stroke: 'black',
  strokeWidth: 1,
  shadowColor: 'black',
  shadowEnabled: false
});
popSaveButtonGroup.add(popSaveButton);

var popSaveButtonText = new Kinetic.Text({
  text: "Save",
  x: 0,
  y: (saveStyle.buttonHeight - 16) / 2,
  width: saveStyle.buttonWidth,
  fill: 'black',
  fontSize: 16,
  fontFamily: fonts.default,
  align: 'center'
});
popSaveButtonGroup.add(popSaveButtonText);

// rCanvas is the canvas used to render the image on the saveScreen
var rCanvas = layers.render.canvas._canvas;
var rAnimator;

/**
 * renderPopCanvas takes a renderFunction and renders that image on the save screen
 * at a resolution of (width * (2 / 9))
 */
var renderPopCanvas = function(renderFunction) {
  rAnimator = new MIST.ui.Animator(renderFunction, [], {}, 
    rCanvas, function() { });
  rAnimator.bounds(saveStyle.canvasShiftX, saveStyle.canvasShiftY, 
                   saveStyle.canvasSide, saveStyle.canvasSide);
  rAnimator.setResolution(saveStyle.canvasResolution, saveStyle.canvasResolution);
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
 * layers.screen.on('mouseover' ...) checks if it's mousing over a button.
 * If it is, it changes the color to the selected color
 */
layers.screen.on('mouseover', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name && group.attrs.name != 'download') {
    group.children[0].setAttr('fill', saveStyle.buttonSelectedColor);
    layers.screen.draw();
  } // if name (not download)
});

/**
 * layers.screen.on('mouseout' ...) checks if it's mousing out of a button.
 * If it is, it disables the shadow and changes color to original color
 */
layers.screen.on('mouseout', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name) {
    group.children[0].setAttrs({
      fill: saveStyle.buttonColor,
      shadowEnabled: false
    });
    layers.screen.draw();
  } // if name
});

/**
 * layers.screen.on('mousedowm' ...) checks if it's mousing down on a button.
 * If it is, it enables the shadow around the box of the button
 */
layers.screen.on('mousedown', function(evt) {
  var group = evt.target.parent;
  if (group.attrs.name && group.attrs.name != 'download') {
    group.children[0].setAttr('shadowEnabled', true);
    layers.screen.draw();
  } // if button (not download)
});

/**
 * layers.screen.on('mouseup' ...) checks if it's mousing up on a button.
 * If it is, it removes the shadow from the box
 */
layers.screen.on('mouseup', function(evt) {
  var group = evt.target.parent;
  var name = group.attrs.name
  if (name) {
    group.children[0].setAttr('shadowEnabled', false);
    layers.screen.draw();
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
  layers.screen.draw();
  setTimeout(function(){
      layers.render.draw();
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
    var renderFunction = state.currShape.attrs.renderFunction;
    var imageid = saveImage(newName, renderFunction, true, true, true);
    popErrorText.setAttr('text', '');
    cover.setAttr('visible', false);
    popSaveGroup.setAttr('visible', false);
    showThumbnails();
    rAnimator.stop()
    rAnimator = undefined;
    setTimeout(function(){
      layers.render.draw();
    }, 50);
    showSuccessDialog(newName, imageid);
  } // else valid name is enters
  layers.screen.draw();
});

/**
* openSavePopUp sets the cover and popSaveGroup to visible and begins animation.
*/
var openSavePopUp = function() {
  hideThumbnails();
  cover.setAttr('visible', true);
  popSaveGroup.setAttr('visible', true);
  var renderFunction = state.currShape.attrs.renderFunction;
  updatePopText(renderFunction);
  layers.render.moveToTop();
  renderPopCanvas(renderFunction);
  rAnimator.start();
  layers.screen.draw();
  /*
  animation = true;
  layers.screen.draw();
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
 * hideThumbnails goes through all the nodes on the layers.work and, if they're expanded,
 * draws their renderLayer to hide their image.
 */
var hideThumbnails = function() {
  var nodes = layers.work.children;
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
  var nodes = layers.work.children;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children[2].attrs.expanded) {
      utility.renderCanvas(node);
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


