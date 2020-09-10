import React from 'react';
import { isFragment } from 'react-is';
import flatMap from 'array.prototype.flatmap';

export default function renderableChildren(childrenProp) {
  return flatMap(React.Children.toArray(childrenProp), (child) => {
    if (isFragment(child)) {
      return renderableChildren(child.props.children);
    }
    return child === 0 || child ? child : [];
  });
}
