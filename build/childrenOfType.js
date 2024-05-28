'use strict';

var find = require('array.prototype.find');

var getComponentName = require('./helpers/getComponentName');
var renderableChildren = require('./helpers/renderableChildren');
var wrapValidator = require('./helpers/wrapValidator');

function onlyTypes(types, children, componentName) {
	var everyTypeValid = children.every(function (child) {
		return child && find(types, function (Type) {
			return Type === '*' || child.type === Type;
		});
	});
	if (!everyTypeValid) {
		var typeNames = types.map(getComponentName).join(', or ');
		return new TypeError('`' + componentName + '` only accepts children of type ' + typeNames);
	}
	return null;
}

function isRequired(types, children, componentName) {
	if (children.length === 0) {
		var typeNames = types.map(getComponentName).join(', or ');
		return new TypeError('`' + componentName + '` requires at least one node of type ' + typeNames);
	}
	return null;
}

module.exports = function childrenOfType() {
	var types = Array.prototype.slice.call(arguments);

	if (types.length < 1) {
		throw new TypeError('childrenOfType: at least 1 type is required');
	}

	function validator(props, propName, componentName) {
		return onlyTypes(types, renderableChildren(props[propName]), componentName);
	}

	validator.isRequired = function (props, propName, componentName) {
		var children = renderableChildren(props[propName]);
		return isRequired(types, children, componentName) || onlyTypes(types, children, componentName);
	};

	return wrapValidator(validator, 'childrenOfType', types);
};
