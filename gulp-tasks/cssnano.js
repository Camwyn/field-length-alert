import cssnano from 'cssnano';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import postcss from 'gulp-postcss';
import pump from 'pump';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const config = {
	paths: {
		src: ['./assets/css/compiled/**/*.css'],
		dest: './assets/css/min/'
	},
	processors: [
		cssnano( {
			autoprefixer: false,
			calc: {
				precision: 8
			},
			filterPlugins: false,
			pixrem: false
		} )
	]
};

gulp.task( 'cssnano', ( cb ) => {
	pump( [
		gulp.src( config.paths.src ),
		postcss( config.processors ),
		rename( ( path ) => {
			path.extname = '.min.css'
		} ),
		sourcemaps.init( {
			loadMaps: true
		} ),
		sourcemaps.write( './' ),
		gulp.dest( config.paths.dest ),
		livereload()
	], cb );
} );
