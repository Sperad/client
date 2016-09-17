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
var named = require('vinyl-named');
var webpack = require('gulp-webpack');

var config  = require('./config');
var webpackConfig  = require('./webpack.config');

gulp.task('test', function() {
    var myConfig = Object.create(webpackConfig);
    var script = config.appConfig.dev.script;
    for(var index in script.src){
        script.src[index] = config.srcDir + script.src[index];
    }
    return gulp.src(script.src)
      .pipe(webpack(myConfig))
      .pipe(named())
      .pipe(gulp.dest(config.devDir + '/js'));
});