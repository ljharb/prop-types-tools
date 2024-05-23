# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.17.0](https://github.com/airbnb/prop-types/compare/v2.16.0...v2.17.0) - 2024-05-23

### Fixed

- [New] `childrenOf`/`childrenOfType`/`childrenSequenceOf`: support fragments via `renderableChildren` helper [`#71`](https://github.com/airbnb/prop-types/issues/71)

### Commits

- [Dev Deps] update all the things [`5032f7f`](https://github.com/airbnb/prop-types/commit/5032f7f80ff3497a3763e50e5c5b20e2e3c6d0e0)
- [Tests] migrate to GHA [`c92c5c4`](https://github.com/airbnb/prop-types/commit/c92c5c4d8c6814e1872eb437083401f4417a3067)
- [meta] rename package and URLs [`8586801`](https://github.com/airbnb/prop-types/commit/8586801c3c3ec8bf729b22c06f1711c7beff29c8)
- [meta] use `npmignore` [`0a366a6`](https://github.com/airbnb/prop-types/commit/0a366a661a716e77da2fbb15e699e82746001d80)
- [actions] add "Automatic Rebase" and "require allow edits" actions [`6539947`](https://github.com/airbnb/prop-types/commit/65399472f19c025891e4e9ceac7acd00d7a651d8)
- [meta] use `auto-changelog` [`1255cd7`](https://github.com/airbnb/prop-types/commit/1255cd7b0b11a059745a736ba205abeb47d63cea)
- [Deps] update `array.prototype.find`, `array.prototype.flatmap`, `function.prototype.name`, `is-regex`, `object-is`, `object.assign`, `object.entries`, `prop-types`, `prop-types-exact` [`7ed89ae`](https://github.com/airbnb/prop-types/commit/7ed89ae3ab3b60878021173d58afe7d438025c35)
- [Dev Deps] update `@babel/cli`, `@babel/core`, `@babel/register`, `eslint`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react` [`af140ff`](https://github.com/airbnb/prop-types/commit/af140fffdf2b68dd868e2b2ce38d013306c58332)
- [Dev Deps] update `@babel/cli`, `@babel/core`, `@babel/register`, `enzyme-adapter-react-helper`, `eslint`, `eslint-plugin-react` [`e560291`](https://github.com/airbnb/prop-types/commit/e5602918450d85f0d566ba140defda6cd1649c4d)
- [Deps] update `object-is`, `object.assign`, `react-is` [`4f12896`](https://github.com/airbnb/prop-types/commit/4f12896d4fa38f7ce2d3c80a9d75d548ac9032e0)
- [meta] add missing `engines.node` [`9c6f8e6`](https://github.com/airbnb/prop-types/commit/9c6f8e6c34a03e7ef6ead6e1dae4f9783704ba51)
- [Tests] use `aud` in posttest [`e9fb91a`](https://github.com/airbnb/prop-types/commit/e9fb91a7196233e368d332c71795280cd14b9145)
- Remove "that we use at Airbnb" from readme [`2b14af0`](https://github.com/airbnb/prop-types/commit/2b14af05ead47a3accb78124b503745f71573e43)
- [Deps] update `is-regex` [`5c7bd2b`](https://github.com/airbnb/prop-types/commit/5c7bd2b03b66b486b8a9e41a94ae41accbc905b8)
- [Tests] ignore node deprecation warnings [`42d5f4d`](https://github.com/airbnb/prop-types/commit/42d5f4d3b8858f630b55abc6eb2502decfc37931)

<!-- auto-changelog-above -->

2.16.0 / 2020-06-30
==================
  * [New] add `predicate` validator
  * [meta] add `funding` field
  * [Deps] remove unused `has` (#67)
  * [Deps] update `array.prototype.find`, `function.prototype.name`, `is-regex`, `object.entries`, `object-is`, `react-is`
  * [Dev Deps] update `@babel/cli`, `@babel/core`, `@babel/register`, `airbnb-browser-shims`, `enzyme`, `enzyme-adapter-react-helper`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-react`, `enzyme-adapter-react-helper`, `object-inspect`, `object.values`, `reflect.ownkeys`, `rimraf`, `safe-publish-latest`
  * [Tests] use travis-ci build stages, and shared configs
  * [Tests] add more `or` tests
  * [Tests] Replace non-inclusive "whitelist" term with "allowlist" (#69)
  * [Tests] fix eslint error

2.15.0 / 2019-08-13
==================
  * [New] [getComponentName] Add logic to handle React.memo (#65)
  * [Deps] update `react-is`
  * [Dev Deps] update `enzyme-adapter-react-helper`, `eslint`, `eslint-config-airbnb`, `rimraf`, `safe-publish-latest`
  * [Tests] actually run `npm run test:prepare` in node >= 4
  * [Tests] up to `node` `v12`

2.14.0 / 2019-07-28
==================
  * [New] add `stringEndsWith` (#59)
  * [Fix] `getComponentName`/`componentWithName`: get display name from forwardRefs (#64)
  * [Docs] Conform disallowedIf file to lint. Update disallowedIf documentation (#62)
  * [Docs] add stringEndsWith to README.md (#60)
  * [Deps] update `array.prototype.find`, `function.prototype.name`
  * [Dev Deps] update `@babel/cli`, `@babel/core`, `@babel/register`, `babel-plugin-istanbul`, `babel-preset-airbnb`, `enzyme`, `enzyme-adapter-react-helper`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`
  * [Tests] fix some broken tests

2.13.2 / 2019-04-08
==================
  * [patch] `ref`: Remove arity check (#57)

2.13.1 / 2019-04-06
==================
  * [Fix] `ref`: ensure that the prop value is not a component (#55)

2.13.0 / 2019-04-04
==================
  * [New] add `ref` (#54)
  * [Deps] update `prop-types`, `react-is`
  * [Dev Deps] update `@babel/cli`, `@babel/core`, `@babel/register`, `airbnb-browser-shims`, `babel-plugin-istanbul`, `babel-preset-airbnb`, `enzyme`, `enzyme-adapter-react-helper`, `eslint`

2.12.0 / 2019-02-09
==================
  * [New] add `empty`
  * [New] `elementType`: support forwardRefs and Context Provider/Consumer
  * [Deps] update `object.entries`
  * [Dev Deps] update to babel 7; update `airbnb-browser-shims`, `chai`, `enzyme`, `enzyme`, `enzyme-adapter-react-helper`, `eslint`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-import`

2.11.0 / 2018-09-04
==================
  * [New] Add disallowedIf propType (#45)
  * [Deps] update `has`, `prop-types`, `prop-types-exact`
  * [Dev Deps] update `enzyme`, `enzyme-adapter-react-helper`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `safe-publish-latest`

2.10.0 / 2018-05-14
==================
  * [New] `componentWithName`: allow it to take a list of HOC names to strip off before validating (#41)
  * [Docs] add docs for 2 newest validators
  * [Dev Deps] update `eslint-plugin-import`, `eslint-plugin-react`
  * [Tests] on `node` `v10`

2.9.0 / 2018-04-10
==================
  * [New] Added `requiredBy` validator (#30)
  * [New] add `stringStartsWith`
  * [New] add `booleanSome`
  * [Fix] use `object-is` instead of `Object.is`
  * [Deps] update `prop-types`, `function.prototype.name`, `object.assign`, `prop-types-exact`
  * [Dev Deps] update `airbnb-browser-shims`, `babel-cli`, `babel-plugin-istanbul`, `babel-plugin-transform-replace-object-assign`, `babel-register`, `chai`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-import`, `react`, `rimraf`
  * [Docs] fix URLs in readme
  * [Docs] fix range documentation (#33)
  * [Docs] Add simple use cases (#38)
  * [Tests] add `node` `v9`; pin included builds to LTS; use `nvm install-latest-npm`
  * [Tests] use `enzyme-adapter-react-helper`

2.8.1 / 2017-08-09
==================
  * [Fix] `nonNegativeInteger`: mock should match reality and not be a noopThunk, only a noop

2.8.0 / 2017-07-26
==================
  * [New] add optional `mapper` function to `uniqueArrayOf` (#29, #28)
  * [Deps] update `function.prototype.name`
  * [Dev Deps] update `eslint`, `eslint-config-airbnb`

2.7.1 / 2017-07-13
==================
  * [Fix] Make `getComponentName` more robust in IE (#27)
  * [Deps] update `prop-types-exact`
  * [Dev Deps] update `babel-preset-airbnb`, `chai`, `eslint-plugin-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`

2.7.0 / 2017-06-25
==================
  * [New] Added compatibility for React 16 alpha (#25)

2.6.1 / 2017-06-12
==================
  * [Fix] `restrictedProp`: ensure it passes with a custom message when nullary

2.6.0 / 2017-06-09
==================
  * [New] `restrictedProp`: add ability to overwrite error with custom function (#22)
  * [Refactor] Allow object rest/spread and `Object.assign` by transforming to `object.assign`
  * [Deps] update `prop-types`
  * [Dev Deps] update `babel-plugin-istanbul`, `chai`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `mocha`
  * [Tests] on `node` `v8`; `npm` `v5`+ breaks on `node` < v4
  * [Tests] greenkeeper-ignore `nyc`

2.5.4 / 2017-05-11
==================
  * [Fix] `childrenHavePropXorChildren` Ensure validator skips over falsy children
  * [Deps] update `prop-types`
  * [Dev Deps] update `babel-plugin-istanbul`, `mocha`, `nyc`, `react`

2.5.3 / 2017-04-08
==================
  * [Refactor] Use `prop-types` package instead of `React.PropTypes`
  * [Deps] update `array.prototype.find`, `prop-types`
  * [Dev Deps] update `babel-cli`, `babel-register`, `eslint`, `nyc`, `react`
  * [Tests] improve test matrix

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
