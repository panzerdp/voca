import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_ALPHA } from '../utils/regexp';

/**
 * Checks if `subject` contains only alpha characters.
 *
 * @function isAlpha
 * @static
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
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return REGEXP_ALPHA.test(subjectString);
}