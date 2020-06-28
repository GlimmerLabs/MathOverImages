import {create_stage, initializeStage, prevWorkspace} from './mist-gui/initializeStage.js';
const stage = create_stage('container');
// TODO: temporary hack so that utility.renderCanvas can workspaceFunctions.js can access the stage
window.stage = stage;
window.addEventListener("DOMContentLoaded", () => {
  initializeStage('container', initWorkspace, layers, readyEditing, size, state);
  stage.draw();
});

import {
  workToolGroup,
  toolboxGroup,
  toolboxControl,
  lineToolGroup,
  deleteToolGroup,
  undoGroup,
  undoButton,
  redoGroup,
  redoButton,
} from './mist-gui/makeToolbox.js';
// TODO: temporary hack so utility functions work
window.workToolGroup = workToolGroup;
window.lineToolGroup = lineToolGroup;
window.deleteToolGroup = deleteToolGroup;

// TODO: temporary hack so changingWorkspace functions work
window.undoButton = undoButton;
window.redoButton = redoButton;

layers.toolbox.add(toolboxGroup);
layers.toolbox.draw();
utility.enableWorkTool();

import createToolboxListeners from './mist-gui/toolboxEvents.js';
createToolboxListeners(
  workToolGroup,
  stage,
  state,
  removeLine,
  layers.line,
  utility.enableWorkTool,
  lineToolGroup,
  utility.disableTool,
  layers.toolbox,
  deleteToolGroup,
  undoGroup,
  undoButton,
  currIndex, // TODO: Will this pass by reference or value?
  shadeUndoRedo,
  layers.label,
  redoGroup,
  totalIndex, // TODO: Will this pass by reference or value?
  redoButton,
  redoAction,
  toolboxControl,
  toolboxGroup
);

import {funBar, funBarSaveImCover, funBarSaveImGroup, funBarSaveImText, funBarText} from './mist-gui/makeFunctionBar.js';
layers.funBar.add(funBar);
layers.funBar.draw();

// TODO: temporary so utilityFunctions.js can access them
window.funBarText = funBarText;
window.funBarSaveImCover = funBarSaveImCover;
window.funBarSaveImGroup = funBarSaveImGroup;
window.funBarSaveImText = funBarSaveImText;

import createFunBarListeners from './mist-gui/funBarEvents.js';
createFunBarListeners(
  funBarSaveImGroup,
  state,
  predicate.isRenderable,
  utility.enableWorkTool,
  openSavePopUp,
  layers.funBar,
  valueStyle
);

import createLineLayerListeners from './mist-gui/lineLayerEvents.js';
createLineLayerListeners(
  layers.line,
  layers.work,
  state,
  removeLine,
  insertToArray,
  actionToObject,
);

import {
  borderLine,
  bottomCover,
  functionsArrows,
  functionsButton,
  hideScrollArrows,
  menuFunctions,
  menuValues,
  openButton,
  resetButton,
  saveButton,
  showScrollArrows,
  toggleTag,
  updateArrows,
  valuesArrows,
  valuesButton
} from './mist-gui/makeMenu.js';
layers.border.add(borderLine);
layers.border.add(toggleTag);
layers.border.draw();

layers.menuButton.add(valuesButton);
layers.menuButton.add(functionsButton);
layers.menuButton.draw();

menuFunctions.forEach(func => layers.menu.add(func));
layers.menu.draw();

/* add arrows to menuArrowLayer */
layers.menuArrow.add(valuesArrows['left'], valuesArrows['right']);
layers.menuArrow.add(functionsArrows['left'], functionsArrows['right']);
layers.menuArrow.draw();

layers.menuControl.add(bottomCover);
layers.menuControl.add(resetButton);
layers.menuControl.add(openButton);
layers.menuControl.add(saveButton);
layers.menuControl.draw();

// TODO: hack to let functions in menuTweens work
window.menuFunctions = menuFunctions;
window.menuValues = menuValues;
window.functionsButton = functionsButton;

import createMenuListeners from './mist-gui/menuEvents.js';
createMenuListeners(
  functionsButton,
  hideScrollArrows,
  layers,
  makeFunctionGroup,
  openButton,
  openSaveWsPopUp,
  predicate.isFunction,
  predicate.isValue,
  removeLine,
  resetButton,
  saveButton,
  showLoadWorkspaceDialog,
  showScrollArrows,
  stage,
  state,
  toggleTag,
  updateArrows,
  utility.enableWorkTool,
  utility.removeShadow,
  utility.setDragShadow,
  valuesButton
);

import createDragLayerListeners from './mist-gui/dragLayerEvents.js';
createDragLayerListeners(
  OUTLET_OFFSET,
  actionArray,
  actionToObject,
  createEditableText,
  inTable,
  insertToArray,
  insertToTable,
  layers,
  predicate.isFunction,
  predicate.isRenderable,
  predicate.isValue,
  state,
  utility.addOutlet,
  utility.applyDragBounds,
  utility.renderCanvas,
  utility.removeShadow,
  utility.replaceNode,
  utility.setSelectedShadow,
  utility.updateFunBar
);

import createWorkLayerListeners from './mist-gui/workLayerEvents.js';
createWorkLayerListeners(
  OUTLET_OFFSET,
  actionToObject,
  insertToArray,
  insertToTable,
  layers.drag,
  layers.line,
  layers.work,
  predicate.assertRenderable,
  predicate.isCycle,
  predicate.isFunction,
  predicate.isImageBox,
  predicate.isOutlet,
  predicate.isValue,
  removeLine,
  state,
  utility.addOutlet,
  utility.collapseCanvas,
  utility.removeShadow,
  utility.renderCanvas,
  utility.setDragShadow,
  utility.setSelectedShadow,
  utility.updateForward,
  utility.updateFunBar
);
