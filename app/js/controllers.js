'use strict';

/* Controllers */
angular.module('F1FeederApp.controllers', []).
  //Drivers controller
  controller('driversController', function($scope, $location, ergastAPIservice, breadcrumbs) {
    $scope.breadcrumbs = breadcrumbs;
    $scope.location = $location;
    $scope.home = $location = 'F1 Home';

    $scope.isNavbarActive = function (navBarPath) {
      return navBarPath === breadcrumbs.getFirst().name;
    };

    $scope.nameFilter = null;
  	$scope.driversList = [];
  	$scope.searchFilter = function (driver) {
  		var re = new RegExp($scope.nameFilter, 'i');
  		return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
  	};

  	ergastAPIservice.getDrivers().success(function (response) {
		  $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  	});

  }).

  //Driver controller
  controller('driverController', function($scope, $routeParams, ergastAPIservice) {
  	$scope.id = $routeParams.id;
  	$scope.races = [];
  	$scope.driver = null;

  	ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
  		$scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
  	});

  	ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
  		$scope.races = response.MRData.RaceTable.Races;
  	});
  }).

  //Team controller
  controller('teamController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.racesList = [];
    $scope.teamDriversList = [];
    $scope.teamDetails = [];
    
    $scope.addition = function (num1,num2) {
      return parseInt(num1) + parseInt(num2);
    }

    $scope.searchFilter = function(race) {
      var re = new RegExp($scope.filterName, 'i');
      return !$scope.filterName || re.test(race.raceName);
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
  }).

  //Teams controller
  controller('teamsController', function($scope, ergastAPIservice) {
    $scope.teamsList = [];
    $scope.filterName = null;

    $scope.searchFilter = function(teams) {
      var re = new RegExp($scope.filterName, 'i');
      return !$scope.filterName || re.test(teams.Constructor.name);
    };

    ergastAPIservice.getTeams().success(function (response) {
      $scope.teamsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    })
  }).

  //Races controller
  controller('racesController', function($scope, ergastAPIservice) {
    $scope.racesList = [];
    $scope.filterName = null;

    $scope.searchFilter = function(races) {
      var re = RegExp($scope.filterName, 'i');
      return !$scope.filterName || re.test(races.raceName) || re.test(races.Circuit.circuitName) || re.test(races.Results[0].Constructor.name) || re.test(races.Results[0].Driver.familyName);
    };

    ergastAPIservice.getRaces().success(function (response) {
      $scope.racesList = response.MRData.RaceTable.Races;
    })
  }).

  controller('menuController', function($scope, $location) {
    // $scope.menuActive = 'drivers';
    $scope.$on('$routeChangeSuccess', function() {
      $scope.menuActive = $location.path().split("/")[1];
    });
  });
