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
    unused = require('./index.js'),
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

gulp.task('unused', function(cb) {
   var options = {
        reference: 'img/',
        directory: ['**/*.html'],
        days: 30,
        remove: false, // set to true to delete unused files from project
        reportOutput:'report.txt', // set to false to disable file output
        fail: false // set to true to make the task fail when unused files are found
    };
    return unused(options, cb);
});

gulp.task('nodeunit', ['unused'], function() {
    return gulp.src('test/test.js').pipe(nodeunit()).on('end', function() {
        process.nextTick(function() {
            process.exit(0);
        });
    });
});