import wrapValidator from './helpers/wrapValidator';

const validator = function nonNegativeInteger(props, propName, componentName) {
  const value = props[propName];

  if (value == null || (Number.isInteger(value) && value >= 0 && !Object.is(value, -0))) {
    return null;
  }

  return new RangeError(`${propName} in ${componentName} must be a non-negative integer`);
};

function requiredNonNegativeInteger(props, propName, componentName, ...rest) {
  const value = props[propName];
  if (value == null) {
    return new RangeError(`${propName} in ${componentName} must be a non-negative integer`);
  }
  return validator(props, propName, componentName, ...rest);
}

validator.isRequired = requiredNonNegativeInteger;

export default wrapValidator(validator, 'nonNegativeInteger');
