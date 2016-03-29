'use strict';

var pluginPath = '../index';
var unused = require(pluginPath);
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var should = require('should');
var assert = require('assert');
var sassert = require('stream-assert');
require('mocha');

var fixtures = function (glob) { return path.join(__dirname, './fixtures', glob); }

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
    
describe('gulp-unused', function() {
  
  xit('1) should find and remove images, CSS and JavaScript not used in the project', function(){
    var options = {
        reference: 'img/',
        directory: ['**/*.html'],
        days: 30,
        remove: false, // set to true to delete unused files from project
        reportOutput:'report.txt', // set to false to disable file output
        fail: false // set to true to make the task fail when unused files are found
    };
    assert.equal(1, 2);
  });
  
  xit('2) should find images, CSS and JavaScript not used in the project', function(){
    assert.equal(1, 2);
  });
  
  xit('3) should remove files after some days', function(){
    assert.equal(1, 2);
  });
  
  it('4) create output report', function(done){
    
    var options = {
        reference: 'img/',
        reportOutput: 'report.txt'
    };
    var expected = path.join(__dirname, './expected/result4/report.txt');
    var stream = unused(options);
    
    stream.write(new gutil.File({
      base: path.join(__dirname, './fixtures/'),
      cwd: __dirname,
		  path: fixtures('index.html')
	  }));

    stream.on('finish', function () {
      assert.strictEqual(1, 1);
      cb();
    });

    stream.end();

    done();
    
  });

});
