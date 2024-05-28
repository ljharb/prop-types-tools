'use strict';

var is = require('object-is');
var wrapValidator = require('./helpers/wrapValidator');

function isNonNegative(x) {
	return typeof x === 'number' && isFinite(x) && x >= 0 && !is(x, -0);
}

function nonNegativeNumber(props, propName, componentName) {
	var value = props[propName];

	if (value == null || isNonNegative(value)) {
		return null;
	}

	return new RangeError('`' + propName + '` in `' + componentName + '` must be a non-negative number');
}

function requiredNonNegativeNumber(props, propName, componentName) {
	var value = props[propName];

	if (isNonNegative(value)) {
		return null;
	}

	return new RangeError('`' + propName + '` in `' + componentName + '` must be a non-negative number');
}

nonNegativeNumber.isRequired = requiredNonNegativeNumber;

module.exports = function () {
	return wrapValidator(nonNegativeNumber, 'nonNegativeNumber');
};
