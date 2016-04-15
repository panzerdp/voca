import toString from '../utils/string/to_string';
import undefinedDefault from '../utils/undefined/undefined_default';

/**
 * Checks if `subject` is empty.
 *
 * @function isEmpty
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or `false` otherwise
 * @example
 * v.isEmpty('');
 * // => true
 *
 * v.isEmpty('  ');
 * // => false
 */
export default function(subject) {
  var subjectString = toString(undefinedDefault(subject, ''));
  return subjectString.length === 0;
}