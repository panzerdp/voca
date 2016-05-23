import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';
import repeat from './repeat';

/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The padded string length. No changes are made if `length` is less than `subject.length`.
 * @param {string} [padString=' '] The string to be used for padding.
 * @return {string} Returns the left padded string.
 * @example
 * v.padLeft('word', 6, '-');
 * // => '--word'
 *
 * v.padLeft('hi', 4);
 * // => ' hi'
 */
export default function(subject, length, padString) {
  var subjectString = toString(nilDefault(subject, '')),
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER);
  padString = toString(nilDefault(padString, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  var padStringRepeat = ~~((lengthInt - subjectString.length) / padString.length),
    padStringRest = (lengthInt - subjectString.length) % padString.length,
    paddedString = repeat(padString, padStringRepeat + padStringRest) + subjectString;
  return paddedString.substr(-lengthInt);
}