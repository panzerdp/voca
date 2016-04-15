import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';

const REGEX_DIGIT = /^\d+$/;

/**
 * Checks if `subject` contains only digit characters.
 *
 * @function isDigit
 * @static
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
  var subjectString = toString(undefinedDefault(subject, ''));
  return REGEX_DIGIT.test(subjectString);
}