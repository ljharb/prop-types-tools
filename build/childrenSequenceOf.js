'use strict';

var assign = require('object.assign');

var sequenceOf = require('./sequenceOf');
var renderableChildren = require('./helpers/renderableChildren');
var wrapValidator = require('./helpers/wrapValidator');

module.exports = function childrenSequenceOfValidator() {
	var specifiers = Array.prototype.slice.call(arguments);

	var seq = sequenceOf.apply(null, arguments);

	var validator = function childrenSequenceOf(props, propName, componentName) {
		if (propName !== 'children') {
			return new TypeError('`' + componentName + '` is using the childrenSequenceOf validator on non-children prop "' + propName + '"');
		}

		var rest = Array.prototype.slice.call(arguments, 3);

		var propValue = props[propName];
		var children = renderableChildren(propValue);
		if (children.length === 0) {
			return null;
		}
		return seq.apply(null, [
			assign({}, props, { children: children }), propName, componentName
		].concat(rest));
	};

	validator.isRequired = function childrenSequenceOfRequired(props, propName, componentName) {
		if (propName !== 'children') {
			return new TypeError('`' + componentName + '` is using the childrenSequenceOf validator on non-children prop "' + propName + '"');
		}

		var rest = Array.prototype.slice.call(arguments, 3);

		var propValue = props[propName];
		var children = renderableChildren(propValue);
		if (children.length === 0) {
			return new TypeError('`' + componentName + '`: renderable children are required.');
		}
		return seq.isRequired.apply(seq, [
			assign({}, props, { children: children }), propName, componentName
		].concat(rest));
	};

	return wrapValidator(validator, 'childrenSequenceOf', specifiers);
};
