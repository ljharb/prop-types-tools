import has from 'has';

const zeroWidthSpace = '\u200b';
const semaphore = {};

function brand(fn) {
  return Object.assign(fn, { [zeroWidthSpace]: semaphore });
}

function isBranded(value) {
  return value && value[zeroWidthSpace] === semaphore;
}

export default function forbidExtraProps(propTypes) {
  if (!propTypes || typeof propTypes !== 'object') {
    throw new TypeError('given propTypes must be an object');
  }
  if (has(propTypes, zeroWidthSpace) && !isBranded(propTypes[zeroWidthSpace])) {
    throw new TypeError('Against all odds, you created a propType for a prop named after the zero-width space - which, sadly, conflicts with `forbidExtraProps`');
  }

  return {
    ...propTypes,
    // eslint-disable-next-line prefer-arrow-callback
    [zeroWidthSpace]: brand(function forbidUnknownProps(props) {
      const unknownProps = Object.keys(props).filter(prop => !has(propTypes, prop));
      if (unknownProps.length > 0) {
        return new TypeError(`Unknown props found: ${unknownProps.join(', ')}`);
      }
      return null;
    }),
  };
}
