import {OUTLET_OFFSET, functions, layers, state, values} from './mist-gui/globalVariables.js';
// TODO: temporary hack so that utility.enableWorkTool will work
window.state = state;
window.layers = layers;
// TODO: temporary hack so that utility.addOutlet will work
window.OUTLET_OFFSET = OUTLET_OFFSET;
// TODO: temporary hack so that utility.findRenderFunction will work
window.functions = functions;

// TODO: temporary hack for utility.setDragShadow and utility.setSelectedShadow
import {
  dragShadowColor,
  funBarStyle,
  functionStyle,
  imageBoxStyle,
  menuStyle,
  outletStyle,
  selectedShadowColor,
  size,
  valueStyle,
} from './mist-gui/styles.js';
window.dragShadowColor = dragShadowColor;
window.funBarStyle = funBarStyle;
window.functionStyle = functionStyle;
window.imageBoxStyle = imageBoxStyle;
window.menuStyle = menuStyle;
window.outletStyle = outletStyle;
window.selectedShadowColor = selectedShadowColor;
window.size = size;
window.valueStyle = valueStyle;

import initEditableText from './mist-gui/EditableText.js';

import {create_stage, initializeStage, prevWorkspace} from './mist-gui/initializeStage.js';
import {init as makeLabelsInit} from './mist-gui/makeLabels.js';
import changeWsInit from './mist-gui/changingWorkspace.js';
import constructorsInit from './mist-gui/constructors.js';
import initWsFunctions from './mist-gui/workspaceFunctions.js';
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
import createToolboxListeners from './mist-gui/toolboxEvents.js';
import {cover, nameEditText, popSaveGroup, init as saveScreenInit} from './mist-gui/saveScreen.js';
import {createOpenWsListeners, nameOpenWsEditText, openWsGroup} from './mist-gui/openWorkspaceScreen.js';
import createSaveWsScreen from './mist-gui/saveWorkspaceScreen.js';
import {funBar, funBarSaveImCover, funBarSaveImGroup, funBarSaveImText, funBarText} from './mist-gui/makeFunctionBar.js';
// TODO: temporary so utilityFunctions.js can access them
window.funBarText = funBarText;
window.funBarSaveImCover = funBarSaveImCover;
window.funBarSaveImGroup = funBarSaveImGroup;
window.funBarSaveImText = funBarSaveImText;

import createFunBarListeners from './mist-gui/funBarEvents.js';
import createLineLayerListeners from './mist-gui/lineLayerEvents.js';
import initMenu from './mist-gui/menuEvents.js';
import createDragLayerListeners from './mist-gui/dragLayerEvents.js';
import createWorkLayerListeners from './mist-gui/workLayerEvents.js';

export default function initStage(containerId) {
  const stage = create_stage('container');
  // TODO: temporary hack so that utility.renderCanvas can workspaceFunctions.js can access the stage
  window.stage = stage;
  const makeLabels = makeLabelsInit(state, MIST.builtins.functions);
  const changeWs = changeWsInit(
    OUTLET_OFFSET,
    utility.addOutlet,
    predicate.assertRenderable,
    utility.collapseCanvas,
    funBarText,
    layers,
    redoButton,
    utility.removeOutlet,
    utility.removeShadow,
    utility.renderCanvas,
    utility.replaceNode,
    state,
    undoButton,
    utility.updateForward,
    utility.updateFunBar,
  );
  // TODO: temporary hack so that EditableText works
  window.removeLine = changeWs.removeLine;

  const EditableText = initEditableText(
    deleteToolGroup,
    utility.disableTool,
    utility.enableWorkTool,
    layers,
    lineToolGroup,
    changeWs.redoAction,
    removeLine,
    changeWs.shadeUndoRedo,
    state,
    changeWs.undoAction,
    utility.updateForward,
    utility.updateFunBar,
    workToolGroup,
    utility.wrapValueText,
  );

  const constructors = constructorsInit(
    utility.addOutlet,
    utility.applyDragBounds,
    predicate.assertRenderable,
    changeWs.insertToTable,
    functions,
    layers,
    utility.updateForward,
    OUTLET_OFFSET,
    values
  );
  // TODO: temporary hack so that various files work
  window.makeOutlet = constructors.makeOutlet;

  const wsFunctions = initWsFunctions(
    MIST,
    OUTLET_OFFSET,
    constructors.addLine,
    constructors.addOp,
    constructors.addVal,
    layers,
    restore,
    changeWs.shadeUndoRedo,
    stage,
    state,
    utility.updateFunBar,
  );
  layers.toolbox.add(toolboxGroup);
  layers.toolbox.draw();
  utility.enableWorkTool();

  createToolboxListeners(
    workToolGroup,
    stage,
    state,
    changeWs.removeLine,
    layers.line,
    utility.enableWorkTool,
    lineToolGroup,
    utility.disableTool,
    layers.toolbox,
    deleteToolGroup,
    changeWs.undoAction,
    undoButton,
    undoGroup,
    changeWs.shadeUndoRedo,
    layers.label,
    redoGroup,
    redoButton,
    changeWs.redoAction,
    toolboxControl,
    toolboxGroup,
    makeLabels.makeToolLabel
  );
  const saveScreen = saveScreenInit(wsFunctions.imageExists, layers, wsFunctions.saveImage, wsFunctions.showSuccessDialog);

  layers.screen.add(openWsGroup);
  nameOpenWsEditText.drawMethod = function(){
    layers.screen.draw();
  };
  createOpenWsListeners(cover, saveScreen.hideThumbnails, layers.screen, state);
  const saveWsScreen = createSaveWsScreen(cover, wsFunctions.saveWorkspace, layers.screen, state, wsFunctions.wsExists);
  layers.funBar.add(funBar);
  layers.funBar.draw();

  createFunBarListeners(
    funBarSaveImGroup,
    state,
    predicate.isRenderable,
    utility.enableWorkTool,
    saveScreen.openSavePopUp,
    layers.funBar
  );

  createLineLayerListeners(
    layers.line,
    layers.work,
    state,
    changeWs.removeLine,
    changeWs.insertToArray,
    changeWs.actionToObject,
  );

  initMenu(
    functions,
    layers,
    constructors.makeFunctionGroup,
    constructors.makeValueGroup,
    makeLabels.makeLabel,
    saveWsScreen.openSaveWsPopUp,
    changeWs.removeLine,
    wsFunctions.resetWorkspace,
    wsFunctions.showLoadWorkspaceDialog,
    stage,
    state,
    utility.enableWorkTool,
    utility.removeShadow,
    utility.setDragShadow,
    values,
  );

  createDragLayerListeners(
    OUTLET_OFFSET,
    changeWs.actionToObject,
    constructors.createEditableText,
    changeWs.inTable,
    changeWs.insertToArray,
    changeWs.insertToTable,
    functions,
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

  createWorkLayerListeners(
    OUTLET_OFFSET,
    changeWs.actionToObject,
    changeWs.insertToArray,
    changeWs.insertToTable,
    layers.drag,
    layers.line,
    layers.work,
    predicate.assertRenderable,
    constructors.makeLine,
    changeWs.removeLine,
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

  initializeStage(
    containerId,
    wsFunctions.initWorkspace,
    wsFunctions.jsonToWorkspace,
    layers,
    EditableText.readyEditing,
    state
  );
  stage.draw();
}