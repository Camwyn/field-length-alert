import cssnext from 'postcss-cssnext';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import postcss from 'gulp-postcss';
import pump from 'pump';
import sourcemaps from 'gulp-sourcemaps';

const config = {
	paths: {
		src: './assets/css/compiled/**/*.css',
		dest: './assets/css/compiled'
	},
	processors: [
		cssnext( {
			features: {
				autoprefixer: {
					browsers: [
						'last 2 versions',
						'iOS > 7'
					]
				},
				pixrem: false
			}
		} ),
	]
};

gulp.task( 'postcss', ( cb ) => {
	pump( [
		gulp.src( config.paths.src ),
		postcss( config.processors ),
		sourcemaps.init( {
			loadMaps: true
		} ),
		sourcemaps.write( './' ),
		gulp.dest( config.paths.dest ),
		livereload()
	], cb );
} );
