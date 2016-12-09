import { REGEXP_COMBINING_MARKS, REGEXP_SURROGATE_PAIRS } from 'helper/reg_exp/const';
import coerceToString from 'helper/string/coerce_to_string';

/**
 * Reverses the `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function reverseGrapheme
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverseGrapheme('summer');
 * // => 'remmus'
 *
 * v.reverseGrapheme('𝌆 bar mañana mañana');
 * // => 'anañam anañam rab 𝌆'
 */
export default function reverseGrapheme(subject) {
  let subjectString = coerceToString(subject);
  /**
   * @see https://github.com/mathiasbynens/esrever
   */
  subjectString = subjectString
    .replace(REGEXP_COMBINING_MARKS, function($0, $1, $2) {
      return reverseGrapheme($2) + $1;
    })
    .replace(REGEXP_SURROGATE_PAIRS, '$2$1');
  let reversedString = '';
  let index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}