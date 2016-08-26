import alignAndPad from '../align_and_pad';
import Const from '../const';
import nilDefault from '../../../helper/undefined/nil_default';
import toNumber from '../../../helper/number/to_number';
import toString from '../../../helper/string/coerce_to_string';
import { REGEXP_TRAILING_ZEROS } from '../../../helper/string/regexp';

/**
 * Formats a float type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement          The string to be formatted.
 * @param  {string} [signSpecifier]      The sign specifier to force a sign to be used on a number.
 * @param  {string} paddingCharacter     The padding character.
 * @param  {string} [alignmentSpecifier] The alignment specifier that says if the result should be left-justified or right-justified.
 * @param  {number} [width]              The width how many characters this conversion should result in.
 * @param  {number} [precision]          The precision.
 * @param  {string} typeSpecifier        The type specifier says what type the argument data should be treated as.
 * @return {string}                      Returns the formatted string.
 */

export default function(replacement, signSpecifier, paddingCharacter, alignmentSpecifier, width, precision, typeSpecifier) {
  var replacementNumber = parseFloat(replacement),
    formattedReplacement;
  if (isNaN(replacementNumber)) {
    replacementNumber = 0;
  }
  precision = toNumber(nilDefault(precision, 6));
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
      if (replacementNumber === 0) {
        formattedReplacement = 0;
        break;
      }
      formattedReplacement = replacementNumber.toPrecision(precision === 0 ? 1 : precision).replace(REGEXP_TRAILING_ZEROS, '');
      if (typeSpecifier === Const.TYPE_FLOAT_SHORT_UPPERCASE) {
        formattedReplacement = formattedReplacement.toUpperCase();
      }
      break;
  }
  if (signSpecifier === Const.LITERAL_PLUS && replacementNumber >= 0) {
    formattedReplacement = Const.LITERAL_PLUS + formattedReplacement;
  }
  return alignAndPad(toString(formattedReplacement), paddingCharacter, alignmentSpecifier, width);
}