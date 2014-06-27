/**
 * api.js
 *   Functions for handling requests to the API.
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
    res.send(404, "No action specified.");
  } // if there's no action

  // checkAvailability - Check whether a username is available.
  //   Does this work?
  else if (action == "checkAvailability") {
    database.userExists(req.body.value, function(exists, error) {
      res.end((!exists).toString());
    });
  } // checkAvailability

  // getws - Get a workspace by id or name
  else if (action == "getws") {
    if (!req.session.loggedIn) {
      res.send(404,"You must be logged in to retrieve a workspace.");
    } // if they are not logged in
    else if (info.id) {
      res.send(404, "We currently do not support getting workspace by id");
    }
    else if (info.name) {
      var query = "SELECT data FROM workspaces WHERE userid=" + 
          req.session.user.userid + " and name='"  + database.sanitize(info.name) + "'";
      // console.log(query);
      database.query(query, function(rows, error) {
        if (error) {
          res.send(404, "Could not get workspace because " + error);
        }
        else if (!rows[0]) {
          res.send(404, "No workspace with name " + info.name);
        }
        else {
          // console.log("Result is " + rows[0].data);
          res.setHeader("Content-type", "text/plain");
          res.send(rows[0].data);
        }
      });
    } // if they've requested the workspace by name
    else {
      res.send(404, "Insufficient info for getting the workspace");
    }
  } // getws

  // Everything else is undefined
  else {
    res.send(404, "Invalid action: " + action);
  } // invalid action
} // run
