'use strict';

var pluginPath = '../index';
var unused = require(pluginPath);
var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs-extra');
var path = require('path');
var should = require('should');
var assert = require('assert');
var sassert = require('stream-assert');
require('mocha');

var fixtures = function(glob) { return path.join(__dirname, './.tmp', glob); }


function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

describe('gulp-unused', function() {

  var tmpFolder = path.join(__dirname, '.tmp');

  beforeEach(function(done) {
    var folder = path.join(__dirname, './fixtures/');
    fs.copy(folder, tmpFolder, function(err) {
      done();
    });
  });

  // We'll delete it when we're done.
  afterEach(function(done) {
    fs.remove(tmpFolder, done);
  });

  it('1) should find and remove images, CSS and JavaScript not used in the project', function(done) {
    var options = {
      reference: 'img/',
      remove: true
    };

    var expected = path.join(__dirname, './.tmp/img/bg_foot.png');

    gulp.src(fixtures('index.html'))
      .pipe(unused(options))
      .pipe(sassert.length(1))
      .pipe(sassert.first(function() {
        fileExists(expected).should.equal(false);
      }))
      .pipe(sassert.end(done));

  });

  it('2) should find images, CSS and JavaScript not used in the project', function(done) {
    var options = {
      reference: 'img/'
    };

    var expected = path.join(__dirname, './.tmp/img/bg_foot.png');

    gulp.src(fixtures('index.html'))
      .pipe(unused(options))
      .pipe(sassert.length(1))
      .pipe(sassert.first(function() {
        fileExists(expected).should.equal(true);
      }))
      .pipe(sassert.end(done));
  });

  it('3) should remove files after some days', function(done) {
    var options = {
      reference: 'img/',
      remove: true,
      days: 2
    };

    var expected = path.join(__dirname, './.tmp/img/foobar.txt');
    var expected2 = path.join(__dirname, './.tmp/img/bg_foot.png');
    var dateTemp = new Date();
    var dateToTest = dateTemp.setDate(dateTemp.getDate() - options.days);

    fs.writeFileSync(expected, 'foobar test');
    fs.utimesSync(expected, dateToTest, dateToTest);


    gulp.src(fixtures('index.html'))
      .pipe(unused(options))
      .pipe(sassert.first(function(d) {
        fileExists(expected).should.equal(false);
        fileExists(expected2).should.equal(true);
      }))
      .pipe(sassert.end(done));


  });

  it('4) create output report', function(done) {

    var options = {
      reference: 'img/',
      reportOutput: 'report.txt'
    };
    var expected = path.join(__dirname, './.tmp/report.txt');

    gulp.src(fixtures('index.html'))
      .pipe(unused(options))
      .pipe(sassert.first(function(d) {
        fs.readFileSync(expected).toString().should.equal('bg_foot.png');
        fileExists(expected).should.equal(true);
      }))
      .pipe(sassert.end(done));
  });

});
