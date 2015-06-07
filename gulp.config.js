module.exports = function () {

    var
        dest = 'vinegeaux.web/',
        cssDest = dest + 'content/',
        jsDest = dest + 'scripts/',
        fontsDest = dest + 'fonts/',
        bootstrapThemeSrc = cssDest + 'less/';

    var config = {
        cssDest: cssDest,
        jsDest: jsDest,
        fontsDest: fontsDest,
        bootstrapThemeSrc: bootstrapThemeSrc,
        temp: './.tmp',

        cssFilter: '*.css',
        jsFilter: '*.js',
        lessFilter: '*.less',
        fontsFilterArray: ['*.eot', '*.svg', '*.ttf', '*.woff*'],
        allFiles: '*.*'
    };

    return config;
}