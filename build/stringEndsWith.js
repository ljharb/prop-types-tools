'use strict';

var string = require('prop-types').string;
var wrapValidator = require('./helpers/wrapValidator');

module.exports = function stringEndsWithValidator(end) {
	if (typeof end !== 'string' || end.length === 0) {
		throw new TypeError('a non-empty string is required');
	}

	var validator = function stringEndsWith(props, propName, componentName) {
		var propValue = props[propName];

		if (propValue == null) {
			return null;
		}

		var stringError = string.apply(this, arguments);
		if (stringError) {
			return stringError;
		}

		if (!propValue.endsWith(end) || propValue.length <= end.length) {
			return new TypeError('`' + componentName + '`: `' + propName + '` does not end with "' + end + '"');
		}
		return null;
	};

	validator.isRequired = function requiredStringEndsWith() {
		var stringError = string.isRequired.apply(string, arguments);
		if (stringError) {
			return stringError;
		}
		return validator.apply(null, arguments);
	};

	return wrapValidator(validator, 'stringEndsWith: ' + end);
};
