import toString from '../utils/string/to_string';
import toBoolean from '../utils/boolean/to_boolean';
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';

/**
 * Converts the first character of `subject` to upper case and the rest to lower case.
 *
 * @function capitalize
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to capitalize.
 * @param {boolean} [restToLowerCase=true] Convert the rest of `subject` to lower case.
 * @return {string} Returns the capitalized string.
 * @example
 * v.capitalize('APPLE');
 * // => 'Apple'
 *
 * v.capitalize('mAC', false);
 * // => 'MAC'
 */
export default function(subject, restToLowerCase) {
  var subjectString = toString(nilDefault(subject, '')),
    restToLowerCaseBoolean = toBoolean(nilDefault(restToLowerCase, true));
  if (subjectString === '') {
    return subjectString;
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}