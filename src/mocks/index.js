function noop() {}
noop.isRequired = noop;
function noopThunk() { return noop; }

module.exports = {
  and: noopThunk,
  childrenHavePropXorChildren: noopThunk,
  childrenOfType: noopThunk,
  componentWithName: noopThunk,
  forbidExtraProps: Object,
  mutuallyExclusiveProps: noopThunk,
  mutuallyExclusiveTrueProps: noopThunk,
  nChildren: noopThunk,
  nonNegativeInteger: noopThunk,
  numericString: noopThunk,
  or: noopThunk,
  range: noopThunk,
  restrictedProp: noopThunk,
  uniqueArray: noopThunk,
  uniqueArrayOf: noopThunk,
  withShape: noopThunk,
};
