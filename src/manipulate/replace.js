import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Returns a new string where the matches of `pattern` are replaced with `replacement`.
 *
 * @function replace
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced with `replacement`.
 * @param {string|Function} replacement The string that replaces `pattern` match or a function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * v.matches('pluto', /plus?/);
 * // => true
 *
 * v.matches('sun', 'S', 'i');
 * // => true
 *
 * v.matches('apollo 11', '^\\w+$');
 * // => false
 */
export default function(subject, pattern, replacement) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(pattern, replacement);
}