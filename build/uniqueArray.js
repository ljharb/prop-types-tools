'use strict';

var array = require('prop-types').array;
var wrapValidator = require('./helpers/wrapValidator');

var getUniqueCount = typeof Set === 'function'
	? function uniqueCountWithSet(arr) {
		return new Set(arr).size;
	}
	: /* istanbul ignore next */ function uniqueCountLegacy(arr) {
		var seen = [];
		arr.forEach(function (item) {
			if (seen.indexOf(item) === -1) {
				seen.push(item);
			}
		});
		return seen.length;
	};

function requiredUniqueArray(props, propName, componentName) {
	var result = array.isRequired.apply(array, arguments);
	if (result != null) {
		return result;
	}

	var propValue = props[propName];
	var uniqueCount = getUniqueCount(propValue);
	if (uniqueCount !== propValue.length) {
		return new RangeError('`' + componentName + '`: values must be unique. ' + (propValue.length - uniqueCount) + ' duplicate values found.');
	}
	return null;
}

function uniqueArray(props, propName) {
	var propValue = props[propName];
	if (propValue == null) {
		return null;
	}

	return requiredUniqueArray.apply(this, arguments);
}
uniqueArray.isRequired = requiredUniqueArray;

module.exports = function () {
	return wrapValidator(uniqueArray, 'uniqueArray');
};
