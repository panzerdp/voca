import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';


/**
 * Checks if `value` ends with `end`.
 * @param {string} [value=''] The string to verify.
 * @param {string} end The ending string.
 * @return {boolean} Returns `true` if `value` ends with `end`, `false` otherwise.
 */
export default function(value, end) {
  if (end == null) {
    return false;
  }
  var stringValue = toString(undefinedDefault(value, '')),
    stringEnd = toString(end);
  if (stringValue === null || stringEnd === null) {
    return false;
  }
  return stringValue.lastIndexOf(stringEnd, stringValue.length - stringEnd.length - 1) !== -1;
}