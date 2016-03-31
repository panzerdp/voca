import toString from '../utils/to_string';
import undefinedDefault from '../utils/undefined_default';

/**
 * Checks if `string` is empty
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is empty, `false` otherwise
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var stringValue = toString(string);
  if (stringValue === null) {
    return true;
  }
  return stringValue.length === 0;
}