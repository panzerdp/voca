import toString from '../utilities/string/coerce_to_string';
import nilDefault from '../utilities/undefined/nil_default';
import { REGEXP_DIGIT } from '../utilities/string/regexp';

/**
 * Checks if `subject` contains only digit characters.
 *
 * @function isDigit
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only digit characters or `false` otherwise.
 * @example
 * v.isDigit('35');
 * // => true
 *
 * v.isDigit('1.5');
 * // => false
 *
 * v.isDigit('ten');
 * // => false
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return REGEXP_DIGIT.test(subjectString);
}