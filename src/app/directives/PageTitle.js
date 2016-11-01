"use strict";

angular.module('weatherApp')
.directive('updateTitle', updateTitle);
// Everyone knows Angular is not the most friendly SEO platform.  This will help populate page titles using the ui-router data attribute.
// I still set a default title in the title meta tag, otherwise search engines won't pick up the site.  However, Phanton WILL pick this up if thats how you're handling SEO.


  updateTitle.$inject = ['$rootScope', '$timeout'];

  function updateTitle($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var title = 'WeatherApp'; //Default page title.
          if (toState.data && toState.data.pageTitle) {
            title = toState.data.pageTitle;  // Grab the data property from the route and use the pageTitle attribute to update the title.
          }

          $timeout(function() { // Without this timeout, it will throw a digest error.
            element.text(title); // set the title.
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
