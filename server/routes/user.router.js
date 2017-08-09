var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // query db to see if they've completed buildProfile, if no have client redirect to buildProfile

  // check if logged in
  if(req.isAuthenticated()) {

    pool.connect(function(err, client, done) {
      if(err) {
        console.log("Error connecting to db: ", err);
        res.sendStatus(500);
        next(err); // verfiy what this line is doing
      } else {
      var queryText = "SELECT completed_registration FROM users WHERE id = $1;";
      client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        client.end();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log(result);
          // Send back the results

          console.log('logged in', req.user);
          var userInfo = {
            username : req.user.username,
            userID : req.user.id,
            newUser : false
          };
            if(result === false) {
              userInfo.newUser = true;
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

// update db with "I drove" button increment
router.put('/drove', function(req, res) {
  console.log('put /user/drove route');

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting to db: ", err);
      res.sendStatus(500);
      next(err); // verfiy what this line is doing
    } else {
      // TO DO FIGURE OUT WHY THIS ISN'T RETURNING
    var queryText = "UPDATE usage SET total_trips = total_trips + 1, trips_this_week = trips_this_week + 1 WHERE user_id = $1;";
    client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
      client.end();
      if(errorMakingQuery) {
        console.log('Attempted to query with', queryText);
        console.log('Error making query', errorMakingQuery);
        res.sendStatus(500);
      } else {
        console.log(result);
        // Send back the results
        res.sendStatus(200);
      }
    });
    }
  });
});

// get updated usage data and send back to client
router.get('/dash', function(req, res) {
  console.log('get /user/dash route');
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
      var queryText = "SELECT * FROM usage WHERE user_id = $1;";
      client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        client.end();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log("dash get result", result.rows);
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

// get motivation img and msg
router.get('/load', function(req, res) {
  console.log('get /user/load route');
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
      var queryText = 'SELECT "msg", "img" FROM motivation JOIN users ON "users"."motivation" = "motivation"."selection" WHERE "users"."id" = $1;';
      client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
        client.end();
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

module.exports = router;
