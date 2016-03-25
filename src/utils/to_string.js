var isString = require('../query/is_string');

/**
 * Try to convert the value to a string
 *
 * @param value {*}
 * @returns {string?} - Return the string or null if unable to convert
 */
module.exports = function(value) {
  var string = null;
  if (typeof value === 'undefined' || value === null) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
};
