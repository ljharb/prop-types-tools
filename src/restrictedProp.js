import wrapValidator from './helpers/wrapValidator';

function customMessageWrapper(messsageFunction) {
  function restrictedProp(props, propName, componentName, location) {
    if (messsageFunction && typeof messsageFunction === 'function') {
      return new TypeError(messsageFunction(props, propName, componentName, location));
    }
    if (props[propName] != null) {
      return new TypeError(`The ${propName} ${location} on ${componentName} is not allowed.`);
    }

    return null;
  }
  restrictedProp.isRequired = restrictedProp;
  return restrictedProp;
}

export default (messsageFunction = null) => wrapValidator(customMessageWrapper(messsageFunction), 'restrictedProp');
