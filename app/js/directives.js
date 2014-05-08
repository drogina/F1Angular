'use strict';

/* Directives */


angular.module('F1FeederApp.directives', []).
  directive('fallbackSrc', function() {
    var fallbackSrc = {
      link: function postLink(scope, element, attrs) {
        element.bind('error', function() {
          angular.element(this).attr("src", attrs.fallbackSrc);
          // angular.element(this).attr("ng-src", iAttrs.fallbackSrc);
        });
      }
    }
    return fallbackSrc;
  });