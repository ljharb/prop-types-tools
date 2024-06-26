'use strict';

var isPlainObject = require('./helpers/isPlainObject');
var typeOf = require('./helpers/typeOf');
var wrapValidator = require('./helpers/wrapValidator');

/*
 *code adapted from https://github.com/facebook/react/blob/14156e56b9cf18ac86963185c5af4abddf3ff811/src/isomorphic/classic/types/ReactPropTypes.js#L202-L206
 *so that it can be called outside of React's normal PropType flow
 */

var ReactPropTypeLocationNames = {
	prop: 'prop',
	context: 'context',
	childContext: 'child context'
};

function object(props, propName, componentName, location, propFullName) {
	var propValue = props[propName];
	if (propValue == null) {
		return null;
	}

	if (isPlainObject(propValue)) {
		return null;
	}
	var locationName = ReactPropTypeLocationNames[location] || location;
	return new TypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + typeOf(propValue) + '` supplied to `' + componentName + '`, expected `object`.');
}
object.isRequired = function objectRequired(
	props,
	propName,
	componentName,
	location,
	propFullName
) {
	var propValue = props[propName];
	if (propValue == null) {
		var locationName = ReactPropTypeLocationNames[location] || location;
		return new TypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in `' + componentName + '`, but its value is `' + propValue + '`.');
	}
	return object.apply(this, arguments);
};

module.exports = function () {
	return wrapValidator(object, 'object');
};
