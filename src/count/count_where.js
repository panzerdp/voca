import coerceToString from 'helper/string/coerce_to_string';

const reduce = Array.prototype.reduce;

/**
 * Counts the characters in `subject` for which `predicate` returns truthy.
 *
 * @function  countWhere
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string}   [subject=''] The string to count characters.
 * @param  {Function} predicate    The predicate function invoked on each character with parameters `(character, index, string)`.
 * @param  {Object}   [context]    The context to invoke the `predicate`.
 * @return {number}                Returns the number of characters for which `predicate` returns truthy.
 * @example
 * v.countWhere('hola!', v.isAlpha);
 * // => 4
 *
 * v.countWhere('2022', function(character, index, str) {
 *   return character === '2';
 * });
 * // => 3
 */
export default function countWhere(subject, predicate, context) {
  const subjectString = coerceToString(subject);
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  const predicateWithContext = predicate.bind(context);
  return reduce.call(subjectString, function(countTruthy, character, index) {
    return predicateWithContext(character, index, subjectString) ? countTruthy + 1 : countTruthy;
  }, 0);
}