var gulp         = require('gulp');
var fs       	 = require('fs');
var symlink 	 = require('gulp-sym');
var clean        = require('gulp-clean');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var inject       = require('gulp-inject');
var rename       = require('gulp-rename');
var image        = require('gulp-image');
var concat       = require('gulp-concat');
var replace      = require('gulp-replace-task');

var sys = {
	/*app*/
	appBulid : appBulid,


	/*dev*/
	dev 	  : dev,
	devBulid  : devBulid,
	devClean  : devClean,
	devLess   : devLess,
	devImage  : devImage,
	devScript : devScript
};

module.exports = sys;

var devDirList = {
	css : '/css',
	image : '/image',
	nodeModules : '/node_modules',
	script : '/script',
};
var devIndexRoot = 'index.html';
var appDirList = {
	script : '/script',
	image  : '/image',
	less   : '/less'
};
/**
 * 创建项目文件：
 * 	lessDir  : './app/<appName>/less'
 * 	imageDir : './app/<appName>/image'
 * 	jsDir    : './app/<appName>/js'
 */
function appBulid(appPath){
	if(!fs.existsSync(appPath)) {
		fs.mkdirSync(appPath);
		for(dirName in appDirList){
			fs.mkdirSync(appPath + appDirList[dirName]);
		}
	}else{
		console.dir('开发目录 '+ appPath +'已经存在');
	}
}

/**
 * 创建项目目录：
 * 	lessDir  	 : './dev/<appName>/less'
 * 	imageDir 	 : './dev/<appName>/image'
 * 	jsDir    	 : './dev/<appName>/script'-----------------软连接
 *  node_modules : './dev/<appName>/node_modules' ------软连接
 */
function devBulid(devPath, vendorDir, appDir)
{
	if(!fs.existsSync(devPath)) {
		fs.mkdirSync(devPath);
		gulp.src(vendorDir).pipe(symlink(devPath + devDirList.nodeModules, {force : true}));
		gulp.src(appDir + appDirList.script ).pipe(symlink(devPath + devDirList.script, {force : true}));
		fs.mkdirSync(devPath + devDirList.css);
		fs.mkdirSync(devPath + devDirList.image);
	}else{
		console.dir('编译目录 《'+ devPath +'》已经存在');
	}
}

/**
 * './dev/<appName>'整个目录将会被清除
 */
function devClean(devDir)
{
    gulp.src([
    	devDir + devDirList.css,
    	devDir + devDirList.image
    ]).pipe(clean({force : true}));
}

/**
 * 将js\css 注入到首页中
 */
function dev(appDir, devPath, script, templateIndex, replaceConfig){
	var css = gulp.src(devPath + devDirList.css + "**/*.css", {read : false})
	var vendorJs = gulp.src(script.vendor, {read : false});
	var srcJs = gulp.src(script.src, {read : false});
	return  gulp.src(templateIndex)
	    		.pipe(inject(css, {ignorePath: devPath.substr(1) , name:'vendorCss'}))

	    		.pipe(inject(vendorJs, {name:'vendorJs'}))
	    		.pipe(inject(srcJs, {ignorePath: appDir.substr(1), name:'appJs'}))

	    		.pipe(replace(replaceConfig))
	    		.pipe(concat(devIndexRoot))
	    		.pipe(gulp.dest(devPath))
	    	;
}

/**
 * 编译css 文件: 包含三部分[scrDir]
 * ./common/less
 * appConfig 配置文件中的  less.vender 和 less.src
 */
function devLess(devPath, srcList, templateLess)
{
	return gulp.src(templateLess)
			.pipe(
				inject(gulp.src(srcList, {read: false}),{name:'srcLess', relative: true})
			)
			.pipe(less())
			.pipe(autoprefixer())
	        .pipe(rename({ suffix: '.min' }))
	        .pipe(
	        	gulp.dest(devPath + devDirList.css) 
	        );
}

function devImage(devPath, srcList)
{
	return gulp.src(srcList)
	    	.pipe(image())
	    	.pipe(
	    		gulp.dest(devPath + devDirList.image)
	    	);
}

function devScript(js){

}

