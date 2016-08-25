import coerceToString from '../utilities/string/coerce_to_string';
import { REGEXP_SPECIAL_CHARACTERS } from '../utilities/string/regexp';

/**
 * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
 *
 * @function escapeRegExp
 * @static
 * @since 1.0.0
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeRegExp('(hours)[minutes]{seconds}');
 * // => '\(hours\)\[minutes\]\{seconds\}'
 */
export default function(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}