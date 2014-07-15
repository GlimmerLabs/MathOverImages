// config/database.js

var auth = require('./auth.js');  // Include private-strings that should not be on the public repo
var mysql = require('mysql'); // Include the mysql library
var bcrypt = require('bcrypt-nodejs'); // Include Blowfish Algorithm for hashing passwords
var validate = require('validator'); // Include validation functions

var mail = require('./mail');

// Make a connection pool to handle concurrencies esp. that of async calls
var pool = mysql.createPool({
  host : auth["mysql-hostname"],
  user : auth["mysql-username"],
  password : auth["mysql-password"],
  database : auth["mysql-database"]
});


/*
  Procedure:
  hashPassword(passwordtohash, callback(hashedPassword));
  Purpose:
  Hashes a password with Blowfish Algorithm
  Parameters:
  passwordtohash, a plaintext version of a password to hash
  callback(hashedPassword, error), a function describing what to do with the result
  Produces:
  hashedPassword, the hashed password
  error, an error if there is one
  Pre-conditions:
  None
  Post-conditions:
  The password will be hashed with Blowfish Crypt
  Preferences:
  This function is not available outside of this document.
*/
var hashPassword = (function (passwordtohash, callback) {
  bcrypt.hash(passwordtohash, null, null, function(err,hash) {
    callback(hash, err);
  });
});// hashPassword(passwordtohash, callback(hashedPassword));

