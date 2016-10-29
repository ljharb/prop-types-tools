import { expect } from 'chai';
import React, { PropTypes } from 'react';

import { uniqueArrayOf } from '../';

import callValidator from './_callValidator';

describe('uniqueArrayOf', () => {
  it('is a function', () => {
    expect(typeof uniqueArrayOf).to.equal('function');
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"uniqueArrayOf" test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"uniqueArrayOf" test')).to.be.instanceOf(Error);
  }

  it('throws if not given a function', () => {
    expect(() => uniqueArrayOf()).to.throw(TypeError);
    expect(() => uniqueArrayOf(undefined)).to.throw(TypeError);
    expect(() => uniqueArrayOf(null)).to.throw(TypeError);
    expect(() => uniqueArrayOf([])).to.throw(TypeError);
    expect(() => uniqueArrayOf({})).to.throw(TypeError);
    expect(() => uniqueArrayOf('')).to.throw(TypeError);
    expect(() => uniqueArrayOf(42)).to.throw(TypeError);
    expect(() => uniqueArrayOf(NaN)).to.throw(TypeError);
  });

  it('returns a function', () => {
    expect(typeof uniqueArrayOf(() => {})).to.equal('function');
  });

  it('requires an array', () => assertFails(
    uniqueArrayOf(() => {}),
    (<div foo="bar" />),
    'foo',
  ));

  it('is not required by default', () => assertPasses(
    uniqueArrayOf(() => {}),
    (<div foo="bar" />),
    'missing',
  ));

  it('is required with .isRequired', () => assertFails(
    uniqueArrayOf(() => {}).isRequired,
    (<div foo="bar" />),
    'missing',
  ));

  it('enforces the provided validator', () => {
    assertFails(
      uniqueArrayOf(PropTypes.number),
      (<div foo={[1, 2, '3', 4]} />),
      'foo',
    );
    assertPasses(
      uniqueArrayOf(PropTypes.number),
      (<div foo={[1, 2, 3, 4]} />),
      'foo',
    );
  });

  it('enforces uniqueness', () => {
    assertFails(
      uniqueArrayOf(PropTypes.number),
      (<div foo={[3, 1, 2, 3, 4]} />),
      'foo',
    );
    assertPasses(
      uniqueArrayOf(PropTypes.number),
      (<div foo={[1, 2, 3, 4]} />),
      'foo',
    );
  });

  it('enforces uniqueness of objects too', () => {
    const arr = [1];

    assertFails(
      uniqueArrayOf(PropTypes.array),
      (<div foo={[[1], arr, arr]} />),
      'foo',
    );
    assertPasses(
      uniqueArrayOf(PropTypes.array),
      (<div foo={[[1], arr, [1]]} />),
      'foo',
    );
  });
});
