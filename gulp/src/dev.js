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
	dir : config.devDir,
	config : config.appConfig.dev
}
gulp.task('dev.bulid', function() {
	task.devBulid(
		dev,
		config.vendorDir,
		config.srcDir
	);
});

gulp.task('dev.clean', function() {
	task.devClean(dev);
});

gulp.task('dev',['dev.clean'], function() {
	if(!dev.config.hasOwnProperty('webpack')){
		gulp.start('dev.css');
		gulp.start('dev.image');
	}
	gulp.start('dev.inject') //inject
});

gulp.task('dev.css', function() {
	var templateCss = config.templateDir + dev.config.css.template;
	var srcList = getCssAll();
	task.devCss(
		dev,
		srcList,
		templateCss
	);
});

gulp.task('dev.image', function() {
	var devImage = dev.config.image;
	var srcList = [];
	if(devImage.hasOwnProperty('src')){
		devImage.src.forEach(function(item){
			srcList.push(config.srcDir +  devImage.dir + item);
		});
	}
	task.devImage(
		dev,
		srcList
	);
});

gulp.task('dev.inject', function() {
	var templateIndex = config.templateDir + dev.config.template;
	var srcList = {
		css: getCssAll(),
		script: getJsAll(),
	};

	task.devInjectToHtml(
		config,
		dev,
		srcList,
		templateIndex
	);
});

function getCssAll()
{
	var devCss = dev.config.css;
	var srcList = [];
	//获取vendor-css
	if(devCss.hasOwnProperty('vendor')){
		devCss.vendor.forEach(function(item){
			srcList.push(config.srcDir +  devCss.dir + item);
		});
	}
	//获取app的 src-css
	if(devCss.hasOwnProperty('src')){
		devCss.src.forEach(function(item){
			srcList.push(config.srcDir +  devCss.dir + item);
		});
	}
	return srcList;
}

function getJsAll()
{
	var script = dev.config.script;
	var srcList = {vendor : [], src : [] };
	if(script.hasOwnProperty('vendor')){
		script.vendor.forEach(function(item){
			srcList.vendor.push(config.vendorDir + item);
		});
	}

	if(script.hasOwnProperty('src')){
		script.src.forEach(function(item){
			srcList.src.push(config.srcDir + item);
		});
	}
	return srcList;
}