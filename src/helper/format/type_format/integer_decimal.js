import addSignToFormattedNumber from 'helper/format/type_format/add_sign_to_formatted_number';
import toString from 'helper/string/to_string';

/**
 * Formats a decimal integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

export default function integerDecimal(replacement, conversion) {
  let integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  return addSignToFormattedNumber(integer, toString(integer), conversion);
}