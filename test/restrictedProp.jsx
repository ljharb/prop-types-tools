import { expect } from 'chai';
import React from 'react';

import { restrictedProp } from '../';

import callValidator from './_callValidator';

describe('restrictedProp', () => {
  it('returns a function', () => {
    expect(typeof restrictedProp()).to.equal('function');
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"restrictedProp" test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"restrictedProp" test')).to.be.instanceOf(Error);
  }

  it('passes on null/undefined', () => {
    assertPasses(restrictedProp(), (<div foo={null} />), 'foo');
    assertPasses(restrictedProp(), (<div foo={undefined} />), 'foo');
  });

  it('fails on any other value', () => {
    assertFails(restrictedProp(), (<div foo={false} />), 'foo');
    assertFails(restrictedProp(), (<div foo />), 'foo');
    assertFails(restrictedProp(), (<div foo={NaN} />), 'foo');
    assertFails(restrictedProp(), (<div foo={[]} />), 'foo');
    assertFails(restrictedProp(), (<div foo={{}} />), 'foo');
    assertFails(restrictedProp(), (<div foo="" />), 'foo');
    assertFails(restrictedProp(), (<div foo="foo" />), 'foo');
    assertFails(restrictedProp(), (<div foo={() => {}} />), 'foo');
    assertFails(restrictedProp(), (<div foo={/a/g} />), 'foo');
  });
});
