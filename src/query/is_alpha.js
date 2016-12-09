import coerceToString from 'helper/string/coerce_to_string';
import { REGEXP_ALPHA } from 'helper/reg_exp/const_extended';

/**
 * Checks whether `subject` contains only alpha characters.
 *
 * @function isAlpha
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha characters or `false` otherwise.
 * @example
 * v.isAlpha('bart');
 * // => true
 *
 * v.isAlpha('lisa!');
 * // => false
 *
 * v.isAlpha('lisa and bart');
 * // => false
 */
export default function isAlpha(subject) {
  const subjectString = coerceToString(subject);
  return REGEXP_ALPHA.test(subjectString);
}