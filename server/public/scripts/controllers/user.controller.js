myApp.controller('UserController', function($scope, $http, $location, UserService, $mdBottomSheet, $mdSidenav,  $mdDialog, $mdToast) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  $scope.userObject = UserService.userObject;
  var quitDate = $scope.userObject.quitDate;

  console.log("$scope.user...", $scope.userObject);
  console.log("$scope.crave...", $scope.userObject.craveArray);


  // when user clicks "I had a craving" button
  $scope.showAC = function(crave, ev) {
    console.log('User had a craving, let em enter it and then show them support');
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/views/templates/tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      resolve: {
        crave: function() {
          return crave;
        }
      },
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

// add motivation card to favs

$scope.shareFav = function(tile) {
  // pop open share menu with links to major social channels
    // vm.craveToast();
    console.log("Share with yo friends!");
};

// method to display additional motivation msg/img
// $scope.loadDash();
vm.userService.refDash();
vm.userService.refCrave();
// vm.userService.elapsedTime($scope.userObject.quitDate);

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
  background: "",
  text: "",
  destination: ""
});

function buildGridModel(tileTmpl){
  var it, results = [ ];

  for (var j=0; j<6; j++) {

    it = angular.extend({},tileTmpl);
    //  it.icon  = it.icon + (j+1);
    //  it.title = it.title + (j+1);
    it.span  = { row : 2, col : 1.5 };

    switch(j+1) {
      case 1:
      it.icon = "attach_money";
      it.title = "Financial";
      it.text = "Breath. Notice how you feel different being carFree.";
      it.background = "one";
      it.destination = "www.google.com";
      it.span.row = it.span.col = 1.5;
      break;
      case 2:
      it.background = "two";
      it.icon = "favorite";
      it.title = "Health/Wellness";
      it.text = "Engage carFree/car-lite subreddits including LowCar, NoCar and CarFree.";
      break;
      case 3:
      it.icon = "public";
      it.title = "Environmental";
      it.background = "three";
      it.text = "Read 'How to Live Well Without Owning a Car: Save Money, Breathe Easier, and Get More Mileage Out of Life' ";
      break;
      case 4:
      it.icon = "attach_money";
      it.title = "Adventure";
      it.background = "four";
      it.text = "Check out some blogs/articles on carFree living, including Mr. Free at 33, and 4 Secrets to Car Free Living.";
      it.span.col = 2;
      break;
      case 5:
      it.icon = "people";
      it.title = "People - Social";
      it.background = "five";
      it.text = "Buy an electric bike!";
      it.span.row = it.span.col = 0.5;
      break;
      case 6:
      it.icon = "gesture";
      it.title = "Other";
      it.background = "six";
      it.text = "Create a list of 10 memorable transit interactions you’ve had since becoming carFree.";
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
