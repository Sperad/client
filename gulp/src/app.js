/*针对app 目录的 项目创建 / 删除<慎用> / 更新*/
/*app.creat 项目目录的管理*/
/**
 * 使用方法：
 * 1.创建app  :  gulp app.bulid --app <appName>
 */
var gulp = require('gulp');

var config  = require('./config');
var task 	= require('./task');

var app = {
	name : config.appName,
	appDir : config.appDir + '/' + config.appName,
}
gulp.task('app.bulid', function() {
	task.appBulid(app.appDir);
});