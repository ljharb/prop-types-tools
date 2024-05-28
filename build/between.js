'use strict';

var entries = require('object.entries');
var assign = require('object.assign');

var shape = require('./shape');
var valuesOf = require('./valuesOf');
var wrapValidator = require('./helpers/wrapValidator');

function number(props, propName, componentName) {
	var value = props[propName];
	if (typeof value === 'number' && !isNaN(value)) {
		return null;
	}

	return new TypeError(componentName + ': ' + propName + ' must be a non-NaN number.');
}

function numberOrPropsFunc(props, propName) {
	var value = props[propName];

	if (typeof value === 'function') {
		return null;
	}

	if (typeof value === 'number' && !isNaN(value)) {
		return null;
	}

	return new TypeError(propName + ': a function, or a non-NaN number is required');
}

function lowerCompare(value, x) {
	var gt = x.gt;
	var gte = x.gte;

	if (typeof gt === 'number') {
		return value > gt;
	}
	if (typeof gte === 'number') {
		return value >= gte;
	}
	return true;
}

function upperCompare(value, x) {
	var lt = x.lt;
	var lte = x.lte;

	if (typeof lt === 'number') {
		return value < lt;
	}
	if (typeof lte === 'number') {
		return value <= lte;
	}
	return true;
}

function greaterThanError(x) {
	var gt = x.gt;
	var gte = x.gte;

	if (typeof gt === 'number') {
		return 'greater than ' + gt;
	}
	if (typeof gte === 'number') {
		return 'greater than or equal to ' + gte;
	}
	return '';
}

function lessThanError(x) {
	var lt = x.lt;
	var lte = x.lte;

	if (typeof lt === 'number') {
		return 'less than ' + lt;
	}
	if (typeof lte === 'number') {
		return 'less than or equal to ' + lte;
	}
	return '';
}

function errorMessage(componentName, propName, opts) {
	var errors = [greaterThanError(opts), lessThanError(opts)].filter(Boolean).join(' and ');
	return componentName + ': ' + propName + ' must be ' + errors;
}

function propsThunkify(opts) {
	return entries(opts).reduce(function (acc, entry) {
		var key = entry[0];
		var value = entry[1];

		var numberThunk = typeof value === 'number'
			? function () { return value; }
			: value;
		var propObj = {};
		propObj[key] = numberThunk;
		return assign({}, acc, propObj);
	}, {});
}

function invokeWithProps(optsThunks, props) {
	return entries(optsThunks).reduce(function (acc, entry) {
		var key = entry[0];
		var thunk = entry[1];

		var value = thunk(props);
		var propObj = {};
		propObj[key] = value;
		return assign({}, acc, propObj);
	}, {});
}

var argValidators = [
	shape({ lt: numberOrPropsFunc, gt: numberOrPropsFunc }).isRequired,
	shape({ lte: numberOrPropsFunc, gt: numberOrPropsFunc }).isRequired,
	shape({ lt: numberOrPropsFunc, gte: numberOrPropsFunc }).isRequired,
	shape({ lte: numberOrPropsFunc, gte: numberOrPropsFunc }).isRequired,
	shape({ lt: numberOrPropsFunc }).isRequired,
	shape({ lte: numberOrPropsFunc }).isRequired,
	shape({ gt: numberOrPropsFunc }).isRequired,
	shape({ gte: numberOrPropsFunc }).isRequired
];
function argValidator(props, propName) {
	return argValidators.every(function (validator) {
		return !!validator(props, propName);
	});
}

var thunkValueValidator = valuesOf(number).isRequired;

module.exports = function betweenValidator(options) {
	var argError = argValidator({ options: options }, 'options');
	if (argError) {
		throw new TypeError('between: only one of the pairs of `lt`/`lte`, and `gt`/`gte`, may be supplied, and at least one pair must be provided.');
	}

	var optsThunks = propsThunkify(options);

	var validator = function between(props, propName, componentName) {
		var rest = Array.prototype.slice.call(arguments, 2);

		var propValue = props[propName];
		if (propValue == null) {
			return null;
		}

		if (typeof propValue !== 'number') {
			return new RangeError(componentName + ': ' + propName + ' must be a number, got "' + typeof propValue + '"');
		}

		var opts = invokeWithProps(optsThunks, props);
		var propsObj = {};
		propsObj[propName] = opts;
		var thunkValuesError = thunkValueValidator.apply(
			null,
			[
				propsObj,
				propName,
				componentName
			].concat(rest)
		);
		if (thunkValuesError) {
			return thunkValuesError;
		}

		if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
			return new RangeError(errorMessage(componentName, propName, opts));
		}

		return null;
	};
	validator.isRequired = function betweenRequired(props, propName, componentName) {
		var rest = Array.prototype.slice.call(arguments, 2);

		var propValue = props[propName];
		if (typeof propValue !== 'number') {
			return new RangeError(componentName + ': ' + propName + ' must be a number, got "' + typeof propValue + '"');
		}

		var opts = invokeWithProps(optsThunks, props);
		var propsObj = {};
		propsObj[propName] = opts;
		var thunkValuesError = thunkValueValidator.apply(
			null,
			[
				propsObj,
				propName,
				componentName
			].concat(rest)
		);
		if (thunkValuesError) {
			return thunkValuesError;
		}

		if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
			return new RangeError(errorMessage(componentName, propName, opts));
		}

		return null;
	};

	return wrapValidator(validator, 'between', options);
};
