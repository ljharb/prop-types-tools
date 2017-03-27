import { PropTypes } from 'react';
import wrapValidator from './helpers/wrapValidator';

function uniqueCountWithSet(array) { return new Set(array).size; }
/* istanbul ignore next */
function uniqueCountLegacy(array) {
  const seen = [];
  array.forEach((item) => {
    if (seen.indexOf(item) === -1) {
      seen.push(item);
    }
  });
  return seen.length;
}

const getUniqueCount = typeof Set === 'function' ? uniqueCountWithSet : /* istanbul ignore next */ uniqueCountLegacy;

function requiredUniqueArray(props, propName, componentName, ...rest) {
  const result = PropTypes.array.isRequired(props, propName, componentName, ...rest);
  if (result != null) {
    return result;
  }

  const propValue = props[propName];
  const uniqueCount = getUniqueCount(propValue);
  if (uniqueCount !== propValue.length) {
    return new RangeError(`${componentName}: values must be unique. ${propValue.length - uniqueCount} duplicate values found.`);
  }
  return null;
}

function uniqueArray(props, propName, ...rest) {
  const propValue = props[propName];
  if (propValue == null) {
    return null;
  }

  return requiredUniqueArray(props, propName, ...rest);
}
uniqueArray.isRequired = requiredUniqueArray;

export default () => wrapValidator(uniqueArray, 'uniqueArray');
