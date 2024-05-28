'use strict';

var bool = require('prop-types').bool;

var wrapValidator = require('./helpers/wrapValidator');

module.exports = function booleanSomeValidator() {
	var notAllPropsFalse = Array.prototype.slice.call(arguments);

	if (notAllPropsFalse.length < 1) {
		throw new TypeError('at least one prop (one of which must be `true`) is required');
	}
	var allStrings = notAllPropsFalse.every(function (x) {
		return typeof x === 'string';
	});
	if (!allStrings) {
		throw new TypeError('all booleanSome props must be strings');
	}

	var propsList = notAllPropsFalse.join(', or ');

	var validator = function booleanSome(props, propName, componentName) {
		var countFalse = function (count, prop) {
			return count + (props[prop] === false ? 1 : 0);
		};

		var falsePropCount = notAllPropsFalse.reduce(countFalse, 0);
		if (falsePropCount === notAllPropsFalse.length) {
			return new Error('A ' + componentName + ' must have at least one of these boolean props be `true`: ' + propsList);
		}
		return bool.apply(null, arguments);
	};

	validator.isRequired = function booleanSomeRequired(props, propName, componentName) {
		var countFalse = function (count, prop) {
			return count + (props[prop] === false ? 1 : 0);
		};

		var falsePropCount = notAllPropsFalse.reduce(countFalse, 0);
		if (falsePropCount === notAllPropsFalse.length) {
			return new Error('A ' + componentName + ' must have at least one of these boolean props be `true`: ' + propsList);
		}
		return bool.isRequired.apply(bool, arguments);
	};

	return wrapValidator(validator, 'booleanSome: ' + propsList, notAllPropsFalse);
};
