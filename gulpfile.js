var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	tsc = require('gulp-tsc'),
	shell = require('gulp-shell'),
	seq = require('run-sequence'),
	del = require('del');

gulp.task('compile-typescript', function () {
	gulp
		.src('./src/client/**/*.ts')
		.pipe($.tsc({
			"noImplicitAny": true,
			"removeComments": false,
			"preserveConstEnums": true,
			"target": "ES5",
			"sourceMap": true,
			"module": "commonjs"
		}))
		.pipe($.rename({ dirname: '' }))
		.pipe(gulp.dest('./src/client/dist/'))
});

gulp.task('webserver', function () {
	$.connect.server({
		root: './src/client',
		livereload: true
	});
});

gulp.task('reload', function () {
	gulp
		.src('./src/client/*.html')
		.pipe($.connect.reload());
})

gulp.task('watch-reload', function () {
	gulp.watch(['./src/client/*.html'], ['reload']);
});

gulp.task('run-server', ['webserver', 'watch-reload']);