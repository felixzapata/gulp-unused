# gulp-unused

[![Build Status](https://travis-ci.org/felixzapata/gulp-unused.png)](https://travis-ci.org/felixzapata/gulp-unused)

A Gulp task to check for unused files (jpg, png, css, js etc) in a project files and output them to the console.

Inspired by [Grunt Unused](https://github.com/ryanburgess/grunt-unused).


## Documentation

### Example config

```javascript
gulp.task('unused', function() {
    var options = {
      reference: 'img/',
      days: 30,
      remove: false,
      reportOutput:'report.txt',
      fail: false
    };
    return gulp.src(['**/*.handlebars','**/*.html']).pipe(unused(options));
});
```

### Options

It uses, almost, the [same options as the Grunt task](https://github.com/ryanburgess/grunt-unused#options).

#### reference
Type: `String`
Default value: `img/`

A reference to the directory of files that are being checked if they are referenced in other project files.

#### remove
Type: `Boolean`
Default value: `false`

The ability to automatically delete unused file reference from project.

#### days
Type: `Number`
Default value: `false`

If remove is set to true and days has a value files will only delete if the file hasn't been modified after the length of days.

#### reportOutput
Type: `String`
Default value: `false`

Output unused files to a file. Set to false to disable


## License

ISC © [Félix Zapata](http://github.com/felixzapata)
