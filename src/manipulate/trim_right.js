import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import { REGEXP_TRIM_RIGHT } from 'helper/reg_exp/const';
import toString from 'helper/string/to_string';

/**
 * Removes whitespaces from the right side of the `subject`.
 *
 * @function trimRight
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimRight('the fire rises   ');
 * // => 'the fire rises'
 *
 * v.trimRight('do you feel in charge?!!!', '!');
 * // => 'do you feel in charge?'
 */
export default function trimRight(subject, whitespace) {
  const subjectString = coerceToString(subject);
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  const whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_RIGHT, '');
  }
  const whitespaceLength = whitespaceString.length;
  const subjectLength = subjectString.length;
  let matchWhitespace = true;
  let totalWhitespaceLength = 0;
  let position;
  while (matchWhitespace) {
    position = subjectLength - totalWhitespaceLength - whitespaceLength;
    if (subjectString.indexOf(whitespaceString, position) === position) {
      totalWhitespaceLength += whitespaceLength;
    } else {
      matchWhitespace = false;
    }
  }
  return subjectString.substring(0, subjectLength - totalWhitespaceLength);
}