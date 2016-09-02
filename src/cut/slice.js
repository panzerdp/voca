import coerceToString from '../helper/string/coerce_to_string';

/**
 * Extracts from `subject` a string from `start` position to `end` position.
 *
 * @function slice
 * @static
 * @since 1.0.0
 * @memberOf Cut
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction. If negative use `subject.length + start`.
 * @param  {number} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.slice()`
 * @example
 * v.slice('miami', 1);
 * // => 'iami'
 *
 * v.slice('florida', -4);
 * // => 'rida'
 */
export default function(subject, start, end) {
  return coerceToString(subject).slice(start, end);
}