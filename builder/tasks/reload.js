/**
 * Livereload tasks
 *
 * @since 9.0.0
 */

const gulp = require('gulp');
const livereload = require('gulp-livereload');

function reload(cb) {
	livereload.reload('index.html');
	cb();
}

function startServer(cb) {
	livereload.listen();
	cb();
}

exports.task = reload;
exports.start = startServer;