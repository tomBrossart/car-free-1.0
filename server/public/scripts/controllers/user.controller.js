myApp.controller('UserController', function($scope, $http, $location, UserService, $mdBottomSheet, $mdSidenav,  $mdDialog) {
  console.log('UserController created');
  var vm = this;
  //  TRYING TO SWITCH TO $scope
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  // MAYBE ADD THIS BACK LATER ... ['$scope', '$http', '$location','$mdBottomSheet','$mdSidenav', '$mdDialog',

  // when user clicks "I drove" button
  $scope.drove = function(ev) {
    console.log("Increment current usage by 1 in db");
    $http.put('/user/drove').then(function(response) {
      console.log("Res from $scope.drove: ", response);
      $scope.refreshDash();
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
  $scope.craving = function(ev) {
    console.log('User had a craving, show them support');
    // do I need to make a get request here? yes, but for now I can hardcode tabDialog
    // $http.get('/user/craving').then(function(response) {
    //   console.log("Res from $scope.craving: ", response);
    //   $scope.refreshDash();
    // });
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/views/templates/tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function() {
      $scope.status = 'You said the information was.';
      //  "' + answer + '" NEED THIS?
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  // load up user motivation img and msg
  $scope.loadDash = function() {
    console.log("Loading Dashboard");
    $http.get('/user/load').then(function(response) {
      console.log('Response on loadDash: ', response);
      // if(response.data.username) {
      // console.log('Inside if in refreshDash: ', response.data[0].total_trips);
      console.log('thisWeeksTrips: ', $scope.thisWeeksTrips);
      $scope.motivationImg = response.data[0].img;
      $scope.motivationMsg = response.data[0].msg;
      // }
    });
  };

  // method to get refreshed user dashboard data
  $scope.refreshDash = function() {
    console.log("Refreshing Dashboard");
    $http.get('/user/dash').then(function(response) {
      console.log('Response on refreshDash: ', response);
      // if(response.data.username) {
      // console.log('Inside if in refreshDash: ', response.data[0].total_trips);
      $scope.thisWeeksTrips = response.data[0].trips_this_week;
      $scope.thisWeeksGoal = response.data[0].goal_trips_this_week;
      console.log('thisWeeksTrips: ', $scope.thisWeeksTrips);
      // $scope.motivationImg = response.data[0].motivationImg;
      // $scope.motivationMsg = response.data[0].motivationMsg;
      // }
    });
  };


  // method to display additional motivation msg/img
  $scope.loadDash();
  $scope.refreshDash();

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
// if I add back [] of injectors add closing ] here
});
