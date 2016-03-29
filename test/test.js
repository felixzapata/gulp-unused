'use strict';

var pluginPath = '../index';
var unused = require(pluginPath);
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
  
  it('1) should find and remove images, CSS and JavaScript not used in the project', function(){
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
  
  it('2) should find images, CSS and JavaScript not used in the project', function(){
    assert.equal(1, 2);
  });
  
  it('3) should remove files after some days', function(){
    assert.equal(1, 2);
  });
  
  it('4) create output report', function(done){
    
    var options = {
        reference: 'img/',
        directory: [fixtures('**/*.html')],
        reportOutput: 'report.txt', // set to false to disable file output
    };
    var expected = path.join(__dirname, './expected/result4/report.txt');
    var stream = unused(options);
    
    stream.end();
    done();
    
    assert.equal(fileExists(expected), true);
    
  });

});
