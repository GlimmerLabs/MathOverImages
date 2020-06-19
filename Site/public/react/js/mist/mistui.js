/**
 * The MIST UI library.  Available at
 *   http://glimmer.grinnell.edu/js/mistui.js
 *   http://glimmer.grinnell.edu/js/ugly.mistui.js
 *
 * MIST is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

1;
/**
 * mistui-animation.js
 *   Some support for animating/rendering images in MIST.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

// try { MIST: } catch (err) { MIST = {}; }
if (!MIST.ui) { MIST.ui = {}; }
MIST.ui.animator = {};

// +-----------+-----------------------------------------------------
// | Animation |
// +-----------+

/**
 * The number of frames per second.
 */
MIST.ui.animator.fps = 30;

/**
 * Are we animating our image?
 */
MIST.ui.animator.on = true;

/**
 * The increments we use when simulating parameters.
 */
MIST.ui.animator.increments = [19,23,29,31,37,41,43,47,53,59,61,67,71].map(function (val) { return val/3000; });

/**
 * When was the last time we drew a frame?  (Used primarily when we
 * need to re-render a particular frame.)
 */
MIST.ui.animator.time = { t:0, m:0 };

/**
 * Stop the animation from running.
 */
MIST.ui.stopAnimation = function() {
  MIST.ui.animator.on =false;
} // stopAnimation

/**
 * Start the animation running.
 */
MIST.ui.startAnimation = function(exp,params,context,canvas,log)
{
  // Set up a hash for the parameters
  MIST.ui.animator.params = {};
  if (params != "") {
    var tmp = params.split(",");
    for (var i = 0; i < tmp.length; i++) {
      if (params[i] != "") {
        MIST.ui.animator.params[tmp[i]] = -1;
      } // if
    } // for
  } // if (

  MIST.parse(exp);
  // Get the remaining info
  try {
    MIST.ui.animator.exp = MIST.parse(exp);
    MIST.ui.animator.on = exp.indexOf("t.") > -1;       // HACK!
    MIST.ui.animator.context = context;
    MIST.ui.animator.canvas = canvas;
    MIST.ui.animator.log = log;
    MIST.ui.animator.frame();
  }
  catch (err) {
    log(err);
    throw err;
  }
} // startAnimation

/**
 * Do one frame of the animation.
 */
MIST.ui.animator.frame = function() {
  // Update the values of the parameters
  var paramInfo = "";
  var params = MIST.ui.animator.params;
  var i = 0;
  for (var p in params) {
    var newval = wrapsum(params[p], MIST.ui.animator.increments[i++]);
    params[p] = newval;
    MIST.ui.animator.context[p] = newval;
    paramInfo += p + ": " + newval + "\n";
  } // for
  var context = MIST.ui.animator.context;
  // Inform the user
  MIST.ui.animator.log(paramInfo);
  // Make the frame
   


  if (MIST.ui.animator.on) {
    MIST.ui.animator.time = MIST.render(MIST.ui.animator.exp, context,
        MIST.ui.animator.canvas, 200, 200);   
  }
 else {
    MIST.ui.animator.time = MIST.render(MIST.ui.animator.exp, context,
        MIST.ui.animator.canvas);
  }
  // And schedule the next frame
  if (MIST.ui.animator.on) {
    setTimeout(MIST.ui.animator.frame, 1000/MIST.ui.animator.fps);
  }
} // MIST.ui.animator.frame()
/**
 * mistui-animator.js
 *   Some support for animating/rendering images in MIST.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

// try { MIST: } catch (err) { MIST = {}; }
if (!MIST.ui) { MIST.ui = {}; }

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

/**
 * The pattern to identify builtins (or lack thereof).  Used for the
 * simple validation strategy.
 */
var builtinsPattern = /(?:abs|avg|cos|mult|rgb|sign|neg|signz|sin|square|sum|wsum|null|mistif|t.s|t.m|t.h|t.d|m.x|m.y)|[0-9xy().,\-]/g
/**
 * Adding backwards compatibilty for request animation frame.
 */
