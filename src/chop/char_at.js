import coerceToString from '../helper/string/coerce_to_string';

/**
 * Get a character from `subject` at specific index.
 *
 * @function charAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {numbers} index The index to get the character.
 * @return {string} Returns characters.
 * @example
 * v.charAt('helicopter');
 * // => 'h'
 *
 * v.first('vehicle', 2);
 * // => 've'
 *
 * v.first('car', 5);
 * // => 'car'
 */
export default function(subject, index) {
  var subjectString = coerceToString(subject);
  return subjectString.charAt(index);
}