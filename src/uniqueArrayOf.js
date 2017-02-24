import { PropTypes } from 'react';
import and from './and';
import uniqueArray from './uniqueArray';

const unique = uniqueArray();

export default function uniqueArrayOfTypeValidator(type, name = 'uniqueArrayOfType') {
  if (typeof type !== 'function') {
    throw new TypeError('type must be a validator function');
  }

  const arrayValidator = PropTypes.arrayOf(type);

  const validator = and([arrayValidator, unique], name);
  validator.isRequired = and([
    arrayValidator.isRequired,
    unique.isRequired,
  ], `${name}.isRequired`);

  return validator;
}
