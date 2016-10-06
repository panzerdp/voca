import { getAstralNumberFromSurrogatePair, isHighSurrogate, isLowSurrogate } from '../helper/string/surrogate_pair';
import coerceToNumber from '../helper/number/coerce_to_number';
import coerceToString from '../helper/string/coerce_to_string';
import nanDefault from '../helper/number/nan_default';

/**
 * Get the Unicode code point value of the character at `position`. <br/>
 * If a valid UTF-16 surrogate pair does not begin at `position`, the astral code point value at `position` is returned.
 *
 * @function codePointAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} position The position to get the code point number.
 * @return {number} Returns a non-negative number less than or equal to `0x10FFFF`.
 * @example
 * v.codePointAt('rain', 1);
 * // => 97, or 0x0048
 *
 * v.codePointAt('\uD83D\uDE00 is smile', 0); // or '😀 is smile'
 * // => 128512, or 0x1F600
 */
export default function(subject, position) {
  var subjectString = coerceToString(subject),
    subjectStringLength = subjectString.length,
    positionNumber = coerceToNumber(position);
  positionNumber = nanDefault(positionNumber, 0);
  if (positionNumber < 0 || positionNumber >= subjectStringLength) {
    return undefined;
  }
  var firstCodePoint = subjectString.charCodeAt(positionNumber),
    secondCodePoint;
  if (isHighSurrogate(firstCodePoint) && subjectStringLength > positionNumber + 1) {
    secondCodePoint = subjectString.charCodeAt(positionNumber + 1);
    if (isLowSurrogate(secondCodePoint)) {
      return getAstralNumberFromSurrogatePair(firstCodePoint, secondCodePoint);
    }
  }
  return firstCodePoint;
}