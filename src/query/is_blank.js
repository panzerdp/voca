import toString from '../utils/to_string';
import undefinedDefault from '../utils/undefined_default';

/**
 * Checks if `string` is empty or contains only whitespaces
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is empty or contains only whitespaces, `false` otherwise
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return true;
  }
  return valueString.trim().length === 0;
}