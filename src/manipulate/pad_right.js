/*eslint-disable */
import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';


/**
 * Pads `subject` from right to a new `length`.
 *
 * @function padRight
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=1] The new string length. If `length` is less than `subject.length`, no changes are made.
 * @param {string} [padString=' '] The string to be used for padding.
 * @return {string} Returns the right padded string.
 * @example
 * v.padLeft('FF', '0', 2);
 * // => '00FF'
 */
export default function(subject, length, padString) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString;
}