import { expect } from 'chai';
import React, { PropTypes } from 'react';

import { and, nonNegativeInteger } from '../';

import callValidator from './_callValidator';

describe('and', () => {
  it('returns a function', () => {
    expect(typeof and([PropTypes.number, nonNegativeInteger])).to.equal('function');
  });

  it('throws on non-array input', () => {
    expect(() => and()).to.throw(TypeError);
    expect(() => and(null)).to.throw(TypeError);
    expect(() => and(undefined)).to.throw(TypeError);
    expect(() => and({})).to.throw(TypeError);
    expect(() => and(() => {})).to.throw(TypeError);
    expect(() => and(true)).to.throw(TypeError);
    expect(() => and(42)).to.throw(TypeError);
    expect(() => and('')).to.throw(TypeError);
  });

  it('requires at least 2 validators', () => {
    expect(() => and([])).to.throw(RangeError);
    expect(() => and([() => {}])).to.throw(RangeError);
    expect(() => and([() => {}, () => {}])).not.to.throw();
  });

  function assertPasses(validator, element, propName) {
    const result = callValidator(validator, element, propName, '"and" test');
    expect(result).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    const result = callValidator(validator, element, propName, '"and" test');
    expect(result).to.be.instanceOf(Error);
  }

  describe('validates both propTypes', () => {
    it('passes when expected', () => {
      const validatorNumber = and([PropTypes.number, nonNegativeInteger]);
      const validatorNonNegative = and([nonNegativeInteger, PropTypes.number]);

      assertPasses(validatorNumber, (<div a={1} />), 'a');
      assertPasses(validatorNonNegative, (<div a={1} />), 'a');
    });

    it('fails when expected', () => {
      const validatorNumber = and([PropTypes.number, nonNegativeInteger]);
      const validatorNonNegative = and([nonNegativeInteger, PropTypes.number]);
      const invalidElement = (<div a={-2} />);
      const prop = 'a';

      assertFails(validatorNumber, invalidElement, prop);
      assertFails(validatorNonNegative, invalidElement, prop);
    });

    it('fails in the right order', () => {
      const invalidElement = (<div a="b" />);
      const prop = 'a';

      expect(callValidator(
        and([PropTypes.number, nonNegativeInteger]),
        invalidElement,
        prop,
      )).to.eql(callValidator(PropTypes.number, invalidElement, prop));
      expect(callValidator(
        and([nonNegativeInteger, PropTypes.number]),
        invalidElement,
        prop,
      )).to.eql(callValidator(nonNegativeInteger, invalidElement, prop));
    });
  });

  describe('isRequired', () => {
    it('passes if not required', () => {
      const validatorNumber = and([PropTypes.number, nonNegativeInteger]);
      assertPasses(validatorNumber, (<div />), 'a');
    });

    it('fails if overarching one is required', () => {
      const validatorNumber = and([PropTypes.number, nonNegativeInteger]).isRequired;
      assertFails(validatorNumber, (<div />), 'a');
    });

    it('fails if an individual validator is required', () => {
      const validatorNumber = and([PropTypes.number, nonNegativeInteger.isRequired]);
      assertFails(validatorNumber, (<div />), 'a');
    });
  });
});
