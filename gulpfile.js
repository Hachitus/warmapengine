var source = require('vinyl-source-stream');
var gulp = require("gulp");
var babelify = require('babelify');
require("babel/polyfill");
var browserify = require('browserify');
var glob = require('glob');
var q = require('q');
var jscs = require('gulp-jscs')
//var babel = require("gulp-babel");

gulp.task('watchAndCompile', function() {
  gulp.watch('./public/tests/manual/createMap-test.es6.js', ['compile_manualTestMap']);
  gulp.watch('./public/tests/es6/*.es6.js', ['compile_unitTests']);
});

gulp.task('compile_unitTests', function(done) {
  glob('./public/tests/es6/*.es6.js', function(err, files) {
    if (err) {
      done(err);
      return;
    }

    var streamForDone;

    files.map(function(entry) {
      var filename = entry.split("/");
      filename = filename[filename.length-1];

      console.log("transpiling:", filename);
      streamForDone = browserify({
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

    streamForDone.on("end", function() {
      done();
    })
  });
});

gulp.task('compile_utilsTest', function() {
  return browserify({
      entries: './public/tests/es6/utils-spec.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('utils-spec.js'))
    .pipe(gulp.dest('./public/tests/spec'));
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

gulp.task('compile_manualTestMap_pixi', function() {
  return browserify({
      entries: './public/tests/manual/pixi_createMap-test.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('pixi_map-spec.js'))
    .pipe(gulp.dest('./public/tests/manual'));
});

gulp.task('jscs', function () {
  return gulp.src('public/components/**/*.js')
    .pipe(jscs({
      fix: true,
      esnext: true
    }))
    .pipe(gulp.dest('public/components/'));
});

gulp.task('default', ['compileAll']);

gulp.task('bundle_testMap', function() {
  // need to implement a bundling without transpiling the ES6 features, so only import / export module budnling, nothing else
});

gulp.task('compileAll', ["compile_manualTestMap", 'compile_unitTests']);