import coerceToRegularExpression from '../helper/regular_expression/coerce_to_regular_expression';
import coerceToString from '../helper/string/coerce_to_string';

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
  return subjectString.replace(coerceToRegularExpression(pattern), replacement);
}