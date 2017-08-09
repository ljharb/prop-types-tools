export default function requiredBy(requiredByPropName, propType, defaultValue = null) {
  return function validator(props, propName, componentName, ...rest) {
    if (props[requiredByPropName]) {
      if (props[propName] === defaultValue || typeof props[propName] === 'undefined') {
        return new TypeError(
          `${componentName}: when ${requiredByPropName} is true, prop “${propName}” must be present.`,
        );
      }
    }
    return propType(props, propName, componentName, ...rest);
  };
}
