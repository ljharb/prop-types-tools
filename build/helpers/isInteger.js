'use strict';

var floor = Math.floor;
var finite = isFinite;

module.exports = Number.isInteger
    || /* istanbul ignore next */ function (x) { return typeof x === 'number' && finite(x) && floor(x) === x; };
