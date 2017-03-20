import React from 'react';
import isRegex from 'is-regex';

import getComponentName from './helpers/getComponentName';
import wrapValidator from './helpers/wrapValidator';

function hasName(name, prop, propName, componentName) {
  if (Array.isArray(prop)) {
    return prop
      .map(item => hasName(name, item, propName, componentName))
      .find(Boolean) || null;
  }

  if (!React.isValidElement(prop)) {
    return new TypeError(
      `${componentName}.${propName} is not a valid React element`,
    );
  }

  const { type } = prop;
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

function componentWithName(name) {
  function componentWithNameValidator(props, propName, componentName) {
    const prop = props[propName];
    if (props[propName] == null) {
      return null;
    }
    return hasName(name, prop, propName, componentName);
  }

  componentWithNameValidator.isRequired = function componentWithNameRequired(
    props,
    propName,
    componentName,
  ) {
    const prop = props[propName];
    if (prop == null) {
      return new TypeError(`\`${componentName}.${propName}\` requires at least one component named ${name}`);
    }
    return hasName(name, prop, propName, componentName);
  };

  return wrapValidator(componentWithNameValidator, `componentWithName:${name}`, name);
}

export default componentWithName;
