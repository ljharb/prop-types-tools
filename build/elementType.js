'use strict';

var element = require('prop-types').element;
var isValidElementType = require('react-is').isValidElementType;

var and = require('./and');
var getComponentName = require('./helpers/getComponentName');
var wrapValidator = require('./helpers/wrapValidator');

function getTypeName(Type) {
	if (typeof Type === 'string') {
		return Type;
	}
	var type = getComponentName(Type);

	/* istanbul ignore next */ // in environments where functions do not have names
	return type || 'Anonymous Component';
}

function validateElementType(Type, props, propName, componentName) {
	var type = props[propName].type;

	if (type === Type) {
		return null;
	}

	return new TypeError('`' + componentName + '.' + propName + '` must be a React element of type ' + getTypeName(Type));
}

module.exports = function elementTypeValidator(Type) {
	if (Type === '*') {
		return wrapValidator(element, 'elementType(*)', Type);
	}

	if (!isValidElementType(Type)) {
		throw new TypeError('Type must be a React Component, an HTML element tag name, or "*". Got an ' + typeof Type);
	}

	function elementType(props, propName) {
		if (props[propName] == null) {
			return null;
		}
		return validateElementType.apply(null, [Type].concat(Array.prototype.slice.call(arguments)));
	}
	elementType.isRequired = elementType; // covered by and + element

	var typeName = getTypeName(Type);
	var validatorName = 'elementType(' + typeName + ')';
	return wrapValidator(and([element, elementType], validatorName), validatorName, Type);
};
