// config/database.js

var auth = require('./auth.js');  // Include private-strings that should not be on the public repo
var mysql = require('mysql'); // Include the mysql library
var bcrypt = require('bcrypt-nodejs'); // Include Blowfish Algorithm for hashing passwords
var validate = require('validator'); // Include validation functions

// Make a connection pool to handle concurrencies esp. that of async calls
var pool = mysql.createPool({
    host : auth["mysql-hostname"], 
    user : auth["mysql-username"],
    password : auth["mysql-password"],
    database : auth["mysql-database"]
});

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
    module.exports.query("SELECT username FROM users WHERE username = '" + checkString + "';", function (rows, error){
	if (rows.length === 0){
	    module.exports.query("SELECT email FROM users WHERE email = '" + checkString + "';", function(rows, error){
		if (rows.length === 0){
		    callback(false);
		}
		else callback(true);
	    });
	}
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

    
    forename = sanitize(forename);
    surname = sanitize(surname);
    password = sanitize(password);
    email = sanitize(email);
    pgpPublic = sanitize(pgpPublic);
    username = sanitize(username);
    dob = sanitize(dob);

//TODO:

    
// validate input
    // Check to see if username or email are already in the database
    
    module.exports.userExists(username, function(exists){
	if (exists){
	    callback(false, "ERROR: Username already exists.");
	}
	else {
	    module.exports.userExists(email, function(exists){
		if (exists) {
		    callback(false, "ERROR: Email already used.");
		}
		else
		{
		    hashPassword(password, function (hashedPassword){

			module.exports.query("INSERT INTO users (forename, surname, hashedPassword, email, pgpPublic, username, dob, signupTime) VALUES ('" + forename + "','" + surname + "','" + hashedPassword +  "','" + email.toLowerCase() + "','" + pgpPublic + "','" + username + "','" + dob + "','" + Date.now() +"');", function(results, error){
			    console.log(results);
			    callback(true,error);

			});
		    }); 
		}
	    });
	}	
    });
}); // database.addUser(forename, surname, password, email, pgpPublic, username, dob, callback(success, error));

/*
  Procedure: database.verifyPassword(user, passwordToTest, callback(verified));
  Purpose: Checks to see if a password is correct
  Parameters: user, a string that is either the username or the email address
              passwordToTest, a plaintext version of a password to test
	      callback(verified), a function describing what to do with the result
  Produces: verified, A BOOLEAN value representing if the password was correct && the user exists
n  Pre-conditions: None
  Post-conditions: None
  Preferences: This procedure automatically sanitizes user input. This will return false if the user does not exist, also. The client should never be told if a user exists.
*/
module.exports.verifyPassword = (function (user, passwordToTest, callback){
    user = sanitize(user);
    passwordToTest = sanitize(passwordToTest);
    module.exports.query("SELECT hashedPassword FROM users WHERE username = '" + user +"'", function(rows, error){
	if (!rows){ // user is not a username
	    module.exports.query("SELECT hashedPassword FROM users WHERE email =" + user, function(rows, error){
		if (!rows){ // user is not an email
		    callback(false); // user does not exist
		}
		else {
		    // check the database hashed password with the entered password
		    callback(bcrypt.compareSync(passwordToTest, rows[0].hashedPassword));
		}
	    });
	}
	else {
	    // check the database hashed password with the entered password
	    callback(bcrypt.compareSync(passwordToTest, rows[0].hashedPassword));
	}
    });
}); // database.verifyPassword(user, passwordToTest, callback(verified));
			
/*
  Procedure: hashPassword(passwordtohash, callback(hashedPassword));
  Purpose: Hashes a password with Blowfish Algorithm
  Parameters: passwordtohash, a plaintext version of a password to hash
	      callback(hashedPassword), a function describing what to do with the result
  Produces: hashedPassword, the hashed password
  Pre-conditions: None
  Post-conditions: The password will be hashed with Blowfish Crypt
  Preferences: This function is not available outside of this document.
*/
var hashPassword = (function (passwordtohash, callback) {
    var hashedPass = bcrypt.hashSync(passwordtohash,bcrypt.genSaltSync(8), null);
    callback(hashedPass);
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
    return validate.escape(pool.escape(string));
    
}); // sanitize(string);
