import coerceToString from 'helper/string/coerce_to_string';
import includes from 'query/includes';
import isNil from 'helper/object/is_nil';
import { REGEXP_TRIM_LEFT } from 'helper/reg_exp/const';
import toString from 'helper/string/to_string';

const reduce = Array.prototype.reduce;

/**
 * Removes whitespaces from the left side of the `subject`.
 *
 * @function trimLeft
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
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
  let matchWhitespace = true;
  return reduce.call(subjectString, function(trimmed, character) {
    if (matchWhitespace && includes(whitespaceString, character)) {
      return trimmed;
    }
    matchWhitespace = false;
    return trimmed + character;
  }, '');
}