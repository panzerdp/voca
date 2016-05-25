import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';
import buildPadding from '../utils/string/build_padding';

/**
 * Pads `subject` from right to a new `length`.
 *
 * @function padRight
 * @static
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
  var subjectString = toString(nilDefault(subject, '')),
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
    padString = toString(nilDefault(pad, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return subjectString + buildPadding(padString, lengthInt - subjectString.length);
}