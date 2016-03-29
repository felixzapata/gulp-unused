/*
 * gulp-unused
 * https://github.com/felixzapata/gulp-unused
 *
 * Copyright (c) 2016 Felix Zapata
 * Licensed under the ISC license.
 */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stubby = require('./index.js'),
    nodeunit = require('gulp-nodeunit');


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

gulp.task('nodeunit', function() {
    return gulp.src('test/test.js').pipe(nodeunit()).on('end', function() {
        process.nextTick(function() {
            process.exit(0);
        });
    });
});