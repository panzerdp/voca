import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Converts the `subject` to upper case.
 *
 * @function upperCase
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to upper case.
 * @return {string} The upper case string.
 * @example
 * v.upperCase('school');
 * // => 'SCHOOL'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.toUpperCase();
}