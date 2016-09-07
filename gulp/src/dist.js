/*var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
gulp.task('default', function() {
  return gulp.src(['src/app.js', 'test/test.js'])
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});*/

//http://jiongks.name/blog/just-vue/

var gulp = require('gulp');
var rename       = require('gulp-rename');
var webpack = require('gulp-webpack');

var config  = require('./config');

gulp.task('default', function() {
  return gulp.src(['src/app.js', 'test/test.js'])
    .pipe(webpack())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
});