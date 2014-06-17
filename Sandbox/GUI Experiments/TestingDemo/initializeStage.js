var stage = new Kinetic.Stage({
    container: 'container',
    width: width,
    height: height
  });

/**
 * Layers of the workspace:
 * 1. The line layer holds connecting lines between nodes in the work area.
 * 2. The menu layer holds the buttons that users can click on to drag a new node into
 *    the work area.
 * 3. The menuButton layer holds the super buttons that are used to expand the menus.
 * 4. The toolboxLayer holds the draggable toolbox
 * 5. The work layer holds all active nodes that are either connected or available to
 *    be connected.
 * 6. The border layer stores static elements of the page such as dividing lines.
 * 7. The drag layer holds nodes while they are being moved about the workspace.
 */

 var lineLayer = new Kinetic.Layer();
 var menuLayer = new Kinetic.Layer();
 var menuButtonLayer = new Kinetic.Layer();
 var workLayer = new Kinetic.Layer();
 var borderLayer = new Kinetic.Layer();
 var funBarLayer = new Kinetic.Layer();
 var toolboxLayer = new Kinetic.Layer();
 var dragLayer = new Kinetic.Layer();

/**
 * Add the layers to the stage. The top layer is the one most recently added, and
 * objects within a layer follow the same logic.
 */
 stage.add(lineLayer);
 stage.add(menuLayer);
 stage.add(menuButtonLayer);
 stage.add(workLayer);
 stage.add(borderLayer);
 stage.add(toolboxLayer);
 stage.add(funBarLayer);
 stage.add(dragLayer);
