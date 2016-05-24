module.exports = 
{
    dev : {
        js : {
            vendor :[
                "/angular/angular.js",
                "/angular-ui-bootstrap/ui-bootstrap-tpls.js"
            ],
            src : [
                '/less/**/*.less',
            ],
            dist : '/app.less',
        },
        image : {
            src : [
                '/less/**/*.less',
            ]
        },
        less : {
            vendor : [
                '/bootstrap/less/bootstrap.less',
            ],
            src : [
                '/less/**/*.less',
            ],
            dist : '/app.less',
        }
    }
};