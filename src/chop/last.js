import clipNumber from 'helper/number/clip_number';
import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import { MAX_SAFE_INTEGER } from 'helper/number/const';
import toInteger from 'helper/number/to_integer';

/**
 * Extracts the last `length` characters from `subject`.
 *
 * @function last
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the last characters string.
 * @example
 * v.last('helicopter');
 * // => 'r'
 *
 * v.last('vehicle', 2);
 * // => 'le'
 *
 * v.last('car', 5);
 * // => 'car'
 */
export default function last(subject, length) {
  const subjectString = coerceToString(subject);
  const lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(subjectString.length - lengthInt, lengthInt);
}