import coerceToString from 'helper/string/coerce_to_string';

/**
 * Reverses the `subject`.
 *
 * @function reverse
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverse('winter');
 * // => 'retniw'
 */
export default function reverse(subject) {
  const subjectString = coerceToString(subject);
  let reversedString = '';
  for (let i = subjectString.length - 1; i >= 0; i--) {
    reversedString += subjectString[i];
  }
  return reversedString;
}