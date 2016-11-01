  describe('WeatherSvc Factory', function() {

      var WeatherSvc;

      beforeEach(angular.mock.module('weatherApp'));

      beforeEach(inject(function(_WeatherSvc_) {
          WeatherSvc = _WeatherSvc_;
      }));

      // A simple test to verify the WeatherSvc service exists
      it('WeatherSvc should exist', function() {
          expect(WeatherSvc).toBeDefined();
      });

      describe('WeatherSvc.getCurrentPosition should exist', function() {


          var DEFAULT_LONG = '-0.118092'; //London.
          var DEFAULT_LAT = '51.509865';


          it('should exist', function() {
              expect(WeatherSvc.getWeather()).toBeDefined();
          });

          it('output should be defined', function() {
              WeatherSvc.getWeather(DEFAULT_LAT, DEFAULT_LONG)
                  .then(function(response) {
                      var output = response.data.currently; // Make sure im getting back useful data.
                      expect(output).toBeDefined();
                  });

          });
      });

  });