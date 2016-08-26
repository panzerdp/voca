import coerceToString from '../helper/string/coerce_to_string';
import { REGEXP_COMBINING_MARKS, REGEXP_SURROGATE_PAIRS } from '../helper/string/regexp';

/**
 * Reverses the `subject` taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function reverseCodePoint
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverseCodePoint('summer');
 * // => 'remmus'
 *
 * v.reverseCodePoint('𝌆 bar mañana mañana');
 * // => 'anañam anañam rab 𝌆'
 */
export default function reverseCodePoint(subject) {
  var subjectString = coerceToString(subject);
  /**
   * @see https://github.com/mathiasbynens/esrever
   */
  subjectString = subjectString
    .replace(REGEXP_COMBINING_MARKS, function($0, $1, $2) {
      return reverseCodePoint($2) + $1;
    })
    .replace(REGEXP_SURROGATE_PAIRS, '$2$1');
  var reversedString = '',
    index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}