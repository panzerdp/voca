var isString = require('../query/is_string');

/**
 * Try to convert the value to a string
 *
 * @param value {*}
 * @returns {string?}
 */
module.exports = function(value) {
  if (isString(value)) {
    return value;
  }

};