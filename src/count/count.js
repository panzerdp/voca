import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';

/**
 * Counts the characters in `subject`. Equivalent to `subject.length`.
 *
 * @function count
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {number} Returns the number of characters in `subject`.
 * @example
 * v.count('rain');
 * // => 4
 */
export default function(subject) {
  return toString(nilDefault(subject, '')).length;
}