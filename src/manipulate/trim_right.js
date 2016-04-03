import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';

/**
 * Removes the whitespaces from left and right parts of the `string`.
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
  if (whitespace === '') {
    return valueString;
  }
  if (isNil(whitespace)) {
    return valueString.trim();
  }
  //return valueString.split(whitespace).reduce(function() {
  //
  //})
}