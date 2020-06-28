import {create_stage, initializeStage, prevWorkspace} from './mist-gui/initializeStage.js';
const stage = create_stage('container');
// TODO: temporary hack so that utility.renderCanvas can workspaceFunctions.js can access the stage
window.stage = stage;
window.addEventListener('DOMContentLoaded', () => {
  initializeStage('container', initWorkspace, layers, readyEditing, size, state);
  stage.draw();
});

import {init as makeLabelsInit} from './mist-gui/makeLabels.js';
const makeLabels = makeLabelsInit(actionArray, MIST.builtins.functions);

import constructorsInit from './mist-gui/constructors.js';
const constructors = constructorsInit(
  utility.addOutlet,
  utility.applyDragBounds,
  predicate.assertRenderable,
  insertToTable,
  functions,
  layers,
  utility.updateForward,
  OUTLET_OFFSET,
  values
);
// TODO: temporary hack so that various files work
window.makeOutlet = constructors.makeOutlet;
window.addVal = constructors.addVal;
window.addOp = constructors.addOp;
window.addLine = constructors.addLine;

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
  toolboxGroup,
  makeLabels.makeToolLabel
);

import {createOpenWsListeners, nameOpenWsEditText, openWsGroup} from './mist-gui/openWorkspaceScreen.js';
layers.screen.add(openWsGroup);
nameOpenWsEditText.drawMethod = function(){
	layers.screen.draw();
};
createOpenWsListeners(cover, hideThumbnails, layers.screen, state);

import createSaveWsScreen from './mist-gui/saveWorkspaceScreen.js';
const saveWsScreen = createSaveWsScreen(cover, saveWorkspace, layers.screen, state, wsExists);

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

import initMenu from './mist-gui/menuEvents.js';
initMenu(
  layers,
  constructors.makeFunctionGroup,
  constructors.makeValueGroup,
  makeLabels.makeLabel,
  saveWsScreen.openSaveWsPopUp,
  removeLine,
  showLoadWorkspaceDialog,
  stage,
  state,
  utility.enableWorkTool,
  utility.removeShadow,
  utility.setDragShadow,
);

import createDragLayerListeners from './mist-gui/dragLayerEvents.js';
createDragLayerListeners(
  OUTLET_OFFSET,
  actionArray,
  actionToObject,
  constructors.createEditableText,
  inTable,
  insertToArray,
  insertToTable,
  layers,
  predicate.isRenderable,
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
  constructors.makeLine,
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
