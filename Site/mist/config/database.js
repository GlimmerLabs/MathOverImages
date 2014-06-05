// config/database.js
var auth = require('./auth.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var pool = mysql.createPool({
    host : auth["mysql-hostname"],
    user : auth["mysql-username"],
    password : auth["mysql-password"],
    database : auth["mysql-database"],
    stringifyObjects : true,
    
    
});

// database.query(query, callback){}
// callback(rows, error)
//
// Returns an array of objects based on the table in the MySQL server.

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
});



module.exports.addUser =(function (forename, surname, password, email, pgpPublic, username, dob, callback){

    console.log("adding password");
    hashPassword(password, function (hashedPassword){ 
	console.log("done");  
    });
    console.log("done adding password");
    /*
      this.query("INSERT INTO users (forename, surname, hashedPassword, email, pgpPublic, username, dob) VALUES ('" + forename + "','" + surname + "','" + hashedPassword +  "','" + email + "','" + pgpPublic + "','" + username + "','" + dob + "');", function(rows, error){
      console.log(rows[0]);
      callback("data");

      });
    */


});


// database.verifyPassword(username, email, passwordToTest, callback)
// username xor email may be null
// Callback(verified-BOOLEAN)
// Returns true if password was correct and false if user doesn't exist or if password is incorrect

module.exports.verifyPassword = (function (username, email, passwordToTest, callback){
    var row;
    
    if (username)
	this.query("SELECT hashedPassword FROM users WHERE username =" + username, function(rows, error){
	    if (!rows){
		callback(false);
	    }
	    else {
		callback(bcrypt.compareSync(passwordToTest, rows[0].hashedPassword));
	    }
	    
	});
    else if (email)
	this.query("SELECT hashedPassword FROM users WHERE email =" + email, function(rows, error){
	    if (!rows){
		callback(false);
	    }
	    else {
		callback(bcrypt.compareSync(passwordToTest, rows[0].hashedPassword));
	    }
	    
	});
    else callback(false);

});



// callback(hashedPassword)
var hashPassword = (function (passwordtohash, callback) {
    callback(bcrypt.hashSync(passwordtohash,bcrypt.genSaltSync(8), null));
});
