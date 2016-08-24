import toString from '../utilities/string/coerce_to_string';
import nilDefault from '../utilities/undefined/nil_default';

/**
 * Extracts from `subject` a string from `start` position to `end` position.
 *
 * @function substring
 * @static
 * @since 1.0.0
 * @memberOf Cut
 * @param {string} [subject=''] The string to extract from.
 * @param {number} start The position to start extraction.
 * @param {number} [end=subject.length] The position to end extraction.
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