import coerceToString from '../helper/string/coerce_to_string';
import isNil from '../helper/object/is_nil';
import clipNumber from '../helper/number/clip_number';
import toInteger from '../helper/number/to_integer';
import buildPadding from '../helper/string/build_padding';
import { MAX_SAFE_INTEGER } from '../helper/number/const';

/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to left pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the left padded string.
 * @example
 * v.padLeft('word', 6, '-');
 * // => '--word'
 *
 * v.padLeft('hi', 5, '-=');
 * // => '-=-hi'
 */
export default function(subject, length, pad) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
    padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return buildPadding(padString, lengthInt - subjectString.length) + subjectString;
}