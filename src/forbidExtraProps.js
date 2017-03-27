import has from 'has';
import assign from 'object.assign';

import isPlainObject from './helpers/isPlainObject';

const zeroWidthSpace = '\u200b';
const semaphore = {};

function brand(fn) {
  return assign(fn, { [zeroWidthSpace]: semaphore });
}

function isBranded(value) {
  return value && value[zeroWidthSpace] === semaphore;
}

export default function forbidExtraProps(propTypes) {
  if (!isPlainObject(propTypes)) {
    throw new TypeError('given propTypes must be an object');
  }
  if (has(propTypes, zeroWidthSpace) && !isBranded(propTypes[zeroWidthSpace])) {
    throw new TypeError('Against all odds, you created a propType for a prop named after the zero-width space - which, sadly, conflicts with `forbidExtraProps`');
  }

  return assign({}, propTypes, {
    // eslint-disable-next-line prefer-arrow-callback
    [zeroWidthSpace]: brand(function forbidUnknownProps(props, _, componentName) {
      const unknownProps = Object.keys(props).filter(prop => !has(propTypes, prop));
      if (unknownProps.length > 0) {
        return new TypeError(`${componentName}: unknown props found: ${unknownProps.join(', ')}`);
      }
      return null;
    }),
  });
}
