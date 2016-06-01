import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Formats `subject`.
 *
 * @function sprintf
 * @static
 * @memberOf Format
 * @param {string} [subject=''] The string to format.
 * @param {...*} args The arguments for formatting
 * @return {string} Returns the formatted string.
 * @example
 * v.sprintf('%d', 1);
 * // => '1'
 */
export default function(subject, ...args) {
  var subjectString = toString(nilDefault(subject, ''));
  args;
  return subjectString;
}