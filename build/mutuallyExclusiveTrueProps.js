'use strict';

var bool = require('prop-types').bool;
var wrapValidator = require('./helpers/wrapValidator');

module.exports = function mutuallyExclusiveTrue() {
	var exclusiveProps = Array.prototype.slice.call(arguments);

	if (exclusiveProps.length < 1) {
		throw new TypeError('at least one prop that is mutually exclusive is required');
	}
	var allStrings = exclusiveProps.every(function (x) {
		return typeof x === 'string';
	});
	if (!allStrings) {
		throw new TypeError('all exclusive true props must be strings');
	}

	var propsList = exclusiveProps.join(', or ');

	var validator = function mutuallyExclusiveTrueProps(props, _, componentName) {
		var countProps = function (count, prop) {
			return count + (props[prop] ? 1 : 0);
		};

		var exclusivePropCount = exclusiveProps.reduce(countProps, 0);
		if (exclusivePropCount > 1) {
			return new Error('A `' + componentName + '` cannot have more than one of these boolean props be true: ' + propsList);
		}
		return bool.apply(this, arguments);
	};

	validator.isRequired = function mutuallyExclusiveTruePropsRequired(props, _, componentName) {
		var countProps = function (count, prop) {
			return count + (props[prop] ? 1 : 0);
		};

		var exclusivePropCount = exclusiveProps.reduce(countProps, 0);
		if (exclusivePropCount > 1) {
			return new Error('A `' + componentName + '` cannot have more than one of these boolean props be true: ' + propsList);
		}
		return bool.isRequired.apply(bool, arguments);
	};

	return wrapValidator(validator, 'mutuallyExclusiveTrueProps: ' + propsList, exclusiveProps);
};
