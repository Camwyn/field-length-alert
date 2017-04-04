import gulp from 'gulp';
import livereload from 'gulp-livereload';
import notify from 'gulp-notify';
import pump from 'pump';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

const config = {
	paths: {
		src: ['./assets/js/compiled/*.js'],
		dest: './assets/js/min/'
	},
	msg: 'All Gulp tasks have completed!'
};

gulp.task( 'compress', ( cb ) => {
	pump( [
		gulp.src( config.paths.src ),
		uglify(),
		rename( ( path ) => {
			path.extname = '.min.js'
		} ),
		sourcemaps.init( {
			loadMaps: true
		} ),
		sourcemaps.write( './' ),
		gulp.dest( config.paths.dest ),
		notify( {
			onLast: true,
			message: config.msg,
			templateOptions: {date: new Date()}
		} ),
		livereload()
	], cb );
} );
