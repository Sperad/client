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
};

gulp.task('dev.bulid', function() {
	task.devBulid(
		dev.devDir,
		config.vendorDir,
		config.srcDir
	);
});

gulp.task('dev',['dev.clean'], function() {
	gulp.start('dev.image') //image
	gulp.start('dev.less')  //less
	//inject templateIndex
	var templateIndex = config.template + dev.config.template;
	var script = dev.config.script;
	for(var index in script.vendor){
		script.vendor[index] =  config.vendorDir + script.vendor[index];
	}
	for(var index in script.src){
		script.src[index] = config.srcDir + script.src[index];
	}
	task.dev(
		config.srcDir,
		dev.devDir,
		script,
		templateIndex,
		dev.config.replace
	);
});

gulp.task('dev.clean', function() {
	task.devClean(dev.devDir);
});

gulp.task('dev.less', function() {
	var devLess = dev.config.less;
	var scrList = [];
	//获取vendor-Less
	if('vendor' in devLess && devLess.vendor.length !== 0){
		scrList = scrList.concat(config.vendorDir + devLess.vendor);
	}
	//获取common-less
	if('common' in devLess && devLess.common.length !== 0){
		scrList = scrList.concat(config.commonDir + devLess.common );
	}
	//获取app的 src-Less
	if('src' in devLess && devLess.src.length !== 0){
		scrList = scrList.concat(config.srcDir    + devLess.src);
	}
	//inject template
	var templateLess = config.template + dev.config.less.template;
	task.devLess(
		dev.devDir,
		scrList,
		templateLess
	);
});

gulp.task('dev.image', function() {
	var devImage = dev.config.image;
	var scrList = [];
	//获取common-image
	if('common' in devImage)
		scrList = scrList.concat(config.commonDir + devImage.common );
	//获取app的 src-Image
	if('src' in devImage)
		scrList = scrList.concat(config.srcDir    + devImage.src);
	task.devImage(
		dev.devDir,
		scrList
	);
});

gulp.task('dev.script', function() {
	//注入
	task.devScript();
});