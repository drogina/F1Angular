'use strict';

/* Services */

angular.module('F1FeederApp.services', [])
	.factory('ergastAPIservice', function($http, $q) {
		var ergastAPI = {};

		ergastAPI.getDrivers = function() {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
			});
		}

		ergastAPI.getDriverDetails = function(id) {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK'
			});
		}

		ergastAPI.getDriverRaces = function(id) {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/drivers/' + id + '/results.json?callback=JSON_CALLBACK'
			});
		}

		ergastAPI.getTeamRaces = function(id) {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/constructors/' + id + '/results.json?callback=JSON_CALLBACK'
			});
		}

		ergastAPI.getTeamDrivers = function(id) {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/constructors/' + id + '/drivers.json?callback=JSON_CALLBACK'
			});
		}

		// ergastAPI.getTeamName = function(id) {

		// }

		ergastAPI.getTeamDetails = function(id) {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/constructors/' + id + '/constructorStandings.json?callback=JSON_CALLBACK'
			});
		}

		ergastAPI.getTeams = function() {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/constructorStandings.json?callback=JSON_CALLBACK'
			});
		}

		ergastAPI.getRaces = function() {
			return $http({
				method: 'JSONP',
				url: 'http://ergast.com/api/f1/2013/results/1.json?callback=JSON_CALLBACK'
			});
		}

		return ergastAPI;
	// })

	// .factory('breadcrumbs', function($state, $translate, $interpolate) {
	// 	var list = [], title;

	// 	var getProperty = function(object, path) {
	// 		function index (obj, i) {
	// 			return obj[i];
	// 		}
	// 		return path.split('.').reduce(index, object);
	// 	};

	// 	var addBreadcrumb = function (title, state) {
	// 		list.push({
	// 			title: title,
	// 			state: state
	// 		});
	// 	};

	// 	var generateBreadcrumbs = function (state) {
	// 		if (angular.isDefined(state.parent)) {
	// 			generateBreadcrumbs(state.parent);
	// 		}

	// 		if (angular.isDefined(state.breadcrumb)) {
	// 			if (angular.isDefined(state.breadcrumb.title)) {
	// 				addBreadcrumb($interpolate(state.breadcrumb.title)(state.locals.globals), state.name);
	// 			}
	// 		}
	// 	};

	// 	var appendTitle = function (translation, index) {
	// 		var title = translation;

	// 		if (index < list.length - 1) {
	// 			title += ' > ';
	// 		}

	// 		return title;
	// 	};

	// 	var generateTitle = function () {
	// 		title = '';

	// 		angular.forEach(list, function(breadcrumb, index) {
	// 			$translate(breadcrumb.title).then(
	// 				function(translation) {
	// 					title += appendTitle(translation, index);
	// 				}, function (translation) {
	// 					title += appendTitle(translaiton, index);
	// 				}
	// 			);
	// 		});
	// 	};

	// 	return {
	// 		generate: function() {
	// 			list = [];

	// 			generateBreadcrumbs($state.$current);
	// 			generateTitle();
	// 		},

	// 		title: function () {
	// 			return title;
	// 		},

	// 		list: function() {
	// 			return list;
	// 		}
	// 	};
	});

