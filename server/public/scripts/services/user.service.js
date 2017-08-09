myApp.factory('UserService', function($http, $location, $mdSidenav){
  console.log('UserService Loaded');

  var userObject = {};
  var originatorEv;

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
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/profile");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout : function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    },

    toggleLeft : buildToggler('left'),
    toggleRight : buildToggler('right')


  };
});
