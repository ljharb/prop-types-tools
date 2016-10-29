import { PropTypes } from 'react';
import and from './and';
import uniqueArray from './uniqueArray';

export default function uniqueArrayOfTypeValidator(type, name = 'uniqueArrayOfType') {
  if (typeof type !== 'function') {
    throw new TypeError('type must be a validator function');
  }

  const arrayValidator = PropTypes.arrayOf(type);

  const validator = and([arrayValidator, uniqueArray], name);
  validator.isRequired = and([
    arrayValidator.isRequired,
    uniqueArray.isRequired,
  ], `required: ${name}`);

  return validator;
}
