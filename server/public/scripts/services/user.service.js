myApp.factory('UserService', function($http, $location, $mdSidenav){
  console.log('UserService Loaded');

  var userObject = {};
  // var craveArray = [];
  var originatorEv;
  var annualCost = 9122;
  // var days = 0;


  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  return {
    userObject : userObject,
    // days : days,

    // elapsedTime : function(date) {
    //   // if (!date) return; ADD IN VALIDATION LOGIC FOR EDGE CASES
    //   var time = Date.parse(date),
    //   timeNow = new Date().getTime(),
    //   difference = timeNow - time,
    //   seconds = Math.floor(difference / 1000),
    //   minutes = Math.floor(seconds / 60),
    //   hours = Math.floor(minutes / 60),
    //   days = Math.floor(hours / 24),
    //   remHours = Math.floor(((hours / 24) - days)/ 60),
    //   remMinutes = Math.floor(((((hours / 24) - days)/ 60) - remHours)/ 60);
    //   // userObject.elapsedTime = days;
    //   return days;
    // },

    getuser : function(){
      console.log('UserService -- getuser');
      $http.get('/user').then(function(response) {
        if(response.data.username) {
          // user has a curret session on the server
          userObject.userName = response.data.username;
          console.log('UserService -- getuser -- User Data: ', userObject.userName);
        } else {
          console.log('UserService -- getuser -- failure', response.data);
          // user has no session, bounce them back to the login page
          $location.path("/home");
        }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    toggleLeft : buildToggler('left'),
    toggleRight : buildToggler('right'),

    logout : function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
        // buildToggler('left');
      });
    },

    refDash : function(date) {
      console.log('UserService -- refreshDash', date);
        // if (!date) return; ADD IN VALIDATION LOGIC FOR EDGE CASES
      $http.get('/user/dash').then(function(response) {
        console.log('Response on refreshDash: ', response);
        var time = Date.parse(response.data[0].goal_date),
        timeNow = new Date().getTime(),
        difference = timeNow - time,
        seconds = Math.floor(difference / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        remHours = Math.floor(((hours / 24) - days)/ 60),
        remMinutes = Math.floor(((((hours / 24) - days)/ 60) - remHours)/ 60);
        console.log(days, hours, minutes, seconds);
        userObject.quitDate =  response.data[0].goal_date;
        userObject.moneySaved =  (response.data[0].week_trips * (annualCost/52));
        userObject.moneyPerYear =  annualCost;
        userObject.timeNotAlone =  (response.data[0].avg_trip * days);
        userObject.notDriven =  (response.data[0].week_trips * (days/7));
        userObject.cravingsResisted =  (response.data[0].total_cravings);
        userObject.start_date =  (response.data[0].start_date);
        userObject.motivation =  (response.data[0].motivation);
        // ((new Date().getTime()) - (new Date(quitDate).getTime()));
        console.log("userObject", userObject);
      });
    },

    refCrave : function() {
      console.log('UserService -- refCrave');
      $http.get('/user/cravings').then(function(response) {
        userObject.craveArray = response.data;
        // console.log('Response on refCrave: ', craveArray);
        // console.log('Response on refCrave 0: ', craveArray[0]);
        // craveObject.intensity =  response.data[0].strength_of_desire;
        // craveObject.notes =  (response.data[0].notes);
        // craveObject.location =  (response.data[0].location);
        // craveObject.date =  (response.data[0].date);
      });
    }

  };

});
