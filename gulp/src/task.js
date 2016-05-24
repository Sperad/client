var gulp         = require('gulp');
var inject       = require('gulp-inject');
var concat       = require('gulp-concat');
var less         = require('gulp-less');
var rename       = require('gulp-rename');

var sys = {
	devBulid : devBulid,
	devClean : devClean,
	devLess : devLess,
	devImage : devImage,
	devJs : devJs
};

module.exports = sys;

/**
 * 创建项目文件：
 * 	config   : './gulp/appConfig/<appName>.js'
 * 	lessDir  : './app/<appName>/less'
 * 	imageDir : './app/<appName>/image'
 * 	jsDir    : './app/<appName>/js'
 */
function devBulid(appConfigPath)
{
	var tpl = require('./template');
	//创建配置文件
	// gulp.scr(tpl).pipe(gulp.dest(appConfigPath));
}

/**
 * 
 */
function devClean(devDir)
{

}


function devLess(scrDir, disDir){

}
function devImage(image){

}
function devJs(js){

}

