import { expect } from 'chai';
import React, { PropTypes } from 'react';

import { or } from '../';

import callValidator from './_callValidator';

describe('or', () => {
  it('returns a function', () => {
    expect(typeof or([PropTypes.string, PropTypes.bool])).to.equal('function');
  });

  it('throws if given a non-array', () => {
    expect(() => or()).to.throw(TypeError);
    expect(() => or(null)).to.throw(TypeError);
    expect(() => or(undefined)).to.throw(TypeError);
    expect(() => or({})).to.throw(TypeError);
  });

  it('throws if given an array of zero or one items', () => {
    expect(() => or([])).to.throw(RangeError);
    expect(() => or([PropTypes.string])).to.throw(RangeError);
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"or" test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"or" test')).to.be.instanceOf(Error);
  }

  it('allows composing propTypes', () => {
    const validator = or([PropTypes.bool, PropTypes.number, PropTypes.arrayOf(PropTypes.string)]);

    assertPasses(validator, (<div a />), 'a');
    assertPasses(validator, (<div a={1} />), 'a');
    assertPasses(validator, (<div a={[]} />), 'a');
    assertPasses(validator, (<div a={['b', 'c']} />), 'a');
    assertFails(validator, (<div a={['b', 1]} />), 'a');
    assertFails(validator, (<div a="b" />), 'a');

    assertFails(validator.isRequired, (<div />), 'a');
  });
});
