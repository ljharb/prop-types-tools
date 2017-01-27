import { expect } from 'chai';

import mocks from '../build/mocks';
import implementations from '../';

describe('mocks', () => {
  it('has the same keys', () => {
    expect(Object.keys(mocks)).to.eql(Object.keys(implementations));
  });

  it('matches the types', () => {
    const mockTypes = Object.values(mocks).map(x => typeof x);
    const implementationTypes = Object.values(implementations).map(x => typeof x);
    expect(mockTypes).to.eql(implementationTypes);
  });

  it('provides a thunk for a validator function', () => {
    Object.entries(mocks).forEach(([name, mock]) => {
      const validator = mock();
      const expectedType = name === 'forbidExtraProps' ? 'object' : 'function';
      expect([name, typeof validator]).to.eql([name, expectedType]);
    });
  });

  it('provides a validator with isRequired', () => {
    Object.entries(mocks).forEach(([name, mock]) => {
      if (name === 'forbidExtraProps') return;
      const validator = mock();
      expect([name, typeof validator.isRequired]).to.eql([name, 'function']);
    });
  });
});
