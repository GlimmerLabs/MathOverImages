/**
 * mistgui-globals.js
 *   Global variables for a MIST gui.  (Eventually, these should be fields
 *   within the object/prototype.)
 */
const functions = {
  add:       {rep: 'sum',   max: 20, min: 2, prefix: 'sum', color: functionStyle.multColor},
  multiply:  {rep: 'mult',   max: 20, min: 2, prefix: 'mult', color: functionStyle.multColor},
  square:    {rep: 'sqr', max: 1, min: 1, prefix: 'square', color: functionStyle.singleColor},
  negate:    {rep: 'neg',   max: 1,  min: 1, prefix: 'neg', color: functionStyle.singleColor},
  sine:      {rep: 'sin', max: 1,  min: 1, prefix: 'sin', color: functionStyle.singleColor},
  cosine:    {rep: 'cos', max: 1,  min: 1, prefix: 'cos', color: functionStyle.singleColor},
  absolute:  {rep: 'abs', max: 1,  min: 1, prefix: 'abs', color: functionStyle.singleColor},
  average:   {rep: 'avg', max: 20, min: 2, prefix: 'avg', color: functionStyle.multColor},
  sign:      {rep: 'sign', max: 1,  min: 1, prefix: 'sign', color: functionStyle.singleColor},
  wrapsum:   {rep: 'wsum', max: 20,  min: 2, prefix: 'wsum', color: functionStyle.multColor},
  rgb:       {rep: 'rgb', max: 3,  min: 3, prefix: 'rgb', color: functionStyle.RGBcolor},
  mistif:    {rep: 'if', max: 3, min: 3, prefix: 'mistif', color: functionStyle.singleColor}
}

const values = {
  x:        {rep: 'x', color: valueStyle.XYColor},
  y:        {rep: 'y', color: valueStyle.XYColor},
  second:   {rep: 't.s', color: valueStyle.timeColor},
  minute:   {rep: 't.m', color: valueStyle.timeColor},
  hour:     {rep: 't.h', color: valueStyle.timeColor},
  day:      {rep: 't.d', color: valueStyle.timeColor},
  constant: {rep: '#', color: valueStyle.constantColor},
  mouseX:   {rep: 'm.x', color: valueStyle.mouseColor},
  mouseY:   {rep: 'm.y', color: valueStyle.mouseColor}
}
const state = {
  /**
   * elementTable is a hash table that connects an element's id to the element in the 
   * workspace.
   */
  elementTable: {},

  currentWorkspace: null,
  /**
   * actionArray is an array that contains an action-object for every action in
   * a workspace. Used to implement undo/redo feature
   */
  actionArray: [],
  /**
   * currIndex keeps track of the index in actionArray where it would be appropriate to 
   * add the next action. Initialized at 0.
   */
  currIndex: 0,
  /**
   * a count of the total usable actions in actionArray. A user can redo until 
   * (totalIndex - 1) after undoing. Once a user creates a new action after undoing,
   * the totalIndex is set to the currIndex. 
   */
  totalIndex: 0,

  // TOOLBOX BOOLEANS
  lineToolOn: false,
  workToolOn: false,
  deleteToolOn: false,

  //MENU BOOLEANS
  menu: {
    valueExpanded: false,
    functionExpanded: false,
    tagsOn: true,
  },

  /* variables to globally reference the most recently used object/line and current state */
  currShape: null,
  currLine: null,
  dragShape: null,
  scaledObj: null,
  openTag: null,
  map: [],

  //OTHER BOOLEANS
  makingLine: false,
  animation: false,
};

// CONSTANTS

/** 
 * The offset in an operation node to the set of offsets.
 */
var OUTLET_OFFSET = 3;


/**
 * Layers of the workspace:
 * 1. The line layer holds connecting lines between nodes in the work area.
 * 2. The menu layer holds the buttons that users can click on to drag a new node into
 *    the work area.
 * 3. The menuButton layer holds the super buttons that are used to expand the menus.
 * 4. The menuArrowLayer holds the arrows for the scrolling menus. 
 * 4. The menuControlLayer contains the buttons to save/open/reset the workspace
 * 5. The toolboxLayer holds the draggable toolbox
 * 6. The work layer holds all active nodes that are either connected or available to
 *    be connected.
 * 7. The border layer stores static elements of the page such as dividing lines.
 * 8. The funBar layer contains the elements of the funBar at the bottom of the screen.
 * 9. The drag layer holds nodes while they are being moved about the workspace.
 * 10. The text layer hold the editabe text boxes for constant values and funtion text.
 * 11. The labelLayer contains informative labels that appear on mouseover
 * 12. The screenLayer contains pop-up windows for meta events
 * 13. The renderLayer contains the large rendered canvas when saving an image.
 */

const layers = {
  line: new Kinetic.Layer(),
  menu: new Kinetic.Layer(),
  menuButton: new Kinetic.Layer(),
  menuArrow: new Kinetic.Layer(),
  menuControl: new Kinetic.Layer(),
  toolbox: new Kinetic.Layer(),
  work: new Kinetic.Layer(),
  border: new Kinetic.Layer(),
  funBar: new Kinetic.Layer(),
  drag: new Kinetic.Layer(),
  text: new Kinetic.Layer(),
  label: new Kinetic.Layer(),
  screen: new Kinetic.Layer(),
  render: new Kinetic.Layer(),
};
