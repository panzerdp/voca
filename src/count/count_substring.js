import coerceToString from 'helper/string/coerce_to_string';

/**
 * Counts the number of `substring` appearances in `subject`.
 *
 * @function countSubstring
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string where to count.
 * @param  {string} substring    The substring to be counted.
 * @return {number}              Returns the number of `substring` appearances.
 * @example
 * v.countSubstring('bad boys, bad boys whatcha gonna do?', 'boys');
 * // => 2
 *
 * v.countSubstring('every dog has its day', 'cat');
 * // => 0
 */
export default function countSubstring(subject, substring) {
  var subjectString = coerceToString(subject),
    substringString = coerceToString(substring),
    count = 0,
    matchIndex = 0,
    substringLength = substringString.length;
  if (subjectString === '' || substringString === '') {
    return count;
  }
  do {
    matchIndex = subjectString.indexOf(substringString, matchIndex);
    if (matchIndex !== -1) {
      count++;
      matchIndex += substringLength;
    }
  } while (matchIndex !== -1);
  return count;
}