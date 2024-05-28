'use strict';

var isArray = require('isarray');

var wrapValidator = require('./helpers/wrapValidator');

module.exports = function andValidator(validators) {
	if (!isArray(validators)) {
		throw new TypeError('and: 2 or more validators are required');
	}
	if (validators.length <= 1) {
		throw new RangeError('and: 2 or more validators are required');
	}

	var name = arguments.length > 1 ? arguments[1] : 'and';

	var validator = function and() {
		var args = arguments;
		var firstError = null;
		validators.some(function (validatorFn) {
			firstError = validatorFn.apply(null, args);
			return firstError != null;
		});
		return firstError == null ? null : firstError;
	};

	validator.isRequired = function andIsRequired() {
		var args = arguments;
		var firstError = null;
		validators.some(function (validatorFn) {
			firstError = validatorFn.isRequired.apply(validatorFn, args);
			return firstError != null;
		});
		return firstError == null ? null : firstError;
	};

	return wrapValidator(validator, name, validators);
};
