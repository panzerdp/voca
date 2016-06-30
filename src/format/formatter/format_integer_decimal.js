import isNil from '../../utils/object/is_nil';
import truncate from '../../manipulate/truncate';
import alignAndPad from './align_and_pad';
import toNumber from '../../utils/number/to_number';
import toInteger from '../../utils/number/to_integer';
import { CHARACTER_MINUS, CHARACTER_PLUS } from './const';

/**
 * Formats a decimal integer type according to specifiers.
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
  var integer = toNumber(replacement);
  if (isNaN(integer)) {
    integer = 0;
  } else {
    integer = toInteger(integer);
  }
  if (signSpecifier === CHARACTER_PLUS && integer >= 0) {
    integer = CHARACTER_PLUS + integer;
  }
  integer = alignAndPad(integer, paddingCharacter, alignmentSpecifier, width);
  return integer;
}