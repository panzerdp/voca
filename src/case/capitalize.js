import toString from '../utils/string/to_string';
import toBoolean from '../utils/boolean/to_boolean';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Converts the first character of `subject` to upper case and the rest to lower case.
 *
 * @function capitalize
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to capitalize.
 * @param {boolean} [restToLowerCase=false] Convert the rest of `subject` to lower case.
 * @return {string} Returns the capitalized string.
 * @example
 * v.capitalize('apple');
 * // => 'Apple'
 *
 * v.capitalize('mAC', false);
 * // => 'MAC'
 */
export default function(subject, restToLowerCase) {
  var subjectString = toString(nilDefault(subject, '')),
    restToLowerCaseBoolean = toBoolean(nilDefault(restToLowerCase, false));
  if (subjectString === '') {
    return '';
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}