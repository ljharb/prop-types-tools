/* eslint
  global-require: 0,
  import/no-unresolved: 0,
  import/no-mutable-exports: 0
*/
let ReactPropTypesSecretExtraArgs;
try {
  ReactPropTypesSecretExtraArgs = [
    'location',
    'propFullName',
    require('react/lib/ReactPropTypesSecret'),
  ];
} catch (e) {
  ReactPropTypesSecretExtraArgs = [];
}

export default ReactPropTypesSecretExtraArgs;
