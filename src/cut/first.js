import clipNumber from '../helper/number/clip_number';
import coerceToString from '../helper/string/coerce_to_string';
import isNil from '../helper/object/is_nil';
import { MAX_SAFE_INTEGER } from '../helper/number/const';
import toInteger from '../helper/number/to_integer';

/**
 * Extracts the first `length` characters from `subject`.
 *
 * @function first
 * @static
 * @since 1.0.0
 * @memberOf Cut
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the first characters string.
 * @example
 * v.first('helicopter');
 * // => 'h'
 *
 * v.first('vehicle', 2);
 * // => 've'
 *
 * v.first('car', 5);
 * // => 'car'
 */
export default function(subject, length) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(0, lengthInt);
}