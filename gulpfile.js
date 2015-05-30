// Include gulp
var gulp = require('gulp'); 

// Include Plugins
var shell  = require('gulp-shell');
var react = require('gulp-react');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


// Default Task
gulp.task('default', ['compileJSX', 'buildjs-dev', 'watch']);

// Build Task
gulp.task('build', ['compileJSX', 'buildjs']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('client/**/*.jsx', ['compileJSX', 'buildjs-dev']);
});

// Deploy jsx to js
gulp.task('compileJSX', function() {
    return gulp.src('client/**/*.jsx')
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/jsx2js/'));
});

// Minify and deploy js
gulp.task('buildjs', function() {
    return gulp.src('build/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('mitra/static/js/'));
});

// Deploy unminified js
gulp.task('buildjs-dev', function() {
    return gulp.src('build/**/*.js')
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('mitra/static/js/'));

});
