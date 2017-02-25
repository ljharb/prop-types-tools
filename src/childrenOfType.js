import { PropTypes } from 'react';

import childrenOf from './childrenOf';
import elementType from './elementType';
import wrapValidator from './helpers/wrapValidator';

export default function childrenOfType(...types) {
  if (types.length < 1) {
    throw new TypeError('childrenOfType: at least 1 type is required');
  }
  const typeValidators = types.map(elementType);
  return wrapValidator(childrenOf(PropTypes.oneOfType(typeValidators)), 'childrenOfType', types);
}
