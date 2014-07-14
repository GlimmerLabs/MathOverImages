/**
* challenge.js
*   Functions for handling hcallenge pages.
*/

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Put quotes around a string for MySQL.
 */
var quote = function(str) {
  return "'" + str + "'";
}; // quote

// +--------------------+--------------------------------------------
// | Exported Functions |
// +--------------------+

/**
 * The api for adding challenges.
 */
module.exports.add = function(req, res, database, info) {
  // Note: I should think about "START TRANSACTION" and "COMMIT",
  // although they didn't help when I tried them.

  // Set up the info for the queries
  var info = [
    ['categoryid', database.sanitize(info.category)],
    ['position', database.sanitize(info.position)],
    ['userid', req.session.user.userid],
    ['createdAt', "now()"],
    ['modifiedAt', "now()"],
    ['name', quote(database.sanitize(info.name))],
    ['description', quote(database.sanitize(info.description))],
    ['code', quote(database.sanitize(info.code))],
    ['rating', 0]
  ];

  var fields = [];
  var values = [];
  var criteria = [];

  for (var i = 0; i < info.length; i++) {
    fields[i] = info[i][0];
    values[i] = info[i][1];
    if ((fields[i] != 'createdAt') && (fields[i] != 'modifiedAt')) {
      criteria.push(fields[i] + "="+ values[i]);
    } // if
  } // for

  var iquery = "INSERT INTO challenges (" + fields.join(",") + 
      ") values (" + values.join(",") + ");";
  var squery = "SELECT id FROM challenges WHERE " + criteria.join(" and ") +
      " ORDER BY modifiedAt DESC LIMIT 1;"
  console.log(iquery);
  console.log(squery);

  // See if the challenge is already in the database.
  database.query(squery, function(rows, error) {
    if (error) {
      res.send(error);
      return;
    } // if error
    if (rows.length != 0) {
      var id = rows[0]['id'];
      console.log("ID",id);
      res.redirect('/challenge/view/' + id);
      return;
    } // if it's already in the database

    // Insert into the database
    console.log("Inserting");
    database.query(iquery, function(rows, error) {
      if (error) {
        res.send(error);
        return;
      }

      // Get the id
      database.query(squery, function(rows, error) {
        if (error) {
          res.send(error);
          return;
        } // if error
        var id = rows[0]['id'];
        console.log("ID",id);
        res.redirect('/challenge/view/' + id);
      }) // get the id
    }); // insert
  }); // check if it's there already
}; // add

/**
 * A form for editing challenges.
 */
module.exports.edit = function(req, res, database) {
  res.send("Editing challenges is not yet implemented.");
}; // edit

/**
 * The form for creating challenges.
 */
module.exports.create = function(req, res, database) {
  res.render('create-challenge.ejs', {
    user: req.session.user
  });
}; // create 

/**
 * The page for showing challenges.
 */
module.exports.view = function(req, res, database) {
  var id = database.sanitize(req.params.id);
  var query = "SELECT name,description,code FROM challenges WHERE id=" +
     id + ";";
  console.log(query);
  database.query(query, function(rows, error) {
    if (error) {
      res.send(error);
      return;
    }
    var challenge = rows[0];
    console.log(challenge);
    res.render('view-challenge.ejs', {
      user: req.session.user,
      challenge: challenge
    });
  });
}; // view

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
    database.query(query, function(rows, error) {
      if (error) {
        fail(res, "Could not get workspace because " + error);
      }
      else if (!rows[0]) {
        fail(res, "No workspace with name " + info.name);
      }
      else {
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
        var newQuery = "INSERT INTO images (userid, title, code, codeVisible, license, public, modifiedAt, createdAt) VALUES (" + req.session.user.userid + ",'" + database.sanitize(info.title) + "','" + database.sanitize(info.code) + "','" + database.sanitize(info.codeVisible) + "','" + database.sanitize(info.license) + "','" + database.sanitize(info.public) + "', UTC_TIMESTAMP, UTC_TIMESTAMP)";
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

/*
check if an image exists
action: imageexists
title: The title of the image
*/
handlers.imageexists = function(info, req, res) {
  if (!req.session.loggedIn) {
    res.send("logged out");
  } else {
    database.imageExists(req.session.user.userid, info.title, function(exists) {
      res.send(exists);
    });
  }
}

/*
check if an image exists
action: wsexists
title: The title of the image
*/
handlers.wsexists = function(info, req, res) {
  if (!req.session.loggedIn) {
    res.send("logged out");
  } else {
    database.wsExists(req.session.user.userid, info.name, function(exists) {
      res.send(exists);
    });
  }
}

/*
store the ws in the session
action: storews
code: the code for the workspace
*/
handlers.storews = function(info, req, res) {
  req.session.workspaceCode = info.code;
  res.end();
}

/*
return the ws stored in the session
action: returnws
*/
handlers.returnws = function(info, req, res) {
  res.send(req.session.workspaceCode);
  res.end();
}

/*
Toggle the like on an image
action: toggleLike
imageid, to like or unlike
*/

handlers.toggleLike = function(info, req, res) {
  if (!req.session.loggedIn)
    fail(res, "User is not logged in.");
  else
    database.toggleLike(req.session.user.userid, info.imageid, function(success, error){
      if (error)
        fail(res, "Error: " + error);
      else
        res.end(success.toString());
    });
}; // handlers.toggleLike

/*
Search for names and values in the database.
action: omnisearch
search, the search string
*/
handlers.omnisearch = (function (info, req, res) {
  database.omnisearch(info.search, function(resultObject, error){
    if (error)
      fail(res, JSON.stringify(resultObject));
    else
      res.end(JSON.stringify(resultObject));
  });
});

/*
Flag comments for Moderator review
action: flagComment
commentId, the comment to flag
*/
handlers.flagComment = (function (info, req, res) {
  if (!req.session.loggedIn)
    fail(res, "User not logged in")
    database.flagComment(info.commentId, req.session.user.userid, function(success, error){
      if (error)
        fail(res, JSON.stringify(error));
      else if (success)
        res.end("Comment " + info.commentId + " flagged.");
      else
        fail(res, "Unknown error");
    });
});

/*
Delete comments from the database.
action: deleteComment
commentId, the comment to delete
*/
handlers.deleteComment = (function (info, req, res) {
  if (!req.session.loggedIn)
    fail(res, "User Not logged in")
    database.deleteComment(req.session.user.userid, info.commentId, function(success, error){
      if (error)
        fail(res, JSON.stringify(error));
      else if (success)
        res.end("Comment " + info.commentId + " deleted.");
      else
        fail(res, "Unknown error");
    });
});
