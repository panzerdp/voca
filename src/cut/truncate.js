import coerceToString from '../helper/string/coerce_to_string';
import isNil from '../helper/object/is_nil';
import clipNumber from '../helper/number/clip_number';
import toInteger from '../helper/number/to_integer';
import { MAX_SAFE_INTEGER } from '../helper/number/const';

/**
 * Truncates `subject` to a new `length`.
 *
 * @function truncate
 * @static
 * @since 1.0.0
 * @memberOf Cut
 * @param {string} [subject=''] The string to truncate.
 * @param {int} length The length to truncate the string.
 * @param {string} [end='...'] The string to be added at the end.
 * @return {string} Returns the truncated string.
 * @example
 * v.truncate('Once upon a time', 9);
 * // => 'Once u...'
 *
 * v.truncate('Good day, Little Red Riding Hood', 20, ' (read more)');
 * // => 'Good day (read more)'
 *
 * v.truncate('Once upon', 10);
 * // => 'Once upon'
 */
export default function(subject, length, end) {
  var subjectString = coerceToString(subject),
    lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER),
    endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  return subjectString.substr(0, length - endString.length) + endString;
}