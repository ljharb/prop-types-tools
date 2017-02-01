import { PropTypes } from 'react';

const { bool } = PropTypes;

export default function mutuallyExclusiveTrue(...exclusiveProps) {
  if (exclusiveProps.length < 1) {
    throw new TypeError('at least one prop that is mutually exclusive is required');
  }
  if (!exclusiveProps.every(x => typeof x === 'string')) {
    throw new TypeError('all exclusive true props must be strings');
  }

  const validator = function mutuallyExclusiveTrueProps(props, propName, componentName, ...rest) {
    const countProps = (count, prop) => (count + (props[prop] ? 1 : 0));

    const exclusivePropCount = exclusiveProps.reduce(countProps, 0);
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these boolean props be true: ${exclusiveProps.join(', or ')}`);
    }
    return bool(props, propName, componentName, ...rest);
  };
  validator.typeName = `mutuallyExclusiveTrueProps: ${exclusiveProps.join(', or ')}`;

  validator.isRequired = function mutuallyExclusiveTruePropsRequired(
    props,
    propName,
    componentName,
    ...rest
  ) {
    const countProps = (count, prop) => (count + (props[prop] ? 1 : 0));

    const exclusivePropCount = exclusiveProps.reduce(countProps, 0);
    if (exclusivePropCount > 1) {
      return new Error(`A ${componentName} cannot have more than one of these boolean props be true: ${exclusiveProps.join(', or ')}`);
    }
    return bool.isRequired(props, propName, componentName, ...rest);
  };

  return validator;
}
