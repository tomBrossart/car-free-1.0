myApp.controller('BuildController', function($scope, $http, $location, UserService, $mdBottomSheet, $mdSidenav,  $mdDialog) {
  console.log('BuildController created');

  var vm = this;
  $scope.coreNeed = '';
  $scope.currentUsage = 0;
  // $scope.currentUsage = '';
  // $scope.coreNeed = '';


// HOW TO PACKAGE DATA AND SEND TO DB...
  $scope.buildProf = {
    // goal_usage: goalUsage,
    // goal_date: goalDate,
    start_date: 'today',
    completed_registration: '',
  };


// post users selection to db and progress user to next buildProfile page
  $scope.selectMotivation = function(tile) {
    console.log("user selected", tile);
    $scope.buildProf.motivation = tile;
    $http.post('/profile/one', $scope.buildProf).then(function(response) {
      console.log("Res from selectMotivation: ", response);
      $location.path('/profile/two');
    });
  };


// I think I need to assign the property inside the transport object...
  $scope.submitCurrent = function() {
    $scope.buildProf.core_need = $scope.coreNeed;
    $scope.buildProf.current_usage = $scope.currentUsage;
    console.log("current usage for:", $scope.user);
    $http.put('/profile/two/' + $scope.user, $scope.buildProf).then(function(response) {
      console.log('BuildController -- bp two -- success', response);
      $location.path('/profile/three');
    }).catch(function(response) {
      console.log('BuildController --  bp two -- error');
      $scope.message = "Please try again.";
    });
  };

  $scope.submitGoal = function() {
    $scope.buildProf.goal_date = $scope.goalDate;
    $scope.buildProf.goal_usage = $scope.goalUsage;
    console.log("goal usage");
    $http.put('/profile/three/' + $scope.user, $scope.buildProf).then(function(response) {
      console.log('BuildController -- bp three -- success', response);
    $location.path('/user');
  }).catch(function(response) {
    console.log('BuildController --  bp three -- error');
    $scope.message = "Please try again.";
  });
  };

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

  $scope.needs = ["Work", "Family", "Social", "Adventure", "Shopping"];
  $scope.trips = [1 , 2, 3, 4, 5, 6, 7, 8, 9, 10];

});
