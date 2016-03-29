import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';

var REGEX_DIGIT = /^[0-9]+$/;

/**
 * Checks if `value` contains only digit characters.
 * @param {string} [value=''] The string to verify.
 * @return {boolean} Returns `true` if `value` contains only digit characters, `false` otherwise.
 */
export default function(value) {
  value = undefinedDefault(value, '');
  var string = toString(value);
  if (string === null) {
    return false;
  }
  return REGEX_DIGIT.test(string);
}