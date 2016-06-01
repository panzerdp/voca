import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_COMBINING_MARKS, REGEXP_SURROGATE_PAIRS } from '../utils/string/regexp';

/**
 * Counts the characters in `subject` taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function lengthCodePoint
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {number} Returns the number of characters in `subject`.
 * @example
 * v.lengthCodePoint('rain');
 * // => 4
 *
 * v.lengthCodePoint('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => 2
 *
 * v.lengthCodePoint('cafe\u0301'); // or 'café'
 * // => 4
 */
export default function(subject) {
  return toString(nilDefault(subject, ''))
    .replace(REGEXP_COMBINING_MARKS, '*')
    .replace(REGEXP_SURROGATE_PAIRS, '*')
    .length;
}