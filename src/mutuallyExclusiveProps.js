export default function mutuallyExclusiveOfType(propType, ...exclusiveProps) {
  if (typeof propType !== 'function') {
    throw new TypeError('a propType is required');
  }

  if (exclusiveProps.length < 2) {
    throw new TypeError('at least two mutually exclusive props are required');
  }

  const map = exclusiveProps.reduce((acc, prop) => ({ ...acc, [prop]: true }), {});

  const validator = function mutuallyExclusiveProps(props, propName, componentName, ...rest) {
    const exclusivePropCount = Object.keys(props).reduce((count, prop) => (
      count + (map[prop] ? 1 : 0)
    ), 0);
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these props: ${exclusiveProps.join(', or ')}`);
    }
    return propType(props, propName, componentName, ...rest);
  };
  validator.typeName = `mutuallyExclusiveProps:${exclusiveProps.join(', or ')}`;
  return validator;
}
