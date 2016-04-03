import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';

/**
 * Removes the whitespaces from the right part of the `string`.
 * @param {string} [string=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespaces for trim.
 * @return {string} Returns the right trimmed string.
 */
export default function(string, whitespace) {
  string = undefinedDefault(string, '');
  var valueString = toString(string);
  if (isNil(valueString)) {
    return '';
  }
  if (whitespace === '' || valueString === '') {
    return valueString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return valueString.trim();
  }
  var matchWhitespace = true;
  return valueString.split(whitespaceString).reduceRight(function(result, item) {
    if (item !== '') {
      matchWhitespace = false;
    }
    if (!matchWhitespace) {
      result += item === '' ? whitespaceString : item;
    }
    return result;
  }, '');
}