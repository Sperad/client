module.exports = 
{
    dev : {
        template : '/itian.html',
        script : {
            vendor :[
                '/angular/angular.js',
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
