'use strict';
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  path = require('path');


function doBump(type) {
  return function () {
    return gulp.src('./package.json')
      .pipe($.bump(type).on('error', $.util.log))
      .pipe(gulp.dest('./'));
  };
}

gulp.task('bump:major', doBump({
  type: 'major'
}));

gulp.task('bump:minor', doBump({
  type: 'minor'
}));

gulp.task('bump:patch', doBump({
  type: 'patch'
}));
