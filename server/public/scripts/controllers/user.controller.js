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
      $location.path('/cravings');
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

  $scope.exploreCravings = function() {
    console.log("go to exploreCravings");
    $location.path('/cravings');
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

this.tiles = buildGridModel({
  icon : "",
  title: "",
  background: ""
});

function buildGridModel(tileTmpl){
  var it, results = [ ];

  for (var j=0; j<6; j++) {

    it = angular.extend({},tileTmpl);
    //  it.icon  = it.icon + (j+1);
    //  it.title = it.title + (j+1);
    it.span  = { row : 1, col : 1 };

    switch(j+1) {
      case 1:
      it.icon = "attach_money";
      it.title = "Financial";
      it.background = "red";
      it.span.row = it.span.col = 0.5;
      break;
      case 2:
      it.background = "green";
      it.icon = "favorite";
      it.title = "Health/Wellness";
      break;
      case 3:
      it.icon = "public";
      it.title = "Environmental";
      it.background = "darkBlue";
      break;
      case 4:
      it.icon = "attach_money";
      it.title = "Adventure";
      it.background = "blue";
      it.span.col = 2;
      break;
      case 5:
      it.icon = "people";
      it.title = "Peer Pressure";
      it.background = "red";
      it.span.row = it.span.col = 0.5;
      break;
      case 6:
      it.icon = "gesture";
      it.title = "Other";
      it.background = "pink";
      break;
      //    case 7: it.background = "darkBlue";      break;
      //    case 8: it.background = "purple";        break;
      //    case 9: it.background = "deepBlue";      break;
      //    case 10: it.background = "lightPurple";  break;
      //    case 11: it.background = "yellow";       break;
    }

    results.push(it);
  }
  return results;
}







// if I add back [] of injectors add closing ] here
});
