'use strict';

var assign = require('object.assign');

var renderableChildren = require('./helpers/renderableChildren');
var wrapValidator = require('./helpers/wrapValidator');

function validateChildren(propType, children, props) {
	var rest = Array.prototype.slice.call(arguments, 3);

	var error;
	children.some(function (child) {
		error = propType.apply(null, [assign({}, props, { children: child }), 'children'].concat(rest));
		return error;
	});

	return error || null;
}

module.exports = function childrenOf(propType) {
	function childrenOfPropType(props, propName, componentName) {
		var rest = Array.prototype.slice.call(arguments, 3);

		if (propName !== 'children') {
			return new TypeError('`' + componentName + '` is using the childrenOf validator on non-children prop "' + propName + '"');
		}

		var propValue = props[propName];

		if (propValue == null) {
			return null;
		}
		var children = renderableChildren(propValue);
		if (children.length === 0) {
			return null;
		}

		return validateChildren.apply(null, [
			propType,
			children,
			props,
			componentName
		].concat(rest));
	}

	childrenOfPropType.isRequired = function (props, propName, componentName) {
		var rest = Array.prototype.slice.call(arguments, 3);

		if (propName !== 'children') {
			return new TypeError('`' + componentName + '` is using the childrenOf validator on non-children prop "' + propName + '"');
		}

		var children = renderableChildren(props[propName]);
		if (children.length === 0) {
			return new TypeError('`' + componentName + '` requires at least one node of type ' + (propType.typeName || propType.name) + '`');
		}

		return validateChildren.apply(null, [
			propType,
			children,
			props,
			componentName
		].concat(rest));
	};

	return wrapValidator(childrenOfPropType, 'childrenOf', propType);
};
