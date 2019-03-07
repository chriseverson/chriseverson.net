/**
 * Optimize and deploy the images
 *
 * @since 9.0.0
 */

const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');

function optimize(cb) {
	const stream = gulp.src('./assets/src/img/**/*')
		.pipe(changed('./assets/dist/img'))
		.pipe(imagemin())
		.pipe(gulp.dest('./assets/dist/img/'));

	if(process.env.NODE_ENV == 'development') stream.pipe(livereload());

	return stream;
}

module.exports = optimize;