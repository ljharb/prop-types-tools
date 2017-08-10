import is from 'object-is';

export default function requiredBy(requiredByPropName, propType, defaultValue = null) {
  return function validator(props, propName, componentName, ...rest) {
    if (props[requiredByPropName]) {
      const propValue = props[propName];
      if (is(propValue, defaultValue) || typeof propValue === 'undefined') {
        return new TypeError(
          `${componentName}: when ${requiredByPropName} is true, prop “${propName}” must be present.`,
        );
      }
    }
    return propType(props, propName, componentName, ...rest);
  };
}
