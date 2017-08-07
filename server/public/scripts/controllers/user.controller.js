myApp.controller('UserController', function(UserService, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.drove = function(ev) {
    // add $http put req here to update 'usage > trips_this_week'

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

});
