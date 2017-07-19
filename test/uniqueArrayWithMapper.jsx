import { expect } from 'chai';
import React from 'react';

import { uniqueArrayWithMapper } from '../';

import callValidator from './_callValidator';

describe('uniqueArrayWithMapper', () => {
  function identityMapper(element) { return element; }
  function constantMapper(element) { return element ** 0; }
  function objectMapper(element) { return element.exampleKey; }

  it('returns a function', () => {
    expect(typeof uniqueArrayWithMapper(identityMapper)).to.equal('function');
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"uniqueArrayWithMapper" test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"uniqueArrayWithMapper" test')).to.be.instanceOf(Error);
  }

  it('requires an array', () => assertFails(
    uniqueArrayWithMapper(identityMapper),
    (<div foo="bar" />),
    'foo',
  ));

  it('is not required by default', () => assertPasses(
    uniqueArrayWithMapper(identityMapper),
    (<div foo={[1, 2]} />),
    'missing',
  ));

  it('throws if not given a function', () => {
    expect(() => uniqueArrayWithMapper()).to.throw(TypeError);
    expect(() => uniqueArrayWithMapper(undefined)).to.throw(TypeError);
    expect(() => uniqueArrayWithMapper(null)).to.throw(TypeError);
    expect(() => uniqueArrayWithMapper([])).to.throw(TypeError);
    expect(() => uniqueArrayWithMapper({})).to.throw(TypeError);
    expect(() => uniqueArrayWithMapper('')).to.throw(TypeError);
    expect(() => uniqueArrayWithMapper(42)).to.throw(TypeError);
    expect(() => uniqueArrayWithMapper(NaN)).to.throw(TypeError);
  });

  it('is required with .isRequired', () => assertFails(
    uniqueArrayWithMapper(identityMapper).isRequired,
    (<div foo="bar" />),
    'missing',
  ));

  it('enforces uniqueness', () => {
    assertFails(
      uniqueArrayWithMapper(identityMapper),
      (<div foo={[3, 1, 2, 3, 4]} />),
      'foo',
    );
    assertPasses(
      uniqueArrayWithMapper(identityMapper),
      (<div foo={[1, 2, 3, 4]} />),
      'foo',
    );
    assertFails(
      uniqueArrayWithMapper(constantMapper),
      (<div foo={[1, 2, 3, 4]} />),
      'foo',
    );
  });

  it('enforces uniqueness of objects too', () => {
    assertFails(
      uniqueArrayWithMapper(objectMapper),
      (<div foo={[{ exampleKey: 1, otherKey: 2 }, { exampleKey: 1, otherKey: 3 }]} />),
      'foo',
    );
    assertPasses(
      uniqueArrayWithMapper(objectMapper),
      (<div foo={[{ exampleKey: 1, otherKey: 2 }, { exampleKey: 2, otherKey: 2 }]} />),
      'foo',
    );
  });
});
