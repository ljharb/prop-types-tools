'use strict';

var arrayOf = require('prop-types').arrayOf;
var isArray = require('isarray');

var wrapValidator = require('./helpers/wrapValidator');

function oneOfTypeValidator(validators) {
	var validator = function oneOfType(props, propName, componentName) {
		var args = arguments;

		var propValue = props[propName];
		if (typeof propValue === 'undefined') {
			return null;
		}

		var errors = validators
			.map(function (v) { return v.apply(null, args); })
			.filter(Boolean);

		if (errors.length < validators.length) {
			return null;
		}
		return new TypeError('`' + componentName + '`: invalid value supplied to `' + propName + '`.');
	};

	validator.isRequired = function oneOfTypeRequired(props, propName, componentName) {
		var args = arguments;

		var propValue = props[propName];
		if (typeof propValue === 'undefined') {
			return new TypeError('`' + componentName + '`: missing value for required `' + propName + '`.');
		}

		var errors = validators
			.map(function (v) { return v.apply(null, args); })
			.filter(Boolean);

		if (errors.length === validators.length) {
			return new TypeError('`' + componentName + '`: invalid value ' + errors + ' supplied to required `' + propName + '`.');
		}
		return null;
	};

	return wrapValidator(validator, 'oneOfType', validators);
}

module.exports = function or(validators) {
	var name = arguments.length > 1 ? arguments[1] : 'or';

	if (!isArray(validators)) {
		throw new TypeError('or: 2 or more validators are required');
	}
	if (validators.length <= 1) {
		throw new RangeError('or: 2 or more validators are required');
	}

	var validator = oneOfTypeValidator([].concat(
		arrayOf(oneOfTypeValidator(validators)),
		validators
	));

	return wrapValidator(validator, name, validators);
};
