import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Checks if `subject` matches the regular expression `pattern`.
 *
 * @function matches
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {RegExp|string} pattern The pattern to match.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is `string` type.
 * @return {boolean} Returns `true` if `subject` matches `pattern` or `false` otherwise.
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
export default function(subject, pattern, flags) {
  var subjectString = toString(nilDefault(subject, '')),
    flagsString = toString(nilDefault(flags, '')),
    patternString;
  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
    patternString = toString(pattern);
    if (patternString === null) {
      return false;
    }
    pattern = new RegExp(patternString, flagsString);
  }
  return pattern.test(subjectString);
}