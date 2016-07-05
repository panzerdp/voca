import alignAndPad from '../align_and_pad';
import { CHARACTER_PLUS } from '../const';
import nilDefault from '../../../utils/undefined/nil_default';
import toNumber from '../../../utils/number/to_number';

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
 * @return {string}                      Returns the formatted string.
 */

export default function(replacement, signSpecifier, paddingCharacter, alignmentSpecifier, width, precision) {
  var float = parseFloat(replacement);
  precision = toNumber(nilDefault(precision, 6));
  if (isNaN(float)) {
    float = 0;
  }
  var showPlusSign = signSpecifier === CHARACTER_PLUS && float >= 0;
  float = float.toFixed(precision);
  if (showPlusSign) {
    float = CHARACTER_PLUS + float;
  }
  return alignAndPad(float, paddingCharacter, alignmentSpecifier, width);
}