import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';

/**
 * Extract from `subject` beginning from `start` position a number of `length` characters.
 *
 * @function substr
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {int} start The position to start extracting.
 * @param {int} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
 * @return {string} Returns the extracted string.
 * @note Uses native `String.prototype.substr()`
 * @example
 * v.substr('infinite loop', 9);
 * // => 'loop'
 *
 * v.substr('dreams', 2, 2);
 * // => 'ea'
 */
export default function(subject, start, length) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.substr(start, length);
}