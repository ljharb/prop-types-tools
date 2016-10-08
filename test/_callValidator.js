import ReactPropTypesSecretExtraArgs from './_reactPropTypeSecretArgs';

export default function callValidator(validator, element, propName = '', componentName = '') {
  return validator(element.props, propName, componentName, ...ReactPropTypesSecretExtraArgs);
}
