"use strict";

;(function() { //let's wrap in a IIFE to make sure we don't pollute the global name space.
  //typically a run block would go here for a more complex application.
    angular
        .module('weatherApp')
        .constant('CONSTANTS', {
            // Normally you would want to inject this as a enviornment variable with a .env file in conjucntion with foreman/heroku.
            // Nothing ruins your like a bot stealing your S3 or mail service keys.
            'FORECASTER_API_KEY': 'cedba224531c8bdebd8ddc86f57a1fcf', //It's typically a bad idea to put this here.
            'GOOGLE_MAPS_API_KEY': 'AIzaSyCVagOKmuUJABOVWolb2cRp-HMEWgS6rek',
            'DEFAULT_LONG': '-0.127758', //London.  If a users location is off, London will be the default location
            'DEFAULT_LAT': '51.507351'

        });

})();
