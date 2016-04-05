import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';

const REGEX_TRIM_RIGHT = /[\s\uFEFF\xA0]+$/;

/**
 * Removes the whitespaces from the right part of the `string`.
 *
 * @function trimRight
 * @param {string} [string=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace to remove.
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
  var matchWhitespace = true,
    totalWhitespaceLength = 0,
    whitespaceStringLength = whitespaceString.length,
    valueStringLength = valueString.length,
    position;
  while(matchWhitespace) {
    position = valueStringLength - totalWhitespaceLength - whitespaceStringLength;
    if (valueString.indexOf(whitespaceString, position) === position) {
      totalWhitespaceLength += whitespaceStringLength;
    } else {
      matchWhitespace = false;
    }
  }
  return valueString.substring(0, valueStringLength - totalWhitespaceLength);
}