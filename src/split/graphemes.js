import coerceToString from '../helper/string/coerce_to_string';
import nilDefault from '../helper/undefined/nil_default';
import { REGEXP_UNICODE_CHARACTER } from '../helper/regular_expression/const';

/**
 * Splits `subject` into an array of graphemes taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function graphemes
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of graphemes.
 * @example
 * v.graphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => ['\uD835\uDC00', '\uD835\uDC01']
 *
 * v.graphemes('cafe\u0301'); // or 'café'
 * // => ['c', 'a', 'f', 'e\u0301']
 */
export default function(subject) {
  var subjectString = coerceToString(subject);
  return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
}