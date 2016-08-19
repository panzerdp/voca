import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';
import { REGEXP_SPECIAL_CHARACTERS } from '../utilities/string/regexp';

/**
 * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
 *
 * @function escapeRegExp
 * @static
 * @since 1.0.0
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeRegExp('(hours)[minutes]{seconds}');
 * // => '\(hours\)\[minutes\]\{seconds\}'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}