import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import gUtil from 'gulp-util';
import livereload from 'gulp-livereload';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';

const config = {
	paths: {
		src: './assets/js/src/field-length-alert.js',
		dist: 'field-length-alert.js',
		dest: './assets/js/compiled'
	}
};

gulp.task( 'javascript', () => {
	const b = browserify( config.paths.src, {
		debug: true
	} ).transform( babelify, {
		presets: ['es2015', ['env', {
			targets: {
				browsers: ['last 2 versions', 'safari >= 7']
			}
		} ] ]
	} );

	return b.bundle()
		.pipe( source( config.paths.src ) )
		.pipe( buffer() )
		.pipe( sourcemaps.init( {loadMaps: true} ) )
		.on( 'error', gUtil.log )
		.pipe( rename( config.paths.dist ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( config.paths.dest ) )
		.pipe( livereload() );
} );
