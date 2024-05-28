'use strict';

var getFunctionName = require('function.prototype.name');
var reactIs = require('react-is');

var isForwardRef = reactIs.isForwardRef;
var Element = reactIs.Element;
var isMemo = reactIs.isMemo;

module.exports = function getComponentName(Component) {
	if (typeof Component === 'string') {
		return Component;
	}
	if (typeof Component === 'function') {
		return Component.displayName || getFunctionName(Component);
	}
	if (isForwardRef({ type: Component, $$typeof: Element })) {
		return Component.displayName;
	}
	if (isMemo(Component)) {
		return getComponentName(Component.type);
	}
	return null;
};
