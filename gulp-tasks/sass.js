import gulp from 'gulp';
import livereload from 'gulp-livereload';
import pump from 'pump';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

const config = {
	paths: {
		src: ['./assets/css/scss/*.scss'],
		dest: './assets/css/compiled'
	},
	opts: {
		outputStyle: 'expanded',
		require: 'sass-globbing',
		sourceMap: true,
		precision: 9
	}
};

gulp.task( 'sass', function( cb ) {
	pump( [
		gulp.src( config.paths.src ),
		sass( config.opts),
		sourcemaps.init( {loadMaps: true} ),
		sourcemaps.write( './' ),
		gulp.dest( config.paths.dest ),
		livereload()
	], cb );
} );
