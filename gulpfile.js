var source = require('vinyl-source-stream');
var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var transpile  = require('gulp-es6-module-transpiler');
//var babel = require("gulp-babel");

gulp.task('watchAndCompile', function() {
    gulp.watch('./public/initGame.es6.js', ['compile']);
});

gulp.task('compile_testMap', function() {
  return browserify({
      entries: './public/tests/es6/map-spec.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('map-spec.js'))
    .pipe(gulp.dest('./public/tests/spec'));
});

gulp.task('bundle_testMap', function() {
  return gulp.src([
      './public/assets/components/**/*.js',
      './public/assets/lib/**/*.js',
      './public/tests/**/*.js'
    ]).pipe(
      transpile({
        formatter: 'bundle'
    }))
    .pipe(
      gulp.dest('public/dist')
    );
});

gulp.task('compile_testMapFactory', function() {
  return browserify({
      entries: './public/tests/es6/mapFactory-spec.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('mapFactory-spec.js'))
    .pipe(gulp.dest('./public/tests/spec'));
});

gulp.task('compile_testPreloader', function() {
  return browserify({
      entries: './public/tests/es6/preloader-spec.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('preloader-spec.js'))
    .pipe(gulp.dest('./public/tests/spec'));
});

gulp.task('compileTest', ['compile_testMap']);