'use strict';

var string = require('prop-types').string;
var wrapValidator = require('./helpers/wrapValidator');

module.exports = function stringStartsWithValidator(start) {
	if (typeof start !== 'string' || start.length === 0) {
		throw new TypeError('a non-empty string is required');
	}

	var validator = function stringStartsWith(props, propName, componentName) {
		var propValue = props[propName];

		if (propValue == null) {
			return null;
		}

		var stringError = string.apply(this, arguments);
		if (stringError) {
			return stringError;
		}

		if (!propValue.startsWith(start) || propValue.length <= start.length) {
			return new TypeError('`' + componentName + '`: `' + propName + '` does not start with "' + start + '"');
		}
		return null;
	};

	validator.isRequired = function requiredStringStartsWith() {
		var stringError = string.isRequired.apply(string, arguments);
		if (stringError) {
			return stringError;
		}
		return validator.apply(null, arguments);
	};

	return wrapValidator(validator, 'stringStartsWith: ' + start);
};
