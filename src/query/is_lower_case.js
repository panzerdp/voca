import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';

/**
 * Checks if `string` is lower case.
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Return `true` if `string` is lower case, `false` otherwise.
 */
export default function(string) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return false;
  }
  return valueString.toLowerCase() === valueString;
}