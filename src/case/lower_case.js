import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';

/**
 * Converts the `subject` to lower case.
 *
 * @function lowerCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to lower case.
 * @return {string} The lower case string.
 * @example
 * v.lowerCase('Green');
 * // => 'green'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.toLowerCase();
}