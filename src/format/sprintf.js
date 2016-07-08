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
 * <div class="smaller">
 * `format` string contains characters, beginning and ending in its initial shift state, if any. The format
 * string is composed of zero or more directives: ordinary characters (not <code>%</code>), which are  copied  unchanged
 * to  the  output string and conversion specifications, each of which results in fetching zero or more subsequent
 * arguments. Each conversion specification is introduced by the character <code>%</code>, and ends with a <b>conversion
 * specifier</b>. In between there may be (in this order) zero or more <b>flags</b>, an optional <b>minimum field width</b>
 * and an optional <b>precision</b>.<br/>
 * By default, the arguments are used in the order given.<br/>
 * For argument numbering and swapping, write `%m$` (where `m` is a number indicating the argument order)
 * instead of `%` to specify explicitly which argument is taken.<br/><br/>
 *
 * <b>The flag characters</b><br/>
 * The character <code>%</code> is followed by zero or more of the following flags:<br/>
 * <table class="light-params">
 *   <tr>
 *     <td><code>+</code></td>
 *     <td>
 *       A  sign (<code>+</code> or <code>-</code>) should always be placed before a number produced by a
 *       signed conversion. By default a sign is used only for negative numbers.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td><code>0</code></td>
 *     <td>The value should be zero padded.</td>
 *   </tr>
 *   <tr>
 *     <td><code>&blank;</code></td>
 *     <td>(a space) The value should be space padded.</td>
 *   </tr>
 *   <tr>
 *    <td><code>'</code></td>
 *    <td>Indicates alternate padding character, specified by prefixing it with a single quote <code>'</code>.</td>
 *   </tr>
 *   <tr>
 *     <td><code>-</code></td>
 *     <td>The converted value is to be left adjusted on the field boundary (the default is right justification).</td>
 *   </tr>
 * </table>
 *
 * <b>The field width</b><br/>
 * An  optional decimal digit string (with nonzero first digit) specifying a minimum field width.  If the converted
 * value has fewer characters than the field width, it will be padded with spaces on the left (or right, if the
 * left-adjustment flag has been given).<br/><br/>
 *
 * <b>The precision</b><br/>
 * An optional precision, in the form of a period `.` followed by an optional decimal digit string.<br/>
 * This gives the number of digits to appear after the radix character for `e`, `E`, `f` and `F` conversions, the
 * maximum number of significant digits for `g` and `G` conversions or the maximum number of characters to be printed
 * from a string for `s` conversion.<br/><br/>
 *
 * <b>The conversion specifier</b><br/>
 * A specifier that mentions what type the argument should be treated as:
 *
 * <table class="light-params">
 *   <tr>
 *     <td>`s`</td>
 *     <td>The string argument is treated as and presented as a string.</td>
 *   </tr>
 *   <tr>
 *     <td>`d` `i`</td>
 *     <td>The integer argument is converted to signed decimal notation.</td>
 *   </tr>
 *   <tr>
 *     <td>`b`</td>
 *     <td>The unsigned integer argument is converted to unsigned binary.</td>
 *   </tr>
 *   <tr>
 *     <td>`c`</td>
 *     <td>The unsigned integer argument is converted to an ASCII character with that number.</td>
 *   </tr>
 *   <tr>
 *     <td>`o`</td>
 *     <td>The unsigned integer argument is converted to unsigned octal.</td>
 *   </tr>
 *   <tr>
 *     <td>`u`</td>
 *     <td>The unsigned integer argument is converted to unsigned decimal.</td>
 *   </tr>
 *   <tr>
 *     <td>`x` `X`</td>
 *     <td>The unsigned integer argument is converted to unsigned hexadecimal. The letters `abcdef` are used for `x`
 *     conversions; the letters `ABCDEF` are used for `X` conversions.</td>
 *   </tr>
 *   <tr>
 *     <td>`e` `E`</td>
 *     <td>
 *       The float argument is rounded and converted in the style `[-]d.ddde±dd`, where there is one digit
 *       before the decimal-point character and the number of digits after it is equal to the precision. If
 *       the precision is missing, it is taken as 6; if the precision is zero, no decimal-point character
 *       appears. An `E` conversion uses the letter `E` (rather than `e`) to introduce the exponent.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`g` `G`</td>
 *     <td>
 *       The double argument is converted in style `f` or `e` (or `F` or `E` for `G` conversions). The precision specifies
 *       the number of significant digits. If the precision is missing, 6 digits are given; if the
 *       precision is zero, it is treated as 1. Style `e` is used if the exponent from its conversion is less
 *       than -6 or greater than or equal to the precision. Trailing zeros are removed from the fractional
 *       part of the result; a decimal point appears only if it is followed by at least one digit.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`%`</td>
 *     <td>A literal `%` is written. No argument is converted. The complete conversion specification is `%%`.</td>
 *   </tr>
 *
 * </table>
 * </div>
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