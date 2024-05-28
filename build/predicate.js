'use strict';

var wrapValidator = require('./helpers/wrapValidator');

module.exports = function predicate(fn) {
	var message = arguments.length > 1 ? arguments[1] : '';

	if (typeof fn !== 'function') {
		throw new TypeError('`fn` must be a function');
	}
	if (typeof message !== 'string') {
		throw new TypeError('`message`, if provided, must be a string');
	}

	function requiredValidator(props, propName, componentName) {
		var result = fn(props[propName]);
		if (result) {
			return null;
		}
		return new TypeError('`' + componentName + '` requires that `' + propName + '` pass a predicate function' + (message ? ': ' + message : '') + '.');
	}

	function validator(props, propName) {
		if (props[propName] == null) {
			return null;
		}
		return requiredValidator.apply(this, arguments);
	}
	validator.isRequired = requiredValidator;

	return wrapValidator(validator, 'predicate', fn);
};
