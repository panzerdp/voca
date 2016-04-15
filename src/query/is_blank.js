import toString from '../utils/string/to_string';
import undefinedDefault from '../utils/undefined/undefined_default';

/**
 * Checks if `subject` is empty or contains only whitespaces.
 *
 * @function isBlank
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or contains only whitespaces or `false` otherwise.
 * @example
 * v.isBlank('');
 * // => true
 *
 * v.isBlank('  ');
 * // => true
 *
 * v.isBlank('World');
 * // => false
 */
export default function(subject) {
  var subjectString = toString(undefinedDefault(subject, ''));
  return subjectString.trim().length === 0;
}