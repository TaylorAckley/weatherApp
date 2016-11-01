# Weather App

## Demo

https://weatherapp-taylor.herokuapp.com/#/

Stack:

- Angular 1.5
- SCSS
- Gulp
- Gulp-Connect to serve static files.
- Karma/Jasmine

## Installation and Run

*Assumes you have Node, NPM, Karma-CLI and Bower installed.*

- Git clone the repo or unzip to your local machine.
- Open a new command window.
- Run `npm install`
- Next, run `bower install`
- Run  `gulp`
- Point your browser to localhost:9000 and you're off!
- You can run tests by executing `karma start`

## Todo

*items I would clean up*

- Add unit test to make sure the "Powered by Dark Sky" link is present.
- Fix build file to copy font folder to public.  Or add a build command all together.
- Add animations
- Change the loading to be based off events, not a boolean value in the controller.
- Change grid elements to flexbox.
