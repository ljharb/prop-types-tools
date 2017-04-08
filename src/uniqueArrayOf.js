import { arrayOf } from 'prop-types';
import and from './and';
import uniqueArray from './uniqueArray';

const unique = uniqueArray();

export default function uniqueArrayOfTypeValidator(type, name = 'uniqueArrayOfType') {
  if (typeof type !== 'function') {
    throw new TypeError('type must be a validator function');
  }

  const arrayValidator = arrayOf(type);

  const validator = and([arrayValidator, unique], name);
  validator.isRequired = and([
    arrayValidator.isRequired,
    unique.isRequired,
  ], `${name}.isRequired`);

  return validator;
}
