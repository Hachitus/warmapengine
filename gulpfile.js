var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

var config = {
  entryFiles: [
    './src/components/map/core/init.js',
    './src/components/utilities/polyfills.js',
    './src/components/utilities/general.js',
    './src/components/utilities/environment.js',
    './src/components/logger/*.js',
    './src/components/preloading/Preload.js',
    './src/components/map/core/utils/dataManipulation.js',
    './src/components/map/core/utils/effects.js',
    './src/components/map/core/utils/utils.js',
    './src/components/map/core/mapEvents.js',
    './src/components/map/core/eventListeners.js',
    './src/components/map/core/mapLayers.js',
    './src/components/map/core/MapDataManipulator.js',
    './src/components/map/core/UI.js',
    './src/components/map/core/ObjectManager.js',
    './src/components/map/core/Objects.js',
    './src/components/map/core/Sound.js',
    './src/components/map/core/UI.js',
    './src/components/map/core/UITemplateBase.js',
    './src/components/map/core/baseEventlisteners/*.js',
    './src/components/map/core/move/*.js',
    './src/components/map/core/zoom/*.js',
    './src/components/map/extensions/hexagons/init.js',
    './src/components/map/extensions/hexagons/utils/hexagonMath.js',
    './src/components/map/extensions/hexagons/utils/createHexagon.js',
    './src/components/map/extensions/hexagons/eventListeners/*.js',
    './src/components/map/extensions/hexagons/*.js',
    './src/components/map/extensions/mapMovement/mapMovement.js',
    './src/components/map/UIs/default/init.js',
    './src/components/map/UIs/default/utils/*.js',
    './src/components/map/UIs/default/layout/*.js',
    './src/components/map/UIs/default/default.js',
    './src/components/map/core/Flatworld.js',
    './src/factories/*.js'],
  outputDir: './dist/',
  outputFile: 'flatworld.js'
};

gulp.task('bundle', function() {
  return gulp.src(config.entryFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('flatworld.js'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/'));
});


// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true, paths: ['./node_modules','./src'], extensions: ['es6', "cjs", "amd", "umd"] }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent'], function() {

  browserSync({
    server: {
      baseDir: './'
    }
  });

  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
