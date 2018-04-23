import { func } from 'prop-types';

export const RENDER_PROP_TYPE_PROPERTY = '__renderPropType__';

export default function renderPropReturning(propType) {
  if (!propType) {
    throw new TypeError(
      'renderPropReturning requires a validator to be passed in as its first argument.',
    );
  }
  const basePropType = (...args) => func(...args);
  basePropType[RENDER_PROP_TYPE_PROPERTY] = propType;
  basePropType.isRequired = (...args) => func.isRequired(...args);
  basePropType.isRequired[RENDER_PROP_TYPE_PROPERTY] = propType;
  return basePropType;
}
