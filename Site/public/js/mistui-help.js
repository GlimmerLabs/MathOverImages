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

