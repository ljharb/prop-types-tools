'use strict';

var find = require('array.prototype.find');
var isArray = require('isarray');
var isRegex = require('is-regex');
var React = require('react');

var getComponentName = require('./helpers/getComponentName');
var wrapValidator = require('./helpers/wrapValidator');

function stripHOCs(fullName, namesOfHOCsToStrip) {
	var innerName = fullName;
	while ((/\([^()]*\)/g).test(innerName)) {
		var HOC = innerName;
		var previousHOC;
		do {
			previousHOC = HOC;
			HOC = previousHOC.replace(/\([^()]*\)/g, '');
		} while (previousHOC !== HOC);

		if (namesOfHOCsToStrip.indexOf(HOC) === -1) {
			return innerName;
		}
		innerName = innerName.replace(RegExp('^' + HOC + '\\(|\\)$', 'g'), '');
	}
	return innerName;
}

function hasName(name, namesOfHOCsToStrip, propValue, propName, componentName, rest) {
	if (isArray(propValue)) {
		return find(
			propValue.map(function (item) {
				return hasName.apply(
					null,
					[
						name, namesOfHOCsToStrip, item, propName, componentName
					].concat(rest)
				);
			}),
			Boolean
		) || null;
	}

	if (!React.isValidElement(propValue)) {
		return new TypeError('`' + componentName + '.' + propName + '` is not a valid React element');
	}

	var componentNameFromType = getComponentName(propValue.type);
	var innerComponentName = namesOfHOCsToStrip.length > 0
		? stripHOCs(componentNameFromType, namesOfHOCsToStrip)
		: componentNameFromType;

	if (isRegex(name) && !name.test(innerComponentName)) {
		return new TypeError('`' + componentName + '.' + propName + '` only accepts components matching the regular expression ' + name);
	}

	if (!isRegex(name) && innerComponentName !== name) {
		return new TypeError('`' + componentName + '.' + propName + '` only accepts components named ' + name + ', got ' + innerComponentName);
	}

	return null;
}

module.exports = function componentWithName(name) {
	if (typeof name !== 'string' && !isRegex(name)) {
		throw new TypeError('name must be a string or a regex');
	}

	var options = (arguments.length > 1 && arguments[1]) || {};
	var passedOptions = Object.keys(options);
	if (passedOptions.length > 1 || (passedOptions.length === 1 && passedOptions[0] !== 'stripHOCs')) {
		throw new TypeError('The only options supported are: “stripHOCs”, got: “' + passedOptions.join('”, “') + '”');
	}
	var namesOfHOCsToStrip = (options && options.stripHOCs) || [];

	var allHOCNamesAreValid = namesOfHOCsToStrip.every(function (x) {
		if (typeof x !== 'string' || (/[()]/g).test(x)) {
			return false;
		}
		return (/^(?:[a-z][a-zA-Z0-9]+|[A-Z][a-z][a-zA-Z0-9]+)$/).test(x);
	});
	if (!allHOCNamesAreValid) {
		throw new TypeError('every provided HOC name must be a string with no parens, and in camelCase');
	}

	function componentWithNameValidator(props, propName, componentName) {
		var propValue = props[propName];
		if (props[propName] == null) {
			return null;
		}

		var rest = Array.prototype.slice.call(arguments, 3);
		return hasName(name, namesOfHOCsToStrip, propValue, propName, componentName, rest);
	}

	componentWithNameValidator.isRequired = function componentWithNameRequired(props, propName, componentName) {
		var propValue = props[propName];
		if (propValue == null) {
			return new TypeError('`' + componentName + '.' + propName + '` requires at least one component named ' + name);
		}

		var rest = Array.prototype.slice.call(arguments, 3);
		return hasName(name, namesOfHOCsToStrip, propValue, propName, componentName, rest);
	};

	return wrapValidator(componentWithNameValidator, 'componentWithName:' + name, name);
};
