'use strict';

var wrapValidator = require('./helpers/wrapValidator');

function explicitNull(props, propName, componentName) {
	if (props[propName] == null) {
		return null;
	}
	return new TypeError('`' + componentName + '`: prop “' + propName + '” must be null or undefined; received ' + typeof props[propName]);
}
explicitNull.isRequired = function explicitNullRequired(props, propName, componentName) {
	if (props[propName] === null) {
		return null;
	}
	return new TypeError('`' + componentName + '`: prop “' + propName + '” must be null; received ' + typeof props[propName]);
};

module.exports = function () {
	return wrapValidator(explicitNull, 'explicitNull');
};
