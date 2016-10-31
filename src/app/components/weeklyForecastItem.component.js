"use strict";

angular.module('weatherApp')
.component('weeklyForecastItem', {
    bindings: {
      data: '=', //two way binding
      icon: '='

    },
    templateUrl: 'templates/weeklyForecastItem.tpl.html',
  });
