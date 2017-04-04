/**
 * Global Variables.
 *
 * @author Stephen Page
 */
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

requireDir( './gulp-tasks' );

gulp.task( 'css', () => {
	runSequence(
		'sass',
		'postcss',
		'cssnano'
	);
} );

gulp.task( 'js', () => {
	runSequence(
		'eslint',
		'javascript',
		'concat',
		'compress'
	);
} );
/**
 * The default gulp task.
 *
 * @author Stephen Page
 * @example
 * gulp
 */
gulp.task( 'default', () => {
	runSequence(
		'js',
		'css'
	);
} );

gulp.task( 'watch', () => {
	livereload.listen();
	gulp.watch( ['assets/js/src/**/*.js', 'assets/css/scss/**/*.scss'], ['js'] );
} );
