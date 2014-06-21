/**
 * mist-functions.js
 *   Representations of functions, expressions, images, and so on
 *   and so forth.
 */

// +-------+---------------------------------------------------------
// | Notes |
// +-------+

/*
   1. We represent a variety of kinds of "things".

   a. Basic expressions (class MIST.Val), which include not only the
   built-in values, such as numbers, x, y, t.m, and so on and so forth,
   but also any *named* values (either parameters to functions or values
   we've taken from other folks).

   b. Compound expressions (class MIST.App), which are the application
   of an operation (function name) to zero or more expressions.

   c. Functions (class MIST.Fun), which add a list of the operand names.

   2. When we evaluate an expression, we may also have to set up the
   context in which to evaluate that expression (e.g., by evaluating
   a variety of name/expression pairs).

   3. All of these objects have a toString and a prettyPrint(indent)
   method.

   4. When you want to store any of these objects in the database, use
   `JSON.stringify` on the object.  When you want to restore the object,
   use `restore(JSON.parse(str))`, where `restore` comes from 
   `mist-utils.js`.  (Unfortunately, JSON.parse does not restore prototypes,
   so we need to do that by hand.)

   Alternately, use MIST.rebuild on the resulting string, but that
   approach is deprecated.

   5. Many of the MIST functions rely on a MIST object.  We start each
   file with instructions to build that object.

 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MIST = MIST; } catch (err) { MIST = new Object(); }

// +-------------------+---------------------------------------------
// | General Utilities |
// +-------------------+

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
 * I like varargs procedures, but sometimes I want to pass in an 
 * array instead.  So, call getArgs with the arguments 'array' and
 * the starting point for extracting the array.
 */
function getArgs(args, start)
{
  if (!start) { start = 0; }
  var arglen = args.length - start;
  if ((arglen == 1) && (args[start] instanceof Array)) {
    return args[start];
  } // if there's only one argument, and it's an array.
  else {
    var result = Array(arglen);
    for (var i = start; i < args.length; i++)
      result[i-start] = args[i];
    return result;
  } // getArgs
} // getArgs

/**
 * Create a string of n copies of ch
 */
function ncopies(n, ch)
{
  return Array(n+1).join(ch);
} // ncopies

/**
 * Create a string of n spaces.
 */
function nspaces(n)
{
  return ncopies(n, " ");
} // nspaces

// +----------------+------------------------------------------------
// | MIST Utilities |
// +----------------+

/**
 * Determine the depth of an expression.  Assumes that the expression has
 * no loops. 
 */
MIST.depth = function(exp)
{
  // If it's an application
  if (exp instanceof MIST.App) {
    // Find the deepest child
    var deepest = 0;
    for (var i = 0; i < exp.operands.length; i++) {
      deepest = Math.max(deepest, MIST.depth(exp.operands[i]));
    } // for
    // And add 1
    return 1 + deepest;
  } // if it's an application

  // If it's not an application
  else {
    // Then the depth is 1
    return 1;
  } // if it's anything but an application
} // MIST.depth

/**
 * Determine if there is a loop in an expression.  (There should never
 * be, but ...)
 */
MIST.hasLoop = function(val, seen)
{
  if (!seen) { seen = []; }
  if (contains(seen,val)) {
    return true;
  }
  if (val instanceof MIST.App) {
    seen.push(val);
    for (var i = 0; i < val.operands.length; i++) {
      if (MIST.hasLoop(val.operands[i], seen)) {
        return true;
      } // if
    } // for
    seen.pop(val);
  }
  return false;
} // MIST.hasLoop

/**
 * Determine if an object is a MIST expression.
 */
MIST.isExp = function(val) 
{
  return ((val instanceof MIST.Val) || (val instanceof MIST.App));
}; // MIST.isExp

/**
 * Determine if an object is a MIST function.
 */
MIST.isFun = function(val)
{
  return (val instanceof MIST.Fun);
}; // MIST.isFun

