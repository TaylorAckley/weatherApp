"use strict";

(function() {
    angular.module('weatherApp')
        .factory('WeatherSvc', WeatherSvc);

    WeatherSvc.$inject = ['$http', 'CONSTANTS'];


    function WeatherSvc( $http, CONSTANTS) {

        return {
            getWeather: function(lat, long) { //This is a much neater version of a factory than LocationSvc which takes a lot of processing to end up with the result.   The below simply returns a promise.
                return $http.jsonp('https://api.darksky.net/forecast/' + CONSTANTS.FORECASTER_API_KEY + '/'+ lat +',' + long+'?callback=JSON_CALLBACK');
            }
        };
    }
})();