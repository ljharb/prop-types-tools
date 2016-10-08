/* eslint
  react/no-multi-comp: 0,
  react/prefer-stateless-function: 0
*/

import React from 'react';
import { expect } from 'chai';

import { componentWithName } from '../';

import callValidator from './_callValidator';

function SFC() {}

function SFCwithName() {}
SFCwithName.displayName = 'SFC with a display name!';

class Component extends React.Component {}

class ComponentWithName extends React.Component {}
ComponentWithName.displayName = 'Component with a display name!';

describe('componentWithName', () => {
  it('returns a function', () => {
    expect(typeof componentWithName('name')).to.equal('function');
  });

  function assertPasses(validator, element, propName) {
    expect(callValidator(validator, element, propName)).to.equal(null);
  }

  function assertFails(validator, element, propName) {
    expect(callValidator(validator, element, propName)).to.be.instanceOf(Error);
  }

  describe('with a single child of the specified name', () => {
    it('passes with an SFC', () => assertPasses(
      componentWithName('SFC'),
      (<div><SFC default="Foo" /></div>),
      'children',
    ));

    it('passes with an SFC + displayName', () => assertPasses(
      componentWithName(SFCwithName.displayName),
      (<div><SFCwithName default="Foo" /></div>),
      'children',
    ));

    it('passes with a Component', () => assertPasses(
      componentWithName('Component'),
      (<div><Component default="Foo" /></div>),
      'children',
    ));

    it('passes with a Component + displayName', () => assertPasses(
      componentWithName(ComponentWithName.displayName),
      (<div><ComponentWithName default="Foo" /></div>),
      'children',
    ));
  });

  describe('with multiple children of the specified name', () => {
    it('passes with an SFC', () => assertPasses(
      componentWithName('SFC'),
      (
        <div>
          <SFC default="Foo" />
          <SFC default="Foo" />
          <SFC default="Foo" />
          <SFC default="Foo" />
        </div>
      ),
      'children',
    ));

    it('passes with an SFC + displayName', () => assertPasses(
      componentWithName(SFCwithName.displayName),
      (
        <div>
          <SFCwithName default="Foo" />
          <SFCwithName default="Foo" />
          <SFCwithName default="Foo" />
          <SFCwithName default="Foo" />
        </div>
      ),
      'children',
    ));

    it('passes with a Component', () => assertPasses(
      componentWithName('Component'),
      (
        <div>
          <Component default="Foo" />
          <Component default="Foo" />
          <Component default="Foo" />
          <Component default="Foo" />
        </div>
      ),
      'children',
    ));

    it('passes with a Component + displayName', () => assertPasses(
      componentWithName(ComponentWithName.displayName),
      (
        <div>
          <ComponentWithName default="Foo" />
          <ComponentWithName default="Foo" />
          <ComponentWithName default="Foo" />
          <ComponentWithName default="Foo" />
        </div>
      ),
      'children',
    ));
  });

  describe('with children of the specified names passed as an array', () => {
    it('passes with an SFC', () => assertPasses(
      componentWithName('SFC'),
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
    ));

    it('passes with an SFC + displayName', () => assertPasses(
      componentWithName(SFCwithName.displayName),
      (
        <div>
          {[
            <SFCwithName key="one" default="Foo" />,
            <SFCwithName key="two" default="Foo" />,
            <SFCwithName key="three" default="Foo" />,
          ]}
        </div>
      ),
      'children',
    ));

    it('passes with a Component', () => assertPasses(
      componentWithName('Component'),
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
    ));

    it('passes with a Component + displayName', () => assertPasses(
      componentWithName(ComponentWithName.displayName),
      (
        <div>
          {[
            <ComponentWithName key="one" default="Foo" />,
            <ComponentWithName key="two" default="Foo" />,
            <ComponentWithName key="three" default="Foo" />,
          ]}
        </div>
      ),
      'children',
    ));
  });

  describe('when an unspecified name is provided as a child', () => {
    it('passes with an SFC', () => assertFails(
      componentWithName('SFC'),
      (
        <div>
          <SFC default="Foo" />
          <section>No way.</section>
        </div>
      ),
      'children',
    ));

    it('passes with an SFC + displayName', () => assertFails(
      componentWithName(SFCwithName.displayName),
      (
        <div>
          <SFCwithName default="Foo" />
          <section>No way.</section>
        </div>
      ),
      'children',
    ));

    it('passes with a Component', () => assertFails(
      componentWithName('Component'),
      (
        <div>
          <Component default="Foo" />
          <section>No way.</section>
        </div>
      ),
      'children',
    ));

    it('passes with a Component + displayName', () => assertFails(
      componentWithName(ComponentWithName.displayName),
      (
        <div>
          <ComponentWithName default="Foo" />
          <section>No way.</section>
        </div>
      ),
      'children',
    ));
  });

  it('fails when the provided prop is not a component', () => assertFails(
    componentWithName('SFC'),
    (
      <div>
        Blah blah blah.
      </div>
    ),
    'children',
  ));
});
