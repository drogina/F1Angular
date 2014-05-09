'use strict';

/* Directives */


angular.module('F1FeederApp.directives', [])
  .directive('fallbackSrc', function() {
    var fallbackSrc = {
      link: function postLink(scope, element, attrs) {
        element.bind('error', function() {
          angular.element(this).attr("src", attrs.fallbackSrc);
          // angular.element(this).attr("ng-src", iAttrs.fallbackSrc);
        });
      }
    }
    return fallbackSrc;
  })

  .directive('appBreadcrumbs', function($interpolate, $state) {
    return {
      restrict: 'E',
      templateUrl: 'partials/appBreadcrumbs.html',
      scope: {
        breadcrumbProperty: '@'
      },
      link: function(scope) {
        if ($state.$current.name !== '') {
          updateBreadcrumbsArray();
        }
        scope.$on('$stateChangeSuccess', function() {
          updateBreadcrumbsArray();
        });

        function updateBreadcrumbsArray() {
          var breadcrumbs = [];
          var currentState = $state.$current;

          while (currentState && currentState.name !== '') {
            var displayName = getDisplayName(currentState);
            if (displayName !== 'home' && displayName !== false) {
              breadcrumbs.push({
                displayName: displayName,
                route: currentState.name
              });
            }
            currentState = currentState.parent;
          }

          breadcrumbs.reverse();
          scope.breadcrumbs = breadcrumbs;
        }

        function getDisplayName(currentState) {
          var i, propertyReference, propertyArray, displayName;

          if (!scope.breadcrumbProperty) {
            return currentState.name;
          }

          propertyArray = scope.breadcrumbProperty.split('.');
          propertyReference = currentState;

          for (i = 0; i < propertyArray.length; i++) {
            if (angular.isDefined(propertyReference[propertyArray[i]])) {
              if (propertyReference[propertyArray[i]] === false) {
                return false;
              } else {
                propertyReference = propertyReference[propertyArray[i]];
              }
            } else {
              return currentState.name;
            }
          }

          displayName = $interpolate(propertyReference)(currentState.locals.globals);
          return displayName;
        }

      }
    };
  });