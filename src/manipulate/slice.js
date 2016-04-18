import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';

/**
 * Extracts from `subject` a string from `start` position up to (but not including) `end` position.
 *
 * @function slice
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {int} start The position to start extracting. If negative use it as `subject.length + start`.
 * @param {int} [end=subject.length] The position to end extracting. If negative use it as `subject.length + end`.
 * @return {string} Returns the extracted string.
 * @note Uses native `String.prototype.slice()`
 * @example
 * v.slice('miami', 1);
 * // => 'iami'
 *
 * v.slice('florida', -4);
 * // => 'rida'
 */
export default function(subject, start, end) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.slice(start, end);
}