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

   6. I'm still struggling with type checking.  I had originally assumed
   that RGB functions could only be applied to numeric values.  However,
   something like "lambda (a,b) rgb(first(a),b,b) should expect a to be
   a triplet.  (Of course, I could not allow extracting components of
   rgb and hsv values, which would restore my assumption.)
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MIST = MIST; } catch (err) { MIST = new Object(); }

// +----------------------+------------------------------------------
// | Types of Expressions |
// +----------------------+

MIST.TYPE = {};

MIST.TYPE.RGB = "RGB";
MIST.TYPE.HSV = "HSV";
MIST.TYPE.NUMBER = "NUMBER";

/**
 * Determine the type of an expression, given a series of function
 * and value definitions.
 */
MIST.expType = function(exp,context) {
  // Long term: Scan through the expression.
  // Short term: Look at the top-level operation
  if (exp instanceof MIST.App) {
    if ((exp.operation == "rgb") || (exp.operation == "MIST.rgb")) {
      return MIST.TYPE.RGB;
    }
    else if (exp.operation == "hsv") {
      return MIST.TYPE.HSV;
    }
    else {
      return MIST.TYPE.NUMBER;
    }
  } // if it's an application

  // If it's just a value, we should look at the type of the value.
  // But right now, we assume we'll only have numeric contants and
  // not HSV or RGB constants.
  else {
    return MIST.TYPE.NUMBER;
  } // A value
} // MIST.expType

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

/**
 * Validate an expression:
 *   * Make sure that all of the parameters are of appropriate types.
 *   * Make sure that all of the functions are in the context or are
 *     standard functions.
 *   * Identify the type of the expression.
 *   * Identify whether or not the expression is animated.
 */

/*
MIST.validate = function(name, exp, context) {
  // Validate all of the expressions in the context

  // We'll assume that expressions that already have a type are
  // already validated.  (Trust your client?)
  if (exp.type && (exp.animated != undefined))
    return;

  // Case 1: Applications
  if (exp instanceof MIST.App) {
    var opInfo = context[exp.operator] ||
         MIST.builtins.functions[exp.operator];

    // Make sure that the operator is defined.
    if (!opInfo) {
      throw name + " includes unknown operation " + exp.operation;
    } // if the function is not defined

    // Validate all of the children.  Doing so should also set the
    // type and animated fields of the children.
    for (var i = 0; i < exp.operands.length; i++) {
      MIST.validate(name, exp.operands[i], context);
    } // for

    // Determine whether or not it's animated
    exp.animated = false;
    for (var i = 0; i < exp.operands.length; i++) {
      exp.animated = exp.animated || exp.operands[i].animated;
    } // for

    // For RGB functions, make sure that all parameters are numbers.
    if (opInfo.type == "RGB") {
      exp.type = MIST.TYPE.RGB;
      for (var i = 0; i < exp.operands.length; i++) {
        if (exp.operands[i].type != MIST.TYPE.NUMBER) {
          throw name ": RGB function " + opInfo.name +
              " applied to non-numeric value (" +
              exp.operands[i].toString() + ")";
        } // if an operand is not a number
      } // for
    } // if it's an RGB function

    else if (opInfo.type == "HSV") {
    } // if it's an HSV function

    else if (opInfo.type == "GENERAL") {
      for (var i = 0; i < exp.operands.length; i++) {
      } // for
    } // if it's a general function
    else {
      throw name + " includes unsupported operation " + exp.operation;
    }
  } // if it's an application

  else if (exp instanceof MIST.Val) {
  } // if it's a value
  else {
    throw "Could not validate " + name + " (" + exp + ")";
  } // if it's neither an application nor a value
} // MIST.validate
*/

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
      console.log(this.operands);
      throw "Subexpression " + i +  "is invalid: " + this.operands[i];
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
 * Print the application, with all but the first line indented by
 * indent and with the last line followed by suffix.
 */
