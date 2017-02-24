import { PropTypes } from 'react';
import wrapValidator from './helpers/wrapValidator';

function isValidLength(x) {
  return Number.isInteger(x) && isFinite(x) && Math.abs(x) < Number.MAX_SAFE_INTEGER;
}

export default function range(min, max) {
  if (!isValidLength(min) || !isValidLength(max)) {
    throw new RangeError('"range" requires two integers');
  }
  if (min === max) {
    throw new RangeError('min and max must not be the same');
  }
  const possibleSizes = Array.from({ length: (max - min) }, (_, i) => (min + i));
  if (possibleSizes.indexOf(0) > -1) {
    possibleSizes.push(-0); // React 15 differentiates properly between -0 and 0. We don't need to.
  }
  return wrapValidator(PropTypes.oneOf(possibleSizes), 'range', { min, max });
}
