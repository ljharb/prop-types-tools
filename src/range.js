import and from './and';
import between from './between';
import integer from './integer';
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
  return wrapValidator(and([integer(), between({ gte: min, lt: max })], 'range'), 'range', { min, max });
}
