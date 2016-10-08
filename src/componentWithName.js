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
  function validator(props, propName, componentName) {
    const prop = props[propName];
    return hasName(name, prop, propName, componentName);
  }
  validator.typeName = `componentWithName:${name}`;
  return validator;
}

export default componentWithName;
