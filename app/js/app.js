'use strict';


// Declare app level module which depends on filters, and services
angular.module('F1FeederApp', [
	'ui.router',
  'F1FeederApp.controllers',
  'F1FeederApp.directives',
  'F1FeederApp.services'
  // 'services.breadcrumbs',
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, ergastAPIservice) {
	$urlRouterProvider.otherwise('/home/drivers');

	$stateProvider
		.state('home', {
			abstract: true,
			url: '/home',
			views: {
				'header': {
					templateUrl: 'partials/home.html',
					controller: 'menuController'
				}
			},
			data: {
				breadcrumb: 'home'
			}
		})
		.state('home.drivers', {
			url: '/drivers',
			templateUrl: 'partials/drivers.html',
			controller: 'driversController',
			data: {
				breadcrumb: 'Drivers'
			}
		})
		.state('home.drivers.driver', {
			url: '/:id',
			templateUrl: 'partials/driver.html',
			controller: 'driverController',
			data: {
				breadcrumb: '{{driver.givenName}}' + ' ' + '{{driver.familyName}}'
			},
			resolve: {
				driver: function($http, $stateParams) {
					return $http({
						method: 'JSONP',
						url: 'http://ergast.com/api/f1/2013/drivers/' + $stateParams.id + '/driverstandings.json?callback=JSON_CALLBACK'
					}).then(function(response) {
						return (response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver);
					});
				}
			}
		})
		.state('home.teams', {
			url: '/teams',
			templateUrl: 'partials/teams.html',
			controller: 'teamsController',
			data: {
				breadcrumb: 'Teams'
			}
		})
		.state('home.teams.team', {
			url: '/:id',
			templateUrl: 'partials/team.html',
			controller: 'teamController',
			data: {
				breadcrumb: '{{teamName}}'
			},
			resolve: {
				teamName: function($http, $stateParams) {
					//fyi: the first return is reeeeally important.
					return $http({
						method: 'JSONP',
						url: 'http://ergast.com/api/f1/2013/constructors/'+ $stateParams.id + '/constructorStandings.json?callback=JSON_CALLBACK'
					}).then(function(response){
						return (response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.name);
					});
				}
			}
		})
		.state('home.races', {
			url: '/races',
			templateUrl: 'partials/races.html',
			controller: 'racesController',
			data: {
				breadcrumb: 'Races'
			}
		});
	}]);

