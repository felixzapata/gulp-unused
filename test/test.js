'use strict';

var pluginPath = '../index';
var unused = require(pluginPath);
var should = require('should');
var assert = require('assert');
var sassert = require('stream-assert');
require('mocha');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); }
    
describe('gulp-unused', function() {
  
  it('1) should find and remove images, CSS and JavaScript not used in the project', function(){
    assert.equal(1, 2);
  });
  it('2) should find images, CSS and JavaScript not used in the project', function(){
    assert.equal(1, 2);
  });
  it('3) should remove files after some days', function(){
    assert.equal(1, 2);
  });
  it('4) create output report', function(){
    assert.equal(1, 2);
  });

});
