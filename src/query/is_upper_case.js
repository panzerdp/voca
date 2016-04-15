import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isAlpha from './is_alpha';

/**
 * Checks if `subject` is upper case.
 *
 * @function isUpperCase
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Return `true` if `subject` is upper case or `false` otherwise.
 * @example
 * v.isUpperCase('ACDC');
 * // => true
 *
 * v.isUpperCase('Morning');
 * // => false
 */
export default function(subject) {
  var subjectString = toString(undefinedDefault(subject, ''));
  return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
}