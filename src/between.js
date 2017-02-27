import shape from './shape';
import wrapValidator from './helpers/wrapValidator';

function number(props, propName) {
  const value = props[propName];
  if (typeof value !== 'number' || isNaN(value)) {
    return new TypeError(`${propName}: a number is required`);
  }
  return null;
}

function noValidValues({ gt, gte, lt, lte }) {
  if (gt === Infinity || lt === -Infinity) {
    // nothing can be greater than infinity or less than -infinity
    return true;
  }

  if (typeof gt === 'number') {
    if (typeof lt === 'number') {
      return gt >= lt;
    }
    if (typeof lte === 'number') {
      return gt >= lte;
    }
  } else if (typeof gte === 'number') {
    if (typeof lt === 'number') {
      return gte >= lt;
    }
    if (typeof lte === 'number') {
      return gte > lte;
    }
  }

  return false;
}

function lowerCompare(value, { gt, gte }) {
  if (typeof gt === 'number') {
    return value > gt;
  }
  if (typeof gte === 'number') {
    return value >= gte;
  }
  return true;
}

function upperCompare(value, { lt, lte }) {
  if (typeof lt === 'number') {
    return value < lt;
  }
  if (typeof lte === 'number') {
    return value <= lte;
  }
  return true;
}

function greaterThanError({ gt, gte }) {
  if (typeof gt === 'number') {
    return `greater than ${gt}`;
  }
  if (typeof gte === 'number') {
    return `greater than or equal to ${gte}`;
  }
  return '';
}

function lessThanError({ lt, lte }) {
  if (typeof lt === 'number') {
    return `less than ${lt}`;
  }
  if (typeof lte === 'number') {
    return `less than or equal to ${lte}`;
  }
  return '';
}

function errorMessage(componentName, propName, opts) {
  const errors = [greaterThanError(opts), lessThanError(opts)].filter(Boolean).join(' and ');
  return `${componentName}: ${propName} must be ${errors}`;
}

const argValidators = [
  shape({ lt: number, gt: number }).isRequired,
  shape({ lte: number, gt: number }).isRequired,
  shape({ lt: number, gte: number }).isRequired,
  shape({ lte: number, gte: number }).isRequired,
  shape({ lt: number }).isRequired,
  shape({ lte: number }).isRequired,
  shape({ gt: number }).isRequired,
  shape({ gte: number }).isRequired,
];
function argValidator(props, propName) {
  return argValidators.every(validator => !!validator(props, propName));
}

export default function betweenValidator(opts) {
  const argError = argValidator({ opts }, 'opts');
  if (argError) {
    throw new TypeError('between: only one of the pairs of `lt`/`lte`, and `gt`/`gte`, may be supplied, and at least one pair must be provided.');
  }

  if (noValidValues(opts)) {
    throw new RangeError('between: values provided allow no possible valid values');
  }

  const validator = function between(props, propName, componentName) {
    const propValue = props[propName];
    if (propValue == null) {
      return null;
    }

    if (typeof propValue !== 'number') {
      return new RangeError(`${componentName}: ${propName} must be a number, got "${typeof propValue}"`);
    }

    if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
      const errors = [greaterThanError(opts), lessThanError(opts)].filter(Boolean).join(' and ');
      return new RangeError(`${componentName}: ${propName} must be ${errors}`);
    }

    return null;
  };
  validator.isRequired = function betweenRequired(props, propName, componentName) {
    const propValue = props[propName];
    if (typeof propValue !== 'number') {
      return new RangeError(`${componentName}: ${propName} must be a number, got "${typeof propValue}"`);
    }

    if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
      return new RangeError(errorMessage(componentName, propName, opts));
    }

    return null;
  };

  return wrapValidator(validator, 'between', opts);
}
