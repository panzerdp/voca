import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';

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
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.split('').reverse().join('');
}