"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    ngAnnotate = require('gulp-ng-annotate'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    rev = require('gulp-rev-append'),
    connect = require('gulp-connect'),
    rev = require('gulp-rev-append');

// Asset pipelines.   I do it this way so they are loaded in the correct order.  ie: Angular files, vendor files, custom app files.  Drawback is you need to restart gulp everytime you want to load a new asset.

var jsAssets = [
    'vendor/angular/angular.js',
    'vendor/angular-bootstrap/ui-bootstrap.js',
    'vendor/angular-animate/angular-animate.js',
    'vendor/angular-ui-router/release/angular-ui-router.js',
    'vendor/angular-skycons/angular-skycons.min.js',
    'vendor/vsGoogleAutocomplete/dist/vs-google-autocomplete.min.js',
    'vendor/angular-toastr/dist/angular-toastr.min.js',
    'vendor/angular-toastr/dist/angular-toastr.tpls.min.js',
    'src/app/**/*.js'
];

var cssAssets = [
    'vendor/bootstrap/dist/css/bootstrap.css',
    'vendor/animate.css/animate.css',
    'vendor/components-font-awesome/font-awesome.css',
    'vendor/angular-toastr/dist/angular-toastr.css',
    'src/styles/*.css'
];

gulp.task('default', ['watch', 'connect', 'connect', 'bundleJS', 'build-scss', 'bundleCSS', 'rev']);

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 9000,
        livereload: true
    });
});


gulp.task('build-scss', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('/map'))
        .pipe(plumber())
        .pipe(gulp.dest('src/styles'));
});


gulp.task('bundleJS', function() {
    console.log('executing bundle');
    return gulp.src(jsAssets)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(ngAnnotate())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(sourcemaps.write('/map'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('bundleCSS', function() {
    return gulp.src(cssAssets)
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/styles'))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({
            suffix: '.min'
        }))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(sourcemaps.write('/map'))
        .pipe(gulp.dest('public/styles'))
        .pipe(connect.reload());
});

// This task will add a cache  buster to file with  ?rev=@@hash added to it.  This forces a users cache to refresh anytime there is a change.

gulp.task('rev', function() {
    gulp.src('public/index.html')
        .pipe(rev())
        .pipe(gulp.dest('public/'));
});

gulp.task('html', function() {
    gulp.src('public/**/*.html')
        .pipe(connect.reload());
});


gulp.task('watch', function() {

    gulp.watch('src/scss/**/*.scss', ['build-scss', 'rev']);
    gulp.watch(jsAssets, ['bundleJS', 'rev']);
    gulp.watch(cssAssets, ['bundleCSS', 'rev']);
    gulp.watch('src/index.html', ['rev']);
});
