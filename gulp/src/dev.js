/*dev 任务的设定*/
/**
 * 使用方法：
 * 1.编译dev  :  gulp dev --app <appName>  只运行一次
 * 2.编译dev  :  gulp dev --app <appName> 
 */
var gulp = require('gulp');

var config  = require('./config');
var task 	= require('./task');

var app = {
	name : config.appName,
	devDir : config.devDir + '/' + config.appName,
	appDir : config.appDir + '/' + config.appName,
	config : config.appConfig.dev,
}

gulp.task('dev',['dev.clean'], function() {
	//less
	task.devLess(app.config.less);
	//image
	task.devImage(app.config.image);
	//js
	task.devJs(app.config.js);
	//inject
});

gulp.task('dev.clean', function() {
	task.devClean(app.devDir);
});

gulp.task('dev.bulid', function() {
	task.devBulid(app.config);
});

gulp.task('dev.less', function() {
	task.devLess(app.config.less);
});

gulp.task('dev.img', function() {
	task.devImage(app.config.image);
});