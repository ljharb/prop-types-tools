'use strict';

var React = require('react');
var isPlainObject = require('./helpers/isPlainObject');
var wrapValidator = require('./helpers/wrapValidator');

var Component = React.Component;
var PureComponent = React.PureComponent;

var isPrototypeOf = Object.prototype.isPrototypeOf;

function isNewRef(prop) {
	if (!isPlainObject(prop)) {
		return false;
	}
	var ownProperties = Object.keys(prop);
	return ownProperties.length === 1 && ownProperties[0] === 'current';
}

function isCallbackRef(prop) {
	return typeof prop === 'function'
    && !isPrototypeOf.call(Component, prop)
    && (!PureComponent || !isPrototypeOf.call(PureComponent, prop));
}

function requiredRef(props, propName, componentName) {
	var propValue = props[propName];

	if (isCallbackRef(propValue) || isNewRef(propValue)) {
		return null;
	}

	return new TypeError('`' + propName + '` in `' + componentName + '` must be a ref');
}

function ref(props, propName) {
	var propValue = props[propName];

	if (propValue == null) {
		return null;
	}

	return requiredRef.apply(this, arguments);
}

ref.isRequired = requiredRef;

module.exports = function () {
	return wrapValidator(ref, 'ref');
};
