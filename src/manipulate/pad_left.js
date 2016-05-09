/*eslint-disable */
import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';


/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=1] The new string length. If `length` is less than `subject.length`, no changes are made.
 * @param {string} [padString=' '] The string to be used for padding.
 * @return {string} Returns the left padded string.
 * @example
 * v.padLeft('FF', '0', 4);
 * // => '00FF'
 */
export default function(subject, length, padString) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString;
}