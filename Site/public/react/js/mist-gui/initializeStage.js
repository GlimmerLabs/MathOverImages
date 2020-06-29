/**
 * mistgui-initialize-stage.js
 *   Set up a stage for the MIST gui.
 */

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

import {size} from './styles.js';

/**
 * Our primary stage.
 */
let stage;
function create_stage(containerName) {
  stage = new Kinetic.Stage({
    container: containerName,
    width: size.width,
    height: size.height
  });
  return stage;
}

/**
 * The previous workspace.  Possibly used for caching.
 */
let prevWorkspace;

// +---------+---------------------------------------------------------
// | Methods |
// +---------+

/**
 * Initialize the stage to use a container with a particular name.
 */
function initializeStage(
  containerName,
  initWorkspace,
  jsonToWorkspace,
  layers,
  readyEditing,
  state
) {
  // Add the layers to the stage. The top layer is the one most recently added, and
  // objects within a layer follow the same logic.
  stage.add(layers.line);
  stage.add(layers.menu);
  stage.add(layers.menuButton);
  stage.add(layers.menuArrow);
  stage.add(layers.menuControl);
  stage.add(layers.work);
  stage.add(layers.border);
  stage.add(layers.funBar);
  stage.add(layers.text);
  stage.add(layers.toolbox);
  stage.add(layers.label);
  stage.add(layers.drag);
  stage.add(layers.screen);
  stage.add(layers.render);

  // Indicate that the stage is ready for 
  readyEditing(stage);

  // Set up the previous workspace
  prevWorkspace = initWorkspace();

  if (prevWorkspace) {
    jsonToWorkspace(prevWorkspace);
  } // if there's a previous workspace

  // Set up the handler for making lines.  Note that makingLine is declared
  // somewhere (although I'm not sure where).
  stage.addEventListener('contentMousemove', function(){
    if (state.makingLine) {
      state.currLine.points()[2] = stage.getPointerPosition().x;
      state.currLine.points()[3] = stage.getPointerPosition().y;
      layers.line.draw();
    } // if (makingLine)
  });
} // initializeStage

export {
  create_stage,
  initializeStage,
  prevWorkspace
}
