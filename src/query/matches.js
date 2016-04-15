import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';

/**
 * Checks if `subject` matches the regular expression `pattern`
 *
 * @function matches
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {RegExp|string} pattern The pattern to match. A `string` type is transformed to a regular expression object.
 * @param {string} [flags=''] The regular expression flags.
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
  subject = undefinedDefault(subject, '');
  var subjectString = toString(undefinedDefault(subject, '')),
    flagsString = toString(undefinedDefault(flags, '')),
    patternString;
  if (subjectString === null) {
    return false;
  }
  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
    patternString = toString(pattern);
    if (patternString === null) {
      return false;
    }
    pattern = new RegExp(patternString, flagsString === null ? undefined : flagsString);
  } else if (flagsString !== null && flagsString.length > 0) {
    // Apply the flags to a regexp object
    // Notice that it may generate a TypeError when specify the flags for an existing regular expression object
    pattern = new RegExp(pattern, flagsString);
  }
  return pattern.test(subjectString);
}