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
	devDir : config.devDir,
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
		config.appDir
	);
});

gulp.task('dev.less', function() {
	var scrList = [config.commonDir + "/**/*.less"];
	var devLess = dev.config.less;
	//获取vendor-Less
	if(0 !== devLess.vendor.length)
		scrList = scrList.concat(scrList, config.vendorDir + devLess.vendor);
	//获取app的 src-Less
	if(0 !== devLess.src.length)
		scrList = scrList.concat(scrList, config.appDir + devLess.src);
	//inject template
	var templateLess = config.template + dev.config.less.template;
	task.devLess(
		dev.devDir,
		scrList,
		templateLess
	);
});

gulp.task('dev.img', function() {
	task.devImage(dev.config.image);
});