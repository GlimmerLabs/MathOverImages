/* workspace functions */

// +-------+---------------------------------------------------------
// | Setup |
// +-------+

try { MISTgui; } catch (err) { MISTgui = {}; }
if (!MISTgui.OUTLET_OFFSET) { MISTgui.OUTLET_OFFSET = OUTLET_OFFSET; }

// +-----------------+-----------------------------------------------
// | Local Utilities |
// +-----------------+

MISTgui.outletIndex = function(outlet) {
  if (outlet.attrs.outletIndex) {
    return outlet.attrs.outletIndex;
  }
  var outlets = outlet.parent.children;
  for (var i = MISTgui.OUTLET_OFFSET; i < outlets.length; i++) {
    if (outlet === outlets[i]) {
      return i - MISTgui.OUTLET_OFFSET;
    } // if
  } // for
} // MISTgui.getIndex

/**
 * workspaceToArray takes all the nodes in the workLayer and all the lines in the 
 * lineLayer and puts them into an array.
 */
var workspaceToArray = function() {
  var wArray = [];
  var workChildren = workLayer.getChildren();
  var lineChildren = lineLayer.getChildren();
  var i = 0;
  for (i; i < workChildren.length; i++) {
    wArray[i] = workChildren[i]; 
  }
  for (var j = 0; j < lineChildren.length; j++, i++) {
    wArray[i] = lineChildren[j];
  }
  return wArray;
};

/**
 * Convert a JSON string created by workspaceToJSON back to a workspace.
 */
var jsonToWorkspace = function(json) {
  var layout = JSON.parse(json);
  restore(layout);
  MIST.displayLayout(layout, { addVal:addVal, addOp:addOp, addEdge:addLine });
} // JSONtoWorkspace

/**
 * Convert the workspace to JSON that we can then store in a file
 * or on the server.
 */
var workspaceToJSON = function() {
  // Extract information from the workspace.
  var nodes = workLayer.getChildren();
  var edges = lineLayer.getChildren();

  // Set up information to turn to JSON
  var info = new MIST.Layout();
  var nodeInfo = {};
  var lineInfo = {};

  // Gather information on each node.
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (isValue(node)) {
      if(node.name() == 'constant') {
        nodeInfo[node._id] = 
          info.addVal(node.name() + node.attrs.renderFunction, node.x(), node.y());
      } // if its a constant store its value in the name
      else {
        nodeInfo[node._id] = 
          info.addVal(node.name(), node.x(), node.y());
      }
    } // if it's a value
    else if (isFunction(node)) { 
      nodeInfo[node._id] = 
          info.addOp(node.name(), node.x(), node.y());
    } // if it's a function
  } // for each node

  // Gather information on each edge
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    info.addEdge(nodeInfo[edge.attrs.source._id], 
        nodeInfo[edge.attrs.outlet.parent._id],
        MISTgui.outletIndex(edge.attrs.outlet));
  } // for

  // And we're done
  return JSON.stringify(info);
} // workspaceToJSON

/**
 * arrayToWorkspace takes an array of objects and inserts them to a workspace
 */
 var arrayToWorkspace = function(array) {
  for (var i = 0; i < array.length; i++) {
    var object = array[i];
    if (isLine(object)) {
      object.moveTo(lineLayer);
    }
    else {
      object.moveTo(workLayer);
      object.setAttr('visible', true);
    }
  }
  workLayer.draw();
  lineLayer.draw();
 };

/**
 * resetWorkspace removes all elements from the active workspace,
 * and all records of elements created in session and actions performed
 */
var resetWorkspace = function() {
  // destroy workLayer children and renderLayers
  workLayer.destroyChildren();
  //destroy lineLayer children
  lineLayer.destroyChildren();
  // empty elementTable
  elementTable = {};
  // empty actionArray
  actionArray = [];
  // reset indexes and variables
  currIndex = 0;
  totalIndex = 0;
  currShape = null;
  dragShape = null;
  updateFunBar();
  shadeUndoRedo();
  stage.draw();
};

/**
 * Save the workspace with a particular name.  
 */
var saveWorkspace = function(name, replace) {
  var request = new XMLHttpRequest();
  var name = encodeURIComponent(name);
  var workspace = encodeURIComponent(workspaceToJSON());
  var data = "action=savews&name="+name+"&data="+workspace + 
      ((replace) ? "&replace=true" : "");
  request.open("POST", "/api", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(data);
}

/**
 * List all of the available workspaces.  The callback should be
 * of the form "function(workspaces, error)".  If there's no error,
 * workspaces should be an array of strings and error should be
 * undefined.  If there's an error, workspaces should be undefined
 * and error should contain the error string.
 */
var listWorkspaces = function(callback,async) {
  if (async == undefined) { async = true; }
  var url = "/api?action=listws";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    // console.log(request.readyState, request);
    if (request.readyState != 4) {
      return;
    } // if it's not ready
    if (request.status >= 400) {
      callback(undefined,request.responseText);
    }
    else {
      callback(JSON.parse(request.responseText),undefined);
    }
  } // request.onreadystatechange
  request.open("GET", url, async);
  request.send();
} // listWorkspaces

/**
 * Given a workspace name, loads a given workspace from the server onto 
 * the screen.
 */
var loadWorkspace = function(wsname) {
  var url = "/api?action=getws&name=" + wsname;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.status >= 400) {
      alert("Could not load workspace");
    }
    else if (request.readyState != 4) {
      return;
    }
    else {
      var json = request.responseText.replace(/\&quot;/g, '"');
      // console.log(json);
      resetWorkspace();
      jsonToWorkspace(json);
      currentWorkspace = wsname;
    }
  }; // onReadyState
  request.open("GET",url,true);
  request.send();
} // loadWorkspace

/**
 * Saves an image to the database.
 */
var saveImage = function(title, code, isPublic, codeVisible, replace) {
  var request = new XMLHttpRequest();
  var title = encodeURIComponent(title);
  var data = "action=saveimage&title="+title+"&code="+code+ 
      "&public="+isPublic+"&codeVisible="+codeVisible+
      "&license=GPL"+((replace) ? "&replace=true" : "");
  // console.log(data);
  request.open("POST", "/api", false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(data);
  try {
    var id = JSON.parse(request.responseText).imageid;
    // console.log("id: " + id);
    return id;
  }
  catch (err) {
    return 0;
  }
}

/**
 * Determines if a workspace exists.  Returns "true" if the workspace exists
 * with the given name,  "logged out" if the user is not logged in, and "false" otherwise.
 */
var wsExists = function(name) {
  var request = new XMLHttpRequest();
  var url = "/api?action=wsexists&name=" + name;
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

/**
 * Determines if a image exists.  Returns "true" if an image exists
 * with the given title, "logged out" if the user is not logged in, and "false" otherwise.
 */
var imageExists = function(title) {
  var request = new XMLHttpRequest();
  var url = "/api?action=imageexists&title=" + title;
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

// +--------------+----------------------------------------------------
// | Dialog Boxes |
// +--------------+

/**
 * Add the HTML for the dialog box.
 */
var addLoadWorkspaceDialog = function() {
  // Build the element
  var dialog = document.createElement("div");
  dialog.id = "load-workspace";
  dialog.title = "Load Workspace";
  // dialog.innerHTML='<form><fieldset><label for="workspace-name">Workspace</label><select id="workspace-name"></select></fieldset></form>';
  dialog.innerHTML='<p>Select the workspace to load.</p><form><select id="workspace-name"></select></form>';
  document.body.appendChild(dialog);
  // console.log(dialog);

  // Turn it into a JQuery dialog
  $("#load-workspace").dialog({
    autoOpen: false,
    resizable: false,
    width: "50%",
    modal: true,
    buttons: {
      "Load": function() {
        $("#load-workspace").dialog("close");
        var menu = document.getElementById("workspace-name");
        var wsname = menu.options[menu.selectedIndex].value;
        loadWorkspace(wsname);
      }, // load
      "Cancel": function() {
        $("#load-workspace").dialog("close");
      } // cancel
    } // buttons
  });
} // addLoadWorkspaceDialog

/**
 * Show the dialog box for loading a workspace.
 */
var showLoadWorkspaceDialog = function() {
  // Make sure that the dialog exists
  if (!document.getElementById("load-workspace")) {
    addLoadWorkspaceDialog();
  } // if the dialog does not exist

  // Clear the list of workspaces
  var workspaces = document.getElementById("workspace-name");
  workspaces.innerHTML = "";

  // Build the list of workspaces
  listWorkspaces(function(names,error) {
    if (error) {
      alert("Whoops ... " + error);
      return;
    }
    if (names.length == 0) {
      alert("No workspaces exist");
      return;
    }
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var option = document.createElement("option");
      option.value = name;
      option.innerHTML = name;
      workspaces.appendChild(option);
    } // for
  });

  // Show the dialog
  $("#load-workspace").dialog("open");
} // showLoadWorkspaceDialog

/**
 * add a success dialog box to the html
 */
var addSuccessDialog = function() {
  // Build the element
  var dialog = document.createElement("div");
  dialog.id = "success-message";
  dialog.title = "Image Saved";
  // dialog.innerHTML='<form><fieldset><label for="workspace-name">Workspace</label><select id="workspace-name"></select></fieldset></form>';
  dialog.innerHTML='<p>Your image has been successfully saved!</p>';
  document.body.appendChild(dialog);
  // Turn it into a JQuery dialog
  $("#success-message").dialog({
    autoOpen: false,
    resizable: false,
    width: "30%",
    modal: true,
    buttons: {
      "Okay": function() {
        $("#success-message").dialog("close");
      } // okay
    } // buttons
  });
}

/**
 * show success dialog
 */
var showSuccessDialog = function(title, imageid) {
  // Make sure that the dialog exists
  if (!document.getElementById("success-message")) {
    addSuccessDialog();
  } // if the dialog does not exist
  var dialog = document.getElementById("success-message");
  dialog.innerHTML='<p>Your image \''+title+'\' has been successfully saved!'+
  '<br><br>You can view your image <a href=/image/'+imageid+' target="_blank"><u>here'+
  '</u></a> or visit to the <a href=/gallery/recent/1 target="_blank"><u>gallery'+
  '</u></a> to see what other MIST users have been creating!</p>';
  // Show the dialog
  $("#success-message").dialog("open");
} // showSuccessDialog

// +-------------------+-----------------------------------------------
// | Session Functions |
// +-------------------+

/**
 * -jquery ajax call to ensure beforeunload event works with all browsers-
 *  This event sends a POST request to the api to store the current state
 * of a user's workspace as a element of the req.session object.
 */
$(window).on('beforeunload', function() {
    var x = storeWS();
    return x;
});
function storeWS() {
  code = workspaceToJSON();
  var data = "action=storews&code="+code;
  jQuery.ajax("/api", {
    data: data,
    type: 'POST'
  });
} // storeWS

/**
 * function to load a workspace from the req.session object. This queries
 * the server for the req.session.workspaceCode field, and returns it if
 * it exists. This is called during initialize stage.
 */
var initWorkspace = function() {
  var request = new XMLHttpRequest();
  var url = "/api?action=returnws";
  request.open("GET", url, false);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send();
  return request.responseText;
}
