'use strict';

var and = require('./and');
var integer = require('./integer');
var nonNegativeNumber = require('./nonNegativeNumber');

module.exports = and([integer(), nonNegativeNumber()], 'nonNegativeInteger');
