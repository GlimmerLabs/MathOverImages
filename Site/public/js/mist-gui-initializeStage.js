var stage = new Kinetic.Stage({
    container: 'container',
    width: width,
    height: height
  });

/**
 * Add the layers to the stage. The top layer is the one most recently added, and
 * objects within a layer follow the same logic.
 */
 stage.add(lineLayer);
 stage.add(menuLayer);
 stage.add(menuButtonLayer);
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

readyEditing(stage);