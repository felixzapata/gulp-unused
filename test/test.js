'use strict';

var pluginPath = '../index',
    plugin = require(pluginPath),
    request = require('supertest');

exports.unused = {
    '1) Find images not used in the project': function(test) {
        test.expect(1);
        test.deepEqual(1, 2);
        test.done();
    },
    '2) Find JavaScript files not used in the project': function(test) {
        test.expect(1);
        test.deepEqual(1, 2);
        test.done();
    },
    '3) Find CSS files not used in the project': function(test) {
        test.expect(1);
        test.deepEqual(1, 2);
        test.done();
    }
};