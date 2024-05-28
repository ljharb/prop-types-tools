'use strict';

var isPrimitive = require('./helpers/isPrimitive');
var wrapValidator = require('./helpers/wrapValidator');

// code adapted from https://github.com/facebook/react/blob/14156e56b9cf18ac86963185c5af4abddf3ff811/src/isomorphic/classic/types/ReactPropTypes.js#L307-L340

module.exports = function valuesOfValidator(propType) {
	if (typeof propType !== 'function') {
		throw new TypeError('objectOf: propType must be a function');
	}

	var validator = function valuesOf(
		props,
		propName,
		componentName,
		location,
		propFullName
	) {
		var propValue = props[propName];
		if (propValue == null || isPrimitive(propValue)) {
			return null;
		}

		var rest = Array.prototype.slice.call(arguments, 5);

		var firstError;
		Object.keys(propValue).some(function (key) {
			firstError = propType.apply(
				null,
				[
					propValue,
					key,
					componentName,
					location,
					propFullName + '.' + key
				].concat(rest)
			);
			return firstError;
		});
		return firstError || null;
	};

	validator.isRequired = function valuesOfRequired(props, propName, componentName) {
		var propValue = props[propName];
		if (propValue == null) {
			return new TypeError('`' + componentName + '`: `' + propName + '` is required.');
		}
		return validator.apply(this, arguments);
	};

	return wrapValidator(validator, 'valuesOf', propType);
};
