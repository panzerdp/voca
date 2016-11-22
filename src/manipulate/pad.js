import buildPadding from 'helper/string/build_padding';
import clipNumber from 'helper/number/clip_number';
import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import { MAX_SAFE_INTEGER } from 'helper/number/const';
import toInteger from 'helper/number/to_integer';

/**
 * Pads `subject` to a new `length`.
 *
 * @function pad
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the padded string.
 * @example
 * v.pad('dog', 5);
 * // => ' dog '
 *
 * v.pad('bird', 6, '-');
 * // => '-bird-'
 *
 * v.pad('cat', 6, '-=');
 * // => '-cat-='
 */
export default function pad(subject, length, pad) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
    padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  var paddingLength = lengthInt - subjectString.length,
    paddingSideLength = toInteger(paddingLength / 2),
    paddingSideRemainingLength = paddingLength % 2;
  return buildPadding(padString, paddingSideLength) + subjectString +
      buildPadding(padString, paddingSideLength + paddingSideRemainingLength);
}