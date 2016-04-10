import toString from '../utils/string/to_string';
import undefinedDefault from '../utils/undefined/undefined_default';

/**
 * Checks if `string` is empty.
 *
 * @function isEmpty
 * @static
 * @memberOf Query
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is empty or `false` otherwise
 * @example
 * v.isEmpty('');
 * // => true
 *
 * v.isEmpty('  ');
 * // => false
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return true;
  }
  return valueString.length === 0;
}