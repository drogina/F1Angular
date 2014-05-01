'use strict';


// Declare app level module which depends on filters, and services
angular.module('F1FeederApp', [
  'F1FeederApp.controllers',
  'F1FeederApp.services',
  'services.breadcrumbs',
  'ngRoute'
]).config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/drivers", {templateUrl: "partials/drivers.html", controller: "driversController"}).
		when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
		when("/teams", {templateUrl: "partials/teams.html", controller: "teamsController"}).
		when("/races", {templateUrl: "partials/races.html", controller: "racesController"}).
		when("/teams/:id", {templateUrl: "partials/team.html", controller: "teamController"}).
		otherwise({redirectTo: '/drivers'});
}]);
