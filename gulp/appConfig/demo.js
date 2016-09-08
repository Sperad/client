module.exports = 
{
    dev : {
        //设置该属性，则支持webpack , 不设置则不支持,默认配置文件： /gulp/webpack.config.js
        webpack : {}, 
        template : '/webpack_index.html',  // 指定到 /gulp/template/index.html
        script : {
            dir : '/script',  // 指定目录名称: app/<demo>/script 
            vendor :[
                "/vue/dist/vue.js",
                "/vue-router/dist/vue-router.js",
            ],
            src : [
                '/**/*.js',
            ], //匹配规则
        },
        image : {
            dir : '/image', // 指定目录名称: app/<demo>/image 
            src : [
                '/**/*.*',
            ],
        },
        css : {
            dir : '/less', // 指定目录名称: app/<demo>/less 
            vendor : [
                // '/bootstrap/less/bootstrap.less',
            ],
            src : [
                '/**/*.less',
            ],
            template : '/app.less'  // 指定到 /gulp/template/app.less
        },
        
        // 更多配置方式，参考https://www.npmjs.com/package/gulp-replace-task
        replace : {
            patterns: [
               {match: 'webRoot', replacement: '你好'},
           ]
        }
    }
};
