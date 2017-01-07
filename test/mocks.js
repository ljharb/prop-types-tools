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
});
