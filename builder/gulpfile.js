/**
 * Build system
 */

const gulp = require('gulp');
const { clean, sass, js, images, reload } = require('./tasks/index.js');
const tasks = [clean, js, images, sass];

if(process.env.NODE_ENV == 'development') {
	gulp.watch('assets/src/sass/**/*.scss', sass);
	gulp.watch('index.html', reload.task);
	gulp.watch('assets/src/js/**/*.js', js);
	gulp.watch('assets/src/img/**/*', images);

	tasks.push(reload.start);
}

exports.clean = clean;
exports.sass = sass;
exports.js = js;
exports.images = images;
exports.reload = reload.task;
exports.default = gulp.series(...tasks);

