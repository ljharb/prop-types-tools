'use strict';

var and = require('./and');
var shape = require('./shape');

module.exports = function withShape(type, shapeTypes) {
	if (typeof type !== 'function') {
		throw new TypeError('type must be a valid PropType');
	}
	var shapeValidator = shape(shapeTypes);
	return and([type, shapeValidator], 'withShape');
};
