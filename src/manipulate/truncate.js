import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';

/**
 * Truncates `subject` to a new `length`.
 *
 * @function truncate
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to truncate.
 * @param {int} length The length to truncate the string.
 * @param {string} [end='...'] The string to be added at the end.
 * @return {string} Returns the truncated string.
 * @example
 * v.truncate('Once upon a time', 9);
 * // => 'Once upon...'
 *
 * v.truncate('Good day, Little Red Riding Hood', 8, ' (read more)');
 * // => 'Good day (read more)'
 *
 * v.truncate('Once upon', 10);
 * // => 'Once upon'
 */
export default function(subject, length, end) {
  var subjectString = toString(nilDefault(subject, '')),
    lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
    endString = toString(nilDefault(end, '...'));
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  return subjectString.substr(0, length) + endString;
}