# prop-types <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Custom React PropType validators that we use at Airbnb. Use of [airbnb-js-shims](https://npmjs.com/package/airbnb-js-shims) or the equivalent is recommended.

 - `and`: ensure that all provided propType validators pass
 - `between`: provide an object with an `gt` or `gte` number, and an `lt` or `lte` number (only one item allowed from each pairs; one or both pairs may be provided), and the resulting propType validator will ensure the prop value is a number within the given range. Alternatively, you can provide a function that takes the `props` object and returns a number for each of the `gt`/`gte`/`lt`/`lte` values.
 - `childrenHavePropXorChildren`: ensure that either all children have the indicated prop, all children have children, or all children have neither.
 - `childrenOf`: restrict the children prop to only allow children that pass the given propType validator.
 - `childrenOfType`: restrict the children prop to only allow children of the given element types - takes a Component, an HTML tag name, or `"*"` to match everything.
 - `childrenSequenceOf`: restrict the children prop to be a sequenceOf the given "specifiers" (see `sequenceOf`)
 - `componentWithName`: restrict the prop to only allow a component with a certain name/displayName. Accepts a string, or a regular expression.
 - `elementType`: require that the prop be a specific type of React element - takes a Component, an HTML tag name, or `"*"` to match everything.
 - `explicitNull`: only allow `null` or `undefined`/omission - and only `null` when required.
 - `forbidExtraProps`: pass your entire `propTypes` object into this function, and any nonspecified prop will error.
 - `integer`: require the prop be an integer.
 - `keysOf`: pass in a proptype, and require all the keys of a prop to have that type
 - `mutuallyExclusiveProps`: provide a propType, and a list of props, and only one prop out of the list will be permitted, validated by the given propType.
 - `mutuallyExclusiveTrueProps`: provide a list of props, and all must be booleans, and only one is allowed to be true.
 - `nChildren`: require a specific amount of children.
 - `nonNegativeInteger`: require that the prop be a number, that is 0, or a finite positive integer.
 - `nonNegativeNumber`: require that the prop be a number, that is 0, or a finite positive number.
 - `numericString`: require the prop be a string that is conceptually numeric.
 - `object`: same as `PropTypes.object`, but can be called outside of React's propType flow.
 - `or`: recursively allows only the provided propTypes, or arrays of those propTypes.
 - `range`: provide a min, and a max, and the prop must be a number in the range `[min, max)`
 - `restrictedProp`: this prop is not permitted to be anything but `null` or `undefined`.
 - `sequenceOf`: takes 1 or more "specifiers": an object with a "validator" function (a propType validator), a "min" nonNegativeInteger, and a "max" nonNegativeInteger. If both "min" and "max" may be omitted, they default to 1; if only "max" is omitted, it defaults to Infinity; if only "min" is omitted, it defaults to 1.
 - `shape`: takes a shape, and allows it to be enforced on any non-null/undefined value.
 - `uniqueArray`: this prop must be an array, and all values must be unique (determined by `Object.is`). Like `PropTypes.array`, but with uniqueness.
 - `uniqueArrayOf`: `uniqueArray`, with a type validator applied. Like `PropTypes.arrayOf`, but with uniqueness. Can also take an optional mapper function that allows for a non-standard unique calculation (otherwise, `Object.is` is used by default). The function is applied to each element in the array, and the resulting values are compared using the standard unique calculation.
 - `valuesOf`: a non-object requiring `PropTypes.objectOf`. Takes a propType validator, and applies it to every own value on the propValue.
 - `withShape`: takes a PropType and a shape, and allows it to be enforced on any non-null/undefined value.

## Production
Since `PropTypes` are typically not included in production builds of React, this library’s functionality serves no useful purpose. As such, when the `NODE_ENV` environment variable is `"production"`, instead of exporting the implementations of all these prop types, we export mock functions - in other words, something that ensures that no exceptions are thrown, but does no validation. When environment variables are inlined (via a browserify transform or webpack plugin), then tools like webpack or uglify are able to determine that only the mocks will be imported - and can avoid including the entire implementations in the final bundle that is sent to the browser. This allows for a much smaller ultimate file size, and faster in-browser performance, without sacrificing the benefits of `PropTypes` themselves.

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
