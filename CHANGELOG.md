2.5.2 / 2017-03-27
==================
  * [Fix] remove requirement to polyfill

2.5.1 / 2017-03-24
==================
  * [Fix] `componentWithName`: throw if given a non-string/non-regex name
  * [Fix] `or`: ensure it works with `explicitNull` (#12)
  * [Fix] `between`: avoid React PropType warning by using `valuesOf` instead of `PropTypes.objectOf`
  * [Refactor] `or`: add some extra tests; remove unnecessary `oneOfType` wrapper
  * [Tests] fail tests on console warnings or errors

2.5.0 / 2017-03-23
==================
  * [New] Adds regex capabilities to componentWithName (#11)
  * [New] `childrenOfType`: add support for `*` which supports anything.
  * [Dev Deps] update `babel-cli`, `babel-register`, `eslint`, `rimraf`, `babel-plugin-istanbul`, `eslint-plugin-react`
  * [Tests] improve coverage to 100%

2.4.1 / 2017-03-04
==================
  * [Fix] `childrenOfType`: partially revert fc0e37f84e1537a875c30d0db69b5121d790eb40

2.4.0 / 2017-03-04
==================
  * [New] add `childrenSequenceOf`
  * [New] add `sequenceOf`
  * [New] `between`: allow it to take props-taking number thunks as option values as well.
  * [New] add `between`
  * [New] add `shape`
  * [New] add `nonNegativeNumber`
  * [New] add `elementType`
  * [New] add `childrenOf`
  * [New] add `object`
  * [New] add `keysOf` (#8)
  * [New] add `valuesOf`
  * [New] add `isPrimitive` and `isPlainObject` helpers
  * [New] add `wrapValidator` helper
  * [New] add `renderableChildren` helper
  * [New] add `getComponentName` helper
  * [New] `nChildren`, `restrictedProp`, `childrenHavePropXorChildren`: add `isRequired` for consistency
  * [New] `and`: `isRequired` validator typeName should indicate such.
  * [Tests] run coverage as part of tests
  * [Tests] fix test script
  * [Tests] improve coverage to 100%
  * [Tests] add `npm run coverage`
  * [babel] build with source maps

2.3.0 / 2017-02-23
==================
  * [New] add `integer`
  * [Dev Deps] update `eslint`, `rimraf`

2.2.0 / 2017-02-16
==================
  * [New] add `numericString`
  * [New] add `explicitNull`
  * [Dev Deps] update `airbnb-js-shims`, `babel-cli`, `babel-register`, `eslint-plugin-react`

2.1.1 / 2017-02-09
==================
  * [Fix] `childrenOfType`: improve the error message
  * [Dev Deps] update `eslint`, `eslint-config-airbnb`, `eslint-plugin-jsx-a11y`

2.1.0 / 2017-02-01
==================
  * [New] add `mutuallyExclusiveTrueProps`
  * [Dev Deps] update `babel-cli`, `babel-preset-airbnb`, `babel-register`, `eslint`

2.0.1 / 2017-01-27
==================
  * [Fix] ensure production mocks have `.isRequired`

2.0.0 / 2017-01-09
==================
  * [breaking] when `NODE_ENV` is `production`, export mocks instead of real validators
  * [new] add mocks
  * [New] add `uniqueArray`/`uniqueArrayOf`
  * [New] add `withShape`
  * [Breaking] ensure every export is a function that returns a validator, for consistency (`restrictedProp`)
  * [Deps] move `safe-publish-latest` to devDeps
  * [Dev Deps] update `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `mocha`, `react`; add missing `babel-register`
  * [Tests] on `node` `v7`

1.3.2 / 2016-10-27
==================
  * [enhancement] `forbidExtraProps`: add the componentName into the error message

1.3.1 / 2016-10-25
==================
  * [Fix] `forbidPropTypes`: allow propTypes to be processed multiple times
  * [Fix] `forbidPropTypes`: fix unknown props error message

1.3.0 / 2016-10-24
==================
  * [New] add `forbidExtraProps`
  * [Dev Deps] update `babel-cli`

1.2.0 / 2016-10-11
==================
  * [New] add `and` combinator
  * [New] add `isRequired` to `nonNegativeInteger`
  * [Dev Deps] update `eslint-plugin-react`, `mocha`

1.1.1 / 2016-10-09
==================
  * [Fix] `mutuallyExclusiveProps`: include the “current” prop in the exclusives list

1.1.0 / 2016-10-09
==================
  * [Fix] [New] add `isRequired` to `mutuallyExclusiveProps`; ensure `mutuallyExclusiveProps` is not required by default
  * [Fix] [New] add `isRequired` to `componentWithName`; ensure `componentWithName` is not required by default
  * [Deps] update `safe-publish-latest`

1.0.0 / 2016-10-08
==================
  * Initial release.
