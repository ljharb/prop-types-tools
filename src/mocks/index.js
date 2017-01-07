function noopThunk() { return () => {}; }

module.exports = {
  and: noopThunk,
  childrenHavePropXorChildren: noopThunk,
  childrenOfType: noopThunk,
  componentWithName: noopThunk,
  forbidExtraProps: Object,
  mutuallyExclusiveProps: noopThunk,
  nChildren: noopThunk,
  nonNegativeInteger: noopThunk,
  or: noopThunk,
  range: noopThunk,
  restrictedProp: noopThunk,
  uniqueArray: noopThunk,
  uniqueArrayOf: noopThunk,
  withShape: noopThunk,
};
