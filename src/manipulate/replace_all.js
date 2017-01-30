import appendFlagToRegularExpression from 'helper/reg_exp/append_flag_to_reg_exp';
import coerceToString from 'helper/string/coerce_to_string';
import escapeRegExp from 'escape/escape_reg_exp';

/**
 * Replaces all matches of `pattern` with `replacement`. <br/>
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
 * v.replaceAll('evening', /n/, 's');
 * // => 'evesisg'
 *
 */
export default function replaceAll(subject, pattern, replacement) {
  const subjectString = coerceToString(subject);
  let regExp = pattern;
  if (!(pattern instanceof RegExp)) {
    regExp = new RegExp(escapeRegExp(pattern), 'g');
  } else if (!pattern.global) {
    regExp = appendFlagToRegularExpression(pattern, 'g');
  }
  return subjectString.replace(regExp, replacement);
}