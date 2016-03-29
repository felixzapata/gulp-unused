/*
 * gulp-unused
 * https://github.com/felixzapata/gulp-unused
 *
 * Copyright (c) 2016 Felix Zapata
 * Licensed under the ISC license.
 */

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var unused = require('./index.js');


gulp.task('jshint', function() {
    var options = {
        jshintrc: '.jshintrc'
    };
    return gulp.src([
            'gulpfile.js',
            'index.js',
            '<%= nodeunit.tests %>'
        ])
        .pipe(jshint(options));
});