/**
 * Rebuild one of the MIST objects from JSON (or parsed JSON).
 */
MIST.rebuild = function(obj) {
  // If we start with a string, we assume it's JSON.
  if (typeof(obj) == "string") {
    try {
      return MIST.rebuild(JSON.parse(obj));
    } // try
    catch (err) {
      return obj;
    } // catch
  } // if it's a string

  // Handle the standard MIST. objects
  else if (obj.class == "MIST.Val") {
    return new MIST.Val(obj.name);
  }
  else if (obj.class == "MIST.App") {
    var operands = Array(obj.operands.length);
    for (var i = 0; i < obj.operands.length; i++) {
      operands[i] = MIST.rebuild(obj.operands[i]);
    } // for
    return new MIST.App(obj.operation, operands);
  }
  else if (obj.class == "MIST.Fun") {
    return new MIST.Fun(obj.parameters, MIST.rebuild(obj.body));
  }

  // Handle everything else
  return obj;
} // MIST.rebuild

/**
 * Determine if two expressions are the same
 */
MIST.sameExp = function(a,b,checkedLoops)
{
  // We'll assume that expressions with loops are different.  (We can 
  // probably get partial similarity, but I'm pretty sure that the
  // Halting Problem suggests that I can't determine equality of
  // arbitrary loops, so I might as well not try.)
  if (!checkedLoops && (MIST.hasLoop(a) || MIST.hasLoop(b)))
    return false;

  // Two values are the same if the have the same name
  if ((a instanceof MIST.Val) && (b instanceof MIST.Val)) {
    return a.name == b.name;
  } // two values

  // Two expressions are the same if they have the same operations
  // and the same operands.
  if ((a instanceof MIST.App) && (b instanceof MIST.App)) {
    if (a.operation != b.operation) {
      return false;
    } // different operations
    if (a.operands.length != b.operands.length) {
      return false;
    } // different numbers of operands
    for (var i = 0; i < a.operands.length; i++) {
      if (!MIST.sameExp(a.operands[i], b.operands[i], true)) {
        return false;
      } // if the operands are different
    } // for
    // The operators and operands are the same.  They must be the same.
    return true;
  } // two expressions

  // Anything else is different
  return false;
} // MIST.sameExp

// +-----------------+-----------------------------------------------
// | Class: MIST.App |
// +-----------------+

/**
 * The application of an operation to zero or more operands.
 */
MIST.App = function(operation) {
  this.class = "MIST.App";
  this.operation = operation;
  this.operands = getArgs(arguments,1);

  // Validate the operands
  for (var i = 0; i < this.operands.length; i++) {
    if (!MIST.isExp(this.operands[i])) {
      throw "Subexpression " + i + "is invalid: " + this.operands[i];
    } // if
  } // for

  // Build the code for this expression
  if (this.operands.length == 0)
    this.code = this.operation + "()";
  else
    this.code = this.operation + "(" + this.operands.join(",") + ")";
} // MIST.App

/**
 * Convert the application to a string.
 */
MIST.App.prototype.toString = function() { 
  return this.code; 
};

/**
 * Print the application, indented by some number of spaces.
 */
MIST.App.prototype.prettyPrint = function(indent) {
  if (!indent) { indent = ""; }

  if (this.operands.length == 0) {
    return indent + this.operation + "()\n";
  }
  else { // if there are operands
    var newindent = indent + nspaces(this.operation.length);
    var pp = function(val) { return val.prettyPrint(newindent+" ") };
    return indent + this.operation 
       + "(\n" 
           + this.operands.map(pp).join(",")
           + newindent + ")\n";
  } // has operands
};

// +-----------------+-----------------------------------------------
// | Class: MIST.Fun |
// +-----------------+

/**
 * MIST functions are expressions that have parameters.
 */
MIST.Fun = function(parameters, body) 
{
  this.class = "MIST.Fun";
  // Note: Need to validate inputs.
  this.parameters = parameters;
  this.body = body;

  // Build the code for this function.
  this.code = "(function "
            + "(" + this.parameters.join(",") + ") "
            + "{ return " + this.body.toString() + "})";

} // MIST.Fun

