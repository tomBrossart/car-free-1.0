myApp.controller('UserController', function($http, $location, UserService, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

// when user clicks "I drove" button
  vm.drove = function(ev) {
    console.log("Increment current usage by 1 in db");
    // add $http put req here to update 'usage > trips_this_week'
    $http.put('/user/drove').then(function(response) {
      console.log("Res from vm.drove: ", response);
      vm.refreshDash();
    });
    $mdDialog.show(
    $mdDialog.confirm()
    .parent(angular.element(document.querySelector('#popupContainer')))
    .clickOutsideToClose(true)
    .title('Nice job tracking your progress!')
    .textContent('Any notes to record?')
    .ariaLabel('Alert Dialog Demo')
    .ok('Yep!')
    .cancel('No thanks')
    .targetEvent(ev)
    .multiple(true)
  );
};

vm.thisWeeksTrips = 8;

// method to get refreshed user dashboard data
  vm.refreshDash = function() {
    console.log("Refreshing Dashboard");
    $http.get('/user/dash').then(function(response) {
      console.log('Response on refreshDash: ', response);
      // if(response.data.username) {
        console.log('Inside if in refreshDash: ', response.data[0].total_trips);
        console.log('thisWeeksTrips: ', vm.thisWeeksTrips);
        vm.thisWeeksTrips = response.data[0].trips_this_week;
        vm.thisWeeksGoal = response.data[0].total_trips;
      // }
    });
  };

});
