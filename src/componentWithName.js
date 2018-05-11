import React from 'react';
import isRegex from 'is-regex';
import find from 'array.prototype.find';

import getComponentName from './helpers/getComponentName';
import wrapValidator from './helpers/wrapValidator';

function hasName(name, propValue, propName, componentName, ...rest) {
  if (Array.isArray(propValue)) {
    return find(
      propValue.map(item => hasName(name, item, propName, componentName, ...rest)),
      Boolean,
    ) || null;
  }

  if (!React.isValidElement(propValue)) {
    return new TypeError(
      `${componentName}.${propName} is not a valid React element`,
    );
  }

  const { type } = propValue;
  const componentNameFromType = getComponentName(type);

  if (isRegex(name) && !name.test(componentNameFromType)) {
    return new TypeError(
      `\`${componentName}.${propName}\` only accepts components matching the regular expression ${name}`,
    );
  }

  if (!isRegex(name) && componentNameFromType !== name) {
    return new TypeError(
      `\`${componentName}.${propName}\` only accepts components named ${name}`,
    );
  }

  return null;
}

export default function componentWithName(name) {
  if (typeof name !== 'string' && !isRegex(name)) {
    throw new TypeError('name must be a string or a regex');
  }

  function componentWithNameValidator(props, propName, componentName, ...rest) {
    const propValue = props[propName];
    if (props[propName] == null) {
      return null;
    }
    return hasName(name, propValue, propName, componentName, ...rest);
  }

  componentWithNameValidator.isRequired = function componentWithNameRequired(
    props,
    propName,
    componentName,
    ...rest
  ) {
    const propValue = props[propName];
    if (propValue == null) {
      return new TypeError(`\`${componentName}.${propName}\` requires at least one component named ${name}`);
    }
    return hasName(name, propValue, propName, componentName, ...rest);
  };

  return wrapValidator(componentWithNameValidator, `componentWithName:${name}`, name);
}
