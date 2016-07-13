import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';
import isNil from '../utilities/object/is_nil';
import clipNumber from '../utilities/number/clip_number';
import toInteger from '../utilities/number/to_integer';
import buildPadding from '../utilities/string/build_padding';

/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
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
  var subjectString = toString(nilDefault(subject, '')),
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
    padString = toString(nilDefault(pad, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return buildPadding(padString, lengthInt - subjectString.length) + subjectString;
}