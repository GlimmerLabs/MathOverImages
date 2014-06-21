/**
 * mist-builtin-functions.js
 *   The collection of builtin functions
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MIST; } catch (err) { MIST = {}; }
if (!MIST.builtins) { MIST.builtins = {}; }

// +----------------------+------------------------------------------
// | Function Information |
// +----------------------+

MIST.builtins.functions = new MIST.Collection();

// I'd like to be able to write 
//   BUILTIN = MIST.builtins.functions.addBuiltinFun
// But that seems to be illegal.
function BUILTIN() {
  MIST.builtins.functions.addBuiltinFun.apply(MIST.builtins.functions, 
    arguments);
}

// +-----------+-----------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Convert a value in the range [-1 .. 1] to a component.
 */
function r2c(r)
{
  return 127.5 + r*127.5;
} // r2c

/**
 * Convert a component to a value in the range [-1 .. 1].
 */
function c2r(c)
{
  return (c/127.5) - 1.0;
} // c2r

/**
 * Restrict a value to a particular range.
 */
function cap(val)
{
  return Math.max(-1, Math.min(1, val));
} // cap

/**
 * Wrap around
 */
function wrap(val)
{
  if (val < -1)
    return wrap (val + 2);
  else if (val > 1)
    return wrap (val - 2);
  else
    return val;
} // wrap
 
// +-------------------+---------------------------------------------
// | Builtin Functions |
// +-------------------+

var abs = function(i) {
  return Math.abs(i);
}; // abs
BUILTIN("abs", "abs", "Compute the absolute value of i", "i", 
  1, 1, "GENERAL");

var average = function(a) {
  return sum.apply(this, arguments)/arguments.length;
}; // average
BUILTIN("average", "ave", "Average 2 or more values", "...",
  2, 20, "GENERAL");
   
var cosine = function(a) {
  return Math.cos(Math.PI * a);
}; // cosine
BUILTIN("cosine", "cos", "Compute the cosine of pi times a", "a",
  1, 1, "GENERAL");

var multiply = function() {
  var product = 1;
  for (var i = 0; i < arguments.length; i++) {
    product *= arguments[i];
  }
  return product;
}; // multiply
BUILTIN("multiply", "mult", "Average 2 or more values", "...",
  2, 20, "GENERAL");

var rgb = function(r,g,b) {
  return [r,g,b];
}; // rgb
BUILTIN("rgb", "rgb", "Generate an RGB color from red, green, and blue components", "r,g,b", 3, 3, "RGB");

var sign = function(range) {
  if (range < 0) 
    return -1;
  else 
    return 1;
}; 
BUILTIN("sign", "sign", "Convert negative numbers to -1 and non-negative nubmers to 1", 1, 1, "GENERAL");

var signz = function(range)
{
  if (range < 0) 
    return -1;
  else if (range > 0)
    return 1;
  else
    return range;
}; 

var sine = function(a) {
    return Math.sin(Math.PI * a);
};
BUILTIN("sine", "sin", "Compute the sine of pi times a", "a",
  1, 1, "GENERAL");

var square = function(i) {
  return i*i;
} // square
BUILTIN("square", "square", "Square i", "i", 1, 1, "GENERAL");

var sum = function() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  } 
  return sum;
}; // sum
BUILTIN("sum", "sum", "Sum 2 or more values.  If the sum would exceed 1, has the value 1.  If the sum would be less than -1, has the value -1", 2, 20, "GENERAL");

var wrapsum = function() {
    return wrap(sum.apply(this, arguments));
};
BUILTIN("wrapsum", "wsum", "Sum 2 or more values, wrapping around from 1 to -1 (or vice versa) if the sum is too large or too small", 2, 20, "GENERAL");
