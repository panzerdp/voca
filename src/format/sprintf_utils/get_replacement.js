import alignAndPad from './align_and_pad';
import Const from './const';
import formatFloat from './type_format/float';
import formatIntegerBase from './type_format/integer_base';
import formatIntegerDecimal from './type_format/integer_decimal';
import formatString from './type_format/string';

/**
 * Returns the computed string based on format specifiers.
 *
 * @ignore
 * @name getReplacement
 * @param {string} replacement The replacement value.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the computed string.
 */
export default function (replacement, conversion) {
  var formatFunction;
  switch (conversion.typeSpecifier) {
    case Const.TYPE_STRING:
      formatFunction = formatString;
      break;
    case Const.TYPE_INTEGER_DECIMAL:
    case Const.TYPE_INTEGER:
      formatFunction = formatIntegerDecimal;
      break;
    case Const.TYPE_INTEGER_ASCII_CHARACTER:
    case Const.TYPE_INTEGER_BINARY:
    case Const.TYPE_INTEGER_OCTAL:
    case Const.TYPE_INTEGER_HEXADECIMAL:
    case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
    case Const.TYPE_INTEGER_UNSIGNED_DECIMAL:
      formatFunction = formatIntegerBase;
      break;
    case Const.TYPE_FLOAT:
    case Const.TYPE_FLOAT_SCIENTIFIC:
    case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
    case Const.TYPE_FLOAT_SHORT:
    case Const.TYPE_FLOAT_SHORT_UPPERCASE:
      formatFunction = formatFloat;
      break;
  }
  var formattedString = formatFunction(replacement, conversion);
  return alignAndPad(formattedString, conversion);
}