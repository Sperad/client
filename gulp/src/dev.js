/*dev 任务的设定*/
/**
 * 使用方法：
 * 1.创建编译环境 :  gulp dev.bulid --app <appName>  使用管理员权限
 * 1.清空编译环境 :  gulp dev.clean --app <appName>
 * 2.进行编译工作:   gulp dev 		--app <appName>
 */
var gulp = require('gulp');

var config  = require('./config');
var task 	= require('./task');

var dev = {
	name : config.appName,
	devDir : config.devDir + '/' + config.appName,
	vendorDir : config.vendorDir,
	config : config.appConfig.dev,
}

gulp.task('dev',['dev.clean'], function() {
	//less
	task.devLess(dev.config.less);
	//image
	task.devImage(dev.config.image);
	//js
	task.devJs(dev.config.js);
	//inject
});

gulp.task('dev.clean', function() {
	task.devClean(dev.devDir);
});

gulp.task('dev.bulid', function() {
	task.devBulid(
		dev.devDir,
		dev.vendorDir,
		config.commonDir + '/index.html'
	);
});

gulp.task('dev.less', function() {
	task.devLess(dev.config.less);
});

gulp.task('dev.img', function() {
	task.devImage(dev.config.image);
});