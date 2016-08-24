export default Object.freeze({
  // Type specifiers
  TYPE_INTEGER                       : 'i',
  TYPE_INTEGER_BINARY                : 'b',
  TYPE_INTEGER_ASCII_CHARACTER       : 'c',
  TYPE_INTEGER_DECIMAL               : 'd',
  TYPE_INTEGER_OCTAL                 : 'o',
  TYPE_INTEGER_UNSIGNED_DECIMAL      : 'u',
  TYPE_INTEGER_HEXADECIMAL           : 'x',
  TYPE_INTEGER_HEXADECIMAL_UPPERCASE : 'X',
  TYPE_FLOAT_SCIENTIFIC              : 'e',
  TYPE_FLOAT_SCIENTIFIC_UPPERCASE    : 'E',
  TYPE_FLOAT                         : 'f',
  TYPE_FLOAT_SHORT                   : 'g',
  TYPE_FLOAT_SHORT_UPPERCASE         : 'G',
  TYPE_STRING                        : 's',

  // Simple literals
  LITERAL_PERCENT           : '%',
  LITERAL_SINGLE_QUOTE      : "'",
  LITERAL_PLUS              : '+',
  LITERAL_MINUS             : '-',
  LITERAL_PERCENT_SPECIFIER : '%%',

  // Radix constants to format numbers
  RADIX_BINARY      : 2,
  RADIX_OCTAL       : 8,
  RADIX_DECIMAL     : 10,
  RADIX_HEXADECIMAL : 16
});