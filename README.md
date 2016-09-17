## 目录结构:
	--app			`app项目应用`
	--dev			`本地测试环境`
	--dist			`发布版本`
	--gulp
		--appConfig `各app应用的配置文件`
		--src		`gulp 扩展命令`
		--template  `各app使用模板`
	gulpfile.js 	`gulp 入口`

## 安装
- 最后更新时间: 2016-09-07
- github
	- `git clone git@github.com:Sperad/client.git`

## 准备
- 在当前目录创建 dev、dist 两个目录夹 

## 使用
- step1: 
	- 在`./gulp/appConfig`目录下创建一个文件为`<appName>.js`

- step2
	- 执行命令 gulp app.bulid --app <appName>
	- 执行命令 gulp dev.bulid --app <appName>
	- 执行命令 gulp dev		  --app <appName>


## 命令集
- app
	- gulp app.bulid --app <appName>

- dev
	- gulp dev.bulid  --app <appName>
	- gulp dev.clean  --app <appName>
	- gulp dev.less   --app <appName>
	- gulp dev.image  --app <appName>
	- gulp dev.inject --app <appName>
	- gulp dev		  --app <appName>

- dist


## 待开发
- webpack 进行中...
- watch 任务列表