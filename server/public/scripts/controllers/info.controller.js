myApp.controller('InfoController', function(UserService, $scope) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  $scope.userObject = UserService.userObject;
  vm.userService.refDash();
});
