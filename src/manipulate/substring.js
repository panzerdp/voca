import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Extract from `subject` a string from `start` position to `end` position.
 *
 * @function substring
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {int} start The position to start extraction.
 * @param {int} [end=subject.length] The position to end extraction.
 * @return {string} Returns the extracted string.
 * @note Uses native `String.prototype.substring()`
 * @example
 * v.substring('beach', 1);
 * // => 'each'
 *
 * v.substring('ocean', 1, 3);
 * // => 'ea'
 */
export default function(subject, start, end) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.substring(start, end);
}