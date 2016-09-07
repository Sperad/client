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
	devBulid  : devBulid,
	devClean  : devClean,
	devCss    : devCss,
	devImage  : devImage,
	devInjectToHtml : devInjectToHtml,
};

module.exports = sys;
var nodeModules = '/node_modules';
var devIndexRoot = 'index.html';

/**
 * 创建项目文件：
 * 	lessDir  : './app/<appName>/less'
 * 	imageDir : './app/<appName>/image'
 * 	jsDir    : './app/<appName>/js'
 */
function appBulid(appPath){
	if(!fs.existsSync(appPath)) {
		fs.mkdirSync(appPath);
		for(dirName in defaultDirs){
			fs.mkdirSync(appPath + defaultDirs[dirName]);
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
 *  如果配置webpack选项则创建目录
 */
function devBulid(dev, vendorDir, srcDir)
{
	devConfig = dev.config;
	if(!fs.existsSync(dev.dir)) {
		fs.mkdirSync(dev.dir); //创建目录
		if(devConfig.hasOwnProperty('webpack')){
			fs.mkdirSync(dev.dir + devConfig.script.dir);
		}else{
			gulp.src(vendorDir).pipe(symlink(dev.dir + nodeModules, {force : true}));
			gulp.src(srcDir + devConfig.script.dir).pipe(symlink(dev.dir + devConfig.script.dir, {force : true}));
		}
		fs.mkdirSync(dev.dir + devConfig.css.dir);
		fs.mkdirSync(dev.dir + devConfig.image.dir);
	}else{
		console.dir('编译目录 《'+ devConfig +'》已经存在');
	}
}

/**
 * './dev/<appName>'整个目录将会被清除
 */
function devClean(dev)
{
	var path = [
    	dev.dir + dev.config.css.dir,
    	dev.dir + dev.config.image.dir,
    ];
    if(dev.config.hasOwnProperty('webpack')){
    	path.push(dev.dir + dev.config.script.dir);
    }
    gulp.src(path).pipe(clean({force : false}));
}

/**
 * 编译css 文件: 包含三部分[scrDir]
 * ./common/less
 * appConfig 配置文件中的  less.vender 和 less.src
 */
function devCss(dev, srcList, templateCss)
{
	gulp.src(templateCss)
		.pipe( inject(gulp.src(srcList, {read: false}),{name:'srcLess', relative: true}) )
		.pipe(less())
		.pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(
        	gulp.dest(dev.dir + dev.config.css.dir)
        );
}

function devImage(dev, srcList)
{
	gulp.src(srcList)
    	.pipe(image())
    	.pipe(
    		gulp.dest(dev.dir + dev.config.image.dir)
    	);
}

/**
 * 将js\css 注入到首页中
 */
function devInjectToHtml(srcDir, dev, script, templateIndex)
{
	var css = gulp.src(dev.dir + dev.config.css.dir + "**/*.css", {read : false});
	var vendorJs = gulp.src(script.vendor, {read : false});
	var srcJs = gulp.src(script.src, {read : false});

	gulp.src(templateIndex)
		.pipe(inject(css, {ignorePath: dev.dir.substr(1) , name:'vendorCss'}))

		.pipe(inject(vendorJs, {name:'vendorJs'}))
		.pipe(inject(srcJs, {ignorePath: srcDir.substr(1), name:'appJs'}))

		.pipe(replace(dev.config.replace))
		.pipe(concat(devIndexRoot))
		.pipe(gulp.dest(dev.dir))
	;
}

