import { expect } from 'chai';
import React from 'react';
import { bool, number } from 'prop-types';

import { requiredBy } from '../';
import callValidator from './_callValidator';

function assertPasses(validator, element, propName) {
  expect(callValidator(validator, element, propName, '"requiredBy" test')).to.equal(null);
}

function assertFails(validator, element, propName) {
  expect(callValidator(validator, element, propName, '"requiredBy" test')).to.be.instanceOf(Error);
}

describe('requiredBy propTypes', () => {
  describe('passed prop name into requiredBy exists', () => {
    it('passes when no props are present', () => {
      assertPasses(requiredBy('bar', bool), (<div bar={null} foo={null} />), 'foo');
    });

    it('passes when the prop that the requiredBy prop needs is passed in', () => {
      assertPasses(requiredBy('bar', bool), (<div bar foo />), 'foo');
      assertPasses(requiredBy('bar', number, 42), (<div bar foo={3} />), 'foo');
    });

    it('fails when the prop the requiredBy prop needs matches the defaultValue', () => {
      assertFails(requiredBy('bar', number, 42), (<div bar foo={42} />), 'foo');
      assertFails(requiredBy('bar', number, 0), (<div bar foo={0} />), 'foo');
    });

    it('fails when the prop the requiredBy prop needs has the wrong prop type', () => {
      assertFails(requiredBy('bar', bool), (<div bar foo="wrong" />), 'foo');
    });

    it('fails when the prop the requiredBy prop needs does not exist', () => {
      assertFails(requiredBy('bar', bool), (<div bar />), 'foo');
    });
  });

  describe('passed prop name into requiredBy does not exist', () => {
    it('passes when the prop the required prop needs is passed in', () => {
      assertPasses(requiredBy('bar', bool), (<div foo />), 'foo');
    });

    it('passes when the prop the required prop needs does not exist', () => {
      assertPasses(requiredBy('bar', bool), (<div foo />), 'foo');
    });
  });
});
