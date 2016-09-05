module.exports = 
{
    /**
     * [dev description]
     * js    不需要压缩,没有dest 文件、没有common目录
     * image 不需要压缩,没有dest 文件、没有vendor目录
     */
    dev : {
        template : '/backend.html',
        script : {
            vendor :[
                "/vue/dist/vue.js",
                "/vue-router/dist/vue-router.js",
            ],
            src : [
                '/script/**/*.js',
            ],
        },
        image : {
            common :  [
                '/image/**/*.*',
            ],
            src : [
                '/image/**/*.*',
            ],
        },
        less : {
            vendor : [
                // '/bootstrap/less/bootstrap.less',
            ],
            src : [
                '/less/**/*.less',
            ],
            common :  [
                '/less/**/*.less',
            ],
            template : '/app.less'
        },
        /**
         *更多配置方式，参考https://www.npmjs.com/package/gulp-replace-task
         */
        replace : {
            patterns: [
               {match: 'webRoot', replacement: ''},
           ]
        }
    }
};
