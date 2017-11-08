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
  const regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;
  const subjectString = coerceToString(subject).replace(regexSurrogatePair, '$2$1');

  let reversedString = '';
  let index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}
