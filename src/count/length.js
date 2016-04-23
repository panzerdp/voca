import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Counts the characters in `subject`. Equivalent to `subject.length`.
 *
 * @function length
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {int} Returns the number of characters in `subject`.
 * @example
 * v.length('rain');
 * // => 4
 */
export default function(subject) {
  return toString(nilDefault(subject, '')).length;
}