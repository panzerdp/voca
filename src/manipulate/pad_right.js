import coerceToString from '../utilities/string/coerce_to_string';
import isNil from '../utilities/object/is_nil';
import clipNumber from '../utilities/number/clip_number';
import toInteger from '../utilities/number/to_integer';
import buildPadding from '../utilities/string/build_padding';
import { MAX_SAFE_INTEGER } from '../utilities/number/const';

/**
 * Pads `subject` from right to a new `length`.
 *
 * @function padRight
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to right pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the right padded string.
 * @example
 * v.padRight('word', 6, '-');
 * // => 'word--'
 *
 * v.padRight('hi', 5, '-=');
 * // => 'hi-=-'
 */
export default function(subject, length, pad) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
    padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return subjectString + buildPadding(padString, lengthInt - subjectString.length);
}