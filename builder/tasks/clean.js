/**
 * Clean the build directory
 *
 * @since 9.0.0
 */

const del = require('del');

function clean(cb) {
	del('./assets/dist', {force: true}).then(cb());
}

module.exports = clean;