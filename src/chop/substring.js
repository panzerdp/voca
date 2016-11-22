import coerceToString from 'helper/string/coerce_to_string';

/**
 * Extracts from `subject` a string from `start` position up to `end` position. The character at `end` position is not
 * included.
 *
 * @function substring
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction.
 * @param  {number} [end=subject.length] The position to end extraction.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.substring()`
 * @example
 * v.substring('beach', 1);
 * // => 'each'
 *
 * v.substring('ocean', 1, 3);
 * // => 'ea'
 */
export default function substring(subject, start, end) {
  return coerceToString(subject).substring(start, end);
}