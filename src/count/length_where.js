import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';

/**
 * Counts the number of characters in `subject` where `predicate` returns truthy.
 *
 * @function lengthWhere
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @param {Function} predicate The predicate function invoked on each character.
 * @return {int} Returns the number of characters.
 * @example
 * v.lengthWhere('hola!', v.isAlpha);
 * // => 4
 *
 * v.lengthWhere('2022', function(character) {
 *   return character === '2';
 * });
 * // => 3
 */
export default function(subject, predicate) {
  var subjectString = toString(nilDefault(subject, ''));
  if (typeof predicate !== 'function' || subjectString === '') {
    return 0;
  }
  return Array.prototype.reduce.call(subjectString, function(count, character) {
    if (predicate(character)) {
      count++;
    }
    return count;
  }, 0);
}