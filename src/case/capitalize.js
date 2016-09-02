import coerceToString from '../helper/string/coerce_to_string';
import coerceToBoolean from '../helper/boolean/coerce_to_boolean';

/**
 * Converts the first character of `subject` to upper case and the rest to lower case.
 *
 * @function capitalize
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string}  [subject='']            The string to capitalize.
 * @param  {boolean} [restToLowerCase=false] Convert the rest of `subject` to lower case.
 * @return {string}                          Returns the capitalized string.
 * @example
 * v.capitalize('apple');
 * // => 'Apple'
 *
 * v.capitalize('mAC', false);
 * // => 'MAC'
 */
export default function(subject, restToLowerCase) {
  var subjectString = coerceToString(subject),
    restToLowerCaseBoolean = coerceToBoolean(restToLowerCase);
  if (subjectString === '') {
    return '';
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}