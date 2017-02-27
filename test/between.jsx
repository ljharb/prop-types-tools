import { expect } from 'chai';
import React from 'react';

import { between } from '../';

import callValidator from './_callValidator';

describe('between', () => {
  it('returns a function', () => {
    expect(typeof between({ gt: 0, lt: 1 })).to.equal('function');
  });

  it('throws with non-number values', () => {
    expect(() => between({ gt: 'foo' })).to.throw(TypeError);
    expect(() => between({ lt: 'foo' })).to.throw(TypeError);
    expect(() => between({ gte: 'foo' })).to.throw(TypeError);
    expect(() => between({ lte: 'foo' })).to.throw(TypeError);
    expect(() => between({ gt: true })).to.throw(TypeError);
    expect(() => between({ lt: true })).to.throw(TypeError);
    expect(() => between({ gte: true })).to.throw(TypeError);
    expect(() => between({ lte: true })).to.throw(TypeError);
    expect(() => between({ gt: [] })).to.throw(TypeError);
    expect(() => between({ lt: [] })).to.throw(TypeError);
    expect(() => between({ gte: [] })).to.throw(TypeError);
    expect(() => between({ lte: [] })).to.throw(TypeError);
    expect(() => between({ gt: {} })).to.throw(TypeError);
    expect(() => between({ lt: {} })).to.throw(TypeError);
    expect(() => between({ gte: {} })).to.throw(TypeError);
    expect(() => between({ lte: {} })).to.throw(TypeError);
    expect(() => between({ gt() {} })).to.throw(TypeError);
    expect(() => between({ lt() {} })).to.throw(TypeError);
    expect(() => between({ gte() {} })).to.throw(TypeError);
    expect(() => between({ lte() {} })).to.throw(TypeError);
  });

  it('throws when there are no possible valid values', () => {
    expect(() => between({ gt: 2, lt: 2 })).to.throw(RangeError);
    expect(() => between({ gt: 3, lt: 2 })).to.throw(RangeError);

    expect(() => between({ gt: Infinity })).to.throw(RangeError);
    expect(() => between({ lt: -Infinity })).to.throw(RangeError);

    expect(() => between({ gte: 2, lt: 2 })).to.throw(RangeError);
    expect(() => between({ gte: 3, lt: 2 })).to.throw(RangeError);
    expect(() => between({ gt: 2, lte: 2 })).to.throw(RangeError);
    expect(() => between({ gt: 3, lte: 2 })).to.throw(RangeError);

    expect(() => between({ gte: 2, lte: 1 })).to.throw(RangeError);
  });

  function assertPasses(validator, element, propName) {
    const error = callValidator(validator, element, propName, '"between" test');
    expect(error).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    const error = callValidator(validator, element, propName, '"between" test');
    expect(error).to.be.instanceOf(Error);
  }

  it('fails when the prop value is not a number', () => {
    assertFails(
      between({ gte: 1, lte: 3 }),
      (<div a="1" />),
      'a',
    );
    assertFails(
      between({ gte: 1, lte: 3 }).isRequired,
      (<div a="1" />),
      'a',
    );
  });

  it('passes when inside the range', () => {
    assertPasses(between({ gte: -1, lt: 2 }), (<div a={-1} />), 'a');
    assertPasses(between({ gte: -1 }), (<div a={-1} />), 'a');
    assertPasses(between({ gte: -1, lte: 2 }), (<div a={2} />), 'a');
    assertPasses(between({ lte: 2 }), (<div a={2} />), 'a');

    assertPasses(between({ gt: -1, lt: 2 }), (<div a={-0} />), 'a');
    assertPasses(between({ gt: -1, lt: 2 }), (<div a={0} />), 'a');
    assertPasses(between({ gt: -1, lt: 2 }), (<div a={1} />), 'a');
  });

  it('fails when outside the range', () => {
    assertFails(between({ gt: -1, lt: 2 }), (<div a={-1} />), 'a');
    assertFails(between({ gt: -1 }), (<div a={-1} />), 'a');
    assertFails(between({ gt: 1, lt: 2 }), (<div a={2} />), 'a');
    assertFails(between({ lt: 2 }), (<div a={2} />), 'a');

    assertFails(between({ gt: 0, lt: 2 }), (<div a={-0} />), 'a');
    assertFails(between({ gt: 0, lt: 2 }), (<div a={0} />), 'a');
    assertFails(between({ gt: -1, lt: 1 }), (<div a={1} />), 'a');
  });
});
