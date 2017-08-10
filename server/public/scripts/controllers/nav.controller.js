myApp.controller('NavController', function($scope, $http, $location, UserService, $mdBottomSheet, $mdSidenav,  $mdDialog) {
  console.log('NavController created');
  var vm = this;
  vm.userService = UserService;
});
