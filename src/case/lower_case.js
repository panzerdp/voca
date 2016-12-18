import coerceToString from 'helper/string/coerce_to_string';

/**
 * Converts the `subject` to lower case.
 *
 * @function lowerCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to lower case.
 * @return {string}              Returns the lower case string.
 * @example
 * v.lowerCase('Green');
 * // => 'green'
 *
 * v.lowerCase('BLUE');
 * // => 'blue'
 */
export default function lowerCase(subject) {
  const subjectString = coerceToString(subject, '');
  return subjectString.toLowerCase();
}
