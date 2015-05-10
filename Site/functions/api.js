/**
 * api.js
 *   Functions for handling requests to the API.
 */

// +-------+-----------------------------------------------------------
// | Notes |
// +-------+

/*
THIS FILE IS CURRENTLY BROKEN.
I started refactoring the api to use specific error codes, but I
didn't finish.
Please:
+ Scroll down to the ascii dragon.
+ Refactor the functions after the dragon so that they send an error
  type to the faul() helper function and properly check for all
  required input arguments.
+ Find the ~10 places the api is called in the code base and refactor
  to expect a JSON object as the api return, instead of a string.
THANKS.
*/


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
    fail(res, ErrEnum.action, "No action specified.");
  } // if there's no action

  // Deal with actions with a handler.
  else if (handlers[action]) {
    handlers[action](info, req, res);
  } // if (handlers[action])

  // Everything else is undefined
  else {
    fail(res, ErrEnum.action, "Invalid action: " + action);
  } // invalid action
} // run

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Possible kinds of errors, for consistant error handleing
 * login error: user must be logged in
 * database error: issue in database, dump info in message
 * field: a required field was ommited, list required fields in message
 * action: the action does not exist
 * override: action would require overriding existing database entry
 */
var ErrEnum = Object.freeze({"login"    : "LOGIN",
                             "database" : "DATABASE", 
                             "field"    : "MISSING FIELD"
                             "action"   : "ACTION UNDEFINED"
                             "override" : "OVERRIDE ENTRY"
                            })

/**
 * Indicate that the operation failed.
 * res: the result object passed into the handlers
 * type: 
 * message: any kind data (object, string, etc) with failure details
 * displays a page with the credated json object
 */
fail = function(res, type, message) {
  console.log("FAILED!", message);
  res.send(400, jsonFail(type, message));       // "Bad request"
}; // fail

/**
 * Indicates that the operation was successful
 * res: the result object passed into the handlers
 * payload: any kind data (object, string, etc) with return information
 * displays a page with the credated json object
 */
success = function(res, payload) {
  res.send(jsonSuccess(payload));
}; // success

/**
 * Build JSON success object
 * payload: any kind data (object, string, etc) with return information
 * returns a json object with success status and payload
 */
jsonSuccess = function(payload) {
  return {status: 1, payload: payload};
}; // jsonSuccess

/**
 * Build JSON failure object
 * type: a value from the ErrEnum object, which lists possible kinds of errors
 * message: any kind data (object, string, etc) with failure details
 * returns a json object with failure status, and payload
 */
jsonFail = function(type, message) {
  return {status: 0, type: type, message: message};
}; // jsonFail

/**
 * Test if user is logged in
 * req: the request object passed into the handler
 * returns true if user is not logged in, else false
 */
notLoggedIn = function(req) {
  return !req.session.user;
}; // isLoggedIn

/**
 * Checks if handler has all required fields to execute action
 * info: the info object passed into the handler
 * arguments[]: all additional arguments are strings of fields that should 
 *              exist in the onfo object for the handler to make the request
 * returns true if info is missing at least one field in arguments[], else false
 */
missingFields = function(info) {
  for (var i = 1; i < arguments.length; i++) {
    if (!(arguments[i] in info)) {
      return true;
    }
  }
  return false;
} // hasFields

// +----------+--------------------------------------------------------
// | Handlers |
// +----------+

/**
 * The collection of handlers.
 */
var handlers = {};

// Note: Each handler should have parameters (info, req, res).

// Please keep each set of handlers in alphabetical order.

// +----------------+--------------------------------------------------
// | Image Handlers |
// +----------------+

    
/**
 * TODO: this is broken, deleteImageNew does not exist. Is it ok to use deleteImage?
 *
 * Delete an image.
 *   info.action: deleteimg
 *   info.imageid: the id of the image
 *   precondition: logged in
 */
