import { expect } from 'chai';
import entries from 'object.entries';
import values from 'object.values';

import mocks from '../build/mocks';
import implementations from '../';

describe('mocks', () => {
  it('has the same keys', () => {
    expect(Object.keys(mocks)).to.eql(Object.keys(implementations));
  });

  it('matches the types', () => {
    const mockTypes = values(mocks).map(x => typeof x);
    const implementationTypes = values(implementations).map(x => typeof x);
    expect(mockTypes).to.eql(implementationTypes);
  });

  it('provides proper return types for mock validator functions', () => {
    entries(mocks).forEach(([name, mock]) => {
      const validator = mock();
      const specialCases = {
        forbidExtraProps: 'object',
        nonNegativeInteger: 'object',
        validateRenderPropTypes: 'undefined',
      };
      const expectedType = specialCases[name] ? specialCases[name] : 'function';
      expect([name, typeof validator]).to.eql([name, expectedType]);
      if (!specialCases[name]) {
        expect(validator).not.to.throw();
      }
    });
  });

  it('provides a validator with isRequired', () => {
    entries(mocks).forEach(([name, mock]) => {
      if (name === 'forbidExtraProps' || name === 'validateRenderPropTypes') return;
      const validator = name === 'nonNegativeInteger' ? mock : mock();
      expect([name, typeof validator.isRequired]).to.eql([name, 'function']);
    });
  });
});
