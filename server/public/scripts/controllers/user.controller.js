myApp.controller('UserController', function($scope, $http, $location, UserService, $mdBottomSheet, $mdSidenav,  $mdDialog, $mdToast) {
  console.log('UserController created');
  var vm = this;
  //  TRYING TO SWITCH TO $scope
  vm.userService = UserService;
  $scope.userObject = UserService.userObject;

  console.log("$scope.user...", $scope.userObject);
  console.log("$scope.crave...", $scope.userObject.craveArray);


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
      $location.path('/motivation');
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

  $scope.reviewCravings = function() {
    console.log("go to reviewCravings");
    $location.path('/cravings');
  };

// show dialog to update/view craving
  $scope.showUC = function(crave, ev) {
    console.log("inside showUC ev is:", ev);
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/views/templates/tabDialog2.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
 // make the specific craving available to DialogController
      resolve: {
        crave: function() {
          return crave;
        }
      },
      clickOutsideToClose:true
    })
    .then(function() {
      // $location.path('/motivation');
      $scope.status = 'You said the information was.';
      //  "' + answer + '" NEED THIS?
    }, function() {
      // ADD TOAST HERE TO CONFIRM NO ADDITION
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.deleteCraving = function(crave) {
    $http.delete('/user/crave/' + crave.id).then(function(response) {
      console.log("Res from $scope.deleteCrave: ", response);
      vm.userService.refCrave();
    });
  };

// method to display additional motivation msg/img
// $scope.loadDash();
vm.userService.refDash();
vm.userService.refCrave();

// controller for Dialogs...
function DialogController($scope, $mdDialog, crave) {
  // console.log("inside DC ev is:",  ev);
  console.log("inside DC crave is:",  crave);

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

// will this be an issue if both add and update use this object?
  $scope.crave = {};

  $scope.addCrave = function(ev) {
    console.log("Adding craving to db -- ", $scope.crave);
    $http.post('/user/crave', $scope.crave).then(function(response) {
      console.log("Res from $scope.addCrave: ", response);
      vm.userService.refDash();
      vm.userService.refCrave();
      vm.craveToast(ev);
    });
  };

  $scope.updateCrave = function() {
    console.log("specific craving is", crave);
    console.log("Updating craving in db -- ", $scope.crave);
    $http.put('/user/crave/' + crave.id, $scope.crave).then(function(response) {
      console.log("Res from $scope.updateCrave: ", response);
      vm.userService.refCrave();
      // vm.craveToast(ev);
    });
  };

} // end of DialogController



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

    $scope.cravings = [{
      intensity: 5,
      notes: "asdfasdf",
      date: "12/12/1222",
      location: "here and there"
    },
    {
      intensity: 5,
      notes: "asdfaasfasdfasdfasdfasdfasdfasdfadfasdfadfafasdf",
      date: "12/12/1222",
      location: "here and there"
    },
  ];





// if I add back [] of injectors add closing ] here
});
