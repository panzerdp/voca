import coerceToString from '../utilities/string/coerce_to_string';
import isNil from '../utilities/object/is_nil';
import clipNumber from '../utilities/number/clip_number';
import toInteger from '../utilities/number/to_integer';
import { MAX_SAFE_INTEGER } from '../utilities/number/const';

/**
 * Extracts the leftmost `length` characters from `subject`.
 *
 * @function left
 * @static
 * @since 1.0.0
 * @memberOf Cut
 * @param {string} [subject=''] The string to extract from.
 * @param {int} [length=subject.length] The number of characters to extract.
 * @return {string} Returns the leftmost extracted string.
 * @example
 * v.left('vehicle', 2);
 * // => 've'
 *
 * v.left('car', 5);
 * // => 'car'
 */
export default function(subject, length) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(0, lengthInt);
}