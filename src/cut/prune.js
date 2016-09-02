import clipNumber from '../helper/number/clip_number';
import coerceToString from '../helper/string/coerce_to_string';
import isNil from '../helper/object/is_nil';
import { MAX_SAFE_INTEGER } from '../helper/number/const';
import { REGEXP_WORD } from '../helper/string/regexp';
import toInteger from '../helper/number/to_integer';

/**
 * Truncates `subject` to a new `length` and does not break the words. Guarantees that the truncated string will be no longer than `length`.
 *
 * @static
 * @function prune
 * @since 1.0.0
 * @memberOf Cut
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
export default function(subject, length, end) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
    endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  var truncatedString = '';
  subjectString.replace(REGEXP_WORD, function(word, offset) {
    var wordInsertLength = offset + word.length;
    if (wordInsertLength <= lengthInt - endString.length) {
      truncatedString = subjectString.substr(0, wordInsertLength);
    }
  });
  return truncatedString + endString;
}