'use strict';

module.exports = function isPrimitive(x) {
	return !x || (typeof x !== 'object' && typeof x !== 'function');
};
