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
  
  it('1) should find and remove images, CSS and JavaScript not used in the project', function(done){
    var options = {
        reference: 'img/',
        remove: true
    };
    
    var expected = path.join(__dirname, './.tmp/img/bg_foot.png');
    
    gulp.src(fixtures('index.html'))
        .pipe(unused(options))
        .pipe(sassert.length(1))
        .pipe(sassert.first(function () { 
          fileExists(expected).should.equal(false);
         }))
        .pipe(sassert.end(done));
    
  });
  
  xit('2) should find images, CSS and JavaScript not used in the project', function(){
    assert.equal(1, 2);
  });
  
  xit('3) should remove files after some days', function(){
    var options = {
        reference: 'img/',
        days: 2
    };
    
    var expected = path.join(__dirname, './.tmp/img/bg_old.png');
    var expected2 = path.join(__dirname, './.tmp/img/bg_foot.png');

    var stream = unused(options);
    var fixtureStream = fs.createReadStream(fixtures('index.html'));
    var fixtureData = '';
   
    fs.writeFileSync(expected, '');
   
    
    fixtureStream.on('end', function(chunk){
      
      stream.on('finish', function () {
        assert.equal(fileExists(expected), false);
        assert.equal(fileExists(expected2), true);
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
  
  it('4) create output report', function(done){
    
    var options = {
        reference: 'img/',
        reportOutput: 'report.txt'
    };
    var expected = path.join(__dirname, './.tmp/report.txt');
    
    gulp.src(fixtures('index.html'))
        .pipe(unused(options))
        .pipe(sassert.first(function (d) { 
          fs.readFileSync(expected).toString().should.equal('bg_foot.png');
          fileExists(expected).should.equal(true);
         }))
        .pipe(sassert.end(done));
  });

});
