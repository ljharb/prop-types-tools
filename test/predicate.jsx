import { expect } from 'chai';
import React from 'react';

import { predicate } from '..';

import callValidator from './_callValidator';

describe('predicate', () => {
  it('returns a function', () => {
    expect(typeof predicate(() => {})).to.equal('function');
  });

  it('throws when provided a non-function predicate', () => {
    expect(() => predicate()).to.throw(TypeError);
  });

  it('throws when provided a non-string message', () => {
    expect(() => predicate(() => {}, null)).to.throw(TypeError);
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"predicate" test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"predicate" test')).to.be.instanceOf(Error);
  }

  it('passes on null/undefined', () => {
    const validator = predicate(() => false);

    assertPasses(validator, (<div foo={null} />), 'foo');
    assertPasses(validator, (<div foo={undefined} />), 'foo');
  });

  it('fails on null/undefined when required', () => {
    const validator = predicate(() => false).isRequired;

    assertFails(validator, (<div foo={null} />), 'foo');
    assertFails(validator, (<div foo={undefined} />), 'foo');
  });

  const values = [
    undefined,
    null,
    0,
    -0,
    42,
    Infinity,
    -Infinity,
    '',
    'foo',
    true,
    false,
    [],
    {},
    () => {},
  ];

  it('fails when the predicate returns false', () => {
    const validator = predicate(() => false);

    values.forEach((x) => {
      if (x != null) {
        assertFails(validator, (<div foo={x} />), 'foo');
      }
      assertFails(validator.isRequired, (<div foo={x} />), 'foo');
    });
  });

  it('passes when the predicate returns true', () => {
    const validator = predicate(() => true);

    values.forEach((x) => {
      assertPasses(validator, (<div foo={x} />), 'foo');
      assertPasses(validator.isRequired, (<div foo={x} />), 'foo');
    });
  });

  it('passes based on the predicate', () => {
    const validator = predicate((x) => x === 2);

    assertPasses(validator, (<div foo={2} />), 'foo');
    assertPasses(validator.isRequired, (<div foo={2} />), 'foo');

    assertFails(validator, (<div foo={3} />), 'foo');
    assertFails(validator.isRequired, (<div foo={3} />), 'foo');
  });
});
