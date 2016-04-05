/*
 * gulp-unused
 * https://github.com/felixzapata/gulp-unused
 *
 * Copyright (c) 2016 Félix Zapata
 * Licensed under the ISC license.
 */


'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var R = require('ramda');
var through = require('through2');
var gutil = require('gulp-util');
var glob = require('glob-all');
var PLUGIN_NAME = 'gulp-unused';

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

//get current date and time
function getDateTime() {

  var date = new Date(),
    hour,
    min,
    sec,
    year,
    month,
    day;

  //get hours
  hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;

  //get minutes
  min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;

  //get seconds
  sec = date.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;

  //get year
  year = date.getFullYear();

  //get month
  month = date.getMonth() + 1;
  month = (month < 10 ? '0' : '') + month;

  //get day
  day = date.getDate();
  day = (day < 10 ? '0' : '') + day;

  return year + '-' + month + '-' + day;

}

function deleteFile(fileRef) {
  fs.unlinkSync(fileRef);
  gutil.log('deleted ' + fileRef);
}

function logFiles(fileRef) {
  gutil.log(fileRef);
}

function gulpUnused(customOptions, cb) {
  var reference;
  var dirname;
  var unused;
  var content;
  var datemod;
  var todayDate = getDateTime();
  var startDate;
  var endDate;
  var dayDiff;
  var assets = [];
  var links = [];
  var defaultOptions = {
    reference: 'img/',
    directory: ['**/*.html'],
    remove: false,
    days: null,
    reportOutput: false,
    fail: false
  };
  
  
  var options = customOptions ? R.merge(defaultOptions, customOptions) : defaultOptions;
  var content;

  function bufferContents(file, enc, cb) {
  
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-unused',  'Streaming not supported'));
      cb();
      return;
    }
    
    dirname = path.dirname(file.path);
    
    // Get list of files depending on the file directory
    assets = glob.sync('**/*.*', { cwd: path.join(dirname, options.reference) });
      
    content = file.contents.toString();
    assets.forEach(function(asset) {
      if (content.indexOf(asset) !== -1) {
        links.push(asset);
      }
    });
    

    // Output unused files list in console
    unused = R.difference(assets, links);

    // output number of unused files
    if (unused.length) {
      gutil.log(gutil.colors.red(unused.length + ' unused file' + (unused.length === 1 ? '' : 's') + ':'));
    } else {
      gutil.log(gutil.colors.green('No unused files found.'));
    }
    

    unused.forEach(function(item) {
      // delete file if remove is set to true
      if (options.remove === true && options.days !== null) {
        datemod = fs.statSync(options.reference + item).mtime.toISOString();
        datemod = datemod.replace(/\T.+/, '');
        startDate = moment(datemod, 'YYYY-M-DD');
        endDate = moment(todayDate, 'YYYY-M-DD');
        dayDiff = endDate.diff(startDate, 'days');

        if (dayDiff >= options.days) {
          //delete file
          deleteFile(path.join(dirname, options.reference, item));
        } else {
          // log file references
          logFiles(path.join(dirname, options.reference, item));
        }
      } else if (options.remove === true) {
        //delete file
        deleteFile(path.join(dirname, options.reference, item));
      } else {
        // log file references
        logFiles(path.join(dirname, options.reference, item));
      }
    });
    
    if (unused.length > 0 && options.reportOutput) {
      var destDir = path.join(dirname, options.reportOutput);
      fs.writeFileSync(destDir, unused.join('\r\n'));
      gutil.log(gutil.colors.green('Report "' + options.reportOutput + '" created.'));  
    }
    
    
    if (unused.length && !options.remove && options.fail) {
      gutil.log(gutil.colors.red('Unused files were found.'));
    }
    
    this.push(file);
    
    cb();
    
   
  }

  return through.obj(bufferContents, cb);

}

// Exporting the plugin main function
module.exports = gulpUnused;