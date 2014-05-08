'use strict';


// Declare app level module which depends on filters, and services
angular.module('F1FeederApp', [
  'F1FeederApp.controllers',
  'F1FeederApp.services',
  'services.breadcrumbs',
  'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home/drivers');

	$stateProvider
		.state('home', {
			abstract: true,
			url: '/home',
			templateUrl: 'partials/home.html',
		})
		.state('home.drivers', {
			url: '/drivers',
			templateUrl: 'partials/drivers.html',
			controller: 'driversController'
		})
		.state('home.driver', {
			url: '/drivers/:id',
			templateUrl: 'partials/driver.html',
			controller: 'driverController'
		})
		.state('home.teams', {
			url: '/teams',
			templateUrl: 'partials/teams.html',
			controller: 'teamsController'
		})
		.state('home.team', {
			url: '/teams/:id',
			templateUrl: 'partials/team.html',
			controller: 'teamController'
		})
		.state('home.races', {
			url: '/races',
			templateUrl: 'partials/races.html',
			controller: 'racesController'
		});
	}]);

