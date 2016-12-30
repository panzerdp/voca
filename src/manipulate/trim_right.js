import coerceToString from 'helper/string/coerce_to_string';
import includes from 'query/includes';
import isNil from 'helper/object/is_nil';
import { REGEXP_TRIM_RIGHT } from 'helper/reg_exp/const';
import toString from 'helper/string/to_string';

const reduceRight = Array.prototype.reduceRight;

/**
 * Removes whitespaces from the right side of the `subject`.
 *
 * @function trimRight
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
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
  let matchWhitespace = true;
  return reduceRight.call(subjectString, function(trimmed, character) {
    if (matchWhitespace && includes(whitespaceString, character)) {
      return trimmed;
    }
    matchWhitespace = false;
    return character + trimmed;
  }, '');
}