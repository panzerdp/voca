import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';
import isNil from '../utilities/object/is_nil';
import clipNumber from '../utilities/number/clip_number';
import toInteger from '../utilities/number/to_integer';
import buildPadding from '../utilities/string/build_padding';
import { MAX_SAFE_INTEGER } from '../utilities/number/const';

/**
 * Pads `subject` to a new `length`.
 *
 * @function pad
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the padded string.
 * @example
 * v.pad('word', 6, '-');
 * // => '-word-'
 *
 * v.pad('hi', 5, '-=');
 * // => '-hi-='
 */
export default function(subject, length, pad) {
  var subjectString = toString(nilDefault(subject, '')),
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
    padString = toString(nilDefault(pad, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  var paddingLength = lengthInt - subjectString.length,
    paddingSideLength = toInteger(paddingLength / 2),
    paddingSideRemainingLength = paddingLength % 2;
  return buildPadding(padString, paddingSideLength) + subjectString +
      buildPadding(padString, paddingSideLength + paddingSideRemainingLength);
}