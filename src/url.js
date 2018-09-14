import isURL from 'is-url';
import PropTypes from 'prop-types';

import wrapValidator from './helpers/wrapValidator';

function requiredURL(props, propName, componentName, ...rest) {
  const stringError = PropTypes.string.isRequired(props, propName, componentName, ...rest);

  if (stringError) {
    return stringError;
  }

  const value = props[propName];

  if (!value.startsWith('/') && !isURL(value)) {
    return new TypeError(`${propName} in ${componentName} must be a valid URL; value is ${value}`);
  }

  return null;
}

const validator = function url(props, propName, ...rest) {
  if (props[propName] == null) {
    return null;
  }

  return requiredURL(props, propName, ...rest);
};

validator.isRequired = requiredURL;

export default () => wrapValidator(validator, 'url');
