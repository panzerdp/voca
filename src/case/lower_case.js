import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Converts the `subject` to lower case.
 *
 * @function lowerCase
 * @static
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