import { array } from 'prop-types';
import uniqueArray from './uniqueArray';
import wrapValidator from './helpers/wrapValidator';

const unique = uniqueArray();

function uniqueArrayWithMapperValidator(mapper) {
  if (typeof mapper !== 'function') {
    throw new TypeError('mapper must be a mapper function');
  }

  function uniqueArrayMapped(props, propName, ...rest) {
    const propValue = props[propName];
    if (propValue === undefined) {
      return null;
    }

    const result = array.isRequired(props, propName, ...rest);
    if (result !== null) {
      return result;
    }

    const values = propValue.map(mapper);
    return unique({ ...props, [propName]: values }, propName, ...rest);
  }

  uniqueArrayMapped.isRequired = function isRequired(props, propName, ...rest) {
    const propValue = props[propName];
    if (propValue === undefined) {
      return array.isRequired(props, propName, ...rest);
    }
    return uniqueArrayMapped(props, propName, ...rest);
  };

  return uniqueArrayMapped;
}

export default (mapper = null) => (
  wrapValidator(uniqueArrayWithMapperValidator(mapper), 'uniqueArrayWithMapper')
);

