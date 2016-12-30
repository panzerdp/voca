import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import toString from 'helper/string/to_string';
import trimLeft from 'manipulate/trim_left';
import trimRight from 'manipulate/trim_right';

/**
 * Removes whitespaces from left and right sides of the `subject`.
 *
 * @function trim
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trim(' Mother nature ');
 * // => 'Mother nature'
 *
 * v.trim('--Earth--', '-');
 * // => 'Earth'
 */
export default function trim(subject, whitespace) {
  const subjectString = coerceToString(subject);
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  const whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.trim();
  }
  return trimRight(trimLeft(subjectString, whitespaceString), whitespaceString);
}