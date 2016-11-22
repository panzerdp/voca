import coerceToString from 'helper/string/coerce_to_string';
import { REGEXP_SPECIAL_CHARACTERS } from 'helper/reg_exp/const';

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
export default function escapeRegExp(subject) {
  return coerceToString(subject).replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}