window.requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || function(fun) {
  setTimeout(fun, 1000 / 30);
}
/**
 * The number of animators we've created.
 */
var _animatorCount_ = 0;

// +---------+---------------------------------------------------------
// | Helpers |
// +---------+

/**
 * Make the mouse handler with a particular animator.
 */
function makeMouseMoveHandler(animator) {
  return function(evt) {
    var rect = animator.canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left - animator.left;
    var y = evt.clientY - rect.top - animator.top;
    var scaledX = (x * 2.0/animator.width) - 1;
    var scaledY = (y * 2.0/animator.height) - 1;
    if ((scaledX < -1) || (scaledX > 1) || (scaledY < -1) || (scaledY > 1)) {
      return;
    }
    setMouse(scaledX,scaledY);
  }; // function
} // makeMouseMoveHandler

// +--------------+--------------------------------------------------
// | Constructors |
// +--------------+

/**
 * Create a new animator *without* rendering the frame.
 */
MIST.ui.Animator = function(exp, params, context, canvas, log) {
  // Generate an id
  this.id = ++_animatorCount_;

  // Remember parameters
  this.exp = exp;
  this.params = params;
  this.context = context;
  this.canvas = canvas;
  this.log = log || (function(txt) {});

  // The number of frames per second.
  this.fps = 30;

  // Are we animating the image?
  this.on = true;

  // The increments used for variables.
  this.increments = [19,23,29,31,37,41,43,47,53,59,61,67,71].map(function (val) { return val/3000; });

   // When was the last time we drew a frame?  (Used primarily when we
   // need to re-render a particular frame.)
  this.time = { t:0, m:0, h:0, d:0 };

  this.simTime = new gifTime();

  // Set up the bounds (which also sets up the render width and height)
  this.bounds(0, 0, canvas.width, canvas.height);


  // Parse the expression
  try {
    this.exp = MIST.sanitize(builtinsPattern, this.exp);
    this.expParsed = MIST.parse(this.exp);
  }
  catch (err) {
    this.log(err);
    // throw err;
  }
} // Constructor

// +---------+-------------------------------------------------------
// | Methods |
// +---------+

/**
 * Set the bounds of the animator.
 */
MIST.ui.Animator.prototype.bounds = function(left,top,width,height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;

   // Set up the render width and height
  if (this.exp.indexOf('t.') >= 0) {
    this.renderWidth = 200;
    this.renderHeight = 200;
  }
  else {
    this.renderWidth = width;
    this.renderHeight = height;
  }
}; // bounds

/**
 * Show the coordinates
 */
MIST.ui.Animator.prototype.coords = function() {
  var context = this.canvas.getContext("2d");
  context.font="15px Helvetica";
  context.textAlign="end";
  context.textBaseline="middle";
  context.fillText("-1", this.left-5, this.top+(this.height/2));
  context.textAlign="start";
  context.textBaseline="middle";
  context.fillText("+1", this.left+this.width+5, this.top+(this.height/2));
  context.textAlign="center";
  context.textBaseline="bottom";
  context.fillText("-1", this.left+(this.width/2), this.top-5);
  context.textAlign="center";
  context.textBaseline="top";
  context.fillText("+1", this.left+(this.width/2), this.top+this.height+5);
}; // coords

/**
 *Increment simulated time
 */
incTime = function(t) {
t.ms += 33; 
 if (t.ms >= 1000) {
        t.ms = 0;
        t.s++;
  }
  if (t.s > 60) {
        t.s = 0;
        t.m++;
  }
  if (t.m > 60) {
        t.m = 0;
        t.h++
  }
  if (t.h > 24) {
        t.h = 0;
        t.d++;
  }
  if (t.d > 365) {
        t.d = 0;
        t.y++;
  }
 return t;
}

/**
 * Do one frame of the animation.
 */
