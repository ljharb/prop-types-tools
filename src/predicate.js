import wrapValidator from './helpers/wrapValidator';

export default function predicate(fn, message = '') {
  if (typeof fn !== 'function') {
    throw new TypeError('`fn` must be a function');
  }
  if (typeof message !== 'string') {
    throw new TypeError('`message`, if provided, must be a string');
  }

  function requiredValidator(props, propName, componentName) {
    const result = fn(props[propName]);
    if (result) {
      return null;
    }
    return new TypeError(`\`${componentName}\` requires that \`${propName}\` pass a predicate function${message ? `: ${message}` : ''}.`);
  }

  function validator(props, propName, ...rest) {
    if (props[propName] == null) {
      return null;
    }
    return requiredValidator(props, propName, ...rest);
  }
  validator.isRequired = requiredValidator;

  return wrapValidator(validator, 'predicate', fn);
}
