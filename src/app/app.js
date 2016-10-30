"use strict";

;
(function() { //let's wrap in a IIFE to make sure we don't pollute the global name space.

    angular
        .module('weatherApp', [
            'ngAnimate',
            'ui.bootstrap',
            'ui.router',
            'angular-skycons'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html',
                data: {
                    pageTitle: 'Weather - Home'
                }
            });


        $urlRouterProvider.otherwise('/');

    }


    //typically a run block would go here for a more complex application.
    angular
        .module('weatherApp')
        .constant('CONSTANTS', {
            // Normally you would want to inject this as a enviornment variable with a .env file in conjucntion with foreman/heroku.
            // Nothing ruins your like a bot stealing your S3 or mail service keys.
            'FORECASTER_API_KEY': 'cedba224531c8bdebd8ddc86f57a1fcf', //It's typically a bad idea to put this here.
            'GOOGLE_MAPS_API_KEY': 'AIzaSyCVagOKmuUJABOVWolb2cRp-HMEWgS6rek',
            'UNSPLASH_ID': '14ce53490ffd093f0d9c9bb1026387ad9461b23717cce914c8e8fa468f66a7c6',
            'DEFAULT_LONG': '-0.118092',
            'DEFAULT_LAT': '51.509865'

        });

})();