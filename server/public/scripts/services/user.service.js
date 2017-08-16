myApp.factory('UserService', function($http, $location, $mdSidenav){
  console.log('UserService Loaded');

  var userObject = {};
  var originatorEv;


  // Does this need to be in



  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  return {
    userObject : userObject,

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

    refDash : function() {
      console.log('UserService -- refreshDash');
      $http.get('/user/dash').then(function(response) {
        console.log('Response on refreshDash: ', response);
        userObject.quitDate =  response.data[0].goal_date;
        userObject.moneySaved =  (response.data[0].avg_trip * 5);
        userObject.moneyPerYear =  (response.data[0].avg_trip * 5);
        userObject.timeNotAlone =  (response.data[0].avg_trip * 5);
        userObject.notDriven =  (response.data[0].week_trips * 5);
        userObject.cravingsResisted =  (response.data[0].total_cravings);
        // ((new Date().getTime()) - (new Date(quitDate).getTime()));
        console.log("userObject", userObject);
      });
    }

  };
});