handlers.deleteimg = function(info, req, res) {
  // Make sure that they are logged in.
  if (notLoggedIn(req)) {
    fail(res, ErrEnum.login, "You must be logged in to delete an image.");
    return;
  } // if they are not logged in
  // check required fields
  if (missingFields(info, "imageid") {
    fail(res, ErrEnum.field, "Required field: imageid")
    return;
  } // required fields
  // Do the real work
  database.deleteImageNew(req.session.user.userid,info.imageid,function(ok,err) {
    if (err) {
      fail(res, ErrEnum.database, err);
      return;
    } // database error
    success(res, ok);
  }); // deleteImageNew
} // deleteimg

/**
 * TODO: change to imageTitleExists, write imageIdExists that does not require logging in
 *
 * Check if an image exists (should be imagetitleexists)
 *   info.action: imageexists
 *   info.title: The title of the image
 *   precondition: logged in
 */
handlers.imageexists = function(info, req, res) {
  if (notLoggedIn(req)) {
    fail(res, ErrEnum.login, "logged out");
    return;
  } // check login
  if (missingFields(info, "title")) {
    fail(res, ErrEnum.field, "Required Fields: title");
    return;
  } // required fields
  database.imageExists(req.session.user.userid, info.title, function(exists) {
    success(res, exists);
  });
}; // imageexists

/**
 * Save an image
 *   info.action: saveimage
 *   info.title: The title of the image
 *   info.code: the code of the image for display
 *   info.codeVisible: is the code visible (boolean)
 *   info.license: A license string
 *   info.public: is the image public (boolean)
 *   info.replace: Replace an existing image (boolean, optional)
 *   precondition: logged in
 */
handlers.saveimage = function(info, req, res){
  if (notLoggedIn(req)) {
    fail(res, ErrEnum.login, "Could not save image because you're not logged in");
    return;
  }
  if (missingFields(info, "title", "code", "codeVisible", "license", "public")) {
    fail(res, ErrEnum.field, "Required Fields: title, code, codeVisible, license, public")
    return;
  }
  var query = "SELECT imageid FROM images WHERE title='"+
              database.sanitize(info.title)+
              "' AND userid="+req.session.user.userid;
  database.query(query, function(rows, error) {
    if (error) {
      fail(res, ErrEnum.database, error);
    }
    else if (rows[0]) {
      if (!info.replace) {
        fail(res, ErrEnum.override, info.title + " already exists!");
      }
      else {
        var newQuery = "UPDATE images SET code='"+database.sanitize(info.code)+
                       "', modifiedAt= UTC_TIMESTAMP WHERE imageid="+rows[0].imageid;
        database.query(newQuery, function(rows, error) {
          if (error) {
            fail(res, ErrEnum.database, error);
          }
          else {
            success(res, "success");
          }
        });
      } // If info.replace
    } // If rows[0]
    else {
      var newQuery = "INSERT INTO images (userid, title, code, codeVisible, license, public, modifiedAt, createdAt) VALUES (" +
                     req.session.user.userid + ",'" + database.sanitize(info.title) + "','" + database.sanitize(info.code) + "','" + 
                     database.sanitize(info.codeVisible) + "','" + database.sanitize(info.license) + "','" + database.sanitize(info.public) + 
                     "', UTC_TIMESTAMP, UTC_TIMESTAMP)";
      database.query(newQuery, function(rows, error) {
        if (error) {
          fail(res, ErrEnum.database, error);
        }
        else {
          var newQuery = "SELECT imageid FROM images WHERE userid="+req.session.user.userid+" AND title='"+info.title+"';";
          database.query(newQuery, function(rows, error) {
            if(rows[0]) {
              success(res, "success");
            } 
            else {
              fail(res, ErrEnum.database, error);
            }
          })
        }
      });
    } // If name is not in table
  });
}; // handlers.saveimage

// +--------------------+----------------------------------------------
// | Workspace Handlers |
// +--------------------+

/**
 * Delete a workspace by name
 *   action: deletews
 *   name: string naming the workspace
 *   precondition: logged in
 */
handlers.deletews = function(info, req, res) {
  // Make sure that they are logged in.
  if (notLoggedIn(req)) {
    fail(res,ErrorEnum.login, "You must be logged in to delete a workspace.");
    return;
  } // if they are not logged in
  if (missingFields(info, "name")) {
    fail(res, ErrEnum.field, "Missing field: name")
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
      fail(res, ErrEnum.database, error);
    }
    else {
      success(res, "Deleted " + name);
    }
  }) // send the query
} // handlers.deletews

/**
* Get a workspace
*   action: getws
*   name: string naming the workspace
*/
handlers.getws = function(info, req, res) {
  if (notLoggedIn(req)) {
    fail(res, ErrEnum.login, "You must be logged in to retrieve a workspace.");
    return;
  } // if they are not logged in
  if (missingFields(info, "name")) {
    fail(res, ErrEnum.field, "MissingField: name");
    return;
  }
  if (info.id) {
    fail(res, ErrEnum.field, "We currently do not support getting workspace by id");
  }
  var query = "SELECT data FROM workspaces WHERE userid=" +
              req.session.user.userid + " and name='"  +
              database.sanitize(info.name) + "'";
  database.query(query, function(rows, error) {
    if (error) {
      fail(res, ErrEnum.database, error);
    }
    else if (!rows[0]) {
      fail(res, ErrEnum.database, "No workspace with name " + info.name);
    }
    else {
      success(res, rows[0].data);
    }
  });
} // handlers.getws

