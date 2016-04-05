import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';

const REGEX_TRIM_LEFT = /^[\s\uFEFF\xA0]+/;

/**
 * Removes the whitespaces from the left part of the `string`.
 *
 * @function trimLeft
 * @static
 * @memberOf v
 * @category Manipulate
 * @param {string} [string=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace to remove.
 * @return {string} Returns the left trimmed string.
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
    return valueString.replace(REGEX_TRIM_LEFT, '');
  }
  var matchWhitespace = true,
    totalWhitespaceLength = 0,
    whitespaceStringLength = whitespaceString.length;
  while(matchWhitespace) {
    if (valueString.indexOf(whitespaceString, totalWhitespaceLength) === totalWhitespaceLength) {
      totalWhitespaceLength += whitespaceStringLength;
    } else {
      matchWhitespace = false;
    }
  }
  return valueString.substring(totalWhitespaceLength);
}