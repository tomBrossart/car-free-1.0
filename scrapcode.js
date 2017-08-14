// from working on nav.html

<md-content flex layout-padding>
  <div layout="column" layout-align="top center"> <p> Developers can also
    disable the backdrop of the sidenav.<br/> This will disable the
    functionality to click outside to close the sidenav. </p>
    <div> <md-button ng-click="uc.userService.toggleLeft()" class="md-raised"> Toggle
      Sidenav </md-button> </div>
    </div>
    <!-- <md-menu-item> <a href="#/info">Us&ecirc;r Settings and C&aring;lendar</a> </md-menu-item> -->
  </md-content>

-----------------------------------------------
Login page

            <!-- OLD FORM -->
            <!-- <form ng-submit="lc.login()">
            <div>
            <label for="username">Username:</label>
            <input type="text" ng-model="lc.user.username" />
          </div>
          <div>
          <label for="password">Password:</label>
          <input type="password" ng-model="lc.user.password" />
        </div>
        <div>
        <input class="btn btn-default" type="submit" name="submit" value="Log In" />
        <a href="#register">Register</a>
      </div>
    </form> -->


--------------------------------------------------
Week 2 Pivot

<md-button class="md-primary md-raised" ng-click="drove(ev)">I drove</md-button>

$scope.buildProf.goal_usage = $scope.goalUsage;
