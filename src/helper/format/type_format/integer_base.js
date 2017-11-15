import {
  RADIX_BINARY,
  RADIX_HEXADECIMAL,
  RADIX_OCTAL,
  TYPE_INTEGER_ASCII_CHARACTER,
  TYPE_INTEGER_BINARY,
  TYPE_INTEGER_HEXADECIMAL,
  TYPE_INTEGER_HEXADECIMAL_UPPERCASE,
  TYPE_INTEGER_OCTAL
} from 'helper/format/const';
import toString from 'helper/string/coerce_to_string';

/**
 * Formats an integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

export default function integerBase(replacement, conversion) {
  let integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  integer = integer >>> 0;
  switch (conversion.typeSpecifier) {
    case TYPE_INTEGER_ASCII_CHARACTER:
      integer = String.fromCharCode(integer);
      break;
    case TYPE_INTEGER_BINARY:
      integer = integer.toString(RADIX_BINARY);
      break;
    case TYPE_INTEGER_OCTAL:
      integer = integer.toString(RADIX_OCTAL);
      break;
    case TYPE_INTEGER_HEXADECIMAL:
      integer = integer.toString(RADIX_HEXADECIMAL);
      break;
    case TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
      integer = integer.toString(RADIX_HEXADECIMAL).toUpperCase();
      break;
  }
  return toString(integer);
}