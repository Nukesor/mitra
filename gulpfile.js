// Include gulp
var gulp = require('gulp'); 

// Include Plugins
var less = require('gulp-less');
var react = require('gulp-react');
var shell  = require('gulp-shell');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


// Default Task
gulp.task('default', ['less', 'compileJSX', 'buildjs-dev', 'watch']);

// Build Task
gulp.task('build', ['less', 'compileJSX', 'buildjs']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('client/jsx/**/*.jsx', ['compileJSX']);
    gulp.watch('build/**/*.js', ['buildjs-dev']);
    gulp.watch('client/less/**/*.less', ['less']);
});

// 
gulp.task('less', function () {
  return gulp.src('client/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('mitra/static/css/'));
});

// Deploy jsx to js
gulp.task('compileJSX', function() {
    return gulp.src('client/jsx/**/*.jsx')
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
