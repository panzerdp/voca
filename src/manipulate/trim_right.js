import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';

const REGEX_TRIM_RIGHT = /[\s\uFEFF\xA0]+$/;

/**
 * Removes the whitespaces from the right part of the `subject`.
 *
 * @function trimRight
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimRight('the fire rises   ');
 * // => 'the fire rises'
 *
 * v.trimRight('do you feel in charge?---', '-');
 * // => 'do you feel in charge?'
 */
export default function(subject, whitespace) {
  var subjectString = toString(undefinedDefault(subject, ''));
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEX_TRIM_RIGHT, '');
  }
  var matchWhitespace = true,
    totalWhitespaceLength = 0,
    whitespaceStringLength = whitespaceString.length,
    valueStringLength = subjectString.length,
    position;
  while(matchWhitespace) {
    position = valueStringLength - totalWhitespaceLength - whitespaceStringLength;
    if (subjectString.indexOf(whitespaceString, position) === position) {
      totalWhitespaceLength += whitespaceStringLength;
    } else {
      matchWhitespace = false;
    }
  }
  return subjectString.substring(0, valueStringLength - totalWhitespaceLength);
}