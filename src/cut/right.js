import coerceToString from '../helper/string/coerce_to_string';
import isNil from '../helper/object/is_nil';
import clipNumber from '../helper/number/clip_number';
import toInteger from '../helper/number/to_integer';
import { MAX_SAFE_INTEGER } from '../helper/number/const';

/**
 * Extracts the rightmost `length` characters from `subject`.
 *
 * @function right
 * @static
 * @since 1.0.0
 * @memberOf Cut
 * @param {string} [subject=''] The string to extract from.
 * @param {int} [length=subject.length] The number of characters to extract.
 * @return {string} Returns the rightmost extracted string.
 * @example
 * v.right('vehicle', 2);
 * // => 'le'
 *
 * v.right('car', 5);
 * // => 'car'
 */
export default function(subject, length) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(subjectString.length - lengthInt, lengthInt);
}