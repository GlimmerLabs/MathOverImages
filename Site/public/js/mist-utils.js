/**
 * mist-utils.js
 *   A few assorted utilities for MIST and other applications.
 *
 * contains(array,val)
 *   Determine if an array contains a value
 * restore(obj)
 *   Restore the prototypes for an object using a .class field to
 *   identify the class.
 */

/**
 * Determine if an array contains a value.
 */
function contains(array, val)
{
  for (var i = 0; i < array.length; i++) {
    if (array[i] == val) {
      return true;
    } // if
  } // for
  return false;
} // contains

/**
 * Restore the prototypes in an object built from JSON.
 */
function restore(obj) {
  // We only work with objects.
  if (typeof(obj) != "object") {
    return;
  } // if it's an object

  // Set up the collection of objects to process
  var unprocessed = [obj];

  // Set up a collection of objects already processed
  var processed = [];

  // While unprocessed things remain
  while (unprocessed.length > 0) {
    // Grab the next value
    var val = unprocessed.pop();

    // Remember that we've processed it.
    processed.push(val);

    // If the object does not yet have a prototype, and it has a
    // class field, set the prototype using that field.
    if ((val.__proto__ == Object.prototype) && (val.class != undefined)) {
      try {
        val.__proto__ = eval(val.class + ".prototype");
      } 
      catch (err) {
        // Do nothing
      }
    } // if it needs a prototype

    // Recurse on the children
    for (var key in val) {
      var child = val[key];
      if ((typeof(child) == "object") && (!contains(unprocessed,child))
          && (!contains(processed,child))) {
        unprocessed.push(child);
      } // if it's a new object
    } // for each child
  } // while
} // restore(obj)
