var gulp = require('gulp');
var rimraf = require('rimraf');
var watch = require('gulp-watch')
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require('gulp-uglify');

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

gulp.task('bundle', ['clean'], function() {
  return gulp.src(config.entryFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('flatworld.js'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({ stream: true }));
});

gulp.task('watch', function() {
  gulp.watch(config.entryFiles, ['bundle']);
});

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

gulp.task('develope', ['bundle', 'watch'], function() {
  browserSync({
    server: {
      baseDir: './'
    },
    startPath: "src/tests/manualStressTest.html"
  });
});

gulp.task('default', ['bundle', 'watch']);