import getRegularExpressionFlags from './get_regular_expression_flags';
import includes from '~/query/includes';

/**
 * Append flag to a regular expression.
 *
 * @ignore
 * @param {RegExp} pattern The pattern to coerce.
 * @param {string} appendFlag The flag to append to regular expression.
 * @return {RegExp} The regular expression with added flag.
 */
export default function(pattern, appendFlag) {
  var regularExpressionFlags = getRegularExpressionFlags(pattern);
  if (!includes(regularExpressionFlags, appendFlag)) {
    return new RegExp(pattern.source, regularExpressionFlags + appendFlag);
  }
  return pattern;
}