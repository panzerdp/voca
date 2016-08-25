import coerceToString from '../utilities/string/coerce_to_string';

/**
 * Converts the first character of `subject` to lower case.
 *
 * @function decapitalize
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param {string} [subject=''] The string to decapitalize.
 * @return {string} Returns the decapitalized string.
 * @example
 * v.decapitalize('Sun');
 * // => 'sun'
 */
export default function(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
}