/* --------------------------------------
    config
-------------------------------------- */
var srcFile = 'jquery.kiss-slider.js';
var minFile = 'jquery.kiss-slider.min.js';

/* --------------------------------------
    end config
-------------------------------------- */
var gulp =           require('gulp');
var jshint =         require('gulp-jshint');
var uglify =         require('gulp-uglify');
var plumber =        require('gulp-plumber');
var rename =         require('gulp-rename');

/* --------------------------------------
    JS
-------------------------------------- */
gulp.task('js', function() {
	return gulp.src(srcFile)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify({
			preserveComments: 'license'
		}))
		.pipe(rename(minFile))
		.pipe(gulp.dest('./'));
});

/* --------------------------------------
    Watch
-------------------------------------- */
gulp.task('watch', function() {
	gulp.watch(srcFile, ['js']);
});

/* --------------------------------------
    default task
-------------------------------------- */
gulp.task('default', ['js', 'watch']);
