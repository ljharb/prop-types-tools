'use strict';

var forbidExtraProps = require('prop-types-exact');

var and = require('./and');
var between = require('./between');
var booleanSome = require('./booleanSome');
var childrenHavePropXorChildren = require('./childrenHavePropXorChildren');
var childrenOf = require('./childrenOf');
var childrenOfType = require('./childrenOfType');
var childrenSequenceOf = require('./childrenSequenceOf');
var componentWithName = require('./componentWithName');
var disallowedIf = require('./disallowedIf');
var elementType = require('./elementType');
var empty = require('./empty');
var explicitNull = require('./explicitNull');
var integer = require('./integer');
var keysOf = require('./keysOf');
var mutuallyExclusiveProps = require('./mutuallyExclusiveProps');
var mutuallyExclusiveTrueProps = require('./mutuallyExclusiveTrueProps');
var nChildren = require('./nChildren');
var nonNegativeInteger = require('./nonNegativeInteger');
var nonNegativeNumber = require('./nonNegativeNumber');
var numericString = require('./numericString');
var object = require('./object');
var or = require('./or');
var predicate = require('./predicate');
var range = require('./range');
var ref = require('./ref');
var requiredBy = require('./requiredBy');
var restrictedProp = require('./restrictedProp');
var sequenceOf = require('./sequenceOf');
var shape = require('./shape');
var stringEndsWith = require('./stringEndsWith');
var stringStartsWith = require('./stringStartsWith');
var uniqueArray = require('./uniqueArray');
var uniqueArrayOf = require('./uniqueArrayOf');
var valuesOf = require('./valuesOf');
var withShape = require('./withShape');

module.exports = {
	and: and,
	between: between,
	booleanSome: booleanSome,
	childrenHavePropXorChildren: childrenHavePropXorChildren,
	childrenOf: childrenOf,
	childrenOfType: childrenOfType,
	childrenSequenceOf: childrenSequenceOf,
	componentWithName: componentWithName,
	disallowedIf: disallowedIf,
	elementType: elementType,
	empty: empty,
	explicitNull: explicitNull,
	forbidExtraProps: forbidExtraProps,
	integer: integer,
	keysOf: keysOf,
	mutuallyExclusiveProps: mutuallyExclusiveProps,
	mutuallyExclusiveTrueProps: mutuallyExclusiveTrueProps,
	nChildren: nChildren,
	nonNegativeInteger: nonNegativeInteger,
	nonNegativeNumber: nonNegativeNumber,
	numericString: numericString,
	object: object,
	or: or,
	predicate: predicate,
	range: range,
	ref: ref,
	requiredBy: requiredBy,
	restrictedProp: restrictedProp,
	sequenceOf: sequenceOf,
	shape: shape,
	stringEndsWith: stringEndsWith,
	stringStartsWith: stringStartsWith,
	uniqueArray: uniqueArray,
	uniqueArrayOf: uniqueArrayOf,
	valuesOf: valuesOf,
	withShape: withShape
};
