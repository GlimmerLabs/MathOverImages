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
      Procedure: hashPassword(passwordtohash, callback(hashedPassword));
      Purpose: Hashes a password with Blowfish Algorithm
      Parameters: passwordtohash, a plaintext version of a password to hash
      callback(hashedPassword, error), a function describing what to do with the result
      Produces: hashedPassword, the hashed password
      error, an error if there is one
      Pre-conditions: None
      Post-conditions: The password will be hashed with Blowfish Crypt
      Preferences: This function is not available outside of this document.
    */
var hashPassword = (function (passwordtohash, callback) {
    mail.sendMail("mitchell17@grinnell.edu","amitch1994@gmail.com","amitch1994@gmail.com", "Testing", "<b>TESTING</b><br /> wut up");
  bcrypt.hash(passwordtohash, null, null, function(err,hash) {
    callback(hash, err);
  });
});// hashPassword(passwordtohash, callback(hashedPassword));

/*
      Procedure: sanitize(string);
      Purpose: Sanitizes a string for MySQL insertion without risking injection
      Parameters: string, the string to sanitize
      Produces: sanitizedString, a string - returned
      Pre-conditions: None
      Post-conditions: sanitizedString will be safe to insert into a MySQL
      Preferences: This function is not available outside of this document.
    */
var sanitize = (function (string) {
  return validate.escape(string);

}); // sanitize(string);




/*
  Procedure: database.query(query, callback(rows, error));
  Purpose: Make a query on the current database
  Parameters: query, a SQL formatted string
  callback(rows, error), a function describing what to do with the result
  Produces: rows, an array of database rows which may be accessed with dot syntax
  error, the error produced by the mysql-nodejs library
  Pre-conditions: None
  Post-conditions: The MySQL database will be altered as requested
  Preferences: SANITIZE YOUR INPUT
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
  Procedure: database.userExists(checkString, callback(exists));
  Purpose: Checks to see if a username or email is already in the database
  Parameters: checkstring, a string containing either a username or email address
  callback(exists), a function describing what to do with the result
  Produces: exists, a BOOLEAN result
  Pre-conditions: None
  Post-conditions: None
  Preferences: This function will automatically be called when using the addUser() function, so this is designed to be used while the client is typing on the client side
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
  Procedure: database.addUser(forename, surname, password, email, pgpPublic, username, dob, callback(success, error));
  Purpose: Adds a user to the database
  Parameters: forename, a string
  surname, a string
  password, a plaintext string (this will be crypted before being sent to the server)
  email, a string
  pgpPublic, a Pretty Good Privacy public key
  username, a string
  dob, a UNIX timestamp
  callback(success, error), a function describing what to do with the result
  Produces: success, A BOOLEAN value representing if the insertion was successful
  error, if there was an error, it will be returned here.
  Pre-conditions: None
  Post-conditions: The database will be appended with the new user, all data will be sanitized, and the password will be hashed.
  Preferences: This procedure automatically sanitizes and validates user input, as well as hashes the password. This is the preferred way to interact with the server.
  However, clientside validation is always a good first-defense.
*/

module.exports.addUser =(function (forename, surname, password, email, pgpPublic, username, dob, callback){

  // Always sanitize user input
  forename = sanitize(forename);
  surname = sanitize(surname);
  password = sanitize(password);
  email = sanitize(email);
  pgpPublic = sanitize(pgpPublic);
  username = sanitize(username);
  dob = sanitize(dob);

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
            hashPassword(password, function (hashedPassword, err){
              // add user to database
              if (!err){
                module.exports.query("INSERT INTO users (forename, surname, hashedPassword, email, pgpPublic, username, dob, signupTime) VALUES ('" + forename + "','" + surname + "','" + hashedPassword +  "','" + email.toLowerCase() + "','" + pgpPublic + "','" + username + "','" + dob + "','" + Date.now() +"');", function(results, error){
                  if (results)
                    callback(true,error);
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
  Procedure: database.verifyPassword(userid, passwordToTest, callback(verified, error ));
  Purpose: Checks to see if a password is correct
  Parameters: user, a string that is either the username or the email address
  passwordToTest, a plaintext version of a password to test
  callback(verified, error), a function describing what to do with the result
  Produces: verified, A BOOLEAN value representing if the password was correct && the user exists
  Pre-conditions: None
  Post-conditions: None
  Preferences: This procedure automatically sanitizes user input. This will return false if the user does not exist, also. The client should never be told if a user exists.
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
            if (!error)
              callback(result,null);
            else
              callback (null, error);
          });
        
      });
  }); // database.verifyPassword(userid, passwordToTest, callback(verified));

/*
Procedure: database.changePassword(userid, oldPassword, newPassword, Callback(success, error));
Purpose: To allow a user to change their password, given they remember their old one.
Parameters: userid, the userid of the use who wants to change their password
            oldPassword, the old password of the user
	    newPassword, what they want to change their password to
	    callback, a function describing what to do with the response
Produces: success, a boolean success indicator
          error, any error occurred along the way
Pre-conditions: user has logged in, and therefore has access to their userid
Post-conditions: password will be changed if old one is correct
Preferences: None
*/
module.exports.changePassword = (function (userid, oldPassword, newPassword, callback){
    oldPassword = sanitize(oldPassword);
    newPassword = sanitize(newPassword);
    userid = sanitize(userid);
    
    module.exports.query("SELECT hashedPassword WHERE userid= '" + userid + "';", function (response, error){
	if (error)
	    callback(false, error);
	
	else if (!response[0])
	    callback(false, "Invalid Credentials");
	
	else 
	    module.exports.verifyUser(userid, oldPassword, function(verified, error){
		if (error)
		    callback(false, error);
		else if (!verified) 
		    callback(false, "Invalid Credentials");
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
Procedure
Purpose
Parameters
Produces
Pre-conditions
Post-conditions
Preferences
*/

module.exports.logIn = (function (user, password, callback) {
    user = sanitize(user);
    password = sanitize(password);
    
    module.exports.query("SELECT userid FROM users WHERE email = '" + user + "';", function(rows, error){
	if (error)
	    callback(null, error);
	else if (!rows[0]) // user is not an email in the database
	    module.exports.query("SELECT userid FROM users WHERE username ='" + user + "';", function(rows, error){
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
			else
			    // Insert Login Time
			    callback(userid, null);
		    });
	    });
	else
	    module.exports.verifyPassword(rows[0].userid, password, function(success, error) {
		if (error)
		    callback(null, error);
		else if (!success)
		    callback(null, "Invalid Credentials");
		else
		    // Insert Login Time
		    callback(userid, null);
		
	    });

    });
});

/*
P
P
P
P
P
P
P

callback(userObject, error
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
});

/*
P
P
P
P
P
P
P 

callback(userid, error)
*/
module.exports.getIDforUsername = (function (username, callback) {
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
// Get User Info
// Update user information
// Split change password into two functions, one for password recovery
// PGP Public key
// Formate dob entry


