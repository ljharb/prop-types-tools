export default function nonNegativeInteger(props, propName, componentName) {
  const value = props[propName];

  if (value == null || (Number.isInteger(value) && value >= 0 && !Object.is(value, -0))) {
    return null;
  }

  return new RangeError(`${propName} in ${componentName} must be a non-negative integer`);
}
