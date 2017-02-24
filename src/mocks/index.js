function noop() {}
noop.isRequired = noop;
function noopThunk() { return noop; }

module.exports = {
  and: noopThunk,
  childrenHavePropXorChildren: noopThunk,
  childrenOfType: noopThunk,
  componentWithName: noopThunk,
  elementType: noopThunk,
  explicitNull: noopThunk,
  forbidExtraProps: Object,
  integer: noopThunk,
  keysOf: noopThunk,
  mutuallyExclusiveProps: noopThunk,
  mutuallyExclusiveTrueProps: noopThunk,
  nChildren: noopThunk,
  nonNegativeInteger: noopThunk,
  numericString: noopThunk,
  object: noopThunk,
  or: noopThunk,
  range: noopThunk,
  restrictedProp: noopThunk,
  uniqueArray: noopThunk,
  uniqueArrayOf: noopThunk,
  withShape: noopThunk,
};
