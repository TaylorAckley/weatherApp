"use strict";

;
(function() { //let's wrap in a IIFE to make sure we don't pollute the global name space.

    angular
        .module('weatherApp', [
            'ngAnimate',
            'ui.bootstrap',
            'ui.router',
            'angular-skycons',
            'vsGoogleAutocomplete',
            'toastr'
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

})();