import { PropTypes } from 'react';
import wrapValidator from './helpers/wrapValidator';

export default function or(validators, name = 'or') {
  if (!Array.isArray(validators)) {
    throw new TypeError('or: 2 or more validators are required');
  }
  if (validators.length <= 1) {
    throw new RangeError('or: 2 or more validators are required');
  }

  const validator = PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType(validators)),
      ...validators,
    ]),
  ]);

  return wrapValidator(validator, name, validators);
}
