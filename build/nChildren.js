'use strict';

var React = require('react');
var node = require('prop-types').node;
var wrapValidator = require('./helpers/wrapValidator');

module.exports = function nChildren(n) {
	if (typeof n !== 'number' || isNaN(n) || n < 0) {
		throw new TypeError('a non-negative number is required');
	}

	var propType = arguments.length > 1 && typeof arguments[1] !== 'undefined' ? arguments[1] : node;

	var validator = function nChildrenValidator(props, propName, componentName) {
		if (propName !== 'children') {
			return new TypeError('`' + componentName + '` is using the nChildren validator on a non-children prop');
		}

		var childrenCount = React.Children.count(props.children);

		if (childrenCount !== n) {
			return new RangeError('`' + componentName + '` expects to receive ' + n + ' children, but received ' + childrenCount + ' children.');
		}
		return propType.apply(this, arguments);
	};
	validator.isRequired = validator;

	return wrapValidator(validator, 'nChildren:' + n, n);
};
