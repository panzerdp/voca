import coerceToString from '../helper/string/coerce_to_string';
import escapeRegExp from '../escape/escape_reg_exp';

/**
 * Coerce the pattern to a regular expression with global flag enabled.
 *
 * @ignore
 * @param {string|RegExp} pattern The pattern to coerce.
 * @return {RegExp} The regular expression with global flag enabled.
 */
function coerceToGlobalRegExp(pattern) {
  var regExp = pattern;
  if (!(pattern instanceof RegExp)) {
    regExp = new RegExp(escapeRegExp(coerceToString(pattern)), 'g');
  } else if (!pattern.global) {
    regExp = new RegExp(pattern.source, pattern.flags + 'g');
  }
  return regExp;
}

/**
 * Returns a new string where all matches of `pattern` are replaced with `replacement`. <br/>
 *
 * @function replaceAll
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string, a simple string match is evaluated.
 * All matches are replaced.
 * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * v.replaceAll('good morning', 'o', '*');
 * // => 'g**d m*rning'
 * v.replaceAll('evening', \n\, 's');
 * // => 'evesisg'
 *
 */
export default function(subject, pattern, replacement) {
  var subjectString = coerceToString(subject);
  return subjectString.replace(coerceToGlobalRegExp(pattern), replacement);
}