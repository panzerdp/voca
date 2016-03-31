import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';

var REGEX_DIGIT = /^\d+$/;

/**
 * Checks if `string` contains only digit characters.
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` contains only digit characters, `false` otherwise.
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return false;
  }
  return REGEX_DIGIT.test(valueString);
}