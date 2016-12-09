import coerceToString from 'helper/string/coerce_to_string';

/**
 * Splits `subject` into an array of characters.
 *
 * @function chars
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.chars('cloud');
 * // => ['c', 'l', 'o', 'u', 'd']
 */
export default function chars(subject) {
  const subjectString = coerceToString(subject);
  return subjectString.split('');
}