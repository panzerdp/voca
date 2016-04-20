import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_COMBINING_MARKS, REGEXP_SURROGATE_PAIRS } from '../utils/regexp';

/**
 * Reverse the `subject` string which contains surrogate pairs and combining marks.
 *
 * @function reverseCodePoint
 * @static
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
  var subjectString = toString(nilDefault(subject, ''));
  // @see https://github.com/mathiasbynens/esrever
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