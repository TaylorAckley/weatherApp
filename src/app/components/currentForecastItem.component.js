"use strict";

angular.module('weatherApp')
.component('currentForecastItem', {
    bindings: {
      title: '@',
      text: '@'
    },
    templateUrl: 'views/currentForecastItem.tpl.html'
  });  