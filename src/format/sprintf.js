/* eslint-disable */
import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_CONVERSION_SPECIFICATION } from '../utils/string/regexp';

// Type specifiers list
const INTEGER_BINARY = 'b',
  INTEGER_ASCII_CHARACTER = 'c',
  INTEGER_DECIMAL = 'd',
  INTEGER_OCTAL = 'o',
  INTEGER_UNSIGNED_DECIMAL = 'u',
  INTEGER_HEXADECIMAL = 'x',
  INTEGER_HEXADECIMAL_UPPERCASE = 'X',
  FLOAT_SCIENTIFIC = 'e',
  FLOAT_SCIENTIFIC_UPPERCASE = 'E',
  FLOAT = 'f',
  FLOAT_SHORT = 'g',
  FLOAT_SHORT_UPPERCASE = 'G',
  STRING = 's',
  PERCENT_CHARACTER = '%';

/**
 * Replace the matched conversion specification with argument value
 * @param {string} replacement The string to replace the converion specification
 * @param {string} conversionSpecification The conversion specification
 * @return {string} The transformed string
 */
function replaceConversionSpecification(replacement, conversionSpecification) {
  return replacement;
}

/**
 * Produces a string according to the formatting of `subject`.
 *
 * @function sprintf
 * @static
 * @memberOf Format
 * @param {string} [format=''] The format string.
 * @param {...*} args The arguments for formatting.
 * @return {string} Returns the produced string.
 * @example
 * v.sprintf('%d', 1);
 * // => '1'
 */
export default function(format, ...args) {
  var formatString = toString(nilDefault(format, '')),
    argsLength = args.length;
  if (formatString === '' || argsLength === 0) {
    return formatString;
  }
  var index = 0;
  return formatString.replace(REGEXP_CONVERSION_SPECIFICATION, function(conversionSpecification) {
    if (index < argsLength) {
      return replaceConversionSpecification(args[index++], conversionSpecification);
    }
    return conversionSpecification;
  });
}