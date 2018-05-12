import { expect } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';

import { RENDER_PROP_TYPE_PROPERTY } from '../build/renderPropReturning';

import {
  renderPropReturning,
  childrenOf,
  childrenOfType,
  elementType,
  validateRenderPropTypes,
} from '../';

import callValidator from './_callValidator';

function SFC() {
  const { render } = this.props;
  return render ? render() : null;
}

class Component extends React.Component {
  render() {
    const { render } = this.props;
    return render ? render() : null;
  }
}

describe('renderPropReturning', () => {
  it('throws when no validator is passed as argument', () => {
    expect(() => renderPropReturning()).to.throw();
  });

  it('returns a function', () => {
    expect(typeof renderPropReturning(childrenOf('span'))).to.equal('function');
  });

  const originalConsoleWarn = console.warn; // eslint-disable-line
  const originalConsoleError = console.error; // eslint-disable-line
  function disableConsoleWarnOrError() {
    console.warn = () => ({}); // eslint-disable-line
    console.error = () => ({}); // eslint-disable-line
  }
  function enableConsoleWarnOrError() {
    console.warn = originalConsoleWarn; // eslint-disable-line
    console.error = originalConsoleError; // eslint-disable-line
  }

  function assertPasses(validator, element, propName, componentName) {
    expect(callValidator(validator, element, propName, componentName)).to.equal(null);
  }

  function assertFails(validator, element, propName, componentName) {
    expect(callValidator(validator, element, propName, componentName)).to.be.instanceOf(Error);
  }

  function assertRenderPropPasses(
    renderPropValidator,
    ComponentType,
    props,
    propName,
    componentName,
  ) {
    // first assert the renderPropValidator itself on an element of ComponentType for propName
    assertPasses(renderPropValidator, <ComponentType {...props} />, propName, componentName);
    // then assert that the render prop itself returns passes the validator
    const validator = renderPropValidator[RENDER_PROP_TYPE_PROPERTY];
    const instance = ComponentType(props);
    disableConsoleWarnOrError();
    const element = instance.props[propName]();
    enableConsoleWarnOrError();
    assertPasses(validator, element, 'children', componentName);
  }

  function assertRenderPropFails(
    renderPropValidator,
    ComponentType,
    props,
    propName,
    componentName,
  ) {
    // first assert the renderPropValidator itself on an element of ComponentType for propName
    const renderPropResult = callValidator(
      renderPropValidator,
      <ComponentType {...props} />,
      propName,
      componentName,
    );
    if (renderPropResult instanceof Error) {
      expect(renderPropResult).to.be.instanceOf(Error);
      return;
    }
    // then assert that the render prop itself returns fails the validator
    const validator = renderPropValidator[RENDER_PROP_TYPE_PROPERTY];
    const instance = ComponentType(props);
    disableConsoleWarnOrError();
    const element = instance.props[propName]();
    enableConsoleWarnOrError();
    assertFails(validator, element, 'children', componentName);
  }

  it('passes on nil values', () => {
    const validator = renderPropReturning(childrenOfType('span'));
    Component.propTypes = {
      render: validator, // eslint-disable-line
    };
    const WrappedComponent = validateRenderPropTypes(Component);
    assertPasses(validator, <WrappedComponent render={null} />, 'render', 'nil values test');
    assertPasses(validator, <WrappedComponent render={undefined} />, 'render', 'nil values test');
  });

  it('fails on nil values when required', () => {
    const validator = renderPropReturning(childrenOfType('span')).isRequired;
    Component.propTypes = {
      render: validator, // eslint-disable-line
    };
    const WrappedComponent = validateRenderPropTypes(Component);
    assertFails(validator, <WrappedComponent render={null} />, 'render', 'isRequired test');
    assertFails(validator, <WrappedComponent render={undefined} />, 'render', 'isRequired test');
  });

  it('fails on non function values', () => {
    const validator = renderPropReturning(childrenOfType('span'));
    Component.propTypes = {
      render: validator, // eslint-disable-line
    };
    const WrappedComponent = validateRenderPropTypes(Component);
    assertFails(validator, <WrappedComponent render={2} />, 'render', 'non-function values test');
    assertFails(
      validator,
      <WrappedComponent render={false} />,
      'render',
      'non-function values test',
    );
    assertFails(validator, <WrappedComponent render="foo" />, 'render', 'non-function values test');
    assertFails(validator, <WrappedComponent render={[]} />, 'render', 'non-function values test');
  });

  it('passes when children prop is used as render prop', () => {
    const validator = renderPropReturning(childrenOfType('span'));
    Component.propTypes = {
      children: validator, // eslint-disable-line
    };
    const WrappedComponent = validateRenderPropTypes(Component);
    assertRenderPropPasses(
      validator,
      WrappedComponent,
      { children: () => <span /> },
      'children',
      'children prop test',
    );
  });

  it('behaves correctly with childrenOfType validator', () => {
    Component.propTypes = {
      render: renderPropReturning(childrenOfType('span')), // eslint-disable-line
    };
    let ValidatedComponent = validateRenderPropTypes(Component);
    assertRenderPropPasses(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => <span /> },
      'render',
      'childrenOfType(span)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => <div /> },
      'render',
      'childrenOfType(span)',
    );

    Component.propTypes = {
      render: renderPropReturning(childrenOfType(SFC)), // eslint-disable-line
    };
    ValidatedComponent = validateRenderPropTypes(Component);
    assertRenderPropPasses(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => <SFC /> },
      'render',
      'childrenOfType(SFC)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => <div /> },
      'render',
      'childrenOfType(SFC)',
    );

    Component.propTypes = {
      render: renderPropReturning(childrenOfType(SFC, Component, 'span').isRequired).isRequired, // eslint-disable-line
    };
    ValidatedComponent = validateRenderPropTypes(Component);
    assertRenderPropPasses(
      Component.propTypes.render,
      ValidatedComponent,
      {
        render: () => [
          <span key="one" default="Foo" />,
          <Component key="two" default="Foo" />,
          <SFC key="three" default="Foo" />,
        ],
      },
      'render',
      'childrenOfType(SFC, Component, span)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => <div /> },
      'render',
      'childrenOfType(SFC, Component, span)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => null },
      'render',
      'childrenOfType(SFC, Component, span)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      {},
      'render',
      'childrenOfType(SFC, Component, span)',
    );
  });

  it('behaves correctly with childrenOf validator', () => {
    Component.propTypes = {
      render: renderPropReturning(childrenOf(PropTypes.string)), // eslint-disable-line
    };
    let ValidatedComponent = validateRenderPropTypes(Component);
    assertRenderPropPasses(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => 'foobar' },
      'render',
      'childrenOf(string)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => 2 },
      'render',
      'childrenOf(string)',
    );

    Component.propTypes = {
      render: renderPropReturning(childrenOf(PropTypes.number).isRequired), // eslint-disable-line
    };
    ValidatedComponent = validateRenderPropTypes(Component);
    assertRenderPropPasses(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => 2 },
      'render',
      'childrenOf(number)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => 'foobar' },
      'render',
      'childrenOf(number)',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      { render: () => null },
      'render',
      'childrenOf(string)',
    );

    Component.propTypes = {
      render: renderPropReturning(childrenOf(elementType(SFC))), // eslint-disable-line
    };
    ValidatedComponent = validateRenderPropTypes(Component);
    assertRenderPropPasses(
      Component.propTypes.render,
      ValidatedComponent,
      {
        render: () => [
          <SFC key="one" default="Foo" />,
          <SFC key="two" default="Foo" />,
          <SFC key="three" default="Foo" />,
        ],
      },
      'render',
      'childrenOf(elementType(SFC))',
    );
    assertRenderPropFails(
      Component.propTypes.render,
      ValidatedComponent,
      {
        render: () => (
          <div>
            <SFC default="Foo" />
            <section>No way.</section>
          </div>
        ),
      },
      'render',
      'childrenOf(elementType(SFC))',
    );
  });
});
