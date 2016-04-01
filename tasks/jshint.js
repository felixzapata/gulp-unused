'use strict';
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  stylish = require('jshint-stylish'),
  options = {
    lookup: true
  };


gulp.task('jshint', function() {
    var options = {
        lookup: true
    };
    return gulp.src([
            'gulpfile.js',
            'index.js',
            '<%= nodeunit.tests %>'
        ])
        .pipe(jshint(options))
        .pipe(jshint.reporter(stylish));
});
