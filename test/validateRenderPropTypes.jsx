import { expect } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';

import { validateRenderPropTypes, renderPropReturning, childrenOfType } from '../';

class Component extends React.Component {
  render() {
    const { render } = this.props;
    return render ? render() : null;
  }
}

describe('validateRenderPropTypes', () => {
  it('has no effect when no prop types are set', () => {
    const WrappedComponent = validateRenderPropTypes(Component);
    expect(WrappedComponent).to.equal(Component);
  });

  it('has no effect when no render prop types are set', () => {
    Component.propTypes = {
      foobarProp: PropTypes.string, // eslint-disable-line
    };
    const WrappedComponent = validateRenderPropTypes(Component);
    expect(WrappedComponent).to.equal(Component);
  });

  it('works correctly when props are passed in addition to render props', () => {
    Component.propTypes = {
      foobarProp: PropTypes.string, // eslint-disable-line
      render: renderPropReturning(childrenOfType('span')), // eslint-disable-line
    };
    const WrappedComponent = validateRenderPropTypes(Component);
    WrappedComponent({
      foobarProp: 'string',
      render: () => <span />,
    });
  });
});
