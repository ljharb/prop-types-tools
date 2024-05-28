'use strict';

var wrapValidator = require('./helpers/wrapValidator');

module.exports = function disallowedIf(propType, otherPropName, otherPropType) {
	if (typeof propType !== 'function' || typeof propType.isRequired !== 'function') {
		throw new TypeError('a propType validator is required; propType validators must also provide `.isRequired`');
	}

	if (typeof otherPropName !== 'string') {
		throw new TypeError('other prop name must be a string');
	}

	if (typeof otherPropType !== 'function') {
		throw new TypeError('other prop type validator is required');
	}

	function disallowedIfRequired(props, propName, componentName) {
		var rest = Array.prototype.slice.call(arguments, 3);

		var error = propType.isRequired.apply(propType, [
			props,
			propName,
			componentName
		].concat(rest));
		if (error) {
			return error;
		}

		if (props[otherPropName] == null) {
			return null;
		}

		var otherError = otherPropType.apply(null, [
			props,
			otherPropName,
			componentName
		].concat(rest));
		if (otherError) {
			return null;
		}
		return new Error('prop “' + propName + '” is disallowed when “' + otherPropName + '” matches the provided validator');
	}

	var validator = function disallowedIfPropType(props, propName) {
		if (props[propName] == null) {
			return null;
		}
		return disallowedIfRequired.apply(this, arguments);
	};

	validator.isRequired = disallowedIfRequired;

	return wrapValidator(validator, 'disallowedIf', {
		propType: propType, otherPropName: otherPropName, otherPropType: otherPropType
	});
};
