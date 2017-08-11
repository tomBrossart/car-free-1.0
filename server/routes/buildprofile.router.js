var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles POST request with buildProf data from second page
router.put('/two/:id', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log("req.body is:", req.body);
  var buildUser = {
    user: req.user,
    core_need: req.body.coreNeed,
    current_usage: req.body.currentUsage
  };
  console.log('second page bp:', buildUser);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query('UPDATE "profile" SET "current_usage" = $1, "core_need" = $2  WHERE user_id = $3;',
      [buildUser.current_usage, buildUser.coreNeed, buildUser.user],
        function (err, result) {
          done();
          client.end();
          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.sendStats(203);
          }
        });
      });
  }
});


module.exports = router;
