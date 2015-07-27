var source = require('vinyl-source-stream');
var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var glob = require('glob');
var concat = require('gulp-concat');
var transpile  = require('gulp-es6-module-transpiler');
//var babel = require("gulp-babel");

gulp.task('watchAndCompile', function() {
    gulp.watch('./public/manual/es6/createMap-test.es6.js', ['compile_manualTestMap']);
});

gulp.task('compile_unitTests', function(done) {
  glob('./public/tests/es6/*.es6.js', function(err, files) {
        if(err) {
          done(err);
          return;
        }

    files.map(function(entry) {
      var filename = entry.split("/");
      filename = filename[filename.length-1];

      console.log("transpiling:",filename);
      return browserify({
          entries: entry,
          debug: true
        })
        .transform(babelify)
        .bundle()
        .on("error", function (err) {
          console.log("Error : " + err.message);
        })
        .pipe(source(filename.replace(".es6", "")))
        .pipe(gulp.dest('./public/tests/spec/'));
    });

    console.log("read?")
  });
});

gulp.task('compile_manualTestMap', function() {
  return browserify({
      entries: './public/tests/manual/createMap-test.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('map-spec.js'))
    .pipe(gulp.dest('./public/tests/manual'));
});

gulp.task('bundle_testMap', function() {
  // need to implement a bundling without transpiling the ES6 features, so only import / export module budnling, nothing else
});