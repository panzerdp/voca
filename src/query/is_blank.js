import toString from '../utils/string/to_string';
import undefinedDefault from '../utils/undefined/undefined_default';

/**
 * Checks if `string` is empty or contains only whitespaces.
 *
 * @function isBlank
 * @static
 * @memberOf Query
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is empty or contains only whitespaces or `false` otherwise.
 * @example
 * v.isBlank('');
 * // => true
 *
 * v.isBlank('  ');
 * // => true
 *
 * v.isBlank('World');
 * // => false
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return true;
  }
  return valueString.trim().length === 0;
}