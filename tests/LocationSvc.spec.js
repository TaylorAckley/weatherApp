  describe('LocationSvc Factory', function() {

      var LocationSvc;

      beforeEach(angular.mock.module('weatherApp'));

      beforeEach(inject(function(_LocationSvc_) {
          LocationSvc = _LocationSvc_;
      }));

      it('LocationSvc should exist', function() {
          expect(LocationSvc).toBeDefined(); //make sure the factory mounts
      });

      describe('LocationSvc.getCurrentPosition should exist', function() {

          it('should exist', function() {
              expect(LocationSvc.getCurrentPosition()).toBeDefined(); // Make sure function exists.
          });

          it('output should be defined', function() {
              LocationSvc.getCurrentPosition()
                  .then(function(response) {
                      var output = response.geo; //check and make sure we are getting back useful data.
                      expect(output).toBeDefined();
                  });

          });
      });

  });