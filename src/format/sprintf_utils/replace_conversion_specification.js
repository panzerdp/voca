import { Type } from './const';
import toNumber from '../../utilities/number/to_number';
import paddingCharacter from './padding_character';
import validateFormat from './validate_format';
import formatFloat from './type/format_float';
import formatIntegerBase from './type/format_integer_base';
import formatIntegerDecimal from './type/format_integer_decimal';
import formatString from './type/format_string';

/**
 * Return the computed string based on format specifiers.
 *
 * @ignore
 * @name replaceConversionSpecification
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
export default function (index, args, signSpecifier, paddingSpecifier, alignmentSpecifier, widthSpecifier,
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