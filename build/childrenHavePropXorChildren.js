'use strict';

var React = require('react');

var wrapValidator = require('./helpers/wrapValidator');

module.exports = function childrenHavePropXorChildren(prop) {
	if (typeof prop !== 'string' && typeof prop !== 'symbol') {
		throw new TypeError('invalid prop: must be string or symbol');
	}

	var validator = function childrenHavePropXorChildrenWithProp(props, _, componentName) {
		var children = props.children;
		var truthyChildrenCount = 0;
		var propCount = 0;
		var grandchildrenCount = 0;

		React.Children.forEach(children, function (child) {
			if (!child) {
				return;
			}

			truthyChildrenCount += 1;

			if (child.props[prop]) {
				propCount += 1;
			}

			if (React.Children.count(child.props.children)) {
				grandchildrenCount += 1;
			}
		});

		if (
			(propCount === truthyChildrenCount && grandchildrenCount === 0)
      || (propCount === 0 && grandchildrenCount === truthyChildrenCount)
      || (propCount === 0 && grandchildrenCount === 0)
		) {
			return null;
		}

		return new TypeError('`' + componentName + '` requires children to all have prop “' + prop + '”, all have children, or all have neither.');
	};
	validator.isRequired = validator;

	return wrapValidator(validator, 'childrenHavePropXorChildrenWithProp:' + prop, prop);
};
