import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';

const REGEX_DIGIT = /^\d+$/;

/**
 * Checks if `string` contains only digit characters.
 *
 * @function isDigit
 * @static
 * @memberOf Query
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` contains only digit characters or `false` otherwise.
 * @example
 * v.isDigit('35');
 * // => true
 *
 * v.isDigit('1.5');
 * // => false
 *
 * v.isDigit('ten');
 * // => false
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return false;
  }
  return REGEX_DIGIT.test(valueString);
}