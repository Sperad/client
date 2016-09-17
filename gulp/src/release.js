var gulp          = require('gulp');
var clean         = require('gulp-clean');
var jshint        = require('gulp-jshint');
var stylish       = require('jshint-stylish');
var uglify        = require('gulp-uglify');
var ngAnnotage    = require("gulp-ng-annotate");
var concat        = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml    = require("gulp-minify-html");
var inject        = require('gulp-inject');
var less          = require('gulp-less');
var autoprefixer  = require('gulp-autoprefixer');
var rev           = require("gulp-rev");
var revReplace    = require("gulp-rev-replace");
var processhtml   = require('gulp-processhtml');
var replace       = require('gulp-replace-task');
var streamqueue   = require('streamqueue');
var util          = require('gulp-util');
var image         = require('gulp-image');
var config = require('./config');
gulp.task('release.clean', function() {
    return gulp.src([
        config.getAppDistDir(),
        '!' + config.getAppDistDir() + '/.htaccess'
    ]).pipe(clean({force: true}));
});
// 构建项目源码
gulp.task('release.script', function() {
    var sq = streamqueue({objectMode:true});
    var scripts = config.getAppScripts().src;
    if(config.getAppScripts().otherapps) {
        for(var i in config.getAppScripts().otherapps.src){
            scripts.push(config.getAppScripts().otherapps.src[i]);
        }
    }
    // 源码
    sq.queue(
        gulp.src(scripts)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(stylish, {
                verbose: true
            }))
            .pipe(ngAnnotage({
                add: true
            }))
    );
    // 模板
    var templates = config.getAppTemplates();
    for(i in templates) {
        var template = templates[i];
        sq.queue(
            gulp.src(template.src)
                .pipe(minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                }))
                .pipe(templateCache('template.js', {
                    module: 'app',
                    root: template.root
                }))
        );
    }
    // sq.queue(
    //     gulp.src(config.getAppSrcDir() + '/script/local.config.js.dist')
    //         .pipe(replace(config.getAppConfig().configReplace.release))
    // );
    return sq
        .done()
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.getAppDistDir() + '/js'));
});
gulp.task('release.config', function() {
    return gulp.src(config.getAppSrcDir() + '/script/local.config.js.dist')
        .pipe(replace(config.getAppConfig().configReplace.release))
        .pipe(concat('config.js.dist'))
        .pipe(gulp.dest(config.getAppDistDir() + '/js'));
});
gulp.task('release.copy', function() {
    var sq = streamqueue({objectMode:true});
    var files = config.getCopyFiles();
    for(i in files) {
        var file = files[i];
        sq.queue(
            gulp.src(file.src, {base: file.base})
                .pipe(gulp.dest(config.getAppDistDir()))
        );
    }
    return sq.done();
})
gulp.task('release.less', function() {
    return gulp.src(config.getLess().index)
        .pipe(inject(gulp.src(config.getLess().vendor, {read: false}), {name:'vendor', relative: true}))
        .pipe(inject(gulp.src(config.getLess().src, {read: false}), {name:'app', relative: true}))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.getAppDistDir() + '/css'));
})
gulp.task('release.image', function(){
    return gulp.src(config.getImage().src)
        .pipe(image())
        .pipe(gulp.dest(config.getAppDistDir() + '/image'));
});
// 构建依赖源码
gulp.task('release.vendor.script', function() {
    return gulp.src(config.getVendorJs().src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish, {
            verbose: true
        }))
        .pipe(concat(config.getVendorJs().dist))
        .pipe(ngAnnotage({
            add: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.getAppDistDir() + '/js'));
});
gulp.task('release.vendor.css', function() {
    return gulp.src(config.getVendorCss().src)
        .pipe(concat(config.getVendorCss().dist))
        .pipe(gulp.dest(config.getAppDistDir() + '/css'));
})
gulp.task('release.processhtml', function() {
    var now = new Date();
    var indexReplace = config.getIndexReplace().release;
    indexReplace.patterns.push({match:'ver', replacement:now.getTime()});
    return gulp.src(config.getIndex().src)
        .pipe(processhtml())
        .pipe(concat(config.getIndex().dist))
        .pipe(replace(indexReplace))
        .pipe(gulp.dest(config.getAppDistDir()));
});
gulp.task('release', ['release.clean'], function() {
    // gulp.start('release.revreplace')
    gulp.start('release.vendor.css')
        .start('release.less')
        .start('release.vendor.script')
        .start('release.script')
        .start('release.config')
        .start('release.processhtml')
        .start('release.image')
        .start('release.copy');
});