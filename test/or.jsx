import { expect } from 'chai';
import React, { PropTypes } from 'react';

import { or } from '../';

import callValidator from './_callValidator';

const { bool, string, number, arrayOf } = PropTypes;

describe('or', () => {
  it('returns a function', () => {
    expect(typeof or([string, bool])).to.equal('function');
  });

  it('throws if given a non-array', () => {
    expect(() => or()).to.throw(TypeError);
    expect(() => or(null)).to.throw(TypeError);
    expect(() => or(undefined)).to.throw(TypeError);
    expect(() => or({})).to.throw(TypeError);
  });

  it('throws if given an array of zero or one items', () => {
    expect(() => or([])).to.throw(RangeError);
    expect(() => or([string])).to.throw(RangeError);
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"or" test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"or" test')).to.be.instanceOf(Error);
  }

  it('allows composing propTypes', () => {
    const validator = or([bool, number, arrayOf(string)]);

    assertPasses(validator, (<div a />), 'a');
    assertPasses(validator, (<div a={1} />), 'a');
    assertPasses(validator, (<div a={[]} />), 'a');
    assertPasses(validator, (<div a={['b', 'c']} />), 'a');
    assertFails(validator, (<div a={['b', 1]} />), 'a');
    assertFails(validator, (<div a="b" />), 'a');

    assertPasses(validator.isRequired, (<div a />), 'a');
    assertPasses(validator.isRequired, (<div a={1} />), 'a');
    assertPasses(validator.isRequired, (<div a={[]} />), 'a');
    assertPasses(validator.isRequired, (<div a={['b', 'c']} />), 'a');
    assertFails(validator.isRequired, (<div a={['b', 1]} />), 'a');
    assertFails(validator.isRequired, (<div a="b" />), 'a');

    assertFails(validator.isRequired, (<div />), 'a');
  });
});
