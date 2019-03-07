/**
 * Sass compilation task
 *
 * @since 9.0.0
 */

const gulp = require('gulp');
const dart = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const livereload = require('gulp-livereload');
const sassOpts = {
	includePaths: ['./node_modules'],
};

// minify on prod builds
if(process.env.NODE_ENV == 'production') sassOpts.outputStyle = 'compressed';

function sass() {
	const stream =  gulp.src('./assets/src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(dart(sassOpts).on('error', dart.logError))
		.pipe(sourcemaps.write())
		.pipe(postcss([autoprefixer()]))
		.pipe(gulp.dest('./assets/dist/css'));

	if(process.env.NODE_ENV == 'development') stream.pipe(livereload());

	return stream;
}

module.exports = sass;