/**
 * Convert to a string.
 */
MIST.Fun.prototype.toString = function() {
  return this.code;
} // toString

/**
 * Pretty print.
 */
MIST.Fun.prototype.prettyPrint = function (indent) {
  return this.body.prettyPrint(indent); 
};

/**
 * Convert to an executable Javascript function.
 */
MIST.Fun.prototype.toFunction = function() { 
  var code = "var " + this.name  + " = " + this.toString();
  eval(code);
  return eval(this.name);
};

// +-----------------+-----------------------------------------------
// | Class: MIST.Val |
// +-----------------+

/**
 * A basic value.  (Either a number of the name of something.)
 */
MIST.Val = function(name) {
  this.class = "MIST.Val";
  this.name = name;
  this.code = "" + name;
} // MIST.Val

/**
 * Convert to a string.
 */
MIST.Val.prototype.toString = function() { 
  return this.code; 
}; // MIST.Val.prototype.toString

/**
 * Print nicely indented.
 */
MIST.Val.prototype.prettyPrint = function(indent) {
  if (!indent) { indent = ""; }
  return indent + this.name + "\n";
}; // MIST.Val.prettyPrint

// +-----------------------+-----------------------------------------
// | Class: MIST.ImageGray |
// +-----------------------+

/**
 * Constructor:
 *   MIST.ImageGrey
 * Parameters:
 *   exp, a MIST. expression describing the image
 *   context, a bunch of hashes
 * Purpose:
 *   Create the description of a greyscale image.
 */
MIST.ImageGrey = function(exp)
{
  this.exp = exp;
  this.context = getArgs(arguments,1);
} // MIST.ImageGrey

// +------------------------+----------------------------------------
// | Class: MIST.Collection |
// +------------------------+

/*
  General collections of information.  Used primarily for storing
  the builtin functions, the user functions, the builtin values,
  and the user values.
 */

/**
 * Constructor.
 */
MIST.Collection = function(name, about) {
  this.class = "MIST.Collection";
  this.name = name;
  if (!this.name) { 
    this.name = "<Untitled>";
  }
  this.about = about;
  if (!this.about) {
    this.about = "";
  }
  this.values = {};
} // MIST.Collection

/**
 * Get all of the keys.
 */
MIST.Collection.prototype.keys = function() {
  return Object.keys(this.values);
} // MIST.Collecdtion.prototype.keys

/**
 * Clear the contents of the collection.
 */
MIST.Collection.prototype.clear = function() {
  this.values = {};
} // MIST.Collection.prototype.clear

/**
 * Add an object.  (We assume all objects have names.)
 */
MIST.Collection.prototype.add = function(obj) {
  this.values[obj.name] = obj;
} // MIST.Collection.prototype.add

/**
 * Look up an object.
 */
MIST.Collection.prototype.get = function(name) { 
  return this.values[name];
} // MIST.Collection.prototype.get

/**
 * Add a user function.
 */
MIST.Collection.prototype.addUserFun = function(name,display,about,params,code) { 
  var numParams = 0;
  if (params) {
    numParams = params.split(",").length;
  }
  this.add(new MIST.FunInfo(name,display,about,params,{code:code}));
};

/**
 * Add a user value
 */
MIST.Collection.prototype.addUserVal = function(name,display,about,code) {
  this.add(new MIST.ValInfo(name,display,about,code));
}; // addUserVal

/**
 * Add a builtin function.
 */
MIST.Collection.prototype.addBuiltinFun = function(name,display,about,params,minarity,maxarity,type) {
  this.add(new MIST.FunInfo(name, display, about, params,
    {minarity:minarity, maxarity:maxarity, type:type}));
} // addBuiltinFun

// +-------------------+---------------------------------------------
// | Value Information |
// +-------------------+

