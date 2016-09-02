import isNil from '../../../helper/object/is_nil';
import truncate from '../../../cut/truncate';

/**
 * Formats a string type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement          The string to be formatted.
 * @param  {string} [signSpecifier]      The sign specifier to force a sign to be used on a number.
 * @param  {number} [precision]          The precision sets a maximum character limit to the string.
 * @return {string}                      Returns the formatted string.
 */

export default function(replacement, signSpecifier, precision) {
  var formattedReplacement = replacement;
  if (!isNil(precision) && formattedReplacement.length > precision) {
    formattedReplacement = truncate(formattedReplacement, precision, '');
  }
  return formattedReplacement;
}