MIST.App.prototype.prettyPrint = function(indent,suffix) {
  if (!indent) { indent = ""; }
  if (!suffix) { suffix = "\n"; }
  var arity = this.operands.length;
  var newindent = indent + nspaces(this.operation.length+1);

  // If there are no operands
  if (arity == 0) {
    return this.operation + "()" + suffix;
  } // if there are no operands

  // If there's only one operand
  else if (arity == 1) {
    return this.operation + "(" + this.operands[0].prettyPrint(newindent, ")"+suffix);
  } // if there's only one operand

  // If there are more than one operand
  else {
    var result = this.operation + "(";
    result += this.operands[0].prettyPrint(newindent, ",\n");
    for (var i = 1; i < arity-1; i++) {
      result += newindent + this.operands[i].prettyPrint(newindent, ",\n");
    } // for
    result += newindent + this.operands[arity-1].prettyPrint(newindent, ")" + suffix);
    return result;
  } // has operands
}; // MIST.App.prettyPrint


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
 * Print a value.
 */
MIST.Val.prototype.prettyPrint = function(indent,suffix) {
  if (!indent) { indent = ""; }
  if (!suffix) { suffix = "\n"; }
  return this.name + suffix;
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
} // MIST.Collection.prototype.keys

/**
 * Clear the contents of the collection.
 */
MIST.Collection.prototype.clear = function() {
  this.values = {};
} // MIST.Collection.prototype.clear

/**
 * Add an object, which we will then index by name (we assume that all
 * objects have a .name field).
 *
 * If there's a .display field, also index the object by that value
 */
