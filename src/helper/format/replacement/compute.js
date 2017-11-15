import {
  TYPE_FLOAT,
  TYPE_FLOAT_SCIENTIFIC,
  TYPE_FLOAT_SCIENTIFIC_UPPERCASE,
  TYPE_FLOAT_SHORT,
  TYPE_FLOAT_SHORT_UPPERCASE,
  TYPE_INTEGER,
  TYPE_INTEGER_ASCII_CHARACTER,
  TYPE_INTEGER_BINARY,
  TYPE_INTEGER_DECIMAL,
  TYPE_INTEGER_HEXADECIMAL,
  TYPE_INTEGER_HEXADECIMAL_UPPERCASE,
  TYPE_INTEGER_OCTAL,
  TYPE_INTEGER_UNSIGNED_DECIMAL,
  TYPE_STRING
} from 'helper/format/const';
import alignAndPad from 'helper/format/align_and_pad';
import formatFloat from 'helper/format/type_format/float';
import formatIntegerBase from 'helper/format/type_format/integer_base';
import formatIntegerDecimal from 'helper/format/type_format/integer_decimal';
import formatString from 'helper/format/type_format/string';

/**
 * Returns the computed string based on format specifiers.
 *
 * @ignore
 * @name computeReplacement
 * @param {string} replacement The replacement value.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the computed string.
 */
export default function compute(replacement, conversion) {
  let formatFunction;
  switch (conversion.typeSpecifier) {
    case TYPE_STRING:
      formatFunction = formatString;
      break;
    case TYPE_INTEGER_DECIMAL:
    case TYPE_INTEGER:
      formatFunction = formatIntegerDecimal;
      break;
    case TYPE_INTEGER_ASCII_CHARACTER:
    case TYPE_INTEGER_BINARY:
    case TYPE_INTEGER_OCTAL:
    case TYPE_INTEGER_HEXADECIMAL:
    case TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
    case TYPE_INTEGER_UNSIGNED_DECIMAL:
      formatFunction = formatIntegerBase;
      break;
    case TYPE_FLOAT:
    case TYPE_FLOAT_SCIENTIFIC:
    case TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
    case TYPE_FLOAT_SHORT:
    case TYPE_FLOAT_SHORT_UPPERCASE:
      formatFunction = formatFloat;
      break;
  }
  const formattedString = formatFunction(replacement, conversion);
  return alignAndPad(formattedString, conversion);
}