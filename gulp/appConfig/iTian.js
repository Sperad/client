module.exports = 
{
    dev : {
        template : '/itian.html',
        script : {
            vendor :[
                '/angular/angular.js',
                '/angular-ui-router/release/angular-ui-router.js',
            ],
            src : [
                '/script/**/*.js',
            ],
        },
        image : {
            src : [
                '/image/**/*.*',
            ],
        },
        less : {
            vendor : [
                '/bootstrap/less/bootstrap.less'
            ],
            common : [
                '/less/bootstrap.itian.less'
            ],
            src : [
                '/less/**/*.less',
            ],
            template : '/app.less'
        },
        replace : {
            patterns: [
               {match: 'webRoot', replacement: ''},
           ]
        }
    }
};
