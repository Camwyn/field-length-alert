import eslint from 'gulp-eslint';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import pump from 'pump';

const config = {
	file: '.eslintrc.yml',
	src: [
		'./assets/js/src/*.js',
	]
};

gulp.task( 'eslint', ( cb ) => {
	pump( [
		gulp.src( config.src ),
		eslint( {
			configFile: config.file
		} ),
		eslint.format(),
		eslint.failAfterError()
	], cb );
} );
