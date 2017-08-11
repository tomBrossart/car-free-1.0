var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// Handles POST request with buildProf data from first page
router.post('/one', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log("in bp post route and req.body is:", req.body);
  var buildUser = {
    user: req.user.id,
    motivation: req.body.motivation,
    start_date: "03/03/2003"
  };
  console.log('first page bp:', buildUser);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query('INSERT INTO "profile" ("user_id", "motivation", "start_date") VALUES ($1, $2, $3);',
      [buildUser.user, buildUser.motivation, buildUser.start_date],
        function (err, result) {
          done();
          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.sendStatus(203);
          }
        });
      });
  }
});


// Handles PUT request with buildProf data from second page
router.put('/two/:id', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log("req.body is:", req.body);
  var buildUser = {
    user: req.user.id,
    core_need: req.body.core_need,
    current_usage: req.body.current_usage
  };
  console.log('second page bp:', buildUser);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query('UPDATE "profile" SET "current_usage" = $1, "core_need" = $2  WHERE user_id = $3;',
      [buildUser.current_usage, buildUser.core_need, buildUser.user],
        function (err, result) {
          done();
          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.sendStatus(203);
          }
        });
      });
  }
});



// Handles PUT request with buildProf data from third page
router.put('/three/:id', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log("req.body is:", req.body);
  var buildUser = {
    user: req.user.id,
    goal_date: req.body.goal_date,
    goal_usage: req.body.goal_usage
  };
  console.log('third page bp:', buildUser);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query('UPDATE "profile" SET "goal_usage" = $1, "goal_date" = $2  WHERE user_id = $3;',
      [buildUser.goal_usage, buildUser.goal_date, buildUser.user],
        function (err, result) {
          done();
          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.sendStatus(203);
          }
        });
      });
  }
});

module.exports = router;
