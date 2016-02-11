/* global require */

process.on('uncaughtException', (err) => {
    console.log(`Caught exception: ${err}`);
});
process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Assets for the project
var Assets = {
    dest: './src/dist/',
    main: 'bundles/fullModuleBundle.js',
    minified: 'flatworld.es6.min.js',
    minifiedES5: 'flatworld.min.js',
    package: './package.json',
    src: './src/',
};

// See the uglify documentation for more details
var _uglifySettings = {
    compress: {
        comparisons: true,
        conditionals: true,
        /* jscs: disable */
        dead_code: true,
        drop_console: true,
        /* jscs: enable */
        unsafe: true,
        unused: true,
    },
};

// Run the babel transpiler to convert from ES2015 to ES5, as well as minifying
gulp.task('es2015to5', function es2015To5Task() {
    return gulp.src(Assets.src + '/' + Assets.main)
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-umd'],
        }))
        //.pipe(uglify(_uglifySettings))
        .pipe(rename(Assets.minifiedES5))
        .pipe(gulp.dest(Assets.dest));
});