/*
  Procedure:
    sanitize(string);
  Purpose:
    Sanitizes a string for MySQL insertion without risking injection
  Parameters:
    string, the string to sanitize
  Produces:
    sanitizedString, a string - returned
  Pre-conditions:
    None
  Post-conditions:
    sanitizedString will be safe to insert into a MySQL
  Preferences:
    This function is not available outside of this document.
*/
var sanitize = (function (string) {
  var escaped = validate.escape(string);
  escaped = escaped.replace(/'/g, '&#39;');
  // Restore ampersands (and other things?)
  // escaped = escaped.replace("&amp;", "&");
  return escaped;
}); // sanitize(string);
module.exports.sanitize = sanitize;

/*
  Procedure:
  database.query(query, callback(rows, error));
  Purpose:
  Make a query on the current database
  Parameters:
  query, a SQL formatted string
  callback(rows, error), a function describing what to do with the result
  Produces:
  rows, an array of database rows which may be accessed with dot syntax
  error, the error produced by the mysql-nodejs library
  Pre-conditions:
  None
  Post-conditions:
  The MySQL database will be altered as requested
  Preferences:
  SANITIZE YOUR INPUT
*/

module.exports.query = (function (query, callback){
  pool.getConnection(function(err,connection){
    connection.query(query, function(err,rows,fields){
      if (err) {
        callback(null, err);
      }
      else{
        callback(rows,null);
      }
    });
    connection.release();
  });
}); // database.query(query, callback(rows, error));

/*
  Procedure:
  database.userExists(checkString, callback(exists));
  Purpose:
  Checks to see if a username or email is already in the database
  Parameters:
  checkstring, a string containing either a username or email address
  callback(exists), a function describing what to do with the result
  Produces:
  exists, a BOOLEAN result
  Pre-conditions:
  None
  Post-conditions:
  None
  Preferences:
  This function will automatically be called when using the addUser() function, so this is designed to be used while the client is typing on the client side
*/
module.exports.userExists = (function(checkString, callback){

  checkstring = sanitize(checkString); // Always sanitize user input.
  // check if string is a username
  module.exports.query("SELECT username FROM users WHERE username = '" + checkString + "';", function (rows, error){
    if (!rows[0]){ // string is not a username
      // check if string is an email address
      module.exports.query("SELECT email FROM users WHERE email = '" + checkString + "';", function(rows, error){
        if (!rows[0]){ // string is not an email address
          // user does not exist
          callback(false);
        }
        // email exists
        else callback(true);
      });
    }
    // username exists
    else callback(true);
  });
}); // database.userExists(checkString, callback(exists));

/*
  Procedure:
  database.imageExists(userid, checkString);
  Purpose:
  Checks to see if an image with the given string as a title exists for the user
  Parameters:
  userid, the userid of the current session user
  checkstring, a string containing a desired title for an image
  callback(exists), a function describing what to do with the result
  Produces:
  exists, a BOOLEAN result
  Pre-conditions:
  None
  Post-conditions:
  None
*/
module.exports.imageExists = (function(userid, checkString, callback){

  checkstring = sanitize(checkString); // Always sanitize user input.
  // check if string is a username
  module.exports.query("SELECT title FROM images WHERE title = '" + checkString + "'AND userid = " + userid + ";", function (rows, error){
    if (!rows[0]){ // string is not a username
      callback(false);
    }
    // username exists
    else callback(true);
  });
}); // database.imageExists(userid, checkString, callback(exists));

/*
  Procedure:
  database.wsExists(userid, checkString, callback(exists));
  Purpose:
  Checks to see if a workspace with the given string as a name exists for the user
  Parameters:
  userid, the userid of the current session user
  checkstring, a string containing a desired name for a workspace
  callback(exists), a function describing what to do with the result
  Produces:
  exists, a BOOLEAN result
  Pre-conditions:
  None
  Post-conditions:
  None
*/
module.exports.wsExists = (function(userid, checkString, callback){

  checkstring = sanitize(checkString); // Always sanitize user input.
  // check if string is a username
  module.exports.query("SELECT name FROM workspaces WHERE name = '" + checkString + "'AND userid = " + userid + ";", function (rows, error){
    if (!rows[0]){ // string is not a username
      callback(false);;
    }
    // username exists
    else callback(true);;
  });
}); // database.wsExists(userid, checkString;

/*
  Procedure:
  database.addUser(forename, surname, password, email, pgpPublic, username, dob, callback(success, error));
  Purpose:
  Adds a user to the database
  Parameters:
  forename, a string
  surname, a string
  password, a plaintext string (this will be crypted before being sent to the database)
  email, a string
  username, a string
  callback(success, error), a function describing what to do with the result
  Produces:
  success, A BOOLEAN value representing if the insertion was successful
  error, if there was an error, it will be returned here.
  Pre-conditions:
  None
  Post-conditions:
  The database will be appended with the new user, all data will be sanitized, and the password will be hashed.
  Preferences:
  This procedure automatically sanitizes and validates user input, as well as hashes the password. This is the preferred way to interact with the server.
  However, client-side validation is always a good first-defense.
*/

module.exports.addUser =(function (forename, surname, password, email, username, callback) {
  // Always sanitize user input
  forename = sanitize(forename);
  surname = sanitize(surname);
  password = sanitize(password);
  email = sanitize(email);
  username = sanitize(username);

  if (!validate.isEmail(email)){
    callback(false, "ERROR: Email is not a valid email address");

  }
  else if (validate.isEmail(username)){
    callback(false, "ERROR: Username may not be an email address.")
  }
  else {

    // Check to see if username or email are already in the database

    module.exports.userExists(username, function(exists){
      if (exists){// Username exists
        callback(false, "ERROR: Username already exists.");
      }
      else {
        module.exports.userExists(email, function(exists){
          if (exists) // Email address exists
            callback(false, "ERROR: Email already used.");

          else // user does not already exist, proceed with creation
          {
            // hash the password
            hashPassword(password, function (hashedPassword, err) {
              // add user to database
              if (!err){
                module.exports.query("INSERT INTO users (forename, surname, hashedPassword, email, username, signupTime) VALUES ('" + forename + "','" + surname + "','" + hashedPassword +  "','" + email.toLowerCase() + "','" + username + "', UTC_TIMESTAMP);", function(results, error){
                  if (results) {
                    callback(true,error);
                  }
                  else
                    callback(false,error);
                });
              }
              else callback(false, err);

            });
          }
        });
      }
    });
  }
}); // database.addUser(forename, surname, password, email, pgpPublic, username, dob, callback(success, error));

/*
  Procedure:
  database.verifyPassword(userid, passwordToTest, callback(verified, error ));
  Purpose:
  Checks to see if a password is correct
  Parameters:
  user, a string that is either the username or the email address
  passwordToTest, a plaintext version of a password to test
  callback(verified, error), a function describing what to do with the result
  Produces:
  verified, A BOOLEAN value representing if the password was correct && the user exists
  Pre-conditions:
  None
  Post-conditions:
  None
  Preferences:
  This procedure automatically sanitizes user input. This will also return false if the user does not exist. The client should never be told if a user exists.
*/
module.exports.verifyPassword = (function (userid, passwordToTest, callback){
  // Always sanitize user input
  user = sanitize(userid);
  passwordToTest = sanitize(passwordToTest);
  module.exports.query("SELECT hashedPassword FROM users WHERE userid = '" + userid + "';", function(rows, error){
    if (!rows[0])
      callback(false); // user does not exist
    else
      bcrypt.compare(passwordToTest, rows[0].hashedPassword, function(error,result) {
        if (!error){
          callback(result,null);
        }
        else
          callback (null, error);
      });
  });
}); // database.verifyPassword(userid, passwordToTest, callback(verified));

/*
  Procedure:
  database.changeUsername(userid, newUsername, Callback(success, error));
  Purpose:
  To allow a user to change their username
  Parameters:
  userid, the userid of the use who wants to change their password
  newUsername, what they want to change their username to callback
  Produces:
  success, a boolean success indicator
  error, any error occurred along the way
  Pre-conditions:
  user has logged in, and therefore has access to their userid
  Post-conditions:
  username needs to be changed
  Preferences:
  None
*/
module.exports.changeUsername = (function (userid, newUsername, password, callback){
  newUsername = sanitize(newUsername);
  userid = sanitize(userid);
  password = sanitize(password);
  module.exports.verifyPassword(userid, password, function(verified, error){
    if (!verified)
      callback(false, error);
    else
      // Check to see if username or email are already in the database

      module.exports.userExists(newUsername, function(exists){
        if (exists) // Username exists
          callback(false, "ERROR: Username already exists.");
        else  // user does not already exist, proceed with creation
          module.exports.query("UPDATE users SET username='" + newUsername +"' WHERE userid = '" + userid + "';", function (rows, error){
            if (!error) {
              callback(true,error);
            }
            else
              callback(false,error);
          });
      });
  });
}); // database.changeUsername(user, newUsername, callback(success, error));

/*
  Procedure:
  database.changePassword(userid, oldPassword, newPassword, Callback(success, error));
  Purpose:
  To allow a user to change their password, given they remember their old one.
  Parameters:
  userid, the userid of the use who wants to change their password
  oldPassword, the old password of the user

  newPassword, what they want to change their password to
  callback, a function describing what to do with the response
  Produces:
  success, a boolean success indicator
  error, any error occurred along the way
  Pre-conditions:
  user has logged in, and therefore has access to their userid
  Post-conditions:
  password will be changed if old one is correct
  Preferences:
  None
*/
module.exports.changePassword = (function (userid, oldPassword, newPassword, callback){
  oldPassword = sanitize(oldPassword);
  newPassword = sanitize(newPassword);
  userid = sanitize(userid);
  module.exports.query("SELECT hashedPassword from users WHERE userid= '" + userid + "';", function (response, error){
    if (error)
      callback(false, error);

    else if (!response[0])
      callback(false, "Invalid Credentials");

    else
      module.exports.verifyPassword(userid, oldPassword, function(verified, error){
        if (error)
          callback(false, error);
        else if (!verified)
          callback(false, "Invalid Credentials: password");
        else
          hashPassword(newPassword, function (newHash, error) {
            if (error)
              callback(false, error);
            else
              module.exports.query("UPDATE users SET hashedPassword='" + newHash +"' WHERE userid = '" + userid + "';", function (rows, error){
                if (error)
                  callback(false, error);
                else
                  callback(true, null);
              });
          });
      });
  });
}); // database.changePassword(user, oldPassword, newPassword, callback(success, error));

/*
  Procedure:
  database.changeEmail(userid, newEmail, Callback(success, error));
  Purpose:
  To allow a user to change their emails
  Parameters:
  userid, the userid of the use who wants to change their password
  newEmail, what they want to change their primary email to callback
  Produces:
  success, a boolean success indicator
  error, any error occurred along the way
  Pre-conditions:
  user has logged in, and therefore has access to their userid
  Post-conditions:
  email has been changed
  Preferences:
  None
*/
module.exports.changeEmail = (function (userid, newEmail, password, callback){
  newEmail = sanitize(newEmail);
  userid = sanitize(userid);
  password = sanitize(password);
  module.exports.verifyPassword(userid, password, function(verified, error){
    if (!verified)
      callback(false, error);
    else
      // Check to see if username or email are already in the database
      module.exports.userExists(newEmail, function(exists){
        if (exists) // Email exists
          callback(false, "ERROR: Email already in use.");
        else  // email does not already exist, proceed with creation
          module.exports.query("UPDATE users SET email='" + newEmail +"' WHERE userid = '" + userid + "';", function (rows, error){
            if (!error) {
              callback(true,error);
            }
            else
              callback(false,error);
          });
      });
  });
}); // database.changeEmail(user, newEmail, callback(success, error));

/*
  Procedure:
  database.changeAboutSection(userid, newAbout, Callback(success, error));
  Purpose:
  To allow a user to change their About Section
  Parameters:
  userid, the userid of the use who wants to change their password
  newAbout, a new about section to display
  Produces:
  success, a boolean success indicator
  error, any error occurred along the way
  Pre-conditions:
  user has logged in, and therefore has access to their about section
  Post-conditions:
  about section has to be changed
  Preferences:
  None
*/
module.exports.changeAboutSection = (function (userid, newAbout, callback){
  newAbout = sanitize(newAbout);
  userid = sanitize(userid);
  module.exports.query("UPDATE users SET about='" + newAbout +"' WHERE userid= '"+userid+ "';", function (rows, error){
    if (error)
      callback(false, error);
    else
      callback(true, error);
  });

});//database.changeAboutSection(userid, newAbout);

/*
  Procedure:
  database.logIn(user, password, callback(user, error));
  Purpose:
  To log a user in and get their data from the database
  Parameters:
  user, an email or username
  password, a plaintext password
  Produces:
  user, an object with properties:
  forename
  surname
  hashedPassword
  email
  emailVisible
  pgpPublic
  username
  type
  signupTime
  lastLoginTime
  userid
  about
  featuredImage
  token
  error, if one exists
  Pre-conditions:
  None
  Post-conditions:
  The user object will reflect what is in the database
  Preferences:
  Input will be sanitized inside this function
*/

module.exports.logIn = (function (user, password, callback) {
  user = sanitize(user);
  password = sanitize(password);
  module.exports.query("SELECT * FROM users WHERE email = '" + user + "';", function(rows, error){
    if (error)
      callback(null, error);
    else if (!rows[0]) // user is not an email in the database
      module.exports.query("SELECT * FROM users WHERE username ='" + user + "';", function(rows, error){
        if (error)
          callback(null,error);
        else if (!rows[0]) // user is also not a username, and therefore is not in the database
          callback(null, "Invalid Credentials");
        else
          module.exports.verifyPassword(rows[0].userid, password, function (success, error){
            if (error)
              callback(null, error);
            else if (!success)
              callback(null, "Invalid Credentials");
            else{
              module.exports.query("UPDATE users SET lastLoginTime= UTC_TIMESTAMP WHERE userid='" +rows[0].userid +"';", function(response,error){
                console.log(rows[0].username + " has logged in.");
              });
              callback(rows[0], null);
            }
          });
      });
    else
      module.exports.verifyPassword(rows[0].userid, password, function(success, error) {
        if (error)
          callback(null, error);
        else if (!success)
          callback(null, "Invalid Credentials");
        else{
          module.exports.query("UPDATE users SET lastLoginTime= UTC_TIMESTAMP WHERE userid='" +rows[0].userid +"';", function(response,error){
            console.log(rows[0].username + " has logged in.");
          });
          callback(rows[0], null);
        }
      });

  });
});// database.logIn(user, password, callback(user, error));

/*
  Procedure:
  database.getUser(userid, callback(userObject, error));
  Parameters:
  userid, the id of the user to retrieve
  callback(userObject,error), a function describing what to do with the data
  Produces:
  userObject, an object containing the following properties:
  forename
  surname
  hashedPassword
  email
  emailVisible
  pgpPublic
  username
  type
  signupTime
  lastLoginTime
  userid
  about
  featuredImage
  token
  error, if there is one
  Purpose:
  To retrieve information on an user
  Pre-conditions:
  userid corresponds to a user in the database
  Post-conditions:
  All information from the database will be retrieved
  Preferences:
  Use database.getIDforUsername to get the id to pass to this function
*/

module.exports.getUser = (function (userid, callback){
  module.exports.query("SELECT * FROM users WHERE userid='" + userid + "';", function(rows, error){
    if (error)
      callback(null, error);
    else if (!rows[0])
      callback(null, "ERROR: User does not exist.");
    else
      callback(rows[0], null);
  });
}); // database.getUser(userid, callback(userObject, error));

/*
  Procedure:
  database.getIDforUsername(username, callback(userid, error));
  Parameters:
  username, a string
  callback, a function describing what to do with the data
  Produces:
  userid, the userid associated with the username
  error, if there is one
  Purpose:
  To get the primary key for a username for faster information retrieval in the future
  Pre-conditions:
  None
  Post-conditions:
  The userid will correspond with a row in the database
  Preferences:
  Use in conjunction with database.getUser() to retrieve information on a user

  callback(userid, error)
*/
module.exports.getIDforUsername = (function (username, callback) {
  username=sanitize(username);
  module.exports.query("SELECT userid FROM users WHERE username= '" + username + "';", function(rows, error){
    if (error)
      callback(null, error);
    else if (!rows[0])
      callback(null, "ERROR: User does not exist.");
    else
      callback(rows[0].userid, null);
  });
});

// TO DO
// Update user information
// Split change password into two functions, one for password recovery
// PGP Public key

//images query shortcode

module.exports.imageInfo=(function(imageid, callback) {
  imageid=sanitize(imageid);
  module.exports.query("SELECT images.title, images.code, users.username, images.modifiedAt, images.rating, images.imageid, images.userid FROM images, users WHERE images.imageid= '" + imageid + "' and images.userid = users.userid;", function (rows, error){
    if (error)
      callback(null, error);
    else if (!rows[0])
      callback(null, "ERROR: Image does not exist.");
    else
      callback(rows[0], null);
  });
});

//albums query shortcode

module.exports.albumsInfo=(function(userid, callback) {
  userid=sanitize(userid);
  module.exports.query("SELECT users.username, users.userid, albums.name, albums.caption, albums.albumid, albums.dateCreated FROM albums, users WHERE users.userid= '" + userid + "' and albums.userid = users.userid ORDER BY albums.dateCreated ASC;" , function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});

//Get First Image of Album to Display

module.exports.firstImageofAlbum=(function(albumid, callback){
  albumid=sanitize(albumid);
  module.exports.query("SELECT images.code from images, albumContents, albums, users WHERE albumContents.albumid= '" + albumid + "' and albums.albumid= '" + albumid + "' and images.userid = users.userid and albumContents.imageid = images.imageid LIMIT 1;" , function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});

//albumContents query shortcode

module.exports.getAlbumContentsTitle=(function(albumid, callback) {
  albumid=sanitize(albumid);
  module.exports.query("SELECT albums.name, albums.userid, albums.albumid, users.username FROM albums, users WHERE albumid='" + albumid + "' and users.userid=albums.userid;" , function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows[0], null);
  });
});

module.exports.albumContentsInfo=(function(userid, albumid, callback) {
  albumid=sanitize(albumid);
  module.exports.query("SELECT images.imageid, images.title, images.code, users.username, images.rating, albums.name from images, albumContents, albums, users WHERE albumContents.albumid= '" + albumid + "' and albums.albumid= '" + albumid + "' and images.userid = users.userid and albumContents.imageid = images.imageid  and albums.userid = '" + userid + "' ORDER BY albumContents.dateAdded ASC;" , function (rows, error){
    if (error)
      callback(null, error);

    else
      callback(rows, null);
  });
});

// Get owner of albums in albumContents

module.exports.albumOwnerInfo=(function(albumid, callback) {
  albumid=sanitize(albumid);
  module.exports.query("SELECT images.imageid, images.title, images.code, users.username, images.rating, albums.name from images, albumContents, albums, users WHERE albumContents.albumid= '" + albumid + "' and albums.albumid= '" + albumid + "' and albums.userid = users.userid and albumContents.imageid = images.imageid ORDER BY albumContents.dateAdded ASC;" , function (rows, error){
    if (error)
      callback(null, error);
    else if (!rows[0])
      callback(null, "Owner does not exist");
    else
      callback(rows, null);
  });
});

//Get Commenter Information for single image

module.exports.commentInfo=(function(imageid, callback) {
  imageid=sanitize(imageid);
  module.exports.query("SELECT images.title, images.imageid, users.username, comments.postedAt, comments.comment, comments.commentId, users.userid FROM images, comments, users WHERE comments.active='1' AND comments.onImage='"+imageid+"' and images.imageid=comments.onImage and comments.postedBy= users.userid ORDER BY comments.postedAt ASC;" , function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});


// To comment

module.exports.saveComment=(function(userid, imageid, newComment, callback) {
  userid=sanitize(userid);
  imageid=sanitize(imageid);
  newComment=sanitize(newComment);
  module.exports.query("INSERT INTO comments (postedBy, onImage, comment, postedAt) VALUES ('"+ userid + "','" + imageid + "','" + newComment + "', UTC_TIMESTAMP);" , function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});

// delete Image
module.exports.deleteImage=(function (userid, imageid, callback) {
  userid=sanitize(userid);
  imageid=sanitize(imageid);
  module.exports.query("DELETE FROM images WHERE imageid='" + imageid + "' AND userid= '" + userid + "';", function (rows, error){
    if (error)
      callback(null, error);
    else
      module.exports.query("DELETE FROM albumContents WHERE imageid='" +imageid + "';", function (success, error){
        if (error)
          callback(null, error);
        else
          module.exports.query("DELETE FROM comments WHERE onImage='" + imageid + "';",function(success, error){
            if (error)
              callback(error);
            else
              callback(success, null);
          });
      });
  });
});

//Set profile picture
module.exports.setProfilePicture=(function (userid, imageid, callback) {
  userid=sanitize(userid);
  imageid=sanitize(imageid);
  module.exports.query("UPDATE users SET featuredImage='" + imageid + "' WHERE userid= '" + userid + "';", function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});

// get all images for user
module.exports.getAllImagesforUser=(function (userid, callback) {
  userid=sanitize(userid);
  module.exports.query("SELECT images.imageid, images.title, users.username, images.userid, images.code, images.rating, images.modifiedAt from images, users WHERE users.userid=images.userid and users.userid='" + userid + "' ORDER BY images.modifiedAt DESC;", function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});


module.exports.getAllImagesforUser=(function (userid, callback) {
  userid=sanitize(userid);
  module.exports.query("SELECT images.imageid, images.title, users.username, images.userid, images.code, images.rating, images.modifiedAt from images, users WHERE users.userid=images.userid and users.userid='" + userid + "' ORDER BY images.modifiedAt DESC;", function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});

/*
  Procedure:
  database.toggleLike(userid, imageid, callback(success, error));
  Parameters:
  userid, the user to toggle the like
  imageid, the image to toggle
  Produces:
  success, a boolean
  error, if there is one
  Purpose:
  To make it easy to like or unlike an image, depending on its current status
  Pre-conditions:
  None
  Post-conditions:
  The database will be changed to reflect this change in opinion
  Preferences:
  Automatically sanitizes.
*/

module.exports.toggleLike=(function (userid, imageid, callback) {
  userid=sanitize(userid);
  imageid=sanitize(imageid);
  // Check to see if user has already rated this image.
  module.exports.query("SELECT * FROM ratings WHERE imageid='" + imageid + "' AND userid='" + userid + "';", function (rows, error){
    if (error)
      callback(false, error);
    else if (!rows[0])
      // rating for this image by this user does not exist, add this rating, increment image rating
      module.exports.query("INSERT INTO ratings (userid, imageid) VALUES ('" + userid + "', '" + imageid + "');", function (rows, error){
        if (error)
          callback(false, error);
        else
          module.exports.query("SELECT rating FROM images WHERE imageid='" + imageid + "';", function(results, error){
            if (error)
              callback(false, error);
            else
              module.exports.query("UPDATE images SET rating='" + (results[0].rating + 1) + "' WHERE imageid= '" + imageid + "';", function(updated, error){
                if (error)
                  callback(false, error);
                else
                  callback("Liked", null);
              }); // Update images table with new rating
          }); // Find current rating of image
      }); // Add rating
    else
      // if rating for this user already exists, delete the rating, decrement the rating
      module.exports.query("DELETE FROM ratings WHERE userid='" + userid + "' AND imageid='" + imageid + "';",  function (rows, error){
        if (error)
          callback(false, error);
        else
          module.exports.query("SELECT rating FROM images WHERE imageid='" + imageid + "';", function(results, error){
            if (error)
              callback(false, error);
            else module.exports.query("UPDATE images SET rating='" + (results[0].rating - 1) +"' WHERE imageid= '" + imageid + "';", function(updated, err){
              if (err)
                callback(false, err);
              else
                callback("Unliked", null);
            }); // Update images table with new rating
          }); // Find current rating of image
      }); // Delete rating from table
  }); // Check if rating exists
}); // module.exports.toggleLike

/*
  Procedure:
  database.countNumberofLikes(imageid, callback(count, error));
  Parameters:
  imageid, the image to check likes
  Purpose:
  To get the results of ratings in each image
  Pre-conditions:
  Image exists
  Post-conditions:
  Count will be the most up-to-date number of likes
  Preferences:
  Automatically sanitizes.
*/

module.exports.countNumberofLikes=(function (imageid, callback) {
  imageid=sanitize(imageid);
  module.exports.query("SELECT COUNT(userid) AS likes FROM ratings WHERE imageid= '" + imageid + "';" , function (count, error){

    if (error)
      callback(null, error);
    else
      callback(count[0].likes, null);
  });
});

/*
  Procedure:
  database.hasLiked(userid, imageid, callback(liked, error));
  Parameters:
  userid, the user to check likes
  imageid, the image to check likes
  Purpose:
  To check to see if a user has rated an image
  Pre-conditions:
  Image exists
  User exists
  Post-conditions:
  liked will be a boolean
  Preferences:
  Automatically sanitizes.
*/

module.exports.hasLiked=(function (userid, imageid, callback) {
  imageid=sanitize(imageid);
  userid=sanitize(userid);
  module.exports.query("SELECT * FROM ratings WHERE imageid='" + imageid + "' AND userid='" + userid + "';", function (rows, error){
    if (error)
      callback(null, error);
    else if (rows[0])
      callback(true, null);
    else
      callback(false, null);
  });
});


// create Album
module.exports.createAlbum=(function (userid, name, callback) {
  userid=sanitize(userid);
  name=sanitize(name);
  module.exports.query("INSERT INTO albums (userid, name, dateCreated) VALUES('" + userid + "','" + name + "', UTC_TIMESTAMP);", function (rows, error){
    if (error)
      callback(null, error);
    else
      callback(rows, null);
  });
});

//delete from album (not image database)
module.exports.deleteFromAlbums= (function (albumid, imageid, callback) {
  albumid=sanitize(albumid);
  imageid=sanitize(imageid);
  module.exports.query("DELETE FROM albumContents WHERE albumid='" + albumid + "' AND imageid='" +imageid + "' LIMIT 1;",function (success, error){
    if (error)
      callback(null, error);
    else
      callback(success, null);
  });
});

// delete whole album
module.exports.deleteAlbum=(function (userid, albumid, callback) {
  albumid=sanitize(albumid);
  module.exports.query("DELETE FROM albums WHERE albumid= '" + albumid + "' and userid= '" + userid + "';",function(success, error){
    if (error)
      callback(null, error)
      else
        module.exports.query("DELETE FROM albumContents WHERE albumid= '" + albumid + "';",function (success, err){
          if (err)
            callback (null, err)
            else
              callback(success, null);
        });
  });
});

// add to album
module.exports.addtoAlbum=(function (albumid, imageid, callback) {
  albumid=sanitize(albumid);
  imageid=sanitize(imageid);
  module.exports.query("INSERT INTO albumContents (albumid, imageid, dateAdded) VALUES('" + albumid + "','" + imageid + "', UTC_TIMESTAMP);", function (success, error){
    if (error)
      callback(null, error)
      else
        callback(success, null);
  });
});


/* DATABASE SEARCH FUNCTIONS */
/*
  Procedure:
  database.omnisearch(searchString, callback(resultObject, error));
  Parameters:
  searchString, A string to search
  Purpose:
  Find content in the database similar to a string
  Pre-conditions:
  None
  Post-conditions:
  All results will be returned.
  Preferences:
  None
*/
module.exports.omnisearch = (function(searchString, callback){
  var result = {};
  module.exports.userSearch (searchString, function(userArray, error){
    result.users = userArray;
    if (error)
      callback(null, error);
    else
      module.exports.imageSearch (searchString, function(imageArray, error){
        result.images = imageArray;
        if (error)
          callback(null, error);
        else
          module.exports.commentSearch(searchString, function (commentArray, error) {
            result.comments = commentArray;
            if (error)
              callback(null, error);
            else
              module.exports.albumSearch(searchString, function (albumArray, error){
                result.albums = albumArray;
                if (error)
                  callback(null, error);
                else
                  module.exports.functionSearch(searchString, function(functionArray, error){
                    result.functions = functionArray;
                    if (error)
                      callback(null, error);
                    else
                      callback(result, null);
                  });
              });
          });
      });
  });
});
/*
  Procedure:
  database.userSearch(searchString, callback(resultArray, error));
  Parameters:
  searchString, A string to search
  Purpose:
  Find users in the database with a username close to the searchString
  Pre-conditions:
  None
  Post-conditions:
  All results will be returned.
  Preferences:
  Automatically sanitizes.
*/
module.exports.userSearch = (function(searchString, callback){
  searchString = sanitize(searchString);
  module.exports.query("SELECT username, featuredImage FROM users WHERE username LIKE '%" + searchString + "%';", function (results, error){
    if (error)
      callback(null, error);
    else
      callback(results, null);
  });
});
/*
  Procedure:
  database.imageSearch(searchString, callback(resultArray, error));
  Parameters:
  searchString, A string to search
  Purpose:
  Find images in the database with a title similar to searchString
  Pre-conditions:
  None
  Post-conditions:
  All results will be returned.
  Preferences:
  Automatically sanitizes.
*/
module.exports.imageSearch = (function(searchString, callback){
  searchString = sanitize(searchString);
  module.exports.query("SELECT * FROM images WHERE title LIKE '%" + searchString + "%';", function (results, error){
    if (error)
      callback(null, error);
    else
      callback(results, null);
  });
});
/*
  Procedure:
  database.commentSearch(searchString, callback(resultArray, error));
  Parameters:
  searchString, A string to search
  Purpose:
  Find comments in the database with content similar to searchString
  Pre-conditions:
  None
  Post-conditions:
  All results will be returned.
  Preferences:
  Automatically sanitizes.
*/
module.exports.commentSearch = (function(searchString, callback){
  searchString = sanitize(searchString);
  module.exports.query("SELECT * FROM comments WHERE comment LIKE '%" + searchString + "%';", function (results, error){
    if (error)
      callback(null, error);
    else
      callback(results, null);
  });
});
/*
  Procedure:
  database.albumSearch(searchString, callback(resultArray, error));
  Parameters:
  searchString, A string to search
  Purpose:
  Find albums in the database with a name similar to searchString
  Pre-conditions:
  None
  Post-conditions:
  All results will be returned.
  Preferences:
  Automatically sanitizes.
*/
module.exports.albumSearch = (function(searchString, callback){
  searchString = sanitize(searchString);
  module.exports.query("SELECT albums.*, users.username FROM albums,users WHERE name LIKE '%" + searchString + "%' AND albums.userid=users.userid;", function (results, error){
    if (error)
      callback(null, error);
    else
      callback(results, null);
  });
});
/*
  Procedure:
  database.functionSearch(searchString, callback(resultArray, error));
  Parameters:
  searchString, A string to search
  Purpose:
  Find functions in the database with a name similar to searchString
  Pre-conditions:
  None
  Post-conditions:
  All results will be returned.
  Preferences:
  Automatically sanitizes.
*/
module.exports.functionSearch = (function(searchString, callback){
  searchString = sanitize(searchString);
  module.exports.query("SELECT * FROM functions WHERE functionName LIKE '%" + searchString + "%';", function (results, error){
    if (error)
      callback(null, error);
    else
      callback(results, null);
  });
});

/* END DATABASE SEARCH FUNCTIONS */

/* Comment moderation functions */
// flag comments
// callback(success, error);
module.exports.flagComment = (function(commentId, flaggedByID,callback){
  commentId = sanitize(commentId);
  flaggedByID = sanitize(flaggedByID);
  // Check to see if user has flagged this comment already
  module.exports.hasFlaggedComment(flaggedByID, commentId, function(flaggedAlready, error){
    if (error){
      callback(false, error);
    }
    else if (flaggedAlready){
      module.exports.query ("INSERT INTO flaggedComments (flaggedBy, commentId) VALUES('" + flaggedByID + "','" + commentId + "');", function(results, error){
        if (error)
          callback(false, error);
        else
          callback(true, null);
      });
    }
    else {
      callback(false, "User has already flagged this comment");
    }
  });
});

module.exports.hasFlaggedComment = (function(userid, commentId,callback){
  commentId = sanitize(commentId);
  userid = sanitize(userid);
  module.exports.query("SELECT flaggedBy FROM flaggedComments WHERE flaggedBy='" + userid + "' AND commentId = '" + commentId + "';", function(result, error){
    if (error) {
      callback(false, error);
    }
    else if (result[0]) {
      callback(true, null);
    }
    else {
      callback(false, null);
    }
  });
});

// delete comments
// User is an admin or moderator
// User is the owner of the image
// User is the Commenter
// callback(success, error)
module.exports.canDeleteComment= (function (userid, commentId, callback) {
  userid=sanitize(userid);
  commentId=sanitize(commentId);
  module.exports.query ("SELECT username FROM users WHERE userid='" + userid +"' AND (type='A' OR type='M');", function(result, error){
    if (error)
      callback(false, error);
    else if (result[0]) // User is a moderator or an admin
      callback(true, null);
    else
      module.exports.query("SELECT postedBy FROM comments, images WHERE comments.onImage=images.imageid AND images.userid='" + userid + "'AND comments.commentId='" + commentId + "';", function(result, error){
        if (error)
          callback(false, error);
        else if (result[0]) // User owns the image
          callback(true, null);
        else
          module.exports.query("SELECT postedBy FROM comments WHERE postedBy='" + userid +"' AND commentId='" + commentId + "';", function (result, error){
            if (error)
              callback(false, error);
            else if (result[0]) // User is the comment poster.
              callback(true, null);
            else
              callback(false, null);
          });
      });
  });
});
module.exports.deleteComment= (function(userid, commentId, callback){
  userid=sanitize(userid);
  commentId=sanitize(commentId);
  module.exports.canDeleteComment(userid, commentId, function(authorized, error){
    if (error)
      callback(false, error);
    else if (!authorized)
      callback(false, "User is not authorized to delete this comment.");
    else
      module.exports.query("UPDATE comments SET active='0' WHERE commentId='" + commentId + "';", function (result, error){
        if (error)
          callback(false, error);
        else
          callback(true, null);
      });
  });
});

/* End comment moderation functions */
