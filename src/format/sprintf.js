/* eslint-disable */
import toString from '../utils/string/to_string';
import toNumber from '../utils/number/to_number';
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_CONVERSION_SPECIFICATION } from '../utils/string/regexp';
import { Type, CHARACTER_PERCENT } from './formatter/const';
import formatString from './formatter/format_string';
import paddingCharacter from './formatter/padding_character';
import validateFormat from './formatter/validate_format';
import isNil from '../utils/object/is_nil';

/**
 * Return the computated string based on format specifiers.
 *
 * @ignore
 * @param  {number}   index                   The index of the matched specifier.
 * @param  {Object[]} args                    The array of arguments to replace specifiers.
 * @param  {string}   conversionSpecification The conversion specifier.
 * @param  {string}   percent                 The percent chracters.
 * @param  {string}   signSpecifier           The sign specifier to force a sign to be used on a number.
 * @param  {string}   paddingSpecifier        The padding specifier that says what padding character will be used.
 * @param  {string}   alignmentSpecifier      The alignment specifier that says if the result should be left-justified or right-justified.
 * @param  {number}   widthSpecifier          The width specifier how many characters this conversion should result in.
 * @param  {number}   precisionSpecifier      The precision specifier says how many decimal digits should be displayed for floating-point numbers.
 * @param  {string}   typeSpecifier           The type specifier says what type the argument data should be treated as.
 * @return {string}                           Returns the computated string.
 */
function replaceConversionSpecification(index, args, conversionSpecification, percent, signSpecifier, paddingSpecifier,
  alignmentSpecifier, widthSpecifier, precisionSpecifier, typeSpecifier) {
  validateFormat(index, args, typeSpecifier);
  var replacement = args[index];
  var formatterArguments = [replacement, signSpecifier, paddingCharacter(paddingSpecifier), alignmentSpecifier,
      toNumber(widthSpecifier), toNumber(precisionSpecifier)];
  switch (typeSpecifier) {
    case Type.STRING:
      return formatString(...formatterArguments);
  }
}

/**
 * Produces a string according to the formatting of `format`.
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
    if (percent === (CHARACTER_PERCENT + CHARACTER_PERCENT)) {
      return conversionSpecification.slice(1);
    }
    var argumentIndex;
    if (isNil(position)) {
      argumentIndex = index++;
    } else {
      argumentIndex = position - 1;
    }
    return replaceConversionSpecification(argumentIndex, args, conversionSpecification, percent , ...specifiers);
  });
}