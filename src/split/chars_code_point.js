import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_UNICODE_CHARACTER } from '../utils/string/regexp';

/**
 * Splits `subject` into an array of characters taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function charsCodePoint
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.charsCodePoint('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => ['\uD835\uDC00', '\uD835\uDC01']
 *
 * v.charsCodePoint('cafe\u0301'); // or 'café'
 * // => ['c', 'a', 'f', 'e\u0301']
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
}