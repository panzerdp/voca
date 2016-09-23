import codePointAt from '../chop/code_point_at';
import coerceToString from '../helper/string/coerce_to_string';

/**
 * Returns an array of Unicode code point values from characters of `subject`.
 *
 * @function codePoints
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param  {string} [subject=''] The string to extract from.
 * @return {Array} Returns an array of non-negative numbers less than or equal to `0x10FFFF`.
 * @example
 * v.codePoints('rain');
 * // => [97]
 *
 * v.codePoints('\uD83D\uDE00 smile'); // or '😀 smile'
 * // => []
 */
export default function(subject) {
  var subjectString = coerceToString(subject),
    subjectStringLength = subjectString.length,
    codePointArray = [],
    index = 0,
    codePointNumber;
  while (index < subjectStringLength) {
    codePointNumber = codePointAt(subjectString, index);
    codePointArray.push(codePointNumber);
    index += codePointNumber > 0xFFFF ? 2 : 1;
  }
  return codePointArray;
}