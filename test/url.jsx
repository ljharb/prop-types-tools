import { expect } from 'chai';
import React from 'react';

import { url } from '../';

import callValidator from './_callValidator';

describe('url', () => {
  const validAbsoluteURL = 'https://www.airbnb.com';
  const validRelativeURL = '/foobar';
  const invalidURL = 'foobar';
  const componentName = 'url test';
  const propName = 'urlProp';

  it('returns a function', () => {
    expect(typeof url()).to.equal('function');
  });

  function assertPasses(validator, element) {
    expect(callValidator(validator, element, propName, componentName)).to.equal(null);
  }

  function assertFails(validator, element) {
    expect(callValidator(validator, element, propName, componentName)).to.be.instanceOf(Error);
  }

  function getElementWithURLPropValue(value) {
    return (<div urlProp={value} />);
  }

  it('passes on null values', () => {
    assertPasses(url(), getElementWithURLPropValue(undefined));
    assertPasses(url(), getElementWithURLPropValue(null));
  });

  it('passes on a valid url', () => {
    const element = getElementWithURLPropValue(validAbsoluteURL);
    assertPasses(url(), element);
    assertPasses(url().isRequired, element);
  });

  it('passes on a valid relative-absolute url', () => {
    const element = getElementWithURLPropValue(validRelativeURL);
    assertPasses(url(), element);
    assertPasses(url().isRequired, element);
  });

  it('fails for a non-string value', () => {
    const element = getElementWithURLPropValue(1);
    assertFails(url(), element);
    assertFails(url().isRequired, element);
  });

  it('fails on an invalid url', () => {
    const element = getElementWithURLPropValue(invalidURL);
    assertFails(url(), element);
    assertFails(url().isRequired, element);
  });

  describe('isRequired', () => {
    const elementWithoutURLProp = (<div />);

    it('passes when not required', () => assertPasses(url(), elementWithoutURLProp));
    it('fails when required', () => assertFails(url().isRequired, elementWithoutURLProp));
  });
});
