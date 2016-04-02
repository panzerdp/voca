import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';

/**
 * Removes the whitespaces from left and right parts of the `string`.
 * @param {string} [string=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespaces to trim.
 * @return {string} Returns the trimmed string.
 */
export default function(string, whitespace) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (valueString === null) {
    return '';
  }
  if (whitespaceString == null) {

  }
  var whitespaceString = undefinedDefault(whitespace, '');

  return valueString.trim();
}