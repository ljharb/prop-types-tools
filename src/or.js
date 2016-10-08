import { PropTypes } from 'react';

export default function or(validators, name = 'or') {
  if (!Array.isArray(validators)) {
    throw new TypeError('or: 2 or more validators are required');
  }
  if (validators.length <= 1) {
    throw new RangeError('or: 2 or more validators are required');
  }

  const validator = PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType(validators)),
      ...validators,
    ]),
  ]);
  validator.typeName = name;
  validator.isRequired.typeName = name;

  // NOTE: We null out the typechecker because we provide our own name:
  validator.typeChecker = null;
  validator.isRequired.typeChecker = null;

  return validator;
}
