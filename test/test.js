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

var fixtures = function (glob) { return path.join(__dirname, './.tmp', glob); }


function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
    
describe('gulp-unused', function() {
  
  var tmpFolder = path.join(__dirname, '.tmp');
  
  beforeEach(function(done){
    var folder = path.join(__dirname, './fixtures/');
    fs.copy(folder, tmpFolder, function(err){
      done();
    });
  });

  // We'll delete it when we're done.
  afterEach(function(done){
    fs.remove(tmpFolder, done);
  });
  
  it('1) should find and remove images, CSS and JavaScript not used in the project', function(){
    var options = {
        reference: 'img/',
        remove: true
    };
    
    var expected = path.join(__dirname, './.tmp/img/bg_foot.png');
    var stream = unused(options);
    var fixtureStream = fs.createReadStream(fixtures('index.html'));
    var fixtureData = '';
    
    fixtureStream.on('data', function(chunk){
      fixtureData += chunk;
    });
   
    
    fixtureStream.on('end', function(chunk){
      
      stream.on('finish', function () {
        assert.equal(fileExists(expected), false);
        cb();
      });
    
      stream.write(new gutil.File({
        base: path.join(__dirname, './.tmp/'),
        cwd: __dirname,
		    path: fixtures('index.html'),
        contents: new Buffer(fixtureData)
	    }));
      
      stream.end();
      
    });
  });
  
  xit('2) should find images, CSS and JavaScript not used in the project', function(){
    assert.equal(1, 2);
  });
  
  xit('3) should remove files after some days', function(){
    assert.equal(1, 2);
  });
  
  it('4) create output report', function(cb){
    
    var options = {
        reference: 'img/',
        reportOutput: 'report.txt'
    };
    var expected = path.join(__dirname, './.tmp/report.txt');
    var stream = unused(options);
    var fixtureStream = fs.createReadStream(fixtures('index.html'));
    var fixtureData = '';
    
    fixtureStream.on('data', function(chunk){
      fixtureData += chunk;
    });
   
    
    fixtureStream.on('end', function(chunk){
      
      stream.on('finish', function () {
        assert.equal(fileExists(expected), true);
        assert.equal(fs.readFileSync(expected).toString(), 'bg_foot.png');
        cb();
      });
    
      stream.write(new gutil.File({
        base: path.join(__dirname, './.tmp/'),
        cwd: __dirname,
		    path: fixtures('index.html'),
        contents: new Buffer(fixtureData)
	    }));
      
      stream.end();
      
    });
   
    
 
  });

});
