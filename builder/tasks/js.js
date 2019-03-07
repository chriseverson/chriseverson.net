/**
 * Javascript task
 *
 * @since 9.0.0
 */

const gulp = require('gulp');
const webpack = require('webpack-stream');
const compiler = require('webpack');
const livereload = require('gulp-livereload');
const named = require('vinyl-named');

const config = {
	mode: process.env.NODE_ENV || 'development',
	module: {
	    rules: [
	        {
	            test: /\.jsx$|\.es6$|\.js$/,
	            exclude: /node_modules/,
	            use: {
	                loader: 'babel-loader',
	                options: {
	                    presets: ['@babel/preset-env'],
	                },
	            },
	        },
	    ],
	},
};

function compile(cb) {
	const stream = gulp.src('./assets/src/js/main.js')
		.pipe(named())
		.pipe(webpack(config, compiler))
		.pipe(gulp.dest('./assets/dist/js'));

	if(process.env.NODE_ENV == 'development') stream.pipe(livereload());

	return stream;
}

module.exports = compile;