/**
 * TODO: this function works different from all the others. It logs more information
 *       to the console and uses defaults instead of checking for fields. consider refactoring
 * List challenges of specified types
 *   info.level: The difficulty rating for the challenges select
 *   info.color: The color for the challenges to select
 *   info.animation: The animation type of the challenges to select
 */
handlers.listchallenges = function(info, req, res) {
  console.log(info);
  var level = database.sanitize(info.level || "Beginning");
  var color = database.sanitize(info.color || "Greyscale");
  var animation = database.sanitize(info.animation || "Static");
  var category = level + ", " + color + ", " + animation;
  console.log(category);
  var query = "SELECT challenges.id, challenges.name, challenges.title, challenges.code FROM challengecategories,challenges WHERE challengecategories.description='" + category + "' and challengecategories.id = challenges.categoryid ORDER BY challenges.position;";
  database.query(query, function(rows, error) {
    if(error) {
      fail(res, ErrEnum.database, error);
    }
    else {
      success(res, rows);
    }
  });
}

/**
* List the workspaces.
*   action: listws
*/
handlers.listws = function(info, req, res) {
  if (notLoggedIn(req)) {
    fail(res, ErrEnum.login, "Could not list workspaces because you're not logged in");
  }
  else {
    var query = "SELECT name FROM workspaces WHERE userid=" +
        req.session.user.userid;
    database.query(query, function(rows, error) {
      if (error) {
        fail(res, ErrEnum.database, error);
      } // if error
      else {
        var result = [];
        for (var i = 0; i < rows.length; i++) {
          result.push(rows[i].name);
        } // for
        success(res, result);
      } // if success
    }); // query
  } // if logged in
} // handlers.listws

/**
 * Return the ws stored in the session.  See storews for more info.
 *  info.action: returnws
 */
handlers.returnws = function(info, req, res) {
  success(res, req.session.workspaceCode);
};

