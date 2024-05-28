'use strict';

var propTypes = require('prop-types');

var or = require('./or');
var explicitNull = require('./explicitNull');
var withShape = require('./withShape');
var wrapValidator = require('./helpers/wrapValidator');

var arrayOfValidator;
var validator = or([
	explicitNull, // null/undefined
	propTypes.oneOf([
		false,
		'',
		NaN
	]),
	withShape(propTypes.array, {
		length: propTypes.oneOf([0]).isRequired
	}).isRequired,
	function () { return arrayOfValidator.apply(this, arguments); }
]);
arrayOfValidator = propTypes.arrayOf(validator).isRequired;

module.exports = function () {
	return wrapValidator(validator, 'empty');
};
