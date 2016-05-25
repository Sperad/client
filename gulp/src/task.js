var gulp         = require('gulp');
var inject       = require('gulp-inject');
var concat       = require('gulp-concat');
var less         = require('gulp-less');
var rename       = require('gulp-rename');
var fs       	 = require('fs');
var symlink 	 = require('gulp-sym');
var clean        = require('gulp-clean');

var sys = {
	/*app*/
	appBulid : appBulid,


	/*dev*/
	devBulid : devBulid,
	devClean : devClean,
	devLess : devLess,
	devImage : devImage,
	devJs : devJs
};

var dirList = ['less','image', 'script'];

module.exports = sys;

/**
 * 创建项目文件：
 * 	lessDir  : './app/<appName>/less'
 * 	imageDir : './app/<appName>/image'
 * 	jsDir    : './app/<appName>/js'
 */
function appBulid(appPath){
	if(!fs.existsSync(appPath)) {
		fs.mkdirSync(appPath);
		['less','image', 'script'].forEach(function(dirName){
			fs.mkdirSync(appPath + '/' + dirName);
		});
	}
}

/**
 * 创建项目目录：
 * 	lessDir  	 : './dev/<appName>/less'
 * 	imageDir 	 : './dev/<appName>/image'
 * 	jsDir    	 : './dev/<appName>/js'
 *  node_modules : './dev/<appName>/node_modules' ------软连接
 */
function devBulid(devPath, vendorDir, indexHtml)
{
	if(!fs.existsSync(devPath)) {
		fs.mkdirSync(devPath);
		gulp.src(vendorDir).pipe(symlink(devPath + '/node_modules', {force : true}));
	}
	dirList.forEach(function(dirName){
		fs.mkdirSync(devPath + '/' + dirName);
	});
}

/**
 * 
 */
function devClean(devDir)
{
    gulp.src(
    	[devDir + '/' + dirList[0], 
    	 devDir + '/' + dirList[1], 
    	 devDir + '/' + dirList[2], 
    	 devDir + '/.htaccess',
		 '!' + devDir + '/.gitignore',
    	])
    .pipe(clean({force : true}));
}

function devLess(scrDir, disDir){

}
function devImage(image){

}
function devJs(js){

}

