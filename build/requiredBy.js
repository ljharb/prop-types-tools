'use strict';

var is = require('object-is');

var wrapValidator = require('./helpers/wrapValidator');

module.exports = function getRequiredBy(requiredByPropName, propType) {
	var defaultValue = arguments.length > 2 ? arguments[2] : null;

	function requiredBy(props, propName, componentName) {
		if (props[requiredByPropName]) {
			var propValue = props[propName];
			if (is(propValue, defaultValue) || typeof propValue === 'undefined') {
				return new TypeError('`' + componentName + '`: when `' + requiredByPropName + '` is true, prop “' + propName + '” must be present.');
			}
		}
		return propType.apply(this, arguments);
	}

	requiredBy.isRequired = function requiredByRequired(props, propName, componentName) {
		var propValue = props[propName];
		if (is(propValue, defaultValue)) {
			return new TypeError('`' + componentName + '`: prop “' + propName + '” must be present.');
		}
		return propType.isRequired.apply(propType, arguments);
	};

	return wrapValidator(
		requiredBy,
		'requiredBy “' + requiredByPropName + '”',
		[requiredByPropName, defaultValue]
	);
};
