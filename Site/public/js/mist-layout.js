/**
 * mist-layout.js
 *   Information on the layout of a MIST editing session.
 */

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

/*
   1. Layouts allow you to add values (addVal), add operations (addOp),
      and add edges (addEdge).

   2. You can then display a layout using MIST.displayLayout.  (I made
      it a separate function to ease dealing with JSON.)

   3. You can store a layout in a database by converting it to a string
      with JSON.stringify.  When you retrieve it, you can either display
      it with MIST.displayLayout or (probably better) convert it back
      to a real MIST.Layout with MIST.rebuildLayout.

   4. In rebuilding layouts from JSON, I'm preserving the ids of nodes.
      Is that neccessary?  I could also set up a hash that maps old
      ids to new ids.  Note that I've had to extend addOp and addVal
      to take in a specified id.

   5. There's a lot of similarlity between MIST.displayLayout and
      MIST.rebuildLayout.  Over the longer term, I should figure out 
      how to rewrite MIST.rebuildLayout in terms of MIST.displayLayout.
 */

// +-------+-----------------------------------------------------------
// | Setup |
// +-------+

try { MIST = MIST; } catch (err) { MIST = new Object(); }

// +--------+----------------------------------------------------------
// | Layout |
// +--------+

MIST.Layout = function()
{
  // +--------+------------------------------------------------------
  // | Fields |
  // +--------+

  this.class = "MIST.Layout";

  // For convenience, we number things starting at 1000
  this.num = 1000;

  // All of the operation nodes
  this.operations = {};

  // All of the value nodes
  this.values = {};

  // All of the edges
  this.edges = [];

  // +----------+----------------------------------------------------
  // | Mutators |
  // +----------+

  /**
   * Add an edge from source to the ith input of sink.
   */
  this.addEdge = function(source, sink, i)
  {
    this.edges.push({ source:source, sink:sink, i:i });
  }; // addEdge

  /**
   * Add a new function node at (x,y).  Returns an identifier that you 
   * can use to refer to the node.
   */
  this.addOp = function(name, x, y, id)
  {
    if (!id) { id = "F" + this.num++; }
    this.operations[id] = { id:id, name:name, x:x, y:y };
    return id;
  }; // addOp

  /**
   * Add a new value node at (x,y).  Returns an identifier that you can 
   * use to refer to the node.
   */
  this.addVal = function(name, x, y, id)
  {
    if (!id) { id = "V" + this.num++; }
    this.values[id] = { id:id, name:name, x:x, y:y };
    return id;
  }; // addVal

  // +-----------+---------------------------------------------------
  // | Accessors |
  // +-----------+

  /**
   * Get a function node.  
   */
  this.getFun = function(id) 
  {
    return this.operations[id];
  }; // getFun

  /**
   * Get a value node.
   */
  this.getVal = function(id)
  {
    return this.values[id];
  }; // getVal
} // MIST.Layout

// +----------------------+------------------------------------------
// | Additional Functions |
// +----------------------+

/**
 * Display a layout-like object (either a real Layout object or the
 * object without the functions as given by JSON.parse) using 
 * display.addOp to display operations, display.addVal to display 
 * values, and display.addEdge to display edges.
 */
MIST.displayLayout = function(layout, display)
{
  var things = {};

  // Process all of the operations
  for (var id in layout.operations) {
    var op = layout.operations[id];
    things[id] = display.addOp(op.name, op.x, op.y);
  } // for

  // Process all of the values
  for (var id in layout.values) {
    var val = layout.values[id];
    things[id] = display.addVal(val.name, val.x, val.y);
  } // for
  
  // Process all of the edges
  for (var i = 0; i < layout.edges.length; i++) {
    var edge = layout.edges[i];
    var source = layout.operations[edge.source] || layout.values[edge.source];
    if (!source) {
      throw "Invalid source in edge from " + edge.source + " to " + edge.sink;
    }
    var sink = layout.operations[edge.sink];
    if (!sink) {
      throw "Invalid sink in edge from " + edge.source + " to " + edge.sink;
    }
    display.addEdge(things[source.id], things[sink.id], edge.i);
  } // for
}; // MIST.displayLayout

/**
 * Rebuild a layout from a parsed (or unparsed) JSON string.
 */
MIST.rebuildLayout = function(layout)
{
  if (typeof(layout) == "string")
    return MIST.rebuildlayout(JSON.parse(layout));
  
  if (layout.class != "MIST.Layout")
    throw "Error: Parameter is not a layout.";

  var result = new MIST.Layout();

  MIST.displayLayout(layout, result);
  return result;

  // Add all of the operations
  for (var id in layout.operations) {
    var op = layout.operations[id];
    result.addOp(op.name, op.x, op.y, op.id);
  } // for

  // Add all of the values
  for (var id in layout.values) {
    var val = layout.values[id];
    result.addVal(val.name, val.x, val.y, val.id);
  } // for
  
  // Add all of the edges
  for (var i = 0; i < layout.edges.length; i++) {
    var edge = layout.edges[i];
    result.addEdge(edge.source, edge.sink, edge.i);
  } // for

  // And we're done
  return result;
}; // rebuildLayout

// +--------------------------+--------------------------------------
// | Sample Display Functions |
// +--------------------------+


var sampleDisplay = new Object();

sampleDisplay.displayCount = 2000;
sampleDisplay.addEdge = function(source,sink,i)
{
  console.log("Connect " + source + " to " + sink + "/" + i);
} // displayEdge

sampleDisplay.addOp = function(op,x,y)
{
  var id = "N" + this.displayCount++;
  console.log(id + ": OPERATION " + op + " at (" + x + "," + y + ")");
  return id;
} // displayOp

sampleDisplay.addVal = function(op,x,y)
{
  var id = "N" + this.displayCount++;
  console.log(id + ": VALUE " + op + " at (" + x + "," + y + ")");
  return id;
} 

// +---------------+-------------------------------------------------
// | Sample Layout |
// +---------------+

var sampleLayout = new MIST.Layout();
var add = sampleLayout.addOp("add", 100, 100);
var x = sampleLayout.addVal("x", 50, 50);
var y = sampleLayout.addVal("y", 50, 150);
var tmp = sampleLayout.addOp("sine", 150, 100);
sampleLayout.addEdge(x, add, 0);
sampleLayout.addEdge(y, add, 1);
sampleLayout.addEdge(add, tmp, 0);
