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
       
        MISTui.addSeparator(id-of-separator);

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
  var top = document.createElement("div");
  top.style.float = "left";
  var menu = document.createElement("ul");
  menu.id = menuid;
  menu.className = "mistmenu";
  top.appendChild(menu);
  var contents = document.createElement("li");
  var label = document.createElement("a");
  label.innerHTML = menuname;
  contents.appendChild(label);
  var items = document.createElement("ul");
  items.id = menuid+"-items";
  contents.appendChild(items);
  menu.appendChild(contents);

  // Add the menu
  parent.appendChild(top);

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

  // Build the item
  var item = document.createElement("li");
  item.id = id;
  item.innerHTML = "<a href='#'>" + name + "</a>";

  // Add the handler
  if (handler) {
    item.onclick = handler;
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
  item.innerHTML = "-";

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
  var menuSettings = {position:{my:"left top", at:"left bottom"}};
  // And style it appropriately
  var selector = "#" + menuid;
  $(selector).menu(menuSettings);

  // Here's a hack for removing the caret icon (which they call carat)
  $(selector).menu("option", "icons", { submenu: "remove" });
  $(".ui-menu-icon.ui-icon.remove").remove();
} // formatMenu

/**
 * Create the HTML for a menu (no items).  This code probably isn't
 * necessary, but was useful during development.
 */
MISTui.makeMenuHTML = function(menuid, menuname)
{
  if (!menuname) { menuname = menuid; }
    var lines = [
       '  <div style="float: left;">',
       '    <ul id="' + menuid + '">',
       '      <li>',
       '        <a href="#">' + menuname + '</a>',
       '        <ul id="' + menuid + '-items">',
       '        </ul>',
       '      </li>',
       '      </ul>',
       '  </div>',
       ''
     ];
     return lines.join('\n');
}; // MISTui.makeMenuHTML

/**
 * Refresh an existing menu (e.g., after adding or removing an element).
 */
MISTui.refreshMenu = function(menuid) {
  $("#" + menuid).menu("refresh");
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
