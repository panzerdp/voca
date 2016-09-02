import addSignToFormattedNumber from './helper/add_sign_to_formatted_number';
import toString from '../../../helper/string/to_string';

/**
 * Formats a decimal integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement     The string to be formatted.
 * @param  {string} [signSpecifier] The sign specifier to force a sign to be used on a number.
 * @return {string}                 Returns the formatted string.
 */

export default function(replacement, signSpecifier) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  return addSignToFormattedNumber(integer, toString(integer), signSpecifier);
}