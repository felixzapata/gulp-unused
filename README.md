# gulp-unused
A Gulp task to check for unused files (jpg, png, css, js etc) in a project files and output them to the console.

Inspired by [Grunt Unused](https://github.com/ryanburgess/grunt-unused).

## Work in progress

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

It uses the [same options as the Grunt task](https://github.com/ryanburgess/grunt-unused#options).

## License

ISC © [Félix Zapata](http://github.com/felixzapata)
