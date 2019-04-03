import isPlainObject from './helpers/isPlainObject';
import wrapValidator from './helpers/wrapValidator';

function isNewRef(prop) {
  if (!isPlainObject(prop)) {
    return false;
  }
  const ownProperties = Object.keys(prop);
  return ownProperties.length === 1 && ownProperties[0] === 'current';
}

function requiredRef(props, propName, componentName) {
  const propValue = props[propName];

  if (typeof propValue === 'function' || isNewRef(propValue)) {
    return null;
  }

  return new TypeError(`${propName} in ${componentName} must be a ref`);
}

function ref(props, propName, componentName, ...rest) {
  const propValue = props[propName];

  if (propValue == null) {
    return null;
  }

  return requiredRef(props, propName, componentName, ...rest);
}

ref.isRequired = requiredRef;

export default () => wrapValidator(ref, 'ref');
