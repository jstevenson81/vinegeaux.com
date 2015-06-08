// Include Gulp
var gulp = require('gulp');
// Include plugins
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'del', 'yargs', 'vinyl-paths'],
    replaceString: /\bgulp[\-.]/
});
// config
var config = require('./gulp.config')();

gulp.task('test', function () {
    log($.if);
    log('Cleaning files that look like: ' + config.cssDest + config.cssFilter + ' and ' + config.jsDest + config.jsFilter + ' and ' + config.fontsDest + config.fontsFilterGlob);
});

gulp.task('bower', function () {
    log('Updating bower components');
    $.bower();
});

gulp.task('clean', ['bower'], function () {
    log('Cleaning files that look like: ' + config.cssDest + config.cssFilter + ' and ' + config.jsDest + config.jsFilter + ' and ' + config.fontsDest + config.fontsFilterGlob);
    $.del.sync([config.cssDest + config.cssFilter, config.jsDest + config.jsFilter, config.fontsDest + config.allFiles]);
});

gulp.task('copy-css', ['clean'], function () {
    log('Copying css files');
    gulp
        .src($.mainBowerFiles())
        .pipe($.filter([config.cssFilter, '!*bootstrap.css']))
        .pipe(gulp.dest(config.cssDest))
        .pipe($.if($.yargs.argv.verbose, $.print()));
});

gulp.task('copy-fonts', ['copy-css'], function () {
    gulp
        .src($.mainBowerFiles())
        .pipe($.filter(config.fontsFilterArray))
        .pipe(gulp.dest(config.fontsDest))
        .pipe($.if($.yargs.argv.verbose, $.print()));
});

gulp.task('compile-bootswatch-less', ['copy-fonts'], function () {
    log('Compiling bootstrap css theme from ' + config.bootstrapThemeSrc + ' and copying to ' + config.cssDest);
    gulp
        .src(config.bootstrapThemeSrc + config.lessFilter)
        .pipe($.less())
        .pipe($.autoprefixer({ browsers: ['last 2 versions', '> 5%', 'IE 8'] }))
        .pipe(gulp.dest(config.cssDest))
        .pipe($.if($.yargs.argv.verbose, $.print()));
});



gulp.task('copy-scripts', ['compile-bootswatch-less'], function () {
    gulp
        .src($.mainBowerFiles().concat('bower_components/modernizr/modernizr.js'))
        .pipe($.filter(config.jsFilter))
        .pipe(gulp.dest(config.jsDest))
        .pipe($.if($.yargs.argv.verbose, $.print()));
});

// deafult task
gulp.task('default', ['copy-scripts']);

// utils
gulp.task('cleanTSJS', function () {
    gulp
        .src(config.appDest + '**/*.js')
        .pipe($.vinylPaths($.del))
        .pipe($.print());
});

gulp.task('watchIrisLess', function () {
    gulp
        .src(config.bootstrapThemeSrc + 'iris.less')
        .pipe($.watch(config.bootstrapThemeSrc + 'iris.less'))
        .pipe($.less())
        .pipe($.autoprefixer({ browsers: ['last 2 versions', '> 5%', 'IE 8'] }))
        .pipe(gulp.dest(config.cssDest));
});

///////////////////
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}