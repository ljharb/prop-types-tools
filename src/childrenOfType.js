import React from 'react';

function onlyTypes(types, children, componentName) {
  if (!children.every(child => child && types.find(Type => child.type === Type))) {
    const typeNames = types.map(({ name }) => name).join(', or ');
    return new TypeError(
      `\`${componentName}\` only accepts children of type ${typeNames}`,
    );
  }
  return null;
}

function isRequired(types, children, componentName) {
  if (children.length === 0) {
    const typeNames = types.map(({ name }) => name).join(', or ');
    return new TypeError(`\`${componentName}\` requires at least one node of type ${typeNames}`);
  }
  return null;
}

function childrenOfType(...types) {
  function validator(props, propName, componentName) {
    const prop = props[propName];
    const children = React.Children.toArray(prop).filter(child => child === 0 || child);
    return onlyTypes(types, children, componentName);
  }
  validator.typeName = 'childrenOfType';

  validator.isRequired = (props, propName, componentName) => {
    const prop = props[propName];
    const children = React.Children.toArray(prop).filter(child => child === 0 || child);
    return isRequired(types, children, componentName) || onlyTypes(types, children, componentName);
  };
  validator.isRequired.typeName = 'childrenOfType';

  return validator;
}

export default childrenOfType;
