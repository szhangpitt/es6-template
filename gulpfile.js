var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');


gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('bundle', function () {
    var bundler = browserify({
        entries: 'src/index.js',
        debug: true
    });

    bundler.transform(babelify, {
        presets: ['es2015']
    });

    bundler.bundle()
        .on('error', function (err) { gutil.log(err); })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});


gulp.task('default', ['bundle', 'html']);
