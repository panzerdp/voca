import { REGEXP_EXTENDED_ASCII, REGEXP_LATIN_WORD, REGEXP_WORD } from 'helper/reg_exp/const_extended';
import clipNumber from 'helper/number/clip_number';
import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import { MAX_SAFE_INTEGER } from 'helper/number/const';
import toInteger from 'helper/number/to_integer';

/**
 * Truncates `subject` to a new `length` and does not break the words. Guarantees that the truncated string is no longer
 * than `length`.
 *
 * @static
 * @function prune
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to prune.
 * @param  {int}    length       The length to prune the string.
 * @param  {string} [end='...']  The string to be added at the end.
 * @return {string}              Returns the pruned string.
 * @example
 * v.prune('Once upon a time', 7);
 * // => 'Once...'
 *
 * v.prune('Good day, Little Red Riding Hood', 16, ' (more)');
 * // => 'Good day (more)'
 *
 * v.prune('Once upon', 10);
 * // => 'Once upon'
 */
export default function prune(subject, length, end) {
  const subjectString = coerceToString(subject);
  const lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  const endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  const pattern = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  let truncatedLength = 0;
  subjectString.replace(pattern, function(word, offset) {
    const wordInsertLength = offset + word.length;
    if (wordInsertLength <= lengthInt - endString.length) {
      truncatedLength = wordInsertLength;
    }
  });
  return subjectString.substr(0, truncatedLength) + endString;
}