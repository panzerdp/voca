import codePointAt from 'chop/code_point_at';
import coerceToString from 'helper/string/coerce_to_string';

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
 * // => [114, 97, 105, 110], or
 * //    [0x72, 0x61, 0x69, 0x6E]
 *
 * v.codePoints('\uD83D\uDE00 smile'); // or '😀 smile'
 * // => [128512, 32, 115, 109, 105, 108, 101], or
 * //    [0x1F600, 0x20, 0x73, 0x6D, 0x69, 0x6C, 0x65]
 */
export default function codePoints(subject) {
  const subjectString = coerceToString(subject);
  const subjectStringLength = subjectString.length;
  const codePointArray = [];
  let index = 0;
  let codePointNumber;
  while (index < subjectStringLength) {
    codePointNumber = codePointAt(subjectString, index);
    codePointArray.push(codePointNumber);
    index += codePointNumber > 0xFFFF ? 2 : 1;
  }
  return codePointArray;
}