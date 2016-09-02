import addSignToFormattedNumber from './helper/add_sign_to_formatted_number';
import coerceToNumber from '../../../helper/number/coerce_to_number';
import Const from '../const';
import { REGEXP_TRAILING_ZEROS } from '../../../helper/string/regexp';
import toString from '../../../helper/string/coerce_to_string';

/**
 * Formats the short float.
 *
 * @ignore
 * @param  {number} replacementNumber The number to format.
 * @param  {number} precision         The precision to format the float.
 * @param  {string} typeSpecifier     The type specifier.
 * @return {string}                   Returns the formatted short float.
 */
function formatFloatAsShort(replacementNumber, precision, typeSpecifier) {
  if (replacementNumber === 0) {
    return '0';
  }
  var formattedReplacement = replacementNumber.toPrecision(precision === 0 ? 1 : precision).replace(REGEXP_TRAILING_ZEROS, '');
  if (typeSpecifier === Const.TYPE_FLOAT_SHORT_UPPERCASE) {
    formattedReplacement = formattedReplacement.toUpperCase();
  }
  return formattedReplacement;
}

/**
 * Formats a float type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement          The string to be formatted.
 * @param  {string} [signSpecifier]      The sign specifier to force a sign to be used on a number.
 * @param  {number} [precision]          The precision.
 * @param  {string} typeSpecifier        The type specifier says what type the argument data should be treated as.
 * @return {string}                      Returns the formatted string.
 */

export default function(replacement, signSpecifier, precision, typeSpecifier) {
  var replacementNumber = parseFloat(replacement),
    formattedReplacement;
  if (isNaN(replacementNumber)) {
    replacementNumber = 0;
  }
  precision = coerceToNumber(precision, 6);
  switch (typeSpecifier) {
    case Const.TYPE_FLOAT:
      formattedReplacement = replacementNumber.toFixed(precision);
      break;
    case Const.TYPE_FLOAT_SCIENTIFIC:
      formattedReplacement = replacementNumber.toExponential(precision);
      break;
    case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
      formattedReplacement = replacementNumber.toExponential(precision).toUpperCase();
      break;
    case Const.TYPE_FLOAT_SHORT:
    case Const.TYPE_FLOAT_SHORT_UPPERCASE:
      formattedReplacement = formatFloatAsShort(replacementNumber, precision, typeSpecifier);
      break;
  }
  formattedReplacement = addSignToFormattedNumber(replacementNumber, formattedReplacement, signSpecifier);
  return toString(formattedReplacement);
}