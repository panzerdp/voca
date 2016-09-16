import coerceToString from '~/helper/string/coerce_to_string';
import escapeRegExp from '~/escape/escape_reg_exp';
import getRegularExpressionFlags from './get_regular_expression_flags';

/**
 * Coerce the pattern to a regular expression with global flag enabled.
 *
 * @ignore
 * @param {string|RegExp} pattern The pattern to coerce.
 * @param {string} flags The flags to append to regular expression.
 * @return {RegExp} The regular expression with global flag enabled.
 */
export default function coerceToRegularExpression(pattern, flags = 'g') {
  if (!(pattern instanceof RegExp)) {
    return new RegExp(escapeRegExp(coerceToString(pattern)), flags);
  }
  if (!pattern.global) {
    return new RegExp(pattern.source, getRegularExpressionFlags(pattern) + flags);
  }
  return pattern;
}