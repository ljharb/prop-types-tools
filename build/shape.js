'use strict';

var isPlainObject = require('./helpers/isPlainObject');
var wrapValidator = require('./helpers/wrapValidator');

module.exports = function shapeValidator(shapeTypes) {
	if (!isPlainObject(shapeTypes)) {
		throw new TypeError('shape must be a normal object');
	}

	function shape(props, propName) {
		var rest = Array.prototype.slice.call(arguments, 2);

		var propValue = props[propName];

		if (propValue == null) {
			return null;
		}
		// code adapted from PropTypes.shape: https://github.com/facebook/react/blob/14156e56b9cf18ac86963185c5af4abddf3ff811/src/isomorphic/classic/types/ReactPropTypes.js#L381
		// eslint-disable-next-line no-restricted-syntax
		for (var key in shapeTypes) {
			var checker = shapeTypes[key];
			if (checker) {
				var error = checker.apply(
					null,
					[
						propValue,
						key
					].concat(rest)
				);
				if (error) {
					return error;
				}
			}
		}
		return null;
	}

	shape.isRequired = function shapeRequired(props, propName, componentName) {
		var propValue = props[propName];

		if (propValue == null) {
			return new TypeError('`' + componentName + '`: `' + propName + '` is required.');
		}
		return shape.apply(this, arguments);
	};

	return wrapValidator(shape, 'shape', shapeTypes);
};
