import coerceToString from 'helper/string/coerce_to_string';
import { REGEXP_CONVERSION_SPECIFICATION } from 'helper/reg_exp/const';
import ReplacementIndex from 'helper/format/replacement/index.js';
import replacementMatch from 'helper/format/replacement/match';

/**
 * Produces a string according to `format`.
 *
 * <div id="sprintf-format" class="smaller">
 * `format` string is composed of zero or more directives: ordinary characters (not <code>%</code>), which are  copied  unchanged
 * to  the  output string and <i>conversion specifications</i>, each of which results in fetching zero or more subsequent
 * arguments. <br/> <br/>
 *
 * Each <b>conversion specification</b> is introduced by the character <code>%</code>, and ends with a <b>conversion
 * specifier</b>. In between there may be (in this order) zero or more <b>flags</b>, an optional <b>minimum field width</b>
 * and an optional <b>precision</b>.<br/>
 * The syntax is: <b>ConversionSpecification</b> = <b>"%"</b> { <b>Flags</b> }
 * [ <b>MinimumFieldWidth</b> ] [ <b>Precision</b> ] <b>ConversionSpecifier</b>, where curly braces { } denote repetition
 * and square brackets [ ] optionality. <br/><br/>
 *
 * By default, the arguments are used in the given order.<br/>
 * For argument numbering and swapping, `%m$` (where `m` is a number indicating the argument order)
 * is used instead of `%` to specify explicitly which argument is taken. For instance `%1$s` fetches the 1st argument,
 * `%2$s` the 2nd and so on, no matter what position  the conversion specification has in `format`.
 * <br/><br/>
 *
 * <b>The flags</b><br/>
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
 * <b>The minimum field width</b><br/>
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
 *     <td>`f`</td>
 *     <td>
 *      The float argument is rounded and converted to decimal notation in the style `[-]ddd.ddd`, where the number of
 *      digits after the decimal-point character is equal to the precision specification. If the precision is missing,
 *      it is taken as 6; if the precision is explicitly zero, no decimal-point character appears.
 *      If a decimal point appears, at least one digit appears before it.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`e` `E`</td>
 *     <td>
 *       The float argument is rounded and converted in the style `[-]d.ddde±dd`, where there is one digit
 *       before the decimal-point character and the number of digits after it is equal to the precision. If
 *       the precision is missing, it is taken as `6`; if the precision is zero, no decimal-point character
 *       appears. An `E` conversion uses the letter `E` (rather than `e`) to introduce the exponent.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`g` `G`</td>
 *     <td>
 *       The float argument is converted in style `f` or `e` (or `F` or `E` for `G` conversions). The precision specifies
 *       the number of significant digits. If the precision is missing, `6` digits are given; if the
 *       precision is zero, it is treated as `1`. Style `e` is used if the exponent from its conversion is less
 *       than `-6` or greater than or equal to the precision. Trailing zeros are removed from the fractional
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
 * @since 1.0.0
 * @memberOf Format
 * @param  {string} [format=''] The format string.
 * @param  {...*}               replacements The replacements to produce the string.
 * @return {string}             Returns the produced string.
 * @example
 * v.sprintf('%s, %s!', 'Hello', 'World');
 * // => 'Hello World!'
 *
 * v.sprintf('%s costs $%d', 'coffee', 2);
 * // => 'coffee costs $2'
 *
 * v.sprintf('%1$s %2$s %1$s %2$s, watcha gonna %3$s', 'bad', 'boys', 'do')
 * // => 'bad boys bad boys, watcha gonna do'
 *
 * v.sprintf('% 6s', 'bird');
 * // => '  bird'
 *
 * v.sprintf('% -6s', 'crab');
 * // => 'crab  '
 *
 * v.sprintf("%'*5s", 'cat');
 * // => '**cat'
 *
 * v.sprintf("%'*-6s", 'duck');
 * // => 'duck**'
 *
 * v.sprintf('%d %i %+d', 15, -2, 25);
 * // => '15 -2 +25'
 *
 * v.sprintf("%06d", 15);
 * // => '000015'
 *
 * v.sprintf('0b%b 0o%o 0x%X', 12, 9, 155);
 * // => '0b1100 0o11 0x9B'
 *
 * v.sprintf('%.2f', 10.469);
 * // => '10.47'
 *
 * v.sprintf('%.2e %g', 100.5, 0.455);
 * // => '1.01e+2 0.455'
 * 
 */
export default function sprintf(format, ...replacements) {
  const formatString = coerceToString(format);
  if (formatString === '') {
    return formatString;
  }
  const boundReplacementMatch = replacementMatch.bind(undefined, new ReplacementIndex(), replacements);
  return formatString.replace(REGEXP_CONVERSION_SPECIFICATION, boundReplacementMatch);
}