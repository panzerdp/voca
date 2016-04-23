import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import isAlpha from './is_alpha';

/**
 * Checks if `subject` has only lower case characters.
 *
 * @function isLowerCase
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is lower case or `false` otherwise.
 * @example
 * v.isLowerCase('motorcycle');
 * // => true
 *
 * v.isLowerCase('John');
 * // => false
 *
 * v.isLowerCase('T1000');
 * // => false
 */
export default function(subject) {
  var valueString = toString(nilDefault(subject, ''));
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}