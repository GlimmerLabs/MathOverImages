/**
* challenge.js
*   Functions for handling challenge pages.
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

module.exports.gallery = function(req, res, database) {
  res.render('challenge-gallery', {
    user: req.session.user,
      challenge: {},
      type: "basic"
  });
}; // gallery

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

