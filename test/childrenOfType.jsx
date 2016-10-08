import { expect } from 'chai';
import React from 'react';

import { childrenOfType } from '../';

import callValidator from './_callValidator';

function SFC() {}
class Component extends React.Component {} // eslint-disable-line react/prefer-stateless-function

describe('childrenOfType', () => {
  function assertPasses(validator, element, propName, componentName) {
    expect(callValidator(validator, element, propName, componentName)).to.equal(null);
  }

  function assertFails(validator, element, propName, componentName) {
    expect(callValidator(validator, element, propName, componentName)).to.be.instanceOf(Error);
  }

  describe('with a single child of the specified type', () => {
    it('passes with a DOM element', () => assertPasses(
      childrenOfType('span'),
      (<div><span /></div>),
      'children',
      'span!',
    ));

    it('passes with an SFC', () => assertPasses(
      childrenOfType(SFC),
      (<div><SFC default="Foo" /></div>),
      'children',
      'SFC!',
    ));

    it('passes with a Component', () => assertPasses(
      childrenOfType(Component),
      (<div><Component default="Foo" /></div>),
      'children',
      'Component!',
    ));
  });

  describe('with multiple children of the specified type', () => {
    it('passes with a DOM element', () => assertPasses(
      childrenOfType('span'),
      (
        <div>
          <span />
          <span />
          <span />
          <span />
        </div>
      ),
      'children',
      'span!',
    ));

    it('passes with an SFC', () => assertPasses(
      childrenOfType(SFC),
      (
        <div>
          <SFC default="Foo" />
          <SFC default="Foo" />
          <SFC default="Foo" />
          <SFC default="Foo" />
        </div>
      ),
      'children',
      'SFC!',
    ));

    it('passes with a Component', () => assertPasses(
      childrenOfType(Component),
      (
        <div>
          <Component default="Foo" />
          <Component default="Foo" />
          <Component default="Foo" />
          <Component default="Foo" />
        </div>
      ),
      'children',
      'Component!',
    ));
  });

  describe('with children of the specified types passed as an array', () => {
    it('passes with a DOM element', () => assertPasses(
      childrenOfType('span'),
      (
        <div>
          {[
            <span key="one" />,
            <span key="two" />,
            <span key="three" />,
          ]}
        </div>
      ),
      'children',
      'span!',
    ));

    it('passes with an SFC', () => assertPasses(
      childrenOfType(SFC),
      (
        <div>
          {[
            <SFC key="one" default="Foo" />,
            <SFC key="two" default="Foo" />,
            <SFC key="three" default="Foo" />,
          ]}
        </div>
      ),
      'children',
      'SFC!',
    ));

    it('passes with a Component', () => assertPasses(
      childrenOfType(Component),
      (
        <div>
          {[
            <Component key="one" default="Foo" />,
            <Component key="two" default="Foo" />,
            <Component key="three" default="Foo" />,
          ]}
        </div>
      ),
      'children',
      'Component!',
    ));
  });

  describe('when an unspecified type is provided as a child', () => {
    it('fails expecting a DOM element', () => assertFails(
      childrenOfType('span'),
      (
        <div>
          <span />
          <section>No way.</section>
        </div>
      ),
      'children',
      'span!',
    ));

    it('fails expecting an SFC', () => assertFails(
      childrenOfType(SFC),
      (
        <div>
          <SFC default="Foo" />
          <section>No way.</section>
        </div>
      ),
      'children',
      'SFC!',
    ));

    it('fails expecting a Component', () => assertFails(
      childrenOfType(Component),
      (
        <div>
          <Component default="Foo" />
          <section>No way.</section>
        </div>
      ),
      'children',
      'Component!',
    ));
  });
});