MIST.ui.Animator.prototype.frame = function() {
  // Update the values of the parameters
  var paramInfo = "";
  var params = this.parameters;
  var i = 0;
  for (var p in params) {
    var newval = wrapsum(params[p], this.increments[i++]);
    params[p] = newval;
    this.context[p] = newval;
    paramInfo += p + ": " + newval + "\n";
  } // for
  var context = this.context;

  // Inform the user
  if (paramInfo) {
    this.log(paramInfo);
  } // if (paramInfo)



  // Make the frame: if we are recording, we need to simulate time
  try {
    if ($("#recorder").html() == "gif") {

//      var tempTim = incTime(this.simTime);

      this.time = MIST.renderGIF(incTime(this.simTime), this.expParsed, this.context, this.canvas,
          this.renderWidth, this.renderHeight, this.left, this.top,
          this.width, this.height);

      console.log(encoder.addFrame(this.canvas.getContext('2d')));   
    }
    else {
      this.time = MIST.render(this.expParsed, this.context, this.canvas,
          this.renderWidth, this.renderHeight, this.left, this.top,
          this.width, this.height);
    }
  }  
  catch(err) {
    this.log(err);
  }   
} // frame

/**
 * Create a jpg and switch to that.
 */
MIST.ui.Animator.prototype.jpg = function() {
  var data = canvas.toDataURL("image/jpeg");
  //document.location = data;
  $("#test").html("hell goats");

 // $("#change").attr("content", "http://www.cs.grinnell.edu/~hansonse17/main/twit.png");
  //$("meta[property='og\\:image']").attr("content", "http://www.cs.grinnell.edu/~hansonse17/main/widescreenbackscodes.png");
} // MIST.ui.Animator.prototype.jpg

/**
 * Create a jpeg and put it in the body of the page.
 */
MIST.ui.Animator.prototype.jpgBody = function() {
  // Convert the canvas to an image.
  var data = canvas.toDataURL("image/jpeg");
  var img = document.createElement("img");
  img.src = data;
  // Remove the children
  while (document.body.children.length > 0) {
    document.body.removeChild(document.body.children[0]);
  } // while
  // And add the image
  document.body.appendChild(img);
}

/**
 * Run the animation.
 */
MIST.ui.Animator.prototype.run = function() {
  var runner = function(animator) {
    return function() { animator.run(); }
  };

  // Build one frame
  this.frame();

  
  // And schedule the next frame
  if (this.on) {
    var animator = this;
    // setTimeout(runner(this), 1000/this.fps);
    window.requestAnimationFrame(runner(this));
  }
}; // run

/**
 * Change the fps of the animation.  (Defaults to 30 if unspecified.)
 * DEPRECATED.  We now rely on the browser to set the animation rate.
 */
MIST.ui.Animator.prototype.setFps = function(fps) {
  this.fps = fps || 30;
}; // setFps

/**
 * Set the resolution for rendering.
 */
MIST.ui.Animator.prototype.setResolution = function(width,height) {
  this.renderWidth = width;
  this.renderHeight = height;
}; // setResolution

/**
 * Stop the animation from running.
 */
MIST.ui.Animator.prototype.stop = function() {
  this.on = false;
  this.canvas.onmousemove = undefined;
}; // stop

/**
 * Start the animation running.
 */
MIST.ui.Animator.prototype.start = function()
{  
// Set up a hash for the parameters
  this.parameters = {};
  if (this.params != "") {
    var tmp = this.params.split(",");
    for (var i = 0; i < tmp.length; i++) {
      if (this.params[i] != "") {
        this.parameters[tmp[i]] = -1;
      } // if
    } // for
  } // if (this.params != "")

  // Get the remaining info.  // Hack
  this.on = (this.exp.indexOf("t.") > -1) || (this.exp.indexOf("m.") > -1);

  // Set up a mouse listener for the canvas
  this.canvas.onmousemove = makeMouseMoveHandler(this);
  // And go
  this.run();
}; // start

/**
 * mistui-dialogs.js
 *   Some simple scripts for dealing with "dialog" boxes in MIST.
 */

/**
 * Hide all of the dialogs on the page.
 */
function hideAllDialogs()
{
  var dialogs = document.getElementsByClassName("dialog");
  for (var i = 0; i < dialogs.length; i++) {
    dialogs[i].style.visibility = "hidden";
  } // for
} // hideAllDialogs

/**
 * Show the dialog with a particular id.
 */
