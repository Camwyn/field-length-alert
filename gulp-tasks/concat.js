import concat from 'gulp-concat';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import pump from 'pump';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const config = {
	paths: {
		src: [
			'./assets/js/src/**/*.js'
		],
		dest: './assets/js/compiled/',
		dist: 'field-length-alert.js'
	}
};

gulp.task( 'concat', ( cb ) => {
	pump( [
		gulp.src( config.paths.src ),
		concat( config.paths.dist ),
		rename( config.paths.dist ),
		sourcemaps.init( {
			loadMaps: true
		} ),
		sourcemaps.write( './' ),
		gulp.dest( config.paths.dest ),
		livereload()
	], cb );
} );
