import C from './const';
import toNumber from '../../utilities/number/to_number';
import paddingCharacter from './padding_character';
import formatFloat from './type/format_float';
import formatIntegerBase from './type/format_integer_base';
import formatIntegerDecimal from './type/format_integer_decimal';
import formatString from './type/format_string';

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
  var formatterArguments = [replacement, signSpecifier, paddingCharacter(paddingSpecifier), alignmentSpecifier,
    toNumber(widthSpecifier), toNumber(precisionSpecifier)];
  switch (typeSpecifier) {
    case C.TYPE_STRING:
      return formatString(...formatterArguments);
    case C.TYPE_INTEGER_DECIMAL:
    case C.TYPE_INTEGER:
      return formatIntegerDecimal(...formatterArguments);
    case C.TYPE_INTEGER_ASCII_CHARACTER:
    case C.TYPE_INTEGER_BINARY:
    case C.TYPE_INTEGER_OCTAL:
    case C.TYPE_INTEGER_HEXADECIMAL:
    case C.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
    case C.TYPE_INTEGER_UNSIGNED_DECIMAL:
      return formatIntegerBase(...formatterArguments, typeSpecifier);
    case C.TYPE_FLOAT:
    case C.TYPE_FLOAT_SCIENTIFIC:
    case C.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
    case C.TYPE_FLOAT_SHORT:
    case C.TYPE_FLOAT_SHORT_UPPERCASE:
      return formatFloat(...formatterArguments, typeSpecifier);
  }
}