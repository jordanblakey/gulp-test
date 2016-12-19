var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');


//gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
gulp.task('useref', function(){
	return gulp.src('app/*.html')
	.pipe(useref())
	// Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.css', cssnano()))
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
	console.log('Running scripts(gulp-sass,)...');
	return gulp.src('app/scss/**/*.scss') // Get source files with gulp.src
		.pipe(sass()) // Sends it through a gulp-sass
		.pipe(gulp.dest('dist/css')) // Outputs the file in the destination folder
		.pipe(browserSync.reload({stream:true}));
	// Stuff here
});


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	});
});

gulp.task('watch', ['browserSync','sass','useref'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	// other watchers
});
