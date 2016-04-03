import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';

const REGEX_TRIM_RIGHT = /[\s\uFEFF\xA0]+$/;

/**
 * Removes the whitespaces from the right part of the `string`.
 *
 * @param {string} [string=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespaces to remove.
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
    return valueString.replace(REGEX_TRIM_RIGHT, '');
  }
  /**
   * Split the array into pieces by whiteSpace string.
   * Then restore the string, but jump over the last sequence of empty strings.
   */
  var matchWhitespace = true;
  return valueString.split(whitespaceString).reduceRight(function(result, item, index, array) {
    if (item !== '') {
      matchWhitespace = false;
    }
    if (!matchWhitespace) {
      if (index === 0) {
        result += item;
      } else {
        result = item + whitespaceString + result;
      }
    }
    return result;
  }, '');
}