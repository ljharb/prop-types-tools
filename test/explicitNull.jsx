import { expect } from 'chai';
import React from 'react';

import { explicitNull } from '../';

import callValidator from './_callValidator';

describe('explicitNull', () => {
  it('returns a function', () => {
    expect(typeof explicitNull()).to.equal('function');
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"explicitNull" test')).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName, '"explicitNull" test')).to.be.instanceOf(Error);
  }

  it('passes on null/undefined/missing', () => {
    assertPasses(explicitNull(), (<div foo={null} />), 'foo');
    assertPasses(explicitNull(), (<div foo={undefined} />), 'foo');
    assertPasses(explicitNull(), (<div />), 'foo');
  });

  it('fails on undefined/missing when required', () => {
    assertFails(explicitNull().isRequired, <div foo={undefined} />, 'foo');
    assertFails(explicitNull().isRequired, <div />, 'foo');
  });

  it('fails on any other value', () => {
    assertFails(explicitNull(), (<div foo={false} />), 'foo');
    assertFails(explicitNull(), (<div foo={NaN} />), 'foo');
    assertFails(explicitNull(), (<div foo={[]} />), 'foo');
    assertFails(explicitNull(), (<div foo={{}} />), 'foo');
    assertFails(explicitNull(), (<div foo="" />), 'foo');
    assertFails(explicitNull(), (<div foo="foo" />), 'foo');
    assertFails(explicitNull(), (<div foo={() => {}} />), 'foo');
    assertFails(explicitNull(), (<div foo={/a/g} />), 'foo');
  });

  it('fails on any other value when required', () => {
    assertFails(explicitNull().isRequired, (<div foo={false} />), 'foo');
    assertFails(explicitNull().isRequired, (<div foo={NaN} />), 'foo');
    assertFails(explicitNull().isRequired, (<div foo={[]} />), 'foo');
    assertFails(explicitNull().isRequired, (<div foo={{}} />), 'foo');
    assertFails(explicitNull().isRequired, (<div foo="" />), 'foo');
    assertFails(explicitNull().isRequired, (<div foo="foo" />), 'foo');
    assertFails(explicitNull().isRequired, (<div foo={() => {}} />), 'foo');
    assertFails(explicitNull().isRequired, (<div foo={/a/g} />), 'foo');
  });
});
