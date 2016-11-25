import coerceToString from 'helper/string/coerce_to_string';

/**
 * Converts the `subject` to upper case.
 *
 * @function upperCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to upper case.
 * @return {string}              Returns the upper case string.
 * @example
 * v.upperCase('school');
 * // => 'SCHOOL'
 */
export default function upperCase(subject) {
  const subjectString = coerceToString(subject);
  return subjectString.toUpperCase();
}