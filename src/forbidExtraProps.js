import has from 'has';

const zeroWidthSpace = '\u200b';

export default function forbidExtraProps(propTypes) {
  if (!propTypes || typeof propTypes !== 'object') {
    throw new TypeError('given propTypes must be an object');
  }
  if (has(propTypes, zeroWidthSpace)) {
    throw new TypeError('Against all odds, you created a propType for a prop named after the zero-width space - which, sadly, conflicts with `forbidExtraProps`');
  }

  return {
    ...propTypes,
    [zeroWidthSpace]: function forbid(props) {
      const unknownProps = Object.keys(props).filter(prop => !has(propTypes, prop));
      if (unknownProps.length > 0) {
        return new TypeError(`Unknown props found: ${Object.keys(unknownProps).join(', ')}`);
      }
      return null;
    },
  };
}
