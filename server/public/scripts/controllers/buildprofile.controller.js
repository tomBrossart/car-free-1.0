myApp.controller('BuildController', function($scope, $http, $location, UserService, $mdBottomSheet, $mdSidenav,  $mdDialog) {
  console.log('BuildController created');

  $scope.selectMotivation = function(tile) {
    console.log("user selected", tile);
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
});
//  .config( function( $mdIconProvider ){
//    $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
//  });
// });
