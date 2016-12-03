import { REGEXP_COMBINING_MARKS, REGEXP_SURROGATE_PAIRS } from 'helper/reg_exp/const';
import coerceToString from 'helper/string/coerce_to_string';

/**
 * Counts the graphemes in `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function  countGraphemes
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count graphemes.
 * @return {number}              Returns the number of graphemes in `subject`.
 * @example
 * v.countGraphemes('cafe\u0301'); // or 'café'
 * // => 4
 *
 * v.countGraphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => 2
 *
 * v.countGraphemes('rain');
 * // => 4
 */
export default function countGrapheme(subject) {
  return coerceToString(subject)
    .replace(REGEXP_COMBINING_MARKS, '*')
    .replace(REGEXP_SURROGATE_PAIRS, '*')
    .length;
}