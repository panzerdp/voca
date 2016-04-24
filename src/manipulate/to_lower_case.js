import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Converts the `subject` to lower case.
 *
 * @function toLowerCase
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to convert to lower case.
 * @return {string} The lower case string.
 * @example
 * v.toLowerCase('Green');
 * // => 'green'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.toLowerCase();
}