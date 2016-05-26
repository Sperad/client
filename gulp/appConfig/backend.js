module.exports = 
{
    /**
     * [dev description]
     * js    不需要压缩,没有dest 文件
     * image 不需要压缩,没有dest 文件
     */
    dev : {
        js : {
            vendor :[
                "/angular/angular.js",
                "/angular-ui-bootstrap/ui-bootstrap-tpls.js"
            ],
            src : [
                '/**/*.js',
            ],
        },
        image : {
            src : [
                '/image/**/*.png',
            ]
        },
        less : {
            vendor : [
                // '/bootstrap/less/bootstrap.less',
            ],
            src : [
                '/**/*.less',
            ],
            template : '/app.less'
        }
    }
};