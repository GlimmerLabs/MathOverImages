import {functionStyle, menuStyle} from './styles.js';

/*
makeMenuTween takes a node (target), an integer (xEnd), and a boolean (visibility).
It returns a kinetic tween that will move target to xEnd, without changing y value,
and with the visibility to the specified boolean values.
*/
function makeMenuTween(target, xEnd, visibility) {
  return new Kinetic.Tween({
    node: target,
    duration: menuStyle.animDuration,
    x: xEnd,
    visible: visibility,
    easing: Kinetic.Easings.StrongEaseOut
  });
};

// Create functions to Move Menu Items
/* move the valueGroups in the menu to their original location. */
export function moveValueNodesIn(menuValues) {
  for (var i = 0; i < menuValues.length; i++) {
    var moveValue = makeMenuTween(menuValues[i], menuStyle.valuesXStart, false);
    moveValue.play();
  }
};

/* move the valueGroups to their expanded location. */
export function expandValueNodes(menuValues) {
  for (var i = 0; i < menuValues.length; i++) {
    var moveValue = makeMenuTween(menuValues[i], menuStyle.cornerWidth + menuStyle.buttonWidth + menuStyle.valXSpacing + i * (menuStyle.valXSpacing + functionStyle.totalSideLength), true);
    moveValue.play();
  }
};

/* move valueGroups to the right */
export function shiftValueNodesRight() {
  for (var i = 0; i < menuValues.length; i++) {
    var target = menuValues[i];
    var moveValue = makeMenuTween(target, target.x() + menuStyle.valSpaceWidth - menuStyle.valXSpacing, true);
    moveValue.play();
  }
};

/* move valueGroups to the left */
export function shiftValueNodesLeft() {
  for (var i = 0; i < menuValues.length; i++) {
    var target = menuValues[i];
    var moveValue = makeMenuTween(target, target.x() - menuStyle.valSpaceWidth + menuStyle.valXSpacing, true);
    moveValue.play();
  }
};

/* move the functionGroups to their original position. */
export function moveFunctionNodesIn(menuFunctions) {
  for (var i = 0; i < menuFunctions.length; i++) {
    var moveFunction = makeMenuTween(menuFunctions[i], menuStyle.functsXStart, false);
    moveFunction.play();
  }
};

/* move the functionGroups to the right of the screen. (For when values are expanded).*/
export function moveFunctionNodesRight(menuFunctions) {
  for (var i = 0; i < menuFunctions.length; i++) {
    var moveFunction = makeMenuTween(menuFunctions[i], menuStyle.functsXEnd, false);
    moveFunction.play();
  }
};

/* move the functionGroups to their expanded position. */
export function expandFunctionNodes(menuFunctions) {
  for (var i = 0; i < menuFunctions.length; i++) {
    var moveFunction = makeMenuTween(menuFunctions[i], menuStyle.cornerWidth + 2 * menuStyle.buttonWidth + menuStyle.functXSpacing + i * (menuStyle.functXSpacing + functionStyle.totalSideLength), true)
    moveFunction.play();
  }
};

/* move the functionsButton to the right of the screen (for when values are expanded). */
export function moveFunctionsButtonRight(functionsButton) {
  var moveButton = makeMenuTween(functionsButton, size.width - menuStyle.buttonWidth, true)
  moveButton.play();
};

/* move the functionsButon to it's original position. */
export function moveFunctionsButtonLeft(functionsButton) {
  var moveButton = makeMenuTween(functionsButton, menuStyle.cornerWidth + menuStyle.buttonWidth, true)
  moveButton.play();
};

/* move functionGroups to the right */
export function shiftFunctionNodesRight() {
  for (var i = 0; i < menuFunctions.length; i++) {
    var target = menuFunctions[i];
    var moveValue = makeMenuTween(target, target.x() + menuStyle.functSpaceWidth - menuStyle.functXSpacing, true);
    moveValue.play();
  }
};

/* move functionGroups to the left */
export function shiftFunctionNodesLeft() {
  for (var i = 0; i < menuFunctions.length; i++) {
    var target = menuFunctions[i];
    var moveValue = makeMenuTween(target, target.x() - menuStyle.functSpaceWidth + menuStyle.functXSpacing, true);
    moveValue.play();
  }
};
