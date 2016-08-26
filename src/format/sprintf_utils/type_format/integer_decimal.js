import alignAndPad from '../align_and_pad';
import toString from '../../../helper/string/to_string';
import Const from '../const';

/**
 * Formats a decimal integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement          The string to be formatted.
 * @param  {string} [signSpecifier]      The sign specifier to force a sign to be used on a number.
 * @param  {string} paddingCharacter     The padding character.
 * @param  {string} [alignmentSpecifier] The alignment specifier that says if the result should be left-justified or right-justified.
 * @param  {number} [width]              The width how many characters this conversion should result in.
 * @return {string}                      Returns the formatted string.
 */

export default function(replacement, signSpecifier, paddingCharacter, alignmentSpecifier, width) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  if (signSpecifier === Const.LITERAL_PLUS && integer >= 0) {
    integer = Const.LITERAL_PLUS + integer;
  }
  return alignAndPad(toString(integer), paddingCharacter, alignmentSpecifier, width);
}