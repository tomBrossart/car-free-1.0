var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route', req.user.id);
  // query db to see if they've completed buildProfile, if no have client redirect to buildProfile

  // check if logged in
  if(req.isAuthenticated()) {

    pool.connect(function(err, client, done) {
      if(err) {
        console.log("Error connecting to db: ", err);
        res.sendStatus(500);
        next(err); // verfiy what this line is doing
      } else {
      var queryText = "SELECT completed_registration FROM profile WHERE user_id = $1;";
      client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // console.log("result from completed_registration query", result.rows[0].completed_registration);
          console.log("result from completed_registration query -- just result", result);
          // Send back the results
          var userInfo = {
            username : req.user.username,
            userID : req.user.id,
          };
          // had to more specifically select completed_registration from the result object
            if(result.rowCount == 0 || !result.rows[0].completed_registration) {
              userInfo.newUser = true;
            }
            else {
              userInfo.newUser = false;
            }
            res.send(userInfo);
          }
      });
      }
    });


  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

// post new craving to db
router.post('/crave', function(req, res) {
  console.log('put /user/crave route', req);

  var addCrave = {
    desire : req.body.desire,
    location : req.body.location,
    notes :  req.body.notes,
    date : new Date()
  };

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting to db: ", err);
      res.sendStatus(500);
      next(err); // verfiy what this line is doing
    } else {
      // TO DO FIGURE OUT WHY THIS ISN'T RETURNING
    var queryText = 'INSERT INTO "cravings"  ("user_id", "strength_of_desire", "location", "notes", "date") VALUES ($1, $2, $3, $4, $5);';
    client.query(queryText, [req.user.id, addCrave.desire, addCrave.location, addCrave.notes, addCrave.date], function (errorMakingQuery, result) {
      done();
      if(errorMakingQuery) {
        console.log('Attempted to query with', queryText);
        console.log('Error making query', errorMakingQuery);
        res.sendStatus(500);
      } else {
        console.log('/crave result:', result.rows);
        // Send back the results
        res.sendStatus(200);
      }
    });
    }
  });
});

// put updated craving to db
router.put('/crave/:id', function(req, res) {
  console.log('put /user/crave route', req.body);

  var upCrave = {
    desire : req.body.desire,
    location : req.body.location,
    notes :  req.body.notes,
    crave_id : req.params.id
  };

console.log('upCrave coming through as:', upCrave);
  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting to db: ", err);
      res.sendStatus(500);
      next(err); // verfiy what this line is doing
    } else {
      // TO DO FIGURE OUT WHY THIS ISN'T RETURNING
    var queryText = 'UPDATE "cravings" SET "strength_of_desire" = $1, "location" = $2, "notes" = $3 WHERE "id" = $4;';
    client.query(queryText, [upCrave.desire, upCrave.location, upCrave.notes, upCrave.crave_id], function (errorMakingQuery, result) {
      done();
      if(errorMakingQuery) {
        console.log('Attempted to query with', queryText);
        console.log('Error making query', errorMakingQuery);
        res.sendStatus(500);
      } else {
        console.log('/crave result:', result.rows);
        // Send back the results
        res.sendStatus(200);
      }
    });
    }
  });
});


// delete craving from db
router.delete('/crave/:id', function(req, res) {
  console.log('delete /user/crave route', req.body);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting to db: ", err);
      res.sendStatus(500);
      next(err); // verfiy what this line is doing
    } else {
      // TO DO FIGURE OUT WHY THIS ISN'T RETURNING
    var queryText = 'DELETE FROM "cravings" WHERE "id" = $1';
    client.query(queryText, [req.params.id], function (errorMakingQuery, result) {
      done();
      if(errorMakingQuery) {
        console.log('Attempted to query with', queryText);
        console.log('Error making query', errorMakingQuery);
        res.sendStatus(500);
      } else {
        console.log('/crave result:', result.rows);
        // Send back the results
        res.sendStatus(200);
      }
    });
    }
  });
});


// get updated usage data and send back to client
router.get('/dash', function(req, res) {
  // console.log('get /user/dash route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username,
      userID : req.user.id
    };
    pool.connect(function(err, client, done) {
      if(err) {
        console.log("Error connecting to db: ", err);
        res.sendStatus(500);
      } else {
      var queryText = "SELECT * FROM profile WHERE user_id = $1;";
      client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log("dash get result", result.rows);
          // Send back the results
          res.send(result.rows);
        }
      }); // end query
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// get motivation img and msg
router.get('/load', function(req, res) {
  // console.log('get /user/load route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username,
      userID : req.user.id
    };
    pool.connect(function(err, client, done) {
      if(err) {
        console.log("Error connecting to db: ", err);
        res.sendStatus(500);
        next(err); // verfiy what this line is doing
      } else {
      var queryText = 'SELECT "msg", "img" FROM motivation JOIN profile ON "profile"."motivation" = "motivation"."selection" WHERE "profile"."user_id" = $1;';
      client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log("user/load get result", result.rows);
          // Send back the results
          res.send(result.rows);
        }
      });
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// get updated usage data and send back to client
router.get('/cravings', function(req, res) {
  // console.log('get /user/cravings route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username,
      userID : req.user.id
    };
    pool.connect(function(err, client, done) {
      if(err) {
        console.log("Error connecting to db: ", err);
        res.sendStatus(500);
      } else {
      var queryText = "SELECT * FROM cravings WHERE user_id = $1;";
      client.query(queryText, [userInfo.userID], function (errorMakingQuery, result) {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log("cravings get result", result.rows);
          // Send back the results
          res.send(result.rows);
        }
      }); // end query
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

module.exports = router;
