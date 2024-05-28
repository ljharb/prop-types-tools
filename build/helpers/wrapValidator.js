'use strict';

var assign = require('object.assign');

module.exports = function wrapValidator(validator, typeName) {
	var typeChecker = arguments.length > 2 ? arguments[2] : null;

	return assign(validator.bind(), {
		typeName: typeName,
		typeChecker: typeChecker,
		isRequired: Object.assign(validator.isRequired.bind(), {
			typeName: typeName,
			typeChecker: typeChecker,
			typeRequired: true
		})
	});
};
