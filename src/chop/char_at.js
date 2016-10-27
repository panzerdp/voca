import coerceToString from '../helper/string/coerce_to_string';

/**
 * Access a character from `subject` at specified `index`.
 *
 * @function charAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {numbers} index The index to get the character.
 * @return {string} Returns the character at specified index.
 * @example
 * v.charAt('helicopter', 0);
 * // => 'h'
 *
 * v.charAt('helicopter', 1);
 * // => 'e'
 */
export default function(subject, index) {
  var subjectString = coerceToString(subject);
  return subjectString.charAt(index);
}