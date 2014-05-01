'use strict';

/* Directives */


angular.module('F1FeederApp.directives', []).
  directive('staticInclude', function($http, $templateCache, $compile) {
    return function(scope, elm, attrs) {
      var templatePath = attrs.staticInclude;

      $http.get(templatePath, {cache: $templateCache}).success(function(response) {
      	var contents = $('<div/>').html(response).contents();
      	elm.html(contents);
      	$compile(contents)(scope);
      });
    };
  });
