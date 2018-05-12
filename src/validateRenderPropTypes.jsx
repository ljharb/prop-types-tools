import includes from 'array-includes';
import entries from 'object.entries';
import React from 'react';
import getComponentName from './helpers/getComponentName';
import { RENDER_PROP_TYPE_PROPERTY } from './renderPropReturning';

const getPropTypeValidatorComponent = (validator) => {
  // we don't need to render the validator component in our tests, so we don't need coverage here
  /* istanbul ignore next */
  const PropTypeValidator = ({ children }) => children;
  PropTypeValidator.propTypes = {
    children: validator,
  };
  PropTypeValidator.displayName = `PropTypeValidator(${validator.typeName})`;
  return PropTypeValidator;
};

export default function validateRenderProps(Component) {
  const renderPropTypes = entries(Component.propTypes || {}).reduce((acc, [key, val]) => {
    if (val[RENDER_PROP_TYPE_PROPERTY] !== undefined) {
      acc[key] = val;
    }
    return acc;
  }, {});
  const renderPropTypeKeys = Object.keys(renderPropTypes);
  if (!renderPropTypeKeys.length) {
    return Component;
  }

  const componentName = getComponentName(Component);
  return (props) => {
    const propsCopy = { ...props };

    const propsToValidate = {};
    const restOfProps = {};
    entries(propsCopy).forEach(([key, val]) => {
      if (includes(renderPropTypeKeys, key)) {
        propsToValidate[key] = val;
      } else {
        restOfProps[key] = val;
      }
    });

    Object.keys(propsToValidate).forEach((key) => {
      const renderProp = propsToValidate[key];
      const Validator = getPropTypeValidatorComponent(
        renderPropTypes[key][RENDER_PROP_TYPE_PROPERTY],
      );
      Validator.displayName = `RenderPropValidator(${componentName}.${key})`;
      propsToValidate[key] = (...args) => <Validator>{renderProp(...args)}</Validator>;
    });

    return <Component {...propsToValidate} {...restOfProps} />;
  };
}
