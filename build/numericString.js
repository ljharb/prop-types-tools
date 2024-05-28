'use strict';

var string = require('prop-types').string;
var wrapValidator = require('./helpers/wrapValidator');

var validNumericChars = /^[-+]?(?:[1-9][0-9]*(?:\.[0-9]+)?|0|0\.[0-9]+)$/;

var validator = function numericString(props, propName, componentName) {
	if (props[propName] == null) {
		return null;
	}

	var stringError = string.apply(this, arguments);
	if (stringError) {
		return stringError;
	}

	var value = props[propName];

	var passesRegex = validNumericChars.test(value);
	if (passesRegex) {
		return null;
	}

	/* eslint operator-linebreak: 0, function-paren-newline: 0 */
	return new TypeError(
		'`' + componentName + '`: prop "' + propName + '" (value "' + value + '") must be a numeric string:\n'
    + '    - starting with an optional + or -\n'
    + '    - that does not have a leading zero\n'
    + '    - with an optional decimal part (that contains only one decimal point, if present)\n'
    + '    - that otherwise only contains digits (0-9)\n'
    + '    - not +-NaN, or +-Infinity\n');
};

validator.isRequired = function numericStringRequired(props, propName, componentName) {
	if (props[propName] == null) {
		return new TypeError('`' + componentName + '`: `' + propName + '` is required');
	}
	return validator.apply(this, arguments);
};

module.exports = function () {
	return wrapValidator(validator, 'numericString');
};
