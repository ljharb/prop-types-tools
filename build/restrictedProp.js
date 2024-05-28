'use strict';

var wrapValidator = require('./helpers/wrapValidator');

function customMessageWrapper(messsageFunction) {
	function restrictedProp(props, propName, componentName, location) {
		if (props[propName] == null) {
			return null;
		}

		if (messsageFunction && typeof messsageFunction === 'function') {
			return new TypeError(messsageFunction.apply(null, arguments));
		}
		return new TypeError('The ' + propName + ' ' + location + ' on ' + componentName + ' is not allowed.');
	}
	restrictedProp.isRequired = restrictedProp;
	return restrictedProp;
}

module.exports = function () {
	return wrapValidator(customMessageWrapper(arguments.length > 0 ? arguments[0] : null), 'restrictedProp');
};
