import {
  TYPE_FLOAT,
  TYPE_FLOAT_SCIENTIFIC,
  TYPE_FLOAT_SCIENTIFIC_UPPERCASE,
  TYPE_FLOAT_SHORT,
  TYPE_FLOAT_SHORT_UPPERCASE
} from 'helper/format/const';
import addSignToFormattedNumber from 'helper/format/type_format/add_sign_to_formatted_number';
import coerceToNumber from 'helper/number/coerce_to_number';
import { REGEXP_TRAILING_ZEROS } from 'helper/reg_exp/const';
import toString from 'helper/string/coerce_to_string';

/**
 * Formats a float type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

export default function float(replacement, conversion) {
  let replacementNumber = parseFloat(replacement);
  let formattedReplacement;
  if (isNaN(replacementNumber)) {
    replacementNumber = 0;
  }
  const precision = coerceToNumber(conversion.precision, 6);
  switch (conversion.typeSpecifier) {
    case TYPE_FLOAT:
      formattedReplacement = replacementNumber.toFixed(precision);
      break;
    case TYPE_FLOAT_SCIENTIFIC:
      formattedReplacement = replacementNumber.toExponential(precision);
      break;
    case TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
      formattedReplacement = replacementNumber.toExponential(precision).toUpperCase();
      break;
    case TYPE_FLOAT_SHORT:
    case TYPE_FLOAT_SHORT_UPPERCASE:
      formattedReplacement = formatFloatAsShort(replacementNumber, precision, conversion);
      break;
  }
  formattedReplacement = addSignToFormattedNumber(replacementNumber, formattedReplacement, conversion);
  return toString(formattedReplacement);
}

/**
 * Formats the short float.
 *
 * @ignore
 * @param  {number} replacementNumber The number to format.
 * @param  {number} precision The precision to format the float.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string}  Returns the formatted short float.
 */
function formatFloatAsShort(replacementNumber, precision, conversion) {
  if (replacementNumber === 0) {
    return '0';
  }
  const nonZeroPrecision = precision === 0 ? 1 : precision;
  let formattedReplacement = replacementNumber
    .toPrecision(nonZeroPrecision)
    .replace(REGEXP_TRAILING_ZEROS, '');
  if (conversion.typeSpecifier === TYPE_FLOAT_SHORT_UPPERCASE) {
    formattedReplacement = formattedReplacement.toUpperCase();
  }
  return formattedReplacement;
}