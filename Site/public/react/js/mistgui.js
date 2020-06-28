import {funBar, funBarSaveImGroup} from './mist-gui/makeFunctionBar.js';
layers.funBar.add(funBar);

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

import createLineLayerListeners from './mist-gui/funBarEvents.js';
createLineLayerListeners(
  layers.line,
  layers.work,
  state,
  removeLine,
  insertToArray,
  actionToObject,
);
