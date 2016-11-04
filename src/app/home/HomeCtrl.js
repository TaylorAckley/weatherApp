"use strict";

;(function() {

    angular
        .module('weatherApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$interval', 'LocationSvc', 'WeatherSvc', 'CONSTANTS', 'toastr'];


    function HomeCtrl($scope, $interval, LocationSvc, WeatherSvc, CONSTANTS, toastr) {
        $scope.isLoading = true; // set loading icon on conroller load.
        $scope.refresh = false;
        $scope.locale = {}; // hoist a disposable scope variable that isn;t bound to anything on the front end.
        LocationSvc.getCurrentPosition()
            .then(function(response) {
                $scope.userLocation = response;
                //if (response.isDefault) {
                    //toastr.info('Unable to determine your location.   Use the search box to look up your area.');
                //}
            })
            .then(function(response) { //chain the promise.
                WeatherSvc.getWeather($scope.userLocation.position.latitude, $scope.userLocation.position.longitude)
                    .then(function(forecast) {
                      console.log(forecast);
                        $scope.forecast = forecast.data;
                        $scope.isLoading = false; // An alternate way to handle this would be to have a controller on the body element and put ng-show/hide on the includes.
                        // When there is a loading event, you would broadcast it to the body controller who would hide the includes for you.
                    })
                    .catch(function(err) {
                        toastr.error('Error obtaining forecast data.   Please try again later.');
                        $scope.isLoading = false;
                    });
            })
            .catch(function(err) {
                toastr.error('Error retrieving location information.  Please try again later.');
                $scope.isLoading = false;
            });

        $scope.changeLocale = function() {
            if (!$scope.locale.latitude || !$scope.locale.longitude) {
              toastr.warning('Please input a valid location.   Make sure you have a city, state and country, or use the autocomplete suggestions.');
                return;
            } else {
            $scope.loading = true;
            WeatherSvc.getWeather($scope.locale.latitude, $scope.locale.longitude)
                .then(function(forecast) {
                    $scope.forecast = forecast.data;
                    $scope.userLocation.geo = $scope.locale;
                    $scope.userLocation.position = $scope.locale;
                    $scope.loading = false;
                })
                .catch(function(err) {
                    toastr.error('Error obtaining forecast data.   Please try again later.');
                    $scope.loading = false;
                });
              }
        };

        $interval(function() {//refresh weather data every 5 minutes
          $scope.refresh = true;
          WeatherSvc.getWeather($scope.userLocation.position.latitude, $scope.userLocation.position.longitude)
              .then(function(forecast) {
                  $scope.forecast = forecast.data;
                  $scope.refresh = false;
              })
              .catch(function(err) {
                  toastr.error('Error obtaining forecast data.   Please try again later.');
                  $scope.refresh = false;
              });
        }, ((1000 * 60) *5));

        $scope.options = {
            types: ['(cities)']
        };

        $scope.iconDefaults = {
            color: 'white',
            size: 120
        };

        $scope.getWindDirection = function(deg) { // Telling the user the winds bearing is not as useful as returning the actual direction.
            var quadrants = new Array("N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW");
            return quadrants[Math.floor(((parseInt(deg) + 11.25) / (360 / quadrants.length)))]; //normalize the value and then divide by num of quadrants/degrees.  Thanks Cliff Mass.

        };
    }

})();
