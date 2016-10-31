"use strict";

;(function() {

    angular
        .module('weatherApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'LocationSvc', 'WeatherSvc', 'CONSTANTS'];


    function HomeCtrl($scope, LocationSvc, WeatherSvc, CONSTANTS) {
      $scope.loading = true;  // set loading icon on conroller load.
        LocationSvc.getCurrentPosition()
            .then(function(response) {
                $scope.userLocation = response;
                console.log($scope.userLocation);
            })
            .then(function(response) {
              WeatherSvc.getWeather($scope.userLocation.position.latitude, $scope.userLocation.position.longitude)
              .then(function(forecast) {
                $scope.forecast = forecast.data;
                console.log($scope.forecast);
                $scope.loading = false;  // An alternate way to handle this would be to have a controller on the body element and put ng-show/hide on the includes.
                                        // When there is a loading event, you would broadcast it to the body controller who would hide the includes for you.
              });
            })
            .catch(function(err) {
              console.log(err);
                $scope.userLocation = false;
            });

            $scope.iconDefaults = {
              color: 'white',
              size: 120
            };

            $scope.getWindDirection = function(deg) {
              var quadrants = new Array("N", "NNE", "NE", "ENE","E", "ESE", "SE", "SSE","S", "SSW", "SW", "WSW","W", "WNW", "NW", "NNW");
              return quadrants[Math.floor(((parseInt(deg) + 11.25) / (360/quadrants.length)))]; //normalize the value and then divide by num of quadrants/degrees.  Thanks Cliff Mass.

            };
    }

})();
