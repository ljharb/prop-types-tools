export default function keysOf(validatorFn, name = 'keysOf') {
  if (typeof validatorFn !== 'function') {
    throw new TypeError('argument to keysOf must be a valid PropType');
  }

  const keysOfValidator = function keyedBy(props, propName, componentName, ...rest) {
    if (props[propName] == null) {
      return null; // not required
    }
    const keys = Object.keys(props[propName]);
    let firstError = null;
    keys.some((key) => {
      const pseudoProps = { key };
      firstError = validatorFn(pseudoProps, 'key', componentName, ...rest);
      return firstError != null;
    });
    return firstError == null ? null : firstError;
  };
  keysOfValidator.typeName = name;

  keysOfValidator.isRequired = function keyedByRequired(
    props,
    propName,
    componentName,
    ...rest
  ) {
    if (props[propName] == null) {
      return new TypeError(`${propName} is required, but value is ${props[propName]}`);
    }
    return keysOfValidator(props, propName, componentName, ...rest);
  };
  keysOfValidator.isRequired.typeName = `${name}.isRequired`;

  return keysOfValidator;
}
