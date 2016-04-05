import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';
import trimLeft from './trim_left';
import trimRight from './trim_right';

/**
 * Removes the whitespaces from left and right parts of the `string`.
 *
 * @function trim
 * @param {string} [string=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespaces for trim.
 * @return {string} Returns the trimmed string.
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
  return trimRight(trimLeft(valueString, whitespaceString), whitespaceString);
}