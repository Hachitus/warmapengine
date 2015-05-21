var source = require('vinyl-source-stream');
var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var babel = require("gulp-babel");

gulp.task('watchAndCompile', function() {
    gulp.watch('./public/initGame.es6.js', ['compile']);
});


gulp.task('compileTest', function() {
  browserify({
    entries: './public/tests/es6/mapFactory-spec.es6.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(source('mapFactory-spec.js'))
  .pipe(gulp.dest('./public/tests/spec'));
});

gulp.task('compileSome', function() {
  browserify({
    entries: './public/initGame.es6.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('initGame.js'))
  .pipe(gulp.dest('./public'));
});