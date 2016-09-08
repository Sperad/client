module.exports = 
{
    /**
     * dir: 是指app目录下的目录名称,
     * ex: /app/demo/script/
     */
    dev : {
        webpack : {
            // entry : { index : 'index.js' },
        },
        injectFile : 'index.html',
        template : '/index.html',
        script : {
            dir : '/script', 
            vendor :[
                "/vue/dist/vue.js",
                "/vue-router/dist/vue-router.js",
            ],
            src : [
                '/**/*.js',
            ],
        },
        image : {
            dir : '/image',
            src : [
                '/**/*.*',
            ],
        },
        css : {
            dir : '/less',
            vendor : [
                // '/bootstrap/less/bootstrap.less',
            ],
            src : [
                '/**/*.less',
            ],
            template : '/app.less'
        },
        /**
         *更多配置方式，参考https://www.npmjs.com/package/gulp-replace-task
         */
        replace : {
            patterns: [
               {match: 'webRoot', replacement: '你好'},
           ]
        }
    }
};
