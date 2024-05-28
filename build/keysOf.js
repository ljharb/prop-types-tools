'use strict';

var isPrimitive = require('./helpers/isPrimitive');
var wrapValidator = require('./helpers/wrapValidator');

module.exports = function keysOfValidator(propType) {
	if (typeof propType !== 'function') {
		throw new TypeError('argument to keysOf must be a valid PropType function');
	}
	var name = (arguments.length > 1 && arguments[1]) || 'keysOf';

	var validator = function keysOf(
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

		var firstError = null;
		Object.keys(propValue).some(function (key) {
			var propsObj = {};
			propsObj[key] = key;

			firstError = propType.apply(
				null,
				[
					propsObj,
					key,
					componentName,
					location,
					'(' + propFullName + ').' + key
				].concat(rest)
			);
			return firstError != null;
		});
		return firstError || null;
	};

	validator.isRequired = function keyedByRequired(props, propName, componentName) {
		var propValue = props[propName];

		if (propValue == null) {
			return new TypeError('`' + componentName + '`: `' + propName + '` is required, but value is `' + propValue + '`');
		}

		return validator.apply(this, arguments);
	};

	return wrapValidator(validator, name, propType);
};
