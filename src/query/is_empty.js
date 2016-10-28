import coerceToString from '../helper/string/coerce_to_string';

/**
 * Checks whether `subject` is empty.
 *
 * @function isEmpty
 * @static
 * @since 1.0.0
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
  var subjectString = coerceToString(subject);
  return subjectString.length === 0;
}