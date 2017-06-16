import wrapValidator from './helpers/wrapValidator';

function mutuallyExclusiveOfType(propType, ...exclusiveProps) {
  if (typeof propType !== 'function') {
    throw new TypeError('a propType is required');
  }

  if (exclusiveProps.length < 1) {
    throw new TypeError('at least one prop that is mutually exclusive with this propType is required');
  }

  const propList = exclusiveProps.join(', or ');

  const map = exclusiveProps.reduce((acc, prop) => ({ ...acc, [prop]: true }), {});
  const countProps = (count, prop) => (count + (map[prop] ? 1 : 0));

  const validator = function mutuallyExclusiveOfTypeProps(props, propName, componentName, ...rest) {
    const exclusivePropCount = Object.keys(props)
      .filter(prop => props[prop] != null)
      .reduce(countProps, 0);
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these props: ${propList}`);
    }
    return propType(props, propName, componentName, ...rest);
  };

  validator.isRequired = function mutuallyExclusivePropsRequired(
    props,
    propName,
    componentName,
    ...rest
  ) {
    const exclusivePropCount = Object.keys(props)
      .filter(prop => prop === propName || props[prop] != null)
      .reduce(countProps, 0);
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these props: ${propList}`);
    }
    return propType(props, propName, componentName, ...rest);
  };

  return wrapValidator(validator, `mutuallyExclusiveProps:${propList}`, exclusiveProps);
}

export default function mutuallyExclusive(exclusiveProps) {
  if (typeof exclusiveProps === 'function') {
    return mutuallyExclusiveOfType(...arguments); // eslint-disable-line prefer-rest-params
  }

  if (Object.keys(exclusiveProps).length < 1) {
    throw new TypeError('at least one prop that is mutually exclusive with this propType is required');
  }

  const propList = Object.keys(exclusiveProps).join(', or ');

  const countProps = (count, prop) => (count + (exclusiveProps[prop] ? 1 : 0));

  const validator = function mutuallyExclusiveProps(props, propName, componentName, ...rest) {
    const exclusivePropCount = Object.keys(props)
      .filter(prop => props[prop] != null)
      .reduce(countProps, 0);
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these props: ${propList}`);
    }
    if (exclusiveProps[propName] == null) {
      return null;
    }
    return exclusiveProps[propName](props, propName, componentName, ...rest);
  };

  validator.isRequired = function mutuallyExclusivePropsRequired(
    props,
    propName,
    componentName,
    ...rest
  ) {
    const exclusivePropCount = Object.keys(props)
      .filter(prop => prop === propName || props[prop] != null)
      .reduce(countProps, 0);
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these props: ${propList}`);
    }
    if (exclusiveProps[propName] == null) {
      return null;
    }
    return exclusiveProps[propName](props, propName, componentName, ...rest);
  };

  return wrapValidator(validator, `mutuallyExclusiveProps:${propList}`, exclusiveProps);
}
