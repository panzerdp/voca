import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isAlpha from './is_alpha';

/**
 * Checks if `string` is lower case.
 *
 * @function isLowerCase
 * @static
 * @memberOf Query
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is lower case or `false` otherwise.
 * @example
 * v.isLowerCase('motorcycle');
 * // => true
 *
 * v.isLowerCase('John');
 * // => false
 *
 * v.isLowerCase('T1000');
 *
 * // => false
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return false;
  }
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}