MIST.Collection.prototype.add = function(obj) {
  this.values[obj.name] = obj;
  if (obj.display) {
    this.values[obj.display] = obj;
  }
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
  this.add(new MIST.FunInfo(name,display,about,params,
      {type:"GENERAL", minarity:numParams, maxArity:numParams, code:code}));
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

/**
 * Patterns for alphabetic and digit characters.
 */
MIST.alpha = /[a-zA-Z]/;
MIST.digit = /[0-9]/;

/**
 * Token type.
 */
MIST.tokens = Object.freeze({UNKNOWN:0, OPEN:1, CLOSE:2, COMMA:3,
  ID:4, NUM:5, EOF:6});

/**
 * A token: One of the basic building blocks.
 */
MIST.Token = function(type,text,row,col)
{
  this.type = type;
  this.text = text;
  this.row = row;
  this.col = col;
} // MIST.Token

/**
 * An object that lets us read input one character at a time.
 */
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
      else if (/[0-9-.]/.test(ch.text)) {
        var num = ch.text;
        var c;
        var dot = (ch.text == ".");
        while ((c = input.peek()) &&
            (/[0-9]/.test(c) || (!dot && (c == ".")))) {
          input.next();
          num += c;
          if (c == ".") { dot = true; }
        } // while
        if (num == "-") {
          MIST.parseError("Singleton negative signs not allowed.",
            ch.row, ch.col);
        } // if we only saw a negative sign
        ch.type = MIST.tokens.NUM;
        ch.text = num;
        tokens.push(ch);
      }
      else if (/[A-Za-z]/.test(ch.text)) {
        var col = ch.col;
        var row = ch.row;
        var id = ch.text;
        var c;
        while ((c = input.peek()) && /[A-Za-z0-9.]/.test(c)) {
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

/**
 * Peek at the type of the next token.
 */
peekType = function(tokens) {
  if (!tokens[0])
    return MIST.tokens.UNKNOWN;
  else
    return tokens[0].type;
} // peekType

/**
 * Create a regular expression for sanitizing MIST code.
 */
MIST.createSanitizer = function() {
  var resultingRE = ""
  for(var i = 0; i<arguments.length-1;i++) {
    resultingRE += "(?:"+arguments[i]+")|"
  }
  resultingRE += "(?:"+arguments[arguments.length - 1]+")"
  var evaluated = new RegExp(resultingRE, "g");
  return evaluated
}

/**
 * Sanitize MIST code.
 */
MIST.sanitize = function(RE, string) {
  var result = string.match(RE).join("");
  return result
}

/**
 * Parse MIST code into a MIST expression.
 */
MIST.parse = function(str,prefix) {
  if (!prefix) { prefix=""; }

  // The kernel.  Does the work, also recurses.
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

    // Is it a number?
    if (tok.type == MIST.tokens.NUM) {
      return new MIST.Val(tok.text);
    } // MIST.tokens.NUM

    // Only identifiers and numbers are allowed at the top level.
    else if (tok.type != MIST.tokens.ID) {
      MIST.parseError("Unexpected token (" + tok.text + ")", tok.row, tok.col);
    } // if it's not an identifier

    // Is it a function call?
    else if (peekType(tokens) == MIST.tokens.OPEN) {
      tokens.shift();
      var children = [];
      while (peekType(tokens) != MIST.tokens.CLOSE) {
        children.push(kernel(tokens));
        if (peekType(tokens) == MIST.tokens.COMMA) {
          tokens.shift();
          if (peekType(tokens) == MIST.tokens.CLOSE) {
            MIST.parseError("Close paren follows comma", tokens[0].row, tokens[0].col);
          } // if there's a close paren after a comma
        } // if there's a comma
      } // while
      tokens.shift();
      return new MIST.App(prefix + tok.text, children);
    } // if it's a function call

    // Otherwise, it's a singleton
    else {
      return new MIST.Val(tok.text);
    } // if it's a singleton
  }; // kernel

  var tokens = MIST.tokenize(str);
  var result = kernel(tokens);
  if ((tokens.length > 1) || (peekType(tokens) != MIST.tokens.EOF)) {
    MIST.parseError("Extra text after expression", tokens[0].row,
      tokens[0].col);
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


function gifTime()
{
  var temp = new Date();
  this.ms = temp.getMilliseconds();
  this.s = temp.getSeconds();
  this.m = temp.getMinutes();
  this.h = temp.getHours();
  this.d = 0;
  this.y = 0;
} // gifTime


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
 * Evaluate an expression in an environment.  (Intended as a bit of an
 * experiment for what we're likely to do in the render function.)
 */
function evalExp(exp)
{
  var env = getArgs(arguments,1);
  for (var i = 0; i < env.length; i++)
    {
      fun = env[i];
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

// +-----------------------+-----------------------------------------
// | Interpreting MIST Code |
// +-----------------------+

/**
 * MISTbody2fun
 *   Given the body of something that uses "raw" MIST, return the
 *   corresponding function.  (Note that we will generally not
 *   use "raw" MIST, but it's helpful for testing.)
 */
function MISTbody2fun(body)
{
  return eval("(function (x,y,t,m) { return " + body + "})");
} // MISTbody2fun

/**
 * Convert a MIST expression to something that returns an RGB
 * list.  env is the 'environment' - a mapping of names to MIST
 * expressions
 */
MIST.expToRGB = function(name,exp,env) {
  var type = MIST.expType(exp, env);
  var tmp = [];
   // Contexts as objects
  for (var c in env) {
    tmp.push("var " + c + " = " + env[c].toString());
  }
  var envCode = tmp.join(";");

  // For RGB functions
  //   function(x,y,t,m,p) {
  //      var env0 = def0;
  //      ...
  //      return (exp).map(r2c);
  //   };
  if (type == MIST.TYPE.RGB) {
    var code = "(function(x,y,t,m,p) { " + envCode +
        "; return (" + exp.toString() + ").map(r2c); })";
     //console.log(code);
    return eval(code);
  }
  // For B&W functions
  //    function(x,y,t,m,p) {
  //      var env0 = def0;
  //      ...
  //      var _tmp_ = r2c(-exp);
  //      return [_tmp_, _tmp_, _tmp];
  else if (type == MIST.TYPE.NUMBER) {
    var code = "(function(x,y,t,m,p) { " + envCode +
        "; var _tmp_ = r2c(-" + exp.toString() +
        "); return [_tmp_, _tmp_, _tmp_]; })";
    //console.log(code);
    return eval(code);
  }
  else {
    throw "Cannot handle expressions of type " + type;
  }
} // MIST.expToRGB

/*
  Some HSV notes for expToRGB
        h = r2h(cap(hfun(x,y,time,mouse)));
        s = r2sv(cap(sfun(x,y,time,mouse)));
        v = r2sv(cap(vfun(x,y,time,mouse)));

        var rgb = [];
        rgb = hsv2rgb(h, s, v);
 */

// +---------------------+-------------------------------------------
// | Comparing Functions |
// +---------------------+

/**
 * Maximum 'distance' for two components to be considered the same.
 * Remember that components have values in the range 0..255
 */
MIST.COMPONENT_EPSILON = 10;

/**
 * Percentage of pixels that must be similar for two functions to be
 * the same.
 */
MIST.PERCENT_MATCH = 0.95;

/**
 * Compare two functions, using their code.  Returns true
 * if they are similar and false if they are not.
 */
MIST.compareFun = function(code1,code2) {
  // Determine if we might have interactive images
  var timed = (code1.indexOf("t.") >= 0) || (code2.indexOf("t.") >= 0);
  var mouse = (code1.indexOf("m.") >= 0) || (code2.indexOf("m.") >= 0);

  // Pick the right comparison to use
  if (timed && mouse) {
    return MIST.compareFunCore(code1,code2,17);
  }
  else if (timed) {
    return MIST.compareFunCore(code1,code2,9);
  }
  else if (mouse) {
    return MIST.compareFunCore(code1,code2,9);
  }
  else {
    return MIST.compareFunCore(code1,code2);
  }
}; // MIST.compareFun

/**
 * Repeatedly compare code for two functions.  (We take advantage of
 * randomness in compareFunOnce to handle different mice and times.)
 */
MIST.compareFunCore = function(code1,code2,times) {
  if (!times) { times = 1; }
  var count = 0;
  var sum = 0;
  for (count = 0; count < times; count++) {
    sum += MIST.compareFunOnce(code1,code2);
  } // for
  return (sum/count >= MIST.PERCENT_MATCH);
} // compareFunCore

/**
 * Compare two functions, using their code.  Returns the percentage of
 * pixels that are 'close enough'.  (See the constants above.)
 */
MIST.compareFunOnce = function(code1,code2,time,mouse) {
  // Are two compnents similar?
  var similar = function(a,b) {
    var result = Math.abs(a-b) <= MIST.COMPONENT_EPSILON;
    // console.log("similar",a,b,result);
    return result;
  }; // similar

  // A random component
  var rand = function() {
    var result = 2*Math.random() - 1;
    return result;
  }; // rand

  // Fill in the optional parameters
  if (!time) {
    time = { s: rand(), m:rand(), h:rand(), d:rand() };
  }
  if (!mouse) {
    mouse = { x:rand(), y:rand(), X:rand(), Y:rand() };
  }

  // Parse the two pieces of code.
  try {
    var parsed1 = MIST.parse(code1);
    var parsed2 = MIST.parse(code2);
  } // try
  catch (err) {
    // If either fails to parse, we assume nothing is in common
    return 0;
  } // catch

  // Convert the two pieces of code into functions
  try {
    var fun1 = MIST.expToRGB("f1",parsed1,{});
    var fun2 = MIST.expToRGB("f2",parsed2,{});
  } // try
  catch (err) {
    // If either fails to convert, we assume nothing is in common
    return 0;
  } // catch

  // Set up counters
  var pixels = 0;
  var matches = 0;

  // Iterate through positions
  for (var x = -1; x <= 1; x += 0.1) {
    for (var y = -1; y <= 1; y+= 0.1) {
      var c1 = fun1(x, y, time, mouse);
      var c2 = fun2(x, y, time, mouse);
      pixels++;
      if (similar(c1[0],c2[0]) && similar(c1[1],c2[1]) && similar(c1[2],c2[2])) {
        matches++;
      } // if
    } // for y
  } // for x

  // Determine the percentage that match
  return matches/pixels;
} // compareFunOnce

/**
 * Compare code for two functions that use the mouse (but not time).
 * DEPRECATED.  We use randomness instead.
 */
MIST.compareFunMouse = function(code1,code2) {
  var count = 0;        // The count of the number of tests we do.
  var sum = 0;          // The sum of the percentages

  for (var x = -1; x <= 1; x += 0.25) {
    for (var y = -1; y <= 1; y += 0.25) {
      count++;
      sum += MIST.compareFunOnce(code1,code2,undefined,{x:x,y:y});
    } // for y
  } // for x

  return (sum/count >= MIST.PERCENT_MATCH);
} // compareFunMouse

/**
 * Compare code for two functions that use the time (but not mouse)
 * DEPRECATED.  We use randomness instead.
 */
MIST.compareFunTime = function(code1,code2) {
  var count = 0;        // The count of the number of tests we do.
  var sum = 0;          // The sum of the percentages

  for (var m = -1; m <= 1; m += 0.25) {
    for (var s = -1; s <= 1; s += 0.25) {
      count++;
      sum += MIST.compareFunOnce(code1,code2,{s:s,m:m,h:0,d:0});
    } // for y
  } // for x

  return (sum/count >= MIST.PERCENT_MATCH);
} // compareFunTime

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

var pp = function(str) {
  console.log(MIST.parse(str).prettyPrint());
}
