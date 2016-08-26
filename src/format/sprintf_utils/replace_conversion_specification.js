import Const from './const';
import toNumber from '../../helper/number/to_number';
import getPaddingCharacter from './get_padding_character';
import formatFloat from './type_format/float';
import formatIntegerBase from './type_format/integer_base';
import formatIntegerDecimal from './type_format/integer_decimal';
import formatString from './type_format/string';

/**
 * Returns the computed string based on format specifiers.
 *
 * @ignore
 * @name replaceConversionSpecification
 * @param  {string}   replacement             The replacement value.
 * @param  {string}   signSpecifier           The sign specifier to force a sign to be used on a number.
 * @param  {string}   paddingSpecifier        The padding specifier that says what padding character will be used.
 * @param  {string}   alignmentSpecifier      The alignment specifier that says if the result should be left-justified or right-justified.
 * @param  {number}   widthSpecifier          The width specifier how many characters this conversion should result in.
 * @param  {number}   precisionSpecifier      The precision specifier says how many decimal digits should be displayed for floating-point numbers.
 * @param  {string}   typeSpecifier           The type specifier says what type the argument data should be treated as.
 * @return {string}                           Returns the computed string.
 */
export default function (replacement, signSpecifier, paddingSpecifier, alignmentSpecifier, widthSpecifier,
  precisionSpecifier, typeSpecifier) {
  var formatterArguments = [replacement, signSpecifier, getPaddingCharacter(paddingSpecifier), alignmentSpecifier,
    toNumber(widthSpecifier), toNumber(precisionSpecifier)];
  switch (typeSpecifier) {
    case Const.TYPE_STRING:
      return formatString(...formatterArguments);
    case Const.TYPE_INTEGER_DECIMAL:
    case Const.TYPE_INTEGER:
      return formatIntegerDecimal(...formatterArguments);
    case Const.TYPE_INTEGER_ASCII_CHARACTER:
    case Const.TYPE_INTEGER_BINARY:
    case Const.TYPE_INTEGER_OCTAL:
    case Const.TYPE_INTEGER_HEXADECIMAL:
    case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
    case Const.TYPE_INTEGER_UNSIGNED_DECIMAL:
      return formatIntegerBase(...formatterArguments, typeSpecifier);
    case Const.TYPE_FLOAT:
    case Const.TYPE_FLOAT_SCIENTIFIC:
    case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
    case Const.TYPE_FLOAT_SHORT:
    case Const.TYPE_FLOAT_SHORT_UPPERCASE:
      return formatFloat(...formatterArguments, typeSpecifier);
  }
}