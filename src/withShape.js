import and from './and';

export default function withShape(type, shapeTypes) {
  if (typeof type !== 'function') {
    throw new TypeError('type must be a valid PropType');
  }
  if (!shapeTypes || Array.isArray(shapeTypes) || typeof shapeTypes !== 'object') {
    throw new TypeError('shape must be a normal object');
  }
  return and([
    type,
    function universalShape(props, propName, componentName, location, propFullName, ...rest) {
      const propValue = props[propName];
      if (propValue == null) {
        return null;
      }
      // code adapted from PropTypes.shape: https://github.com/facebook/react/blob/14156e56b9cf18ac86963185c5af4abddf3ff811/src/isomorphic/classic/types/ReactPropTypes.js#L381
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const key in shapeTypes) {
        const checker = shapeTypes[key];
        if (checker) {
          const error = checker(
            propValue,
            key,
            componentName,
            location,
            `${propFullName}.${key}`,
            ...rest
          );
          if (error) {
            return error;
          }
        }
      }
      return null;
    },
  ], 'withShape');
}