MIST.ValInfo = function(name, display, about, other) {
  this.class = "MIST.ValInfo";
  this.name = name;
  this.display = display;
  this.about = about;
  for (var key in other) {
    this[key] = other[key];
  } // for
} // MIST.ValInfo

// +----------------------+------------------------------------------
// | Function Information |
// +----------------------+

/**
 * A bit of information on the installed functions.
 */
MIST.FunInfo = function(name, display, about, params, other) {
  this.class = "MIST.FunInfo";
  this.name = name;
  this.display = display;
  this.about = about;
  this.params = params;
  for (var key in other) {
    this[key] = other[key];
  } // for
} // MIST.FunInfo

// +---------+-------------------------------------------------------
// | Parsing |
// +---------+

MIST.alpha = /[a-zA-Z]/;

MIST.tokens = Object.freeze({UNKNOWN:0, OPEN:1, CLOSE:2, COMMA:3, 
  ID:4, NUM:5, EOF:6});

MIST.Token = function(type,text,row,col)
{
  this.type = type;
  this.text = text;
  this.row = row;
  this.col = col;
} // MIST.Token

MIST.Input = function(text)
{
  this.text = text;
  this.pos = 0;
  this.row = 1;
  this.col = 1;
  this.len = text.length;

  // Determine if we're at the end of the input
  this.eof = function() {
    return this.pos >= this.len;
  } // eof

  // Peek at the next input character
  this.peek = function() {
    if (this.eof())
      return undefined;
    else
      return this.text[this.pos];
  }; // peek

  // Get the next character
  this.next = function() {
    var c = this.peek();
    if (c == undefined) {
      return undefined;
    }
    else {
      var result = new MIST.Token(MIST.tokens.UNKNOWN, c, 
          this.row, this.col);
      ++this.pos;
      ++this.col;
      if (c == "\n") {
        ++this.row;
        this.col = 1;
      }
      return result;
    }
  } // next()

  // Skip over whitespace
  this.skipWhitespace = function() {
    var ws = /[ \t\n]/;
    while (ws.test(this.peek())) {
      this.next();
    } // while
  } // skipWhitespace
} // MIST.Input

/**
 * Throw a parse or tokenize error.
 */
MIST.parseError = function(text, row, col) {
  if (row) MIST.row = row;
  if (col) MIST.col = col;
  throw "Error at line " + MIST.row + ", column " + MIST.col + ": " + text;
} // parseError

/**
 * Tokenize a string.
 */
MIST.tokenize = function(str) {
  var tokens = [];
  var input = new MIST.Input(str);
  input.skipWhitespace();
  while (!input.eof())
    {
      var ch = input.next();
      if (ch.text == "(") {
        ch.type = MIST.tokens.OPEN;
        tokens.push(ch);
      }
      else if (ch.text == ")") {
        ch.type = MIST.tokens.CLOSE;
        tokens.push(ch);
      }
      else if (ch.text == ",") {
        ch.type = MIST.tokens.COMMA;
        tokens.push(ch);
      }
      else if (MIST.alpha.test(ch.text)) {
        var col = ch.col;
        var row = ch.row;
        var id = ch.text;
        var c;
        while ((c = input.peek()) && MIST.alpha.test(c)) {
          id += c;
          input.next();
        } // while
        ch.type = MIST.tokens.ID;
        ch.text = id;
        tokens.push(ch);
      } // if it's an id
      else {
        MIST.parseError("Invalid character (" + ch.text + ")", ch.row, ch.col);
      } // else
      input.skipWhitespace();
    } // while
  tokens.push(new MIST.Token(MIST.tokens.EOF, "<eof>", input.row, input.col));
  return tokens;
} // MIST.tokenize

peekType = function(tokens) {
  if (!tokens[0])
    return MIST.tokens.UNKNOWN;
  else
    return tokens[0].type;
} // peekType