/**
* Save a workspace.
*   action: savews
*   name: the name of the workspace
*   data: The information about the workspace
*   replace: true or false [optional]
*/
handlers.savews = function(info, req, res) {
  if (notLoggedIn(req)) {
    fail(res, ErrEnum.login, "Could not save workspace because you're not logged in");
    return;
  }
  if (missingFields(info, "name", "data")) {
    fail(res, ErrEnum.field, "Required fields: name, data");
    return;
  }
  var query = "SELECT id FROM workspaces WHERE name='"+
      database.sanitize(info.name)+"' AND userid="+req.session.user.userid;
  database.query(query, function(rows, error) {
    if (error) {
      fail(res, ErrEnum.database, error);
    }
    else if (rows[0]) {
      if (!info.replace) {
        fail(res, ErrEnum.override, info.name + " already exists!");
      }
      else {
        var newQuery = "UPDATE workspaces SET data='"+
                       database.sanitize(info.data)+"' WHERE id="+rows[0].id;
        database.query(newQuery, function(rows, error) {
          if (error) {
            fail(res, error);
          }
          else {
            success(res, "success");
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
          fail(res, ErrEnum.database, error);
        }
        else {
          success(res, "success");
        }
      });
    } // If name is not in table
  });
} // handlers.savews

/**
 * Store the ws in the session
 *   info.action: storews
 *   info.code: the code for the workspace
 */
handlers.storews = function(info, req, res) {
  req.session.workspaceCode = info.code;
  success(res, info.code);
};

/**
 * Check if an image exists
 *   info.action: wsexists
 *   info.name: The title of the image
 */
handlers.wsexists = function(info, req, res) {
  if (notLoggedIn(req)) {
    fail(res, ErrEnum.login, "logged out");
    return;
  }
  if (missingFields(info, "name")) {
    fail(res, ErrEnum.field, "Required field: name");
    return;
  }
  database.wsExists(req.session.user.userid, info.name, function(exists) {
    success(res, exists);
  }); // database.wsExists
};

// +------------+------------------------------------------------------
// | Challenges |
// +------------+

/**
 * Submit a potential solution to a challenge.
 *   info.action: submitchallenge
 *   info.code: the code submitted by the client
 *   info.id: the id for the challenge
 */
handlers.submitchallenge = function (info, req, res) {
  if (missingFields(info, "code", "id")) {
    fail(res, ErrEnum.field, "Required fields: code, id");
    return;
  }
  var query = "SELECT code FROM challenges WHERE name='"+database.sanitize(info.name)+"';";
  database.query(query, function(rows, error) {
    if (error) {
      fail(res, ErrEnum.database, error);
    }
    else {
      var answer = rows[0].code.replace(/ /g, "");
      success(res, info.code==answer);
    }
  });
};


// +---------------+---------------------------------------------------
// | Miscellaneous |
// +---------------+

/*
                                  /   \       
 _                        )      ((   ))     (
(@)                      /|\      ))_((     /|\
|-|                     / | \    (/\|/\)   / | \                      (@)
| | -------------------/--|-voV---\`|'/--Vov-|--\---------------------|-|
|-|                         '^`   (o o)  '^`                          | |
| |                               `\Y/'                               |-|
|-|                                                                   | |
| |               ^ Everything up here is refactored                  |-|
|-|             Everything down here needs refactoring V              | |
| |                                                                   |-|
|_|___________________________________________________________________| |
(@)              l   /\ /         ( (       \ /\   l                `\|-|
                 l /   V           \ \       V   \ l                  (@)
                 l/                _) )_          \I
                                   `\ /'
				     `  
*/


/**
 * Add an image to an album.
 *   info.action: addToAlbum
 *   info.albumid: the id of the album (an integer)
 *   info.imageid: the id of the image (an integer)
 */
handlers.addToAlbum = function(info, req, res) {
  if (!info.albumid) {
    fail(res, "missing required albumid field");
    return;
  }
  if (!info.imageid) {
    fail(res, "missing required imageid field");
    return;
  }
  database.addToAlbum(req.session.user.userid, info.albumid, info.imageid,
      function(ok,err) {
    if (!ok) {
      fail(res,err);
      return;
    }
    else {
      success(res, "success");
      return;
    }
  });
}; // handlers.addToAlbum

/**
 * checkAvailability - Check whether a username is available.
 * info.action: checkAvailability
 * info.userinfo: username or email of a user
 */
handlers.checkAvailability = function(info, req, res) {
  if (!info.userinfo) {
    fail(res, "missing required userinfo field");
    return;
  }
  database.userExists(info.userinfo, function(exists, error) {
    success(res, !exists);
  });
}; // checkAvailability


/**
 * Check if user is logged in
 * info.action: loggedIn
 */
handlers.loggedIn = function(info, req, res) {
  if (!req.session.user) {
    fail(res, "You are not logged in.");
    return;
  }
  else {
    res.end((req.session.user.userid).toString());
  }
};

/**
 * Search for names and values in the database.
 *   info.action: omnisearch
 *   info.search, the search string
 */
handlers.omnisearch = (function (info, req, res) {
  database.omnisearch(info.search, function(resultObject, error){
    if (error)
      fail(res, resultObject);
    else
      success(res, resultObject);
  });
});

/**
 * Sets featured property of image.
 *   info.action: setFeatured
 *   info.imageid: the image to feature
 *   info.state: the state to toggle it too
*/
handlers.setFeatured = (function (info, req, res) {
  // console.log("setFeatured called with:", info);
  if (!req.session.user) {
    fail(res, "User Not logged in");
    return;
  }
  if (info.state == 'true') {
    database.addFeaturedImage(req.session.user.userid, info.imageid, function(response, err) {
      if(err) {
        fail(res, err);
      }
      else {
        success(res, "Success");
      }
    });
  }
  if(info.state == 'false') {
    database.removeFeaturedImage(req.session.user.userid, info.imageid, function(response, err) {
      if(err) {
        fail(res, err);
      }
      else {
        success(res, "Success");
      }
    });
  }
});

/**
 * Toggle the like on an image
 *   info.action: toggleLike
 *   info.imageid, to like or unlike
 */
handlers.toggleLike = function(info, req, res) {
  if (!req.session.user)
    fail(res, "User is not logged in.");
  else
    database.toggleLike(req.session.user.userid, info.imageid, function(response, error){
      if (error)
        fail(res, error);
      else
        success(res, response);
    });
}; // handlers.toggleLike

// +----------+--------------------------------------------------------
// | Comments |
// +----------+

/**
 * Delete a comment from the database.
 *   action: deleteComment
 *   commentId, the comment to delete
 */
handlers.deleteComment = (function (info, req, res) {
  if (!req.session.user)
    fail(res, "User Not logged in")
    database.deleteComment(req.session.user.userid, info.commentId, function(response, error){
      if (error)
        fail(res, error);
      else if (response)
        success(res, "Comment " + info.commentId + " deleted.");
      else
        fail(res, "Unknown error");
    });
});

/**
 * Flag comments for Moderator review
 *   info.action: flagComment
 *   info.commentId, the comment to flag
 */
handlers.flagComment = (function (info, req, res) {
  if (!req.session.user)
    fail(res, "User not logged in")
    database.flagComment(info.commentId, req.session.user.userid, function(response, error){
      if (error)
        fail(res, error);
      else if (response)
        success(res, "Comment " + info.commentId + " flagged.");
      else
        fail(res, "Unknown error");
    });
});

