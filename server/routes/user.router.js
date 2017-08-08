var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username,
      userID : req.user.id
    };

    //  UPDATE THIS ROUTE TO SEND ALL RELEVANT INFO BACK TO CLIENT
    // // get user data from db and send back to client
    // pool.connect(function(err, client, done) {
    //   if(err) {
    //     console.log("Error connecting to db: ", err);
    //     res.sendStatus(500);
    //     next(err); // verfiy what this line is doing
    //   } else {
    //   var queryText = "UPDATE usage SET total_trips = total_trips + 1, trips_this_week = trips_this_week + 1 WHERE user_id = $1;";
    //   client.query(queryText, [userInfo.userID], function (errorMakingQuery, result) {
    //     client.end();
    //     if(errorMakingQuery) {
    //       console.log('Attempted to query with', queryText);
    //       console.log('Error making query', errorMakingQuery);
    //       res.sendStatus(500);
    //     } else {
    //       // console.log(result);
    //       // Send back the results
    //       userInfo.result = result.rows;
    //       res.send(userInfo);
    //     }
    //   });
    //   }
    // });


    res.send(userInfo);
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
    var queryText = "UPDATE usage SET total_trips = total_trips + 1, trips_this_week = trips_this_week + 1 WHERE user_id = $1 RETURNING *;";
    client.query(queryText, [req.user.id], function (errorMakingQuery, result) {
      client.end();
      if(errorMakingQuery) {
        console.log('Attempted to query with', queryText);
        console.log('Error making query', errorMakingQuery);
        res.sendStatus(500);
      } else {
        console.log(result);
        // Send back the results
        res.send({data: result.rows});
      }
    });
    }
  });



});


module.exports = router;