MIST.parse = function(str) {
  var kernel = function(tokens) {
    // This should never happen, but let's be safe.
    if (tokens.length == 0) {
      MIST.parseError("Unexpected end of input", 0, 0);
    }

    var tok = tokens.shift();

    // Check for end of input
    if (tok.type == MIST.tokens.EOF) {
      MIST.parseError("Unexpected end of input", tok.row, tok.col);
    }

    // Only identifiers are allowed at the top level.
    if (tok.type != MIST.tokens.ID) {
      MIST.parseError("Unexpected token (" + tok.text + ")", tok.row, tok.col);
    } // if it's not an identifier
  
    // Is it a function call?
    if (peekType(tokens) == MIST.tokens.OPEN) {
      tokens.shift();
      var children = [];
      while (peekType(tokens) != MIST.tokens.CLOSE) {
        children.push(kernel(tokens));
        if (peekType(tokens) == MIST.tokens.COMMA) {
          tokens.shift();
          if (peekType(tokens) == MIST.tokens.CLOSE) {
            MIST.parseError("Close paren follows comma", tokens[0].col, tokens[0].row);
          } // if there's a close paren after a comma
        } // if there's a comma
      } // while
      tokens.shift();
      return new MIST.App(tok.text, children);
    } // if it's a function call
  
    // Otherwise, it's a singleton
    else {
      return new MIST.Val(tok.text);
    } // if it's a singleton
  }; // kernel

  var tokens = MIST.tokenize(str);
  var result = kernel(tokens);
  if ((tokens.length > 1) || (peekType(tokens) != MIST.tokens.EOF)) {
    MIST.parseError("Extra text after expression", tokens[0].col,
      tokens[0].row);
  } 
  return result;
} // MIST.parse

// +-------------------+---------------------------------------------
// | Simulated Objects |
// +-------------------+

/**
 * A mouse for cases in which someone has not passed in the mouse.
 */
function SimulatedMouse()
{
  this.x = 0;
  this.y = 0;
} // SimulatedMouse()

/**
 * A time for cases in which someone has not passed in the time.
 */
function SimulatedTime()
{
  this.s = 0;
  this.m = 0;
  this.h = 0;
  this.d = 0;
  this.y = 0;
} // SimulatedTime

// +-------------+---------------------------------------------------
// | Quick Hacks |
// +-------------+

/**
 * Display a context.
 */
function displayContext(context)
{
  var args = getArgs(arguments);
  for (var i = 0; i < args.length; i++) {
    console.log(args[i]);
  } // for
} // displayContext

/**
 * Evaluate an expression in a context.  (Intended as a bit of an
 * experiment for what we're likely to do in the render function.)
 */
function evalExp(exp)
{
  var context = getArgs(arguments,1);
  for (var i = 0; i < context.length; i++)
    {
      fun = context[i];
      console.log(fun);
      var code = fun.name + " = " + fun.toString();
      console.log(code);
      eval(code);
    }
  return eval(exp.toString());
} // evalExp

/**
 * Test getArgs
 */
function testArgs()
{
  return getArgs(arguments, 1);
} // testArgs

// +--------------------+--------------------------------------------
// | Sample Expressions |
// +--------------------+

var plus = function() 
  {
    var result = 0;
    for (var i = 0; i < arguments.length; i++)
      result += arguments[i];
    return result;
  };

var exp0 = new MIST.Val(1);
var exp1 = new MIST.App("plus", new MIST.Val("x"), new MIST.Val("y"));
var exp1a = new MIST.App("plus", new MIST.Val("x"), new MIST.Val("y"));
var exp2 = new MIST.App("times", exp0, exp1, exp1)
var exp3 = new MIST.Val("x");

var fun0 = new MIST.Fun([], exp0);

var fun1 = new MIST.Fun(["i"],
                       new MIST.App("plus", 
                                   new MIST.Val(3),
                                   new MIST.Val("i")));

var fun2 = new MIST.Fun(["i"],
                       new MIST.App("plus", 
                                    new MIST.Val("x"),
                                    new MIST.Val("i")));

