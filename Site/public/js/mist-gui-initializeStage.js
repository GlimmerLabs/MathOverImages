/**
 * mistgui-initialize-stage.js
 *   Set up a stage for the MIST gui.
 */

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

/**
 * Our primary stage.
 */
var stage;

/**
 * The previous workspace.  Possibly used for caching.
 */
var prevWorkspace;

// +---------+---------------------------------------------------------
// | Methods |
// +---------+

/**
 * Initialize the stage to use a container with a particular name.
 */
function initializeStage(containerName) {
  // Create the object
  stage = new Kinetic.Stage({
    container: containerName,
    width: width,
    height: height
  });

  // Add the layers to the stage. The top layer is the one most recently added, and
  // objects within a layer follow the same logic.
  stage.add(lineLayer);
  stage.add(menuLayer);
  stage.add(menuButtonLayer);
  stage.add(menuArrowLayer);
  stage.add(menuControlLayer);
  stage.add(workLayer);
  stage.add(borderLayer);
  stage.add(funBarLayer);
  stage.add(textLayer);
  stage.add(toolboxLayer);
  stage.add(labelLayer);
  stage.add(dragLayer);
  stage.add(screenLayer);
  stage.add(renderLayer);

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
    if (makingLine) {
      currLine.points()[2] = stage.getPointerPosition().x;
      currLine.points()[3] = stage.getPointerPosition().y;
      lineLayer.draw();
    } // if (makingLine)
  });
} // initializeStage
