myApp.controller('UserController', function($scope, $http, $location, UserService, $mdBottomSheet, $mdSidenav,  $mdDialog, $mdToast) {
  console.log('UserController created');
  var vm = this;
  //  TRYING TO SWITCH TO $scope
  vm.userService = UserService;
  $scope.userObject = UserService.userObject;

  // when user clicks "I had a craving" button
  $scope.showAC = function(ev) {
    console.log('User had a craving, let em enter it and then show them support');
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/views/templates/tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function() {
      // ADD REDIRECT HERE?
      $scope.status = 'You said the information was.';
      //  "' + answer + '" NEED THIS?
    }, function() {
      // ADD TOAST HERE TO CONFIRM NO ADDITION
      $scope.status = 'You cancelled the dialog.';
    });
  };

  vm.craveToast = function($event) {
    console.log('crave toast success');
    $mdToast.show($mdToast.simple()
    .textContent('Craving succesfully tracked #OneStepCloser')
    .highlightAction(true)
    .position('top left')
  );
};

// load up user motivation img and msg
// TO DO update this now that project pivoted
// $scope.loadDash = function() {
//   console.log("Loading Dashboard");
//   $http.get('/user/load').then(function(response) {
//     console.log('Response on loadDash: ', response);
//     $scope.motivationImg = response.data[0].img;
//     $scope.motivationMsg = response.data[0].msg;
//   });
// };

// method to get refreshed user dashboard data
// $scope.refreshDash = function() {
//   console.log("Refreshing Dashboard");
//   $http.get('/user/dash').then(function(response) {
//     console.log('Response on refreshDash: ', response);
//     $scope.quitDate =  response.data[0].goal_date;
//     $scope.moneySaved =  (response.data[0].avg_trip * 5);
//     $scope.moneyPerYear =  (response.data[0].avg_trip * 5);
//     $scope.timeNotAlone =  (response.data[0].avg_trip * 5);
//     $scope.notDriven =  (response.data[0].week_trips * 5);
//     $scope.cravingsResisted =  (response.data[0].total_cravings);
//     // ((new Date().getTime()) - (new Date(quitDate).getTime()));
//     console.log("quitDate", $scope.quitDate);
//     // $scope.thisWeeksGoal = response.data[0].goal_trips_this_week;
//     // console.log('thisWeeksTrips: ', $scope.thisWeeksTrips);
//     // $scope.motivationImg = response.data[0].motivationImg;
//     // $scope.motivationMsg = response.data[0].motivationMsg;
//   });
// };


// method to display additional motivation msg/img
// $scope.loadDash();
vm.userService.refDash();

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

  $scope.crave = {};

  $scope.addCrave = function(ev) {
    console.log("Adding craving to db -- ", $scope.crave);
    $http.post('/user/crave', $scope.crave).then(function(response) {
      console.log("Res from $scope.addCrave: ", response);
      vm.userService.refDash();
      vm.craveToast(ev);
    });
    // $mdDialog.show(
    //   $mdDialog.confirm()
    //   .parent(angular.element(document.querySelector('#popupContainer')))
    //   .clickOutsideToClose(true)
    //   .title('Nice job tracking your progress!')
    //   .textContent('Any notes to record?')
    //   .ariaLabel('Alert Dialog Demo')
    //   .ok('Yep!')
    //   .cancel('No thanks')
    //   .targetEvent(ev)
    //   .multiple(true)
    // );
  };
}
// if I add back [] of injectors add closing ] here
});
