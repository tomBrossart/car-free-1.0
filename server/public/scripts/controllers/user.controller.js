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

// when user clicks "I had a craving" button
  vm.craving = function(ev) {
    console.log('User had a craving, show them support');
    // add $http put req here to update 'usage > trips_this_week'
    $http.get('/user/craving').then(function(response) {
      console.log("Res from vm.craving: ", response);
      vm.refreshDash();
    });
    $mdDialog.show(
    $mdDialog.confirm()
    .parent(angular.element(document.querySelector('#popupContainer')))
    .clickOutsideToClose(true)
    .title('Cravings are hard!')
    .textContent('What support do you need?')
    .ariaLabel('Alert Dialog for craving')
    .ok('Remind me why I\'m using car less')
    .cancel('Show my a cat video')
    .targetEvent(ev)
    .multiple(true)
  );
};

// load up user motivation img and msg
vm.loadDash = function() {
  console.log("Loading Dashboard");
  $http.get('/user/load').then(function(response) {
    console.log('Response on loadDash: ', response);
    // if(response.data.username) {
      // console.log('Inside if in refreshDash: ', response.data[0].total_trips);
      console.log('thisWeeksTrips: ', vm.thisWeeksTrips);
      vm.motivationImg = response.data[0].img;
      vm.motivationMsg = response.data[0].msg;
    // }
  });
};

// method to get refreshed user dashboard data
  vm.refreshDash = function() {
    console.log("Refreshing Dashboard");
    $http.get('/user/dash').then(function(response) {
      console.log('Response on refreshDash: ', response);
      // if(response.data.username) {
        // console.log('Inside if in refreshDash: ', response.data[0].total_trips);
        console.log('thisWeeksTrips: ', vm.thisWeeksTrips);
        vm.thisWeeksTrips = response.data[0].trips_this_week;
        vm.thisWeeksGoal = response.data[0].total_trips;
        // vm.motivationImg = response.data[0].motivationImg;
        // vm.motivationMsg = response.data[0].motivationMsg;
      // }
    });
  };


  vm.loadDash();
  vm.refreshDash();


});
