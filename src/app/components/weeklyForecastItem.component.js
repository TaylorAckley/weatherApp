"use strict";

angular.module('weatherApp')
.component('weeklyForecastItem', {
    bindings: {
      data: '=', //two way binding
      icon: '='

    },
    templateUrl: 'views/weeklyForecastItem.tpl.html',
  });  