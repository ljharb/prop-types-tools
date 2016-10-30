# prop-types <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Custom React PropType validators that we use at Airbnb. Use of [airbnb-js-shims](https://npmjs.com/package/airbnb-js-shims) or the equivalent is assumed.

 - `and`: ensure that all provided propType validators pass
 - `childrenHavePropXorChildren`: ensure that either all children have the indicated prop, all children have children, or all children have neither.
 - `childrenOfType`: restrict the prop to only allow children of the given type.
 - `componentWithName`: restrict the prop to only allow a component with a certain name/displayName.
 - `forbidExtraProps`: pass your entire `propTypes` object into this function, and any nonspecified prop will error.
 - `mutuallyExclusiveProps`: provide a propType, and a list of props, and only one prop out of the list will be permitted, validated by the given propType.
 - `nChildren`: require a specific amount of children.
 - `nonNegativeInteger`: require that the prop be a number, that is 0, or a positive integer.
 - `or`: recursively allows only the provided propTypes, or arrays of those propTypes.
 - `range`: provide a min, and a max, and the prop must be a number in the range `[min, max)`
 - `restrictedProp`: this prop is not permitted to be anything but `null` or `undefined`.
 - `uniqueArray`: this prop must be an array, and all values must be unique (determined by `Object.is`). Like `PropTypes.array`, but with uniqueness.
 - `uniqueArrayOf`: `uniqueArray`, with a type validator applied. Like `PropTypes.arrayOf`, but with uniqueness.
 - `withShape`: takes a PropType and a shape, and allows a shape to be enforced on any non-null/undefined value.

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/airbnb-prop-types
[npm-version-svg]: http://versionbadg.es/airbnb/airbnb-prop-types.svg
[travis-svg]: https://travis-ci.org/airbnb/airbnb-prop-types.svg
[travis-url]: https://travis-ci.org/airbnb/airbnb-prop-types
[deps-svg]: https://david-dm.org/airbnb/airbnb-prop-types.svg
[deps-url]: https://david-dm.org/airbnb/airbnb-prop-types
[dev-deps-svg]: https://david-dm.org/airbnb/airbnb-prop-types/dev-status.svg
[dev-deps-url]: https://david-dm.org/airbnb/airbnb-prop-types#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/airbnb-prop-types.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/airbnb-prop-types.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/airbnb-prop-types.svg
[downloads-url]: http://npm-stat.com/charts.html?package=airbnb-prop-types

