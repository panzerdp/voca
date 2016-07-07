import { REGEXP_CONVERSION_SPECIFICATION } from '../utils/string/regexp';
import { Type, CHARACTER_PERCENT } from './sprintf_utils/const';
import toString from '../utils/string/to_string';
import toNumber from '../utils/number/to_number';
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import paddingCharacter from './sprintf_utils/padding_character';
import validateFormat from './sprintf_utils/validate_format';
import formatFloat from './sprintf_utils/type/format_float';
import formatIntegerBase from './sprintf_utils/type/format_integer_base';
import formatIntegerDecimal from './sprintf_utils/type/format_integer_decimal';
import formatString from './sprintf_utils/type/format_string';

/**
 * Return the computed string based on format specifiers.
 *
 * @ignore
 * @param  {number}   index                   The index of the matched specifier.
 * @param  {Object[]} args                    The array of arguments to replace specifiers.
 * @param  {string}   signSpecifier           The sign specifier to force a sign to be used on a number.
 * @param  {string}   paddingSpecifier        The padding specifier that says what padding character will be used.
 * @param  {string}   alignmentSpecifier      The alignment specifier that says if the result should be left-justified or right-justified.
 * @param  {number}   widthSpecifier          The width specifier how many characters this conversion should result in.
 * @param  {number}   precisionSpecifier      The precision specifier says how many decimal digits should be displayed for floating-point numbers.
 * @param  {string}   typeSpecifier           The type specifier says what type the argument data should be treated as.
 * @return {string}                           Returns the computed string.
 */
function replaceConversionSpecification(index, args, signSpecifier, paddingSpecifier, alignmentSpecifier, widthSpecifier,
  precisionSpecifier, typeSpecifier) {
  validateFormat(index, args, typeSpecifier);
  var replacement = args[index];
  var formatterArguments = [replacement, signSpecifier, paddingCharacter(paddingSpecifier), alignmentSpecifier,
      toNumber(widthSpecifier), toNumber(precisionSpecifier)];
  switch (typeSpecifier) {
    case Type.STRING:
      return formatString(...formatterArguments);
    case Type.INTEGER_DECIMAL:
    case Type.INTEGER:
      return formatIntegerDecimal(...formatterArguments);
    case Type.INTEGER_ASCII_CHARACTER:
    case Type.INTEGER_BINARY:
    case Type.INTEGER_OCTAL:
    case Type.INTEGER_HEXADECIMAL:
    case Type.INTEGER_HEXADECIMAL_UPPERCASE:
    case Type.INTEGER_UNSIGNED_DECIMAL:
      return formatIntegerBase(...formatterArguments, typeSpecifier);
    case Type.FLOAT:
    case Type.FLOAT_SCIENTIFIC:
    case Type.FLOAT_SCIENTIFIC_UPPERCASE:
    case Type.FLOAT_SHORT:
    case Type.FLOAT_SHORT_UPPERCASE:
      return formatFloat(...formatterArguments, typeSpecifier);
  }
}

/**
 * Produces a string according to `format`.
 *
 * The format string contains characters, beginning and ending in its initial shift state, if any. The format
 * string is composed of zero or more directives: ordinary characters (not <code>%</code>), which are  copied  unchanged
 * to  the  output stream; and conversion specifications, each of which results in fetching zero or more subsequent
 * arguments. Each conversion specification is introduced by the character <code>%</code>, and ends with a <b>conversion
 * specifier</b>. In between there may be (in this order) <b>zero or more flags</b>, an optional <b>minimum field width</b>, an
 * optional <b>precision</b> and an optional <b>length modifier</b>.
 *
 * <b>The flag characters</b><br/>
 * The character <code>%</code> is followed by zero or more of the following flags:<br/>
 * <code>0</code> The value should be zero padded.<br/>
 * <code>-</code> The converted value is to be left adjusted on the field boundary (the default is right justification).<br/>
 * <code>' '</code> (a space) The value should be space padded.<br/>
 * <code>+</code> A  sign (<code>+</code> or <code>-</code>) should always be placed before a number produced by a
 * signed conversion. By default a sign is used only for negative numbers.<br/>
 * <code>'</code> Indicates that the immediately following character is used for padding.<br/>
 *
 * @function sprintf
 * @static
 * @memberOf Format
 * @param  {string} [format=''] The format string.
 * @param  {...*}               args The arguments to produce the string.
 * @return {string}             Returns the produced string.
 * @example
 * v.sprintf('%d', 1);
 * // => '1'
 */
export default function(format, ...args) {
  var formatString = toString(nilDefault(format, ''));
  if (formatString === '') {
    return formatString;
  }
  var index = 0;
  return formatString.replace(REGEXP_CONVERSION_SPECIFICATION, function(conversionSpecification, percent, position,
    ...specifiers) {
    if (percent === CHARACTER_PERCENT + CHARACTER_PERCENT) {
      return conversionSpecification.slice(1);
    }
    var argumentIndex = isNil(position) ? index++ : position - 1;
    return replaceConversionSpecification(argumentIndex, args, ...specifiers);
  });
}