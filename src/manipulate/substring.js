import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';

/**
 * Extract from `subject` beginning from `start` position up to `end`.
 *
 * @function substring
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {int} start The position to start extracting.
 * @param {int} [end=subject.length] The position to end extracting. The character at `end` position is not included.
 * @return {string} Returns the extracted string.
 * @note Uses native `String.prototype.substring()`
 * @example
 * v.substring('beach', 1);
 * // => 'each'
 *
 * v.substring('ocean', 1, 2);
 * // => 'ea'
 */
export default function(subject, start, end) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.substring(start, end);
}