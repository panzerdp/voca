import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';
import isAlpha from './is_alpha';

/**
 * Checks if `subject` has only lower case characters.
 *
 * @function isAllLowerCase
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is lower case or `false` otherwise.
 * @example
 * v.isAllLowerCase('motorcycle');
 * // => true
 *
 * v.isAllLowerCase('John');
 * // => false
 *
 * v.isAllLowerCase('T1000');
 * // => false
 */
export default function(subject) {
  var valueString = toString(nilDefault(subject, ''));
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}