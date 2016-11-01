"use strict";

angular.module('weatherApp')
    .component('currentForecastItem', {
        bindings: {
            title: '@',
            text: '@'
        },
        templateUrl: 'templates/currentForecastItem.tpl.html'
    });