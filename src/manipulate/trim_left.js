import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import { REGEXP_TRIM_LEFT } from 'helper/reg_exp/const';
import toString from 'helper/string/to_string';

/**
 * Removes whitespaces from the left side of the `subject`.
 *
 * @function trimLeft
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimLeft('  Starship Troopers');
 * // => 'Starship Troopers'
 *
 * v.trimLeft('***Mobile Infantry', '*');
 * // => 'Mobile Infantry'
 */
export default function trimLeft(subject, whitespace) {
  const subjectString = coerceToString(subject);
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  const whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_LEFT, '');
  }
  const whitespaceStringLength = whitespaceString.length;
  let matchWhitespace = true;
  let totalWhitespaceLength = 0;
  while(matchWhitespace) {
    if (subjectString.indexOf(whitespaceString, totalWhitespaceLength) === totalWhitespaceLength) {
      totalWhitespaceLength += whitespaceStringLength;
    } else {
      matchWhitespace = false;
    }
  }
  return subjectString.substring(totalWhitespaceLength);
}