function showDialog(id)
{
  hideAllDialogs();
  var dialog = document.getElementById(id);
  dialog.style.visibility = "visible";
  return dialog;
} // showDialog

/**
 * Put quotation marks around a string.
 */
function quote(contents, mark)
{
  if (!mark) { mark = "\""; }
  return mark + contents + mark;
} // quote

/**
 * Make a button.
 */
function makeButton(id, value, onclick)
{
  return "<input type=\"button\" id=" + quote(id)
         + " value= " + quote(value)
         + " onclick= " + quote(onclick, "'") + "/>";
} // makeButton

/**
 * Create the HTML for a dialog box with a particular body and add
 * it to the page.  Handlers is an object that contains the 
 * button/method pairs.
 */
function makeDialog(id, content, handlers)
{
  var dialog = document.createElement("div");
  dialog.setAttribute("id", id);
  dialog.setAttribute("class", "dialog");
  var buttons = "<div class='dialogbuttons'>\n";
  buttons += makeButton(id, "Cancel", "hideAllDialogs()");
  for (var key in handlers) {
    buttons += makeButton(id+"-"+"key", key, handlers[key]);
  } // for
  buttons += "</div>\n";
  dialog.innerHTML = "<div class=\"innerdialog\">" 
                   + content
                   + buttons
                   + "</div>\n";
  document.body.appendChild(dialog);
} // makeDialog
/**
 * mistui-help.js
 *   A simple popup help system.
 */

// +-------+---------------------------------------------------------
// | Usage |
// +-------+

/*
   Option 1: Automatic event handling
   
   Call MISTui.addHelp(id,helptext).  When we mouse over the
   element, help text pops up.

   Option 2: Manual event handling
   
   a. Call MISTui.showHelp(text, x, y) when you want to show the 
      help text.

   b. Call MISTui.hideHelp() when uyou want to hide
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MISTui; } catch (err) { MISTui = {}; }

// +---------+-------------------------------------------------------
// | Globals |
// +---------+

/**
 * The id of the popup help section.
 */
var HELP_ID = "helptext";

// +-----------+-----------------------------------------------------
// | Functions |
// +-----------+

/**
 * Add help to an element with the specified id.
 */
MISTui.addHelp = function(id,helptext) {
  var selector = "#" + id;
  var showhelp = function(event) {
    var loc = document.getElementById(id).getBoundingClientRect();
    MISTui.showHelp(helptext, loc.right-5, loc.top+3); // Yay magic numbers
  };
  $(selector).mouseenter(showhelp);
  $(selector).mouseover(showhelp);
  $(selector).mouseout(MISTui.hideHelp);
}; // MISTui.addHelp

/**
 * Hide the help text.
 */
MISTui.hideHelp = function() {
  var help = document.getElementById(HELP_ID);
  if (help) {
    help.style.visibility = "hidden";
  } // if (help)
} // MISTui.hideHelp

/**
 * Show some help text at (x,y)
 */
MISTui.showHelp = function(text, x, y) {
  // Grab the help element.
  var help = document.getElementById(HELP_ID);

  // If there's no such element, build it.
  if (!help) {
    help = document.createElement("div");
    help.setAttribute("id",HELP_ID);
    help.setAttribute("class","misthelp");
    // help.style.position = "absolute";
    document.body.appendChild(help);
  } // if (!help)

  // Fill in the details
  help.innerHTML = text;
  help.style.top = y + "px";
  help.style.left = x + "px";
  help.style.visibility = 'visible';
} // MISTui.showHelp

/**
 * mistui-menus.js
 *   Some simple code for setting up menus for MIST.
 */

// +-------+---------------------------------------------------------
// | Usage |
// +-------+

/*
   A. Programmatic Creation of Menus
  
     1. Create a div for the menus.  This div should have class menubar.

     2. Create new menus with

        MISTui.addMenu(id-of-menubar, id-of-menu, title-of-menu)

     3. Add new items to the menu with
    
        MISTui.addMenuItem(id-of-menu, id-of-item, name, helptext, handler)

     4. Add separators to the menu with
       
        MISTui.addSeparator(id-of-menu, id-of-separator);

     5. Refresh the menu after adding items and separators with

        MISTui.refreshMenu(id-of-menu)

     6. Remove items with

        MISTui.removeMenuItem(id-of-menu, id-of-item);

   B. Other usage
 
     * You may find it useful to format an existing menu with

       MISTui.formatMenu(id-of-menu)

       But the programatic creation is suggested.
 */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MISTui; } catch (err) { MISTui = {}; }

// +-------------------+---------------------------------------------
// | Primary Functions |
// +-------------------+

/**
 * Add a menu with a given id to an element.  
 */
MISTui.addMenu = function(parent, menuid, menuname) {
  // Sanity check
  if (!parent) {
    throw "Cannot add menu to undefined element.";
  }
 
  // Special case: Element is identified by a string
  if (typeof(parent) == "string") {
    var element = document.getElementById(parent);
    if (!element) {
      throw "No element '#" + parent + "'";  
    }
    return MISTui.addMenu(element, menuid, menuname);
  }

  // If there's no name, use the id
  if (!menuname) {
    menuname = menuid;
  }

  // Generate the menu 
  var menu = document.createElement("li");
  var label = document.createElement("a");
  label.innerHTML = menuname;
  menu.appendChild(label);
  var items = document.createElement("ul");
  items.id = menuid+"-items";
  items.className = "menu";
  menu.appendChild(items);

  // Add the menu
  parent.appendChild(menu);

  // And do the formatting
  MISTui.formatMenu(menuid);
} // MISTui.addMenu

/**
 * Add an item to a menu.
 */
MISTui.addMenuItem = function(menu, id, name, help, handler) {
  var items = document.getElementById(menu + "-items");
  if (!items) {
    throw "Cannot find menu " + menu;
  }

  var wrapHandler = function(menu,handler) {
    return function(evt) {
      // Disable the menu temporarily so that it disappears
      var li = document.getElementById(menu + "-items").parentNode;
      li.className = "disabled";
      setTimeout(function() { li.className = ""; }, 500);
      // Get rid of the help
      MISTui.hideHelp();
      // And do the real handling.
      handler(evt);
    }
  } // wrapHandler

  // Build the item
  var item = document.createElement("li");
  item.id = id;
  item.innerHTML = "<a href='#'>" + name + "</a>";

  // Add the handler
  if (handler) {
    item.onclick = wrapHandler(menu,handler);
  }
  else {  
    item.onclick = wrapHandler(menu, function(evt) { });
  }

  // Add the item to the list of items
  items.appendChild(item);
 
  // Add help handler if appropriate
  if (help && MISTui.addHelp) {
    MISTui.addHelp(id, help);
  }
}; // MISTui.addMenuItem

/**
 * Add a separator to a menu.
 */
MISTui.addMenuSeparator = function(menu,id) {
  var items = document.getElementById(menu + "-items");
  if (!items) {
    throw "Cannot find menu " + menu;
  }

  // Build the item
  var item = document.createElement("li");
  item.id = id;
  item.className = "separator";

  // Add the item to the list of items
  items.appendChild(item);
} // addMenuSeparator(menu,id)

/**
 * Clear all of the elements of a menu.
 */
MISTui.clearMenu = function(menu) {
  var items = document.getElementById(menu + "-items");
  if (!items) {
    throw "Cannot find menu " + menu;
  }
  items.innerHTML = "";
} // clearMenu
  
/**
 * Format the menu appropriately.
 */
MISTui.formatMenu = function(menuid) {
} // formatMenu

/**
 * Refresh an existing menu (e.g., after adding or removing an element).
 */
MISTui.refreshMenu = function(menuid) {
}; // MISTui.refreshMenu

/**
 * Remove a menu item.
 */
MISTui.removeMenuItem = function(menuid, itemid) {
  var parent = document.getElementById(menuid + "-items");
  var item = document.getElementById(itemid);
  if (!parent) {
    throw "No such menu: " + menuid;
  }
  if (!item) {
    throw "No such item: " + itemid;
  } 
  parent.removeChild(item);
} // removeMenuItem
