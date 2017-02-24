import wrapValidator from './helpers/wrapValidator';

function restrictedProp(props, propName, componentName) {
  if (props[propName] != null) {
    return new TypeError(`The ${propName} prop on ${componentName} is not allowed.`);
  }

  return null;
}
restrictedProp.isRequired = restrictedProp;

export default () => wrapValidator(restrictedProp, 'restrictedProp');
