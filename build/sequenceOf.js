'use strict';

var PropTypes = require('prop-types');
var assign = require('object.assign');

var array = PropTypes.array;
var arrayOf = PropTypes.arrayOf;

var and = require('./and');
var between = require('./between');
var nonNegativeInteger = require('./nonNegativeInteger');
var object = require('./object');
var withShape = require('./withShape');
var typeOf = require('./helpers/typeOf');
var wrapValidator = require('./helpers/wrapValidator');

var minValidator = nonNegativeInteger;
var maxValidator = and([nonNegativeInteger, between({ gte: 1 })]);

function validateRange(min, max) {
	if (typeof max !== 'number' || typeof min !== 'number') {
		return null; // no additional checking needed unless both are present
	}

	if (min <= max) {
		return null;
	}
	return new RangeError('min must be less than or equal to max');
}

var specifierShape = {
	validator: function (props, propName) {
		var propValue = props[propName];
		if (typeof propValue !== 'function') {
			return new TypeError('"validator" must be a propType validator function');
		}
		return null;
	},

	min: function (props, propName) {
		return minValidator(props, propName) || validateRange(props.min, props.max);
	},

	max: function (props, propName) {
		return maxValidator(props, propName) || validateRange(props.min, props.max);
	}
};

function getMinMax(x) {
	var min = x.min;
	var max = x.max;

	var minimum;
	var maximum;
	if (typeof min !== 'number' && typeof max !== 'number') {
		// neither provided, default to "1"
		minimum = 1;
		maximum = 1;
	} else {
		minimum = typeof min === 'number' ? min : 1;
		maximum = typeof max === 'number' ? max : Infinity;
	}
	return { minimum: minimum, maximum: maximum };
}

function chunkByType(items) {
	var chunk = [];
	var lastType;
	return items.reduce(function (chunks, item) {
		var itemType = typeOf(item);
		if (!lastType || itemType === lastType) {
			chunk.push(item);
		} else {
			chunks.push(chunk);
			chunk = [item];
		}
		lastType = itemType;
		return chunks;
	}, []).concat(chunk.length > 0 ? [chunk] : []);
}

function validateChunks(specifiers, props, propName, componentName) {
	var items = props[propName];
	var chunks = chunkByType(items);

	for (var i = 0; i < specifiers.length; i += 1) {
		var specifier = specifiers[i];
		var validator = specifier.validator;
		var min = specifier.min;
		var max = specifier.max;

		var x = getMinMax({ min: min, max: max });
		var minimum = x.minimum;
		var maximum = x.maximum;

		if (chunks.length === 0 && minimum === 0) {
			// no chunks left, but this specifier does not require any items
			continue; // eslint-disable-line no-continue, no-restricted-syntax
		}

		var arrayOfValidator = arrayOf(validator).isRequired;

		var chunk = chunks.shift(); // extract the next chunk to test

		var rest = Array.prototype.slice.call(arguments, 4);

		var propsObj = {};
		propsObj[propName] = chunk;
		var chunkError = arrayOfValidator.apply(
			null,
			[
				assign({}, props, propsObj),
				propName,
				componentName
			].concat(rest)
		);

		if (chunkError) { // this chunk is invalid
			if (minimum === 0) { // but, specifier has a min of 0 and can be skipped
				chunks.unshift(chunk); // put the chunk back, for the next iteration
				continue; // eslint-disable-line no-continue, no-restricted-syntax
			}
			return chunkError;
		}

		// chunk is valid!

		if (chunk.length < minimum) {
			return new RangeError('`' + componentName + '`: specifier index ' + i + ' requires a minimum of ' + min + ' items, but only has ' + chunk.length + '.');
		}

		if (chunk.length > maximum) {
			return new RangeError('`' + componentName + ': specifier index ' + i + ' requires a maximum of ' + max + ' items, but has ' + chunk.length + '.');
		}
	}

	if (chunks.length > 0) {
		return new TypeError('`' + componentName + '`: after all ' + specifiers.length + ' specifiers matched, ' + chunks.length + ' types of items were remaining.');
	}

	return null;
}

var specifierValidator = withShape(object(), specifierShape).isRequired;

module.exports = function sequenceOfValidator() {
	var specifiers = Array.prototype.slice.call(arguments);

	if (specifiers.length === 0) {
		throw new RangeError('sequenceOf: at least one specifier is required');
	}

	var errors = specifiers.map(function (specifier, i) {
		return specifierValidator(
			{ specifier: specifier },
			'specifier',
			'sequenceOf specifier',
			'sequenceOf specifier, index ' + i,
			'specifier, index ' + i
		);
	});

	/* eslint operator-linebreak: 0, function-paren-newline: 0 */
	if (errors.some(Boolean)) {
		throw new TypeError('\n'
      + '      sequenceOf: all specifiers must match the appropriate shape.\n\n'
      + '      Errors:\n'
      + '        '
      + errors.map(function (e, i) { return ' - Argument index ' + i + ': ' + e.message; }).join(',\n        ')
      + '\n'
		);
	}

	var validator = function sequenceOf(props, propName) {
		var propValue = props[propName];

		if (propValue == null) {
			return null;
		}

		var error = array.apply(null, arguments);
		if (error) {
			return error;
		}

		var args = Array.prototype.slice.call(arguments);

		return validateChunks.apply(null, [specifiers].concat(args));
	};

	validator.isRequired = function sequenceOfRequired() {
		var error = array.isRequired.apply(this, arguments);
		if (error) {
			return error;
		}

		var args = Array.prototype.slice.call(arguments);

		return validateChunks.apply(null, [specifiers].concat(args));
	};

	return wrapValidator(validator, 'sequenceOf', specifiers);
};
