"use strict";

(function() {
    angular.module('weatherApp')
        .factory('LocationSvc', LocationSvc);

    LocationSvc.$inject = ['$q', '$window', '$http', 'CONSTANTS'];


    function LocationSvc($q, $window, $http, CONSTANTS) {

        function getLocale(data) { //this private function makes sense of the wacky data Google returns.   Pulls out only the component we need to display the users locale
            var locale = {}; //hoist
            for (var i = 0; i < data[0].address_components.length; i++) {
                var addrType = data[0].address_components[i];
                switch (addrType.types[0]) {
                    case 'locality':
                        locale.city = addrType.long_name;
                        break;
                    case 'administrative_area_level_1':
                        locale.state = addrType.short_name;
                        break;
                    case 'country':
                        locale.country = addrType.long_name;
                        locale.registered_country_iso_code = addrType.short_name;
                        break;
                }
            }
            return locale;
        }

        function getPosition() {
            var deferred = $q.defer(); //lets return a promise!

            if (!$window.navigator.geolocation) {  // Check and make sure the users browser has location enabled.
                $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + CONSTANTS.DEFAULT_LAT + ',' + CONSTANTS.DEFAULT_LONG + '&key=' + CONSTANTS.GOOGLE_MAPS_API_KEY)
                    .then(function(response) {
                        var coords = {
                            latitude: CONSTANTS.DEFAULT_LAT,
                            longitude: CONSTANTS.DEFAULT_LONG
                        };
                        deferred.resolve({
                            position: coords,
                            geo: getLocale(response.data.results),
                            isDefault: true  //let controller know it's getting the default location of london.
                        });
                    })
                    .catch(function(err) {
                        deferred.reject({
                            error: err,
                            message: 'Geolocation is unavailable.'
                        });
                    });

            } else {
                $window.navigator.geolocation.getCurrentPosition( // Use the browers geolocation service to grab the position, then pass it to a closure function 
                    function(position) {
                        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + CONSTANTS.GOOGLE_MAPS_API_KEY)
                            .then(function(response) {
                                deferred.resolve({
                                    position: position.coords,
                                    geo: getLocale(response.data.results)
                                });
                            })
                            .catch(function(err) {
                                deferred.reject({
                                    error: err,
                                    message: 'Geolocation is unavailable.'
                                });
                            });
                    },
                    function(err) {
                        deferred.reject({
                            error: err,
                            message: 'Error getting your position.'
                        });
                    });
            }
            return deferred.promise;
        }
        return {
            getCurrentPosition: getPosition
        };
    }
})();
