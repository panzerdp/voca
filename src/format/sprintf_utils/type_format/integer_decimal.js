import toString from '../../../helper/string/to_string';
import Const from '../const';

/**
 * Formats a decimal integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement          The string to be formatted.
 * @param  {string} [signSpecifier]      The sign specifier to force a sign to be used on a number.
 * @return {string}                      Returns the formatted string.
 */

export default function(replacement, signSpecifier) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  if (signSpecifier === Const.LITERAL_PLUS && integer >= 0) {
    integer = Const.LITERAL_PLUS + integer;
  }
  return toString(integer);
}