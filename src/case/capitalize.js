import coerceToBoolean from '../helper/boolean/coerce_to_boolean';
import coerceToString from '../helper/string/coerce_to_string';

/**
 * Converts the first character of `subject` to upper case and the rest to lower case.
 *
 * @function capitalize
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string}  [subject='']            The string to capitalize.
 * @param  {boolean} [restToLower=false] Convert the rest of `subject` to lower case.
 * @return {string}                          Returns the capitalized string.
 * @example
 * v.capitalize('apple');
 * // => 'Apple'
 *
 * v.capitalize('mAC', false);
 * // => 'MAC'
 */
export default function(subject, restToLower) {
  var subjectString = coerceToString(subject),
    restToLowerCaseBoolean = coerceToBoolean(restToLower);
  if (subjectString === '') {
    return '';
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}