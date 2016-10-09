import React from 'react';

function hasName(name, prop, propName, componentName) {
  if (Array.isArray(prop)) {
    return prop
      .map(item => hasName(name, item, propName, componentName))
      .find(Boolean) || null;
  }

  if (!React.isValidElement(prop)) {
    return new TypeError(
      `${componentName}.${propName} is not a valid React element`
    );
  }

  const { type } = prop;
  if (type.name !== name && type.displayName !== name) {
    return new TypeError(
      `\`${componentName}.${propName}\` only accepts components named ${name}`
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
  componentWithNameValidator.typeName = `componentWithName:${name}`;

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
  componentWithNameValidator.isRequired.typeName = `componentWithName:${name}`;

  return componentWithNameValidator;
}

export default componentWithName;
