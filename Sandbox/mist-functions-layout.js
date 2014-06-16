/**
 * mist-functions-layout
 *   Instructions for laying out mist functions.
 */

// +-------+-----------------------------------------------------------
// | Setup |
// +-------+

try { MIST = MIST; } catch (err) { MIST = new Object(); }

// +----------+--------------------------------------------------------
// | Settings |
// +----------+

/**
 * The horizontal offset between "columns".
 */
MIST.hoff = 30;

/**
 * The vertical offset between "rows".
 */
MIST.voff = 20;

// +-----------+-----------------------------------------------------
// | Functions |
// +-----------+

/**
 * Make a basic layout for an expression.
 */
MIST.basicLayout = function(exp)
{
  // Prepare a layout for the data
  var layout = new MIST.Layout();
  // Determine the depth of the expression
  var depth = MIST.depth(exp);
  // Set up an array to keep track of how many nodes there are at
  // each level
  var counts = [];
  for (var i = 0; i <= depth; i++) {
    counts[i] = 1;
  } // for
  // We're going to need to recurse through the tree, so set up a
  // kernel to do so.  The kernel returns the id of the current
  // expression
  var kernel = function(exp,depth) {
    if (exp instanceof MIST.Val) {
      return layout.addVal(exp.name, 
                           MIST.hoff*depth, 
                           MIST.voff*(counts[depth]++));
    } // if it's a value
    else if (exp instanceof MIST.App) {
      var id = layout.addVal(exp.operation, 
                             MIST.hoff*depth, 
                             MIST.voff*(counts[depth]++));
      for (var i = 0; i < exp.operands.length; i++) {
        var tmp = kernel(exp.operands[i], depth-1);
        layout.addEdge(tmp, id, i);
      } // for
      return id;
    } // if it's an application
    else {
      throw "Invalid expression."
    } // if it's anthing else
  }; // kernel

  // Run the kernel
  kernel(exp,depth);
} // MIST.baseLaout
