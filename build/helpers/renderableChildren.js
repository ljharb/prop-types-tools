'use strict';

var React = require('react');
var isFragment = require('react-is').isFragment;
var flatMap = require('array.prototype.flatmap');

module.exports = function renderableChildren(childrenProp) {
	return flatMap(React.Children.toArray(childrenProp), function (child) {
		if (isFragment(child)) {
			return renderableChildren(child.props.children);
		}
		return child === 0 || child ? child : [];
	});
};
