import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';
import isNil from '../utilities/object/is_nil';
import clipNumber from '../utilities/number/clip_number';
import toInteger from '../utilities/number/to_integer';
import { REGEXP_WORD } from '../utilities/string/regexp';

/**
 * Truncates `subject` to a new `length` and does not break the words. Guarantees that the truncated string will be no longer than `length`.
 *
 * @static
 * @function prune
 * @memberOf Manipulate
 * @param    {string} [subject=''] The string to prune.
 * @param    {int}    length       The length to prune the string.
 * @param    {string} [end='...']  The string to be added at the end.
 * @return   {string}              Returns the pruned string.
 * @example
 * v.prune('Once upon a time', 6);
 * // => 'Once...'
 *
 * v.prune('Good day, Little Red Riding Hood', 8, ' (read more)');
 * // => 'Good day (read more)'
 *
 * v.prune('Once upon', 10);
 * // => 'Once upon'
 */
export default function(subject, length, end) {
  var subjectString = toString(nilDefault(subject, '')),
    lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
    endString = toString(nilDefault(end, '...'));
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  var truncatedString = '';
  subjectString.replace(REGEXP_WORD, function(word, offset) {
    var wordInsertLength = offset + word.length;
    if (wordInsertLength <= length) {
      truncatedString = subjectString.substr(0, wordInsertLength);
    }
  });
  return truncatedString + endString;
}