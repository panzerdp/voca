import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Counts the characters in `subject` where `predicate` returns truthy.
 *
 * @function lengthWhere
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @param {Function} predicate The predicate function invoked on each character with parameters `(character, index, string)`.
 * @param {Object} [context] The context to invoke the `predicate`.
 * @return {number} Returns the number of characters.
 * @example
 * v.lengthWhere('hola!', v.isAlpha);
 * // => 4
 *
 * v.lengthWhere('2022', function(character, index, str) {
 *   return character === '2';
 * });
 * // => 3
 */
export default function(subject, predicate, context) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  return Array.prototype.reduce.call(subjectString, function(count, character, index) {
    if (predicate.call(context, character, index, subjectString)) {
      count++;
    }
    return count;
  }, 0);
}