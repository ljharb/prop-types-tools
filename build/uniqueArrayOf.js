'use strict';

var PropTypes = require('prop-types');
var assign = require('object.assign');

var arrayOf = PropTypes.arrayOf;
var array = PropTypes.array;

var and = require('./and');
var uniqueArray = require('./uniqueArray');

var unique = uniqueArray();

module.exports = function uniqueArrayOfTypeValidator(type) {
	if (typeof type !== 'function') {
		throw new TypeError('type must be a validator function');
	}

	var mapper = null;
	var name = 'uniqueArrayOfType';

	if (arguments.length === 2) {
		if (typeof arguments[1] === 'function') {
			mapper = arguments[1];
		} else if (typeof arguments[1] === 'string') {
			name = arguments[1];
		} else {
			throw new TypeError('single input must either be string or function');
		}
	} else if (arguments.length === 3) {
		if (typeof arguments[1] === 'function' && typeof arguments[2] === 'string') {
			mapper = arguments[1];
			name = arguments[2];
		} else {
			throw new TypeError('multiple inputs must be in [function, string] order');
		}
	} else if (arguments.length > 3) {
		throw new TypeError('only [], [name], [mapper], and [mapper, name] are valid inputs');
	}

	function uniqueArrayOfMapped(props, propName) {
		var propValue = props[propName];
		if (propValue == null) {
			return null;
		}

		var rest = Array.prototype.slice.call(arguments, 2);

		var values = propValue.map(mapper);
		var propsObj = {};
		propsObj[propName] = values;
		return unique.apply(
			null,
			[
				assign({}, props, propsObj),
				propName
			].concat(rest)
		);
	}

	uniqueArrayOfMapped.isRequired = function isRequired(props, propName) {
		var propValue = props[propName];
		if (propValue == null) {
			return array.isRequired.apply(array, arguments);
		}
		return uniqueArrayOfMapped.apply(null, arguments);
	};

	var arrayValidator = arrayOf(type);

	var uniqueValidator = mapper ? uniqueArrayOfMapped : unique;

	var validator = and([arrayValidator, uniqueValidator], name);
	validator.isRequired = and([
		uniqueValidator.isRequired,
		arrayValidator.isRequired
	], name + '.isRequired');

	return validator;
};
