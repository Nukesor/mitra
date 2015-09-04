// Include gulp
var gulp = require('gulp');

// Include Plugins
var less = require('gulp-less'),
    babel = require('gulp-babel'),
    watchify = require('watchify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    minifyCss = require('gulp-minify-css'),
    source = require('vinyl-source-stream');

var path = {
    build_dir: './build/',
    entry_point: './build/app.js',
    js_name: 'mitra.min.js',
    js_out: './mitra/static/js/',
    css_out: './mitra/static/css/',
    css_name: 'mitra.min.css'
};

// Default Task
gulp.task('default', ['less-dev', 'compileJSX', 'compileJS', 'js-dev', 'watch']);

// Build Task
gulp.task('build', ['less-prod', 'compileJSX', 'compileJS', 'js-prod']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('client/**/*.jsx', ['compileJSX']);
    gulp.watch('client/**/*.js', ['compileJS']);
    gulp.watch('client/less/**/*.less', ['less-dev']);
});

//
gulp.task('less-prod', function () {
    return gulp.src('client/less/**/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(rename(path.css_name))
    .pipe(gulp.dest(path.css_out));
});

gulp.task('move-deps-dev', function () {

});

gulp.task('less-dev', function () {
    return gulp.src('client/less/**/*.less')
    .pipe(less())
    .pipe(rename(path.css_name))
    .pipe(gulp.dest(path.css_out));
});


// Deploy jsx to js
gulp.task('compileJSX', function() {
    return gulp.src('client/**/*.jsx')
    .pipe(babel())
    .pipe(gulp.dest(path.build_dir));
});

// Move js to build
gulp.task('compileJS', function() {
    return gulp.src('client/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(path.build_dir));
});


gulp.task('js-dev', ['move-deps-dev','less-dev'], function() {

    // Watching jsx and js files
    var watcher  = watchify(browserify({
        entries: [path.entry_point],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source(path.js_name))
        .pipe(gulp.dest(path.js_out));
        console.log('Javascript Updated');
    })
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(path.js_name))
    .pipe(gulp.dest(path.js_out));
});


gulp.task('js-prod', function(){
    browserify({
        entries: [path.entry_point]
    })
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(uglify())
    .pipe(gulp.dest(path.js_out));
});

