'use strict';

/* Controllers */
angular.module('F1FeederApp.controllers', [])

  .controller('menuController', function($scope, $location) {
    $scope.filterName = null;

    $scope.$on('$stateChangeSuccess', function() {
      $scope.menuActive = $location.path().split("/")[2];
      $scope.showSearch = $location.path().split("/").length === 3;
    });
  })

  //Drivers controller
  .controller('driversController', function($scope, $state, $location, ergastAPIservice) {
    console.log('this is the current state')
    console.log($state.$current);

    // $scope.location = $location;
    // $scope.home = $location = 'F1 Home';

    $scope.isNavbarActive = function (navBarPath) {
      return navBarPath === breadcrumbs.getFirst().name;
    };

    // $scope.filterName = $scope.$parent.filterName;
  	$scope.driversList = [];
  	$scope.searchFilter = function (driver) {
  		var re = new RegExp($scope.$parent.filterName, 'i');
  		return !$scope.$parent.filterName || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
  	};

  	ergastAPIservice.getDrivers().success(function (response) {
		  $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  	});

  })

  //Driver controller
  .controller('driverController', function($scope, $state, $stateParams, ergastAPIservice) {
  	console.log($state);
    $scope.id = $stateParams.id;
  	$scope.races = [];
  	$scope.driver = null;
    $scope.driverImageUrl = '';
    $scope.flagImageUrl = '';

  	ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
  		$scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      $scope.driverImageUrl = 'img/drivers/' + $scope.driver.Driver.driverId + '.png';
      $scope.flagImageUrl = 'img/flags/' + $scope.driver.Driver.nationality + '.png';
  	});

  	ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
  		$scope.races = response.MRData.RaceTable.Races;
  	});

  })

  //Team controller
  .controller('teamController', function($scope, $stateParams, ergastAPIservice) {
    $scope.id = $stateParams.id;
    $scope.racesList = [];
    $scope.teamDriversList = [];
    $scope.teamDetails = [];
    $scope.teamName;
    
    $scope.addition = function (num1,num2) {
      return parseInt(num1) + parseInt(num2);
    };

    ergastAPIservice.getTeamDrivers($scope.id).success(function(response) {
      $scope.teamDriversList = response.MRData.DriverTable.Drivers;
    });

    ergastAPIservice.getTeamRaces($scope.id).success(function (response) {
      $scope.racesList = response.MRData.RaceTable.Races; 
    });

    ergastAPIservice.getTeamDetails($scope.id).success(function (response) {
      $scope.teamDetails = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
    });

  })

  //Teams controller
  .controller('teamsController', function($scope, ergastAPIservice) {
    $scope.teamsList = [];

    $scope.searchFilter = function(teams) {
      var re = new RegExp($scope.$parent.filterName, 'i');
      return !$scope.$parent.filterName || re.test(teams.Constructor.name);
    };

    ergastAPIservice.getTeams().success(function (response) {
      $scope.teamsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    })
  })

  //Races controller
  .controller('racesController', function($scope, ergastAPIservice) {
    $scope.racesList = [];
    $scope.filterName = null;

    $scope.searchFilter = function(races) {
      var re = RegExp($scope.filterName, 'i');
      return !$scope.filterName || re.test(races.raceName) || re.test(races.Circuit.circuitName) || re.test(races.Results[0].Constructor.name) || re.test(races.Results[0].Driver.familyName);
    };

    ergastAPIservice.getRaces().success(function (response) {
      $scope.racesList = response.MRData.RaceTable.Races;
    })
  });

