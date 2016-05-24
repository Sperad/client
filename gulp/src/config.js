/*gulp 的配置：目录结构布局*/
var gulp = require('gulp');
var minimist = require('minimist');

var knownOptions = {
  string: 'app',
  default: { env: process.env.NODE_ENV || 'app' }
};

var options = minimist(process.argv.slice(2), knownOptions);

var config = {
	appName : options.app,
	vendorDir : './node_modules',
	devDir : './dev',
	appDir : './app',
	appConfig : require('../appConfig/' + options.app + '.js'),
}

module.exports = config;