/**
* api.js
*   Functions for handling requests to the API.
*/

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

/*
The API looks for actions specified by "funct" or "action" in
either GET or POST requests.  You should pass along the appropriate
object (body or whatever) to the run method, along with the request
and the response objects.  (Yes, the method needs a better name
than "run".)

In most cases, the handlers for the actions are found in
handlers.action (see the section about Handlers).  That way,
we can add another action to the API just by adding another
handler.
*/

// +--------------------+--------------------------------------------
// | Required Libraries |
// +--------------------+

var database = require('./database.js');

// +--------------------+--------------------------------------------
// | Exported Functions |
// +--------------------+

/**
* Run the API.
*/
module.exports.run = function(info, req, res) {
  // Support both Sam's and Alex's model of specifying what to do
  var action = info.action || info.funct;

  // Make sure that there's an action
  if (!action) {
    fail(res, "No action specified.");
  } // if there's no action

  // checkAvailability - Check whether a username is available.
  //   Does this work?
  else if (action == "checkAvailability") {
    database.userExists(req.body.value, function(exists, error) {
      res.end((!exists).toString());
    });
  } // checkAvailability

  // Deal with actions with a handler.
  if (handlers[action]) {
    handlers[action](info, req, res);
  } // if (handlers[action])

  // Everything else is undefined
  else {
    fail(res, "Invalid action: " + action);
  } // invalid action
} // run

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

fail = function(res, message) {
  console.log("FAILED!", message);
  res.send(400, message);       // "Bad request"
} // fail

// +----------+--------------------------------------------------------
// | Handlers |
// +----------+

var handlers = {};

/**
* Delete a workspace by name
*  action: deletews
*  name: string naming the workspace
*/
handlers.deletews = function(info, req, res) {
  // Make sure that they are logged in.
  if (!req.session.loggedIn) {
    fail(res,"You must be logged in to delete a workspace.");
    return;
  } // if they are not logged in

  // Make sure that we have a name
  if (!info.name) {
    fail(res, "Could not delete workspace because no workspace name specified");
    return;
  }

  // Grab the name
  var name = database.sanitize(info.name);

  // Build the query
  var query = "DELETE FROM workspaces WHERE userid=" +
  req.session.user.userid + " and name='" + name + "'";

  // Send the query
  database.query(query, function(rows, error) {
    if (error) {
      fail(res, "Could not delete " + name + " because " + error);
      return;
    }
    res.send("Deleted " + name);
  }) // send the query
} // handlers.deletews

/**
* Get a workspace
*   action: getws
*   name: string naming the workspace
*/
handlers.getws = function(info, req, res) {
  if (!req.session.loggedIn) {
    fail(res, "You must be logged in to retrieve a workspace.");
  } // if they are not logged in
  else if (info.id) {
    fail(res, "We currently do not support getting workspace by id");
  }
  else if (info.name) {
    var query = "SELECT data FROM workspaces WHERE userid=" +
    req.session.user.userid + " and name='"  +
    database.sanitize(info.name) + "'";
    // console.log(query);
    database.query(query, function(rows, error) {
      if (error) {
        fail(res, "Could not get workspace because " + error);
      }
      else if (!rows[0]) {
        fail(res, "No workspace with name " + info.name);
      }
      else {
        // console.log("Result is " + rows[0].data);
        res.setHeader("Content-type", "text/plain");
        res.send(rows[0].data);
      }
    });
  } // if they've requested the workspace by name
  else {
    fail(res, "Insufficient info for getting the workspace");
  }
} // handlers.getws

/**
* List the workspaces.
*/
handlers.listws = function(info, req, res) {
  if (!req.session.loggedIn) {
    fail(res, "Could not list workspaces because you're not logged in");
  }
  else {
    var query = "SELECT name FROM workspaces WHERE userid=" +
    req.session.user.userid;
    database.query(query, function(rows, error) {
      if (error) {
        fail(res, "Error: "+error);
      } // if error
      else {
        var result = [];
        for (var i = 0; i < rows.length; i++) {
          result.push(rows[i].name);
        } // for
        res.send(result);
      } // if success
    }); // query
  } // if logged in
} // handlers.listws

/**
* Save a workspace.
*   action: savews
*   name: the name of the workspace
*   data: The information about the workspace
*   replace: true or false [optional]
*/
handlers.savews = function(info, req, res) {
  if (!req.session.loggedIn) {
    fail(res, "Could not save workspace because you're not logged in");
  }
  else if (!info.name) {
    fail(res, "Could not save workspace because you didn't title it");
  }
  else {
    var query = "SELECT id FROM workspaces WHERE name='"+
    database.sanitize(info.name)+"' AND userid="+req.session.user.userid;
    database.query(query, function(rows, error) {
      if (error) {
        fail(res, "Error: "+error);
      }
      else if (rows[0]) {
        if (!info.replace) {
          fail(res, info.name + " already exists!");
        }
        else {
          var newQuery = "UPDATE workspaces SET data='"+
          database.sanitize(info.data)+"' WHERE id="+rows[0].id;
          database.query(newQuery, function(rows, error) {
            if (error) {
              fail(res, "Error: "+error);
            }
            else {
              res.end();
            }
          });
        } // If info.replace
      } // If rows[0]
      else {
        var newQuery = "INSERT INTO workspaces (userid, name, data) VALUES (" +
        req.session.user.userid + ",'" + database.sanitize(info.name) +
        "','" + database.sanitize(info.data) +"')";
        database.query(newQuery, function(rows, error) {
          if (error) {
            fail(res, "Error: "+error);
          }
          else {
            res.end();
          }
        });
      } // If name is not in table
    });
  }
} // handlers.savews

/*
Save an image
action: saveimage
title: The title of the image
code: the code of the image for display
codeVisible: BOOL
license: A license string
public: BOOL
replace: BOOL [optional]
*/
handlers.saveimage = function(info, req, res){
  if (!req.session.loggedIn) {
    fail(res, "Could not save image because you're not logged in");
  }
  else if (!info.title) {
    fail(res, "Could not save image because you didn't title it");
  }
  else {
    var query = "SELECT imageid FROM images WHERE title='"+
    database.sanitize(info.title)+"' AND userid="+req.session.user.userid;
    database.query(query, function(rows, error) {
      if (error) {
        fail(res, "Error: "+error);
      }
      else if (rows[0]) {
        if (!info.replace) {
          fail(res, info.title + " already exists!");
        }
        else {
          var newQuery = "UPDATE images SET code='"+
          database.sanitize(info.code)+"', modifiedAt= UTC_TIMESTAMP WHERE imageid="+rows[0].imageid;
          database.query(newQuery, function(rows, error) {
            if (error) {
              fail(res, "Error: "+error);
            }
            else {
              res.end();
            }
          });
        } // If info.replace
      } // If rows[0]
      else {
        var newQuery = "INSERT INTO images (userid, title, code, codeVisible, license, public, modifiedAt, createdAt) VALUES (" + req.session.user.userid + ",'" + database.sanitize(info.title) + "','" + database.sanitize(info.code) + "','" + database.sanitize(info.codeVisible) + "','" + database.sanitize(info.license) + "','" + database.sanitize(info.public) + "', UTC_TIMESTAMP, UTC_TIMESTAMP')";
        console.log(newQuery);

        database.query(newQuery, function(rows, error) {
          if (error) {
            fail(res, "Error: "+error);
          }
          else {
            res.end();
          }
        });
      } // If name is not in table
    });
  }
}// handlers.saveimage
