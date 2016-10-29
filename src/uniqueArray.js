import { PropTypes } from 'react';

function requiredUniqueArray(props, propName, componentName, ...rest) {
  const result = PropTypes.array.isRequired(props, propName, componentName, ...rest);
  if (result != null) {
    return result;
  }

  const array = props[propName];
  const uniqueCount = new Set(array).size;
  if (uniqueCount !== array.length) {
    return new RangeError(`${componentName}: values must be unique. ${array.length - uniqueCount} duplicate values found.`);
  }
  return null;
}

function uniqueArray(props, propName, ...rest) {
  const array = props[propName];
  if (array == null) {
    return null;
  }

  return requiredUniqueArray(props, propName, ...rest);
}
uniqueArray.isRequired = requiredUniqueArray;

export default uniqueArray;
