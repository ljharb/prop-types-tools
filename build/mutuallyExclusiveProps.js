'use strict';

var assign = require('object.assign');

var wrapValidator = require('./helpers/wrapValidator');

module.exports = function mutuallyExclusiveOfType(propType) {
	if (typeof propType !== 'function') {
		throw new TypeError('a propType is required');
	}

	var exclusiveProps = Array.prototype.slice.call(arguments, 1);

	if (exclusiveProps.length < 1) {
		throw new TypeError('at least one prop that is mutually exclusive with this propType is required');
	}

	var propList = exclusiveProps.join(', or ');

	var map = exclusiveProps.reduce(function (acc, prop) {
		var obj = {};
		obj[prop] = true;
		return assign({}, acc, obj);
	}, {});
	var countProps = function (count, prop) {
		return count + (map[prop] ? 1 : 0);
	};

	var validator = function mutuallyExclusiveProps(props, _, componentName) {
		var exclusivePropCount = Object.keys(props)
			.filter(function (prop) { return props[prop] != null; })
			.reduce(countProps, 0);
		if (exclusivePropCount > 1) {
			return new Error('A `' + componentName + '` cannot have more than one of these props: ' + propList);
		}
		return propType.apply(this, arguments);
	};

	validator.isRequired = function mutuallyExclusivePropsRequired(props, propName, componentName) {
		var exclusivePropCount = Object.keys(props)
			.filter(function (prop) { return prop === propName || props[prop] != null; })
			.reduce(countProps, 0);
		if (exclusivePropCount > 1) {
			return new Error('A `' + componentName + '` cannot have more than one of these props: ' + propList);
		}
		return propType.apply(this, arguments);
	};

	return wrapValidator(validator, 'mutuallyExclusiveProps:' + propList, exclusiveProps);
};
