import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';
import isNil from '../utilities/object/is_nil';
import clipNumber from '../utilities/number/clip_number';
import toInteger from '../utilities/number/to_integer';
import { MAX_SAFE_INTEGER } from '../utilities/number/const';

/**
 * Extract the rightmost `length` characters from `subject`.
 *
 * @function right
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {int} [length=subject.length] The number of characters to extract.
 * @return {string} Returns the rightmost extracted string.
 * @example
 * v.right('vehicle', 2);
 * // => 'cle'
 *
 * v.right('car', 5);
 * // => 'car'
 */
export default function(subject, length) {
  var subjectString = toString(nilDefault(subject, '')),
    lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(subjectString.length - lengthInt, lengthInt);
}