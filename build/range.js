'use strict';

var and = require('./and');
var between = require('./between');
var integer = require('./integer');
var isInteger = require('./helpers/isInteger');
var wrapValidator = require('./helpers/wrapValidator');

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ Math.pow(2, 53) - 1;

function isValidLength(x) {
	return isInteger(x) && Math.abs(x) < MAX_SAFE_INTEGER;
}

module.exports = function range(min, max) {
	if (!isValidLength(min) || !isValidLength(max)) {
		throw new RangeError('"range" requires two integers: ' + min + ' and ' + max + ' given');
	}
	if (min === max) {
		throw new RangeError('min and max must not be the same');
	}
	return wrapValidator(and([integer(), between({ gte: min, lt: max })], 'range'), 'range', { min: min, max: max });
};
