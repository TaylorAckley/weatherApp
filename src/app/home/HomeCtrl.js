"use strict";

;(function() {

    angular
        .module('weatherApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'LocationSvc', 'WeatherSvc', 'CONSTANTS', 'toastr'];


    function HomeCtrl($scope, LocationSvc, WeatherSvc, CONSTANTS, toastr) {
      $scope.isLoading = true;  // set loading icon on conroller load.
        LocationSvc.getCurrentPosition()
            .then(function(response) {
                $scope.userLocation = response;
                console.log($scope.userLocation);
                if(response.isDefault) {
                  toastr.info('Unable to determine your location.   Use the search box to look up your area.');
                }
            })
            .then(function(response) {  //chain the promise.
              WeatherSvc.getWeather($scope.userLocation.position.latitude, $scope.userLocation.position.longitude)
              .then(function(forecast) {
                $scope.forecast = forecast.data;
                console.log($scope.forecast);
                $scope.isLoading = false;  // An alternate way to handle this would be to have a controller on the body element and put ng-show/hide on the includes.
                                        // When there is a loading event, you would broadcast it to the body controller who would hide the includes for you.
              })
              .catch(function(err) {
                toastr.error('Error obtaining forecast data.   Please try again later.');
            });
            })
            .catch(function(err) {
              toastr.error('Error retrieving location information.  Please try again later.');
                $scope.userLocation = false;
            });

            $scope.locale = {};

             $scope.changeLocale = function() {
              $scope.userLocation.geo = $scope.locale;
              WeatherSvc.getWeather($scope.locale.latitude, $scope.locale.longitude)
              .then(function(forecast) {
                $scope.forecast = forecast.data;
                console.log($scope.forecast);
              })
              .catch(function(err) {
                toastr.error('Error obtaining forecast data.   Please try again later.');
            });
          };

          $scope.options = {
            types: ['(cities)']
          };

            $scope.iconDefaults = {
              color: 'white',
              size: 120
            };

            $scope.getWindDirection = function(deg) { // Telling the user the winds bearing is not as useful as returning the actual direction.
              var quadrants = new Array("N", "NNE", "NE", "ENE","E", "ESE", "SE", "SSE","S", "SSW", "SW", "WSW","W", "WNW", "NW", "NNW");
              return quadrants[Math.floor(((parseInt(deg) + 11.25) / (360/quadrants.length)))]; //normalize the value and then divide by num of quadrants/degrees.  Thanks Cliff Mass.

            };
    }

})();
