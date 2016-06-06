import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/* const INTEGER_BINARY = 'b',
  INTEGER_ASCII_CHARACTER = 'c',
  INTEGER_DECIMAL = 'd',
  FLOAT_SCIENTIFIC = 'e',
  FLOAT_SCIENTIFIC_UPPERCASE = 'E';
  */


/**
 * Formats `subject`.
 *
 * @function sprintf
 * @static
 * @memberOf Format
 * @param {string} [subject=''] The format string that contains zero or more directives.
 * @param {...*} args The arguments for formatting.
 * @return {string} Returns the formatted string.
 * @example
 * v.sprintf('%d', 1);
 * // => '1'
 */
export default function(subject, ...args) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '' || args.length === 0) {
    return subjectString;
  }
  return subjectString;
}