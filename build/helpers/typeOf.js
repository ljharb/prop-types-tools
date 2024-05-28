'use strict';

var isValidElement = require('react').isValidElement;
var isArray = require('isarray');

module.exports = function typeOf(child) {
	if (child === null) {
		return 'null';
	}
	if (isArray(child)) {
		return 'array';
	}
	if (typeof child !== 'object') {
		return typeof child;
	}
	if (isValidElement(child)) {
		return child.type;
	}
	return child;
};
