var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMdIcons'])
// trying to add custom filter
.filter('elapsed', function(){
    return function(date){
        if (!date) return;
        var time = Date.parse(date),
            timeNow = new Date().getTime(),
            difference = timeNow - time,
            seconds = Math.floor(difference / 1000),
            minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60),
            days = Math.floor(hours / 24),
            remHours = Math.floor(((hours / 24) - days)/ 60),
            remMinutes = Math.floor(((((hours / 24) - days)/ 60) - remHours)/ 60);
        if (days > 1) {
            // TESTING TO SEE WHAT IS CALCULATING return time + "time" + timeNow + " timeNow " + remHours + " hours " + remMinutes + " minutes!";
            return days + " days " + remHours + " hours " + remMinutes + " minutes!";
        } else if (days == 1) {
            return "1 day ago";
        } else if (hours > 1) {
            return hours + " hours ago";
        } else if (hours == 1) {
            return "an hour ago";
        } else if (minutes > 1) {
            return minutes + " minutes ago";
        } else if (minutes == 1){
            return "a minute ago";
        } else {
            return "a few seconds ago";
        }
    };
});

/// Routes ///
myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/profile/two', {
      templateUrl: '/views/partials/bp2.html',
      controller: 'BuildController as bc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/profile/three', {
      templateUrl: '/views/partials/bp3.html',
      controller: 'BuildController as bc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/profile', {
      templateUrl: '/views/templates/buildprofile.html',
      controller: 'BuildController as bc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/resources', {
      templateUrl: '/views/templates/resources.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/cravings', {
      templateUrl: '/views/templates/cravings.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });

    $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('blue')
    .dark();

});
