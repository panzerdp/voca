import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';


/**
 * Checks if `string` ends with `end`.
 * @param {string} [string=''] The string to verify.
 * @param {string} end The ending string.
 * @return {boolean} Returns `true` if `string` ends with `end`, `false` otherwise.
 */
export default function(string, end) {
  if (end == null) {
    return false;
  }
  var stringValue = toString(undefinedDefault(string, '')),
    stringEnd = toString(end);
  if (stringValue === null || stringEnd === null) {
    return false;
  }
  return stringValue.lastIndexOf(stringEnd, stringValue.length - stringEnd.length - 1) !== -1;
}