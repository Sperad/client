##目录结构:
	--app			`app项目应用`
	--common 		`多app应用的共同文件(建议少用)`
		--image
		--less
	--dev			`本地测试环境`
	--gulp
		--appConfig `各app应用的配置文件`
		--src		`gulp 扩展命令`
		--template  `各app使用模板`
	gulpfile.js 	`gulp 入口`

##安装
* github
	* `git clone git@github.com:Sperad/client.git`

##使用
* step1: 
	* 在`./gulp/appConfig`目录下创建一个文件为`<appName>.js`
##命令集
* app
	* gulp app.bulid --app <appName>
* dev
	* gulp dev.bulid --app <appName>
	* gulp dev.clean --app <appName>
	* gulp dev.less  --app <appName>
	* gulp dev.iamge --app <appName>
	* gulp dev		 --app <appName>

##计划
	gulp 命令完成

##目标
* 项目
	* 后台管理系统
	* github 静态文件生成
	* 前端vue + express， 后端php(框架待定), 